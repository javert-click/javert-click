open CCommon
open SCommon
open Literal 

module L = Logging

module M 
  (Val              : Val.M) 
  (Error            : Error.M with type vt = Val.t)
  (EventSemantics   : EventSemantics.M with type vt = Val.t)
  (Scheduler        : MPScheduler.M) = struct 

  (* Values come from UL. Can be either concrete or symbolic *)
  type vt = Val.t

  (* Message Ports *)
  type port_t = Literal.t

  (* Configuration Identifiers *)
  type cid_t = string

  (* Event Configurations are opaque to the MPSemantics *)
  type event_conf_t = (cid_t * EventSemantics.state_t * bool)

  (* Messages can be just values or tuples including a list of transferred ports *)
  type message_t = (vt list) * (port_t list) * vt

  (* List of active Event configurations *)
  type cq_t = event_conf_t list

  (* Port Confs Map *)
  type pc_map_t = (port_t, cid_t) Hashtbl.t

  (* Paired Ports Map *)
  type pp_map_t = (port_t, port_t list) Hashtbl.t

  (* Message Queue *)
  type mq_t = (cid_t * message_t * port_t) list
 
  (* A transition label is either an EventLabel or a MessageLabel. We deal with the MessageLabel here, and the EventSemantics deals with the EventLabel *)
  type event_label_t = EventSemantics.event_label_t

  type mp_label_t = (vt) MPInterceptor.t
  
  (* Message Passing Configuration *)
  (* 1. Event Configurations Queue *)
  (* 2. Message Queue *)
  (* 3. Port Configurations Map *)
  (* 4. Paired Ports Map *)
  (* 5. Lead Event Configuration (atomic blocks) *)
  type mp_conf_t = cq_t * mq_t * pc_map_t * pp_map_t * cid_t option
  
  (* Used for configuration addition/removal *)
  type optional_action_t = | AddConf of event_conf_t 
                           | RemConf of cid_t 
                           | Assume of Formula.t * cid_t
                           | HoldConf of cid_t
                           | FreeConf of cid_t
                           | AddSpecVar of string list
                           | Notify of vt list * vt * cid_t
                           | RunSetup of cid_t * string * vt list
                           | ConfExists of string * cid_t

  (* Most of the operations will manipulate a single configuration. There is then a function to update the mp_conf based on the new reduced conf and the optional action *)
  type reduced_mp_conf_t = event_conf_t * mq_t * pc_map_t * pp_map_t * optional_action_t option * Formula.t option
  
  (* Message Passing Result *)
  (* 1. Respective results of event configurations, each with the assciated cid *)
  (* 2. Final message queue *)
  (* 3. Final port configurations map *)
  (* 4. Final paired ports map *)
  type result_t = (cid_t * EventSemantics.result_t) list * mq_t * pc_map_t * pp_map_t

  (* Maximum number of messages that each thread can send. If the number exceeds this one, the thread is 'blocked' *)
  let msgs_limit_per_conf = 5
  
  (***** AUXILIARY FUNCTIONS *****)

  let has_transfer (msg: cid_t * message_t * port_t) : bool =
    let _, (_, plist, _), _ = msg  in
    (match plist with
    | [] -> false
    | _ -> true)

  (* Enqueues message in message queue by adding message to the back of the queue *)
  let enqueue (cid: cid_t) (msg: vt list) (plist: port_t list) (port: port_t) (event: vt) (mq: mq_t) : mq_t = 
    mq @ [cid, (msg, plist, event), port]

  (* Redirects ports in the port list to the configuration with identifier cid *)
  let redirect (plist: port_t list) (cid: cid_t) (pc: pc_map_t) : pc_map_t = 
    List.iter (fun port -> Hashtbl.replace pc port cid) plist;
    pc

  (* Returns Some conf if conf is in the list cs and None otherwise *)
  let get_conf (cid: cid_t) (cq: cq_t) : event_conf_t option = 
    List.find_opt (fun (cid', _, _) -> cid = cid') cq

  (* Sets event configuration of id equal to cid in cs, if it exists *)
  let set_conf (conf: event_conf_t) (cq: cq_t) : cq_t = 
    let (cid', econf', blocked') = conf in
    List.map (fun (cid, econf, blocked) -> if cid = cid' then (cid, econf', blocked') else (cid, econf, blocked)) cq

  (* Returns true if all configurations in the list cs are final, false otherwise *)
  let final (cq: cq_t) : bool = 
    List.fold_left (fun final_so_far (cid, e_conf, blocked) -> 
    L.log L.Normal (lazy (Printf.sprintf "MPSem: checking if conf %s is final" cid));
    final_so_far && (EventSemantics.final e_conf || blocked)) true cq

  let count_msgs_for_conf (conf: event_conf_t) (mq: mq_t) : int =
    let cid, _, _ = conf in
    List.length (List.filter (fun (cid', _, _) -> cid = cid') mq)

  let ready_to_process_msg (cq: cq_t) (mq: mq_t) : bool = 
    List.fold_left (
      fun final_so_far (cid, e_conf, blocked) -> 
        final_so_far && 
        (EventSemantics.final_with_timing_events e_conf || 
        blocked)
    ) true cq

  (* Generates port id randomly making sure that port does not exist yet *)
  let rec generate_new_conf_id (cids: cid_t list) : cid_t =
    Random.self_init ();
    let cid = string_of_int (Random.int 1000) in
    if (List.mem cid cids) then (generate_new_conf_id cids) else cid

  (* Generates port id randomly making sure that port does not exist yet *)
  let rec generate_new_port_id (pc: pc_map_t) : port_t =
    Random.self_init ();
    let port_id = Num (float_of_int (Random.int 1000)) in
    if (Hashtbl.mem pc port_id) then (generate_new_port_id pc) else port_id

  (* Adds a constraint f to the path condition of each configuration in cq *)
  let assume (cq: cq_t) (f: Formula.t) : cq_t =
  L.log L.Normal (lazy (Printf.sprintf "\nGoing to do Assume. CQ length: %d \n" (List.length cq)));
    let cq' = List.fold_left (fun acc (cid, conf, blocked) -> 
      (*L.log L.Normal (lazy (Printf.sprintf "\nASSUME: conf: %s" (EventSemantics.state_str conf)));*)
      match EventSemantics.assume conf f with
      | Some conf' -> acc @ [cid, conf', blocked] 
      | None -> acc) [] cq in
    L.log L.Normal (lazy (Printf.sprintf "\nAssume done. New CQ length: %d \n" (List.length cq')));
    cq'

  let notify (cq: cq_t) (msg: vt list) (event: vt) (cid_orig : cid_t) : cq_t list =
    let event = Events.GeneralEvent (event) in
       (* we need to fire the event to all confs *)
       List.fold_left (fun acc (cid, econf, blocked) -> 
        let econfs' = EventSemantics.fire_event event msg econf true in
        (* TODOMP: Check later best solution for this. 
        Changing position of confs in cq should not be necessary! *)
        List.concat 
          (List.map 
            (fun econf' -> 
              List.map 
                (fun cq' -> 
                  let cq'' = set_conf (cid, econf', blocked) cq' in
                  List.filter (fun (cid', _, _) -> cid_orig = cid') cq'' @ 
                  List.filter (fun (cid', _ ,_) -> cid_orig <> cid') cq''
                ) acc
            ) econfs')
        ) [cq] cq

  (* Updates the configuration queue based on the result of running a single configuration *)
  let update_full_conf_from_reduced_conf (cq_pre: cq_t) (cq_pos: cq_t) (mq: mq_t) (pc: pc_map_t) (pp:pp_map_t) (lead_conf: cid_t option) (new_reduced_conf: reduced_mp_conf_t) : mp_conf_t list =
    L.log L.Normal (lazy (Printf.sprintf "update_full_conf_from_reduced_conf"));
    let (econf, mq', pc', pp', o_action, f) = new_reduced_conf in
    let cq' = cq_pre @ [econf] @ cq_pos in
    let cq_list, lead_conf' =
    (match o_action with  
    | Some AddConf new_conf -> let new_cid, _, _ = new_conf in 
      L.log L.Normal (lazy (Printf.sprintf "Adding conf %s" new_cid)); 
      [new_conf :: cq'], lead_conf
    | Some RemConf cid -> [List.filter (fun (cid', c', _) -> cid <> cid') cq'], lead_conf
    | Some HoldConf cid -> [cq'], Some cid
    | Some FreeConf cid -> 
      (match lead_conf with
      | Some cid' when cid' = cid -> [cq'], None
      | _ -> [cq'], lead_conf)
    | Some AddSpecVar x -> 
      [(List.map (fun (cid, conf, blocked) -> 
        (cid, EventSemantics.add_spec_var x conf, blocked)) cq')], lead_conf
    | Some Notify (msg, event, cid_orig) -> 
      let cqs = notify cq' msg event cid_orig in
      cqs, lead_conf
    | Some RunSetup (cid, setup_fid, args) ->
      (* 1. Get conf with id cid *)
      let econf' = List.find (fun (cid', _, _) -> cid = cid') cq' in
      (* 2. Ask ESem to run setup_fid *)
      let (cid, econf', blocked) = econf' in
      let econf'' = EventSemantics.restart_conf setup_fid args econf' in
      (* 3. Put it in the beginning of the list, to give priority *)
      let cq'' = (cid, econf'', blocked) :: List.filter (fun (cid', _, _) -> cid <> cid') cq' in
      [cq''], lead_conf
    | Some ConfExists (xvar, id) ->
      let exists = List.exists (fun (cid, _, _) -> cid = id) cq' in
      let (cid, econf, blocked) = econf in
      let econf' = EventSemantics.set_var xvar (Val.from_literal (Bool exists)) econf in
      [cq_pre @ [(cid, econf', blocked)] @ cq_pos], lead_conf
    | Some Assume (f, cid_orig) -> 
      let cq'' = List.fold_left (fun acc (cid, conf, blocked) -> 
        if (cid_orig = cid) then acc @ [(cid, conf, blocked)] 
        else (
          match EventSemantics.assume conf f with
          | Some conf' -> acc @ [cid, conf', blocked] 
          | None -> acc)
        ) [] cq' in
        [cq''], lead_conf
    | None -> [cq'], lead_conf) in
    (*let new_cq_list = 
    match f with
    | None -> L.log L.Normal (lazy (Printf.sprintf "Formula is none, cq length: %d" (List.length cq_list))); cq_list
    | Some f -> 
      L.log L.Normal (lazy (Printf.sprintf "Before assume(%s): cq list length: %d" (Formula.str f) (List.length cq_list)));
      let new_cq = List.map (fun cq -> assume cq f) cq_list in 
      L.log L.Normal (lazy (Printf.sprintf "After assume(%s): cq list length: %d" (Formula.str f) (List.length new_cq)));
      new_cq in*)
    (*L.log L.Normal (lazy (Printf.sprintf "\n*******************\n"));*)
    (*List.iter (fun (cid, econf) -> L.log L.Normal (lazy (Printf.sprintf "\nCID: %d, CONF: \n%s\n" cid (EventSemantics.state_str econf)))) new_cq;*)
    (*L.log L.Normal (lazy (Printf.sprintf "\n*******************\n"));*)
    List.map (fun new_cq -> new_cq, mq', pc', pp', lead_conf') cq_list


  let compute_string_from_val (v: vt) : string =
    let lit = Val.to_literal v in
    match lit with
    | Some String v -> v
    | _ -> raise (Failure ("Val could not be converted to string."))

  let compute_num_from_val (v:vt) : Literal.t =
    let lit = Val.to_literal v in
    match lit with
    | Some Num n -> Num n
    | _ -> raise (Failure ("Val could not be converted to literal."))

  let rec break_cq_on_cid (cq: cq_t) (cid: cid_t) (cq_pre: cq_t) : cq_t * event_conf_t option * cq_t =
    match cq with
    | [] -> cq_pre, None, []
    | (c:: cq_post) -> 
      let cid', _, _ = c in
      if cid = cid' then cq_pre, Some c, cq_post
      else break_cq_on_cid cq_post cid (cq_pre @ [c])

  (***** MAIN FUNCTIONS *****)

  (* Updates mp conf based on new message msg sent to the specified port *)
  let send (econf: event_conf_t) (msg: vt list) (plist: port_t list) (port_1: port_t) (port_2: port_t) (event: vt) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : event_conf_t * mq_t =
    let cid, conf, blocked = econf in
    (*Printf.printf "\nSend, Found msg: %s\n" (String.concat "," (List.map Val.str msg));*)
    (*Printf.printf "\nDest port: %s\n" (Literal.str port_2);*)
    (*let port_2 = Hashtbl.find pp port_1 in*)
    (* We need to guarantee that the sender belongs to the current configuration *)
    (*let port_belongs_to_curr_conf = Hashtbl.fold (fun port' cid' acc -> if (cid = cid' && port_1 = port') then true else acc) pc false in *)
    if (count_msgs_for_conf econf mq >= msgs_limit_per_conf) then (cid, conf, true), mq
    (*else if (port_belongs_to_curr_conf) then econf, enqueue cid msg plist port_2 event mq 
    else econf, mq*)
    else econf, enqueue cid msg plist port_2 event mq

  (* Creates new configuration and also sets return variable to new configuration identifier *)
  let new_execution (id: string option) (xvar: string) (url: string) (setup_fid: string) (args: vt list) (cids: cid_t list) (conf: event_conf_t) : event_conf_t * event_conf_t option * optional_action_t option =
    let cid, econf, blocked = conf in
    match id with
    (* No identifier is given, so we simply create a new conf *)
    | None ->
      let new_cid = generate_new_conf_id cids in
      let conf' = EventSemantics.set_var xvar (Val.from_literal (String (new_cid))) econf in
      let new_econf = EventSemantics.new_conf url setup_fid args econf in
      let new_conf = (new_cid, new_econf, false) in
      (cid, conf', blocked), Some new_conf, Some (AddConf new_conf)
    (* If id is given, check if conf already exists with same id. *)
    | Some id ->
      let conf' = EventSemantics.set_var xvar (Val.from_literal (String (id))) econf in
      (* Conf already exists with same id. In this case, simply return the conf *)
      if (List.mem id cids) then (
        (cid, conf', blocked), None, Some (RunSetup (id, setup_fid, args))
      (* Conf with given id does not exist yet. In this case, create new one *)
      ) else (
        let new_econf = EventSemantics.new_conf url setup_fid args econf in
        let new_conf = (id, new_econf, false) in
        (cid, conf', blocked), Some new_conf, Some (AddConf new_conf)
      )
      

  (* Unpairs a port. Unpair means removing both p and port paired with p in pp map. We assume that the map is bi-directional *)
  let unpair_port (port: port_t) (pp: pp_map_t) : pp_map_t =
    (* 1st step: finding the port(s) paired with the given port *) 
    match Hashtbl.find_opt pp port with
    | Some paired_ports -> 
      Hashtbl.remove pp port;
      List.iter (fun paired -> Hashtbl.remove pp paired) paired_ports;
      pp
    | None -> pp

  (* Removes all info related to configuration with identifier cid, including the ports belonging to it *)
  let terminate (plist: port_t list) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : mq_t * pc_map_t * pp_map_t =
    (* 1. Removing ports from pc map *)
    List.iter (fun port -> Hashtbl.remove pc port) plist;
    (* 2. Removing ports from pp map*)
    let pp' = List.fold_left (fun pp' port -> unpair_port port pp') pp plist in
    (* 3. Removing messages sent to ports in the given port list *)
    (* TODOMP: fix this! *)
    let mq' = List.filter (fun (_, _,p) -> not (List.mem p plist)) mq in
    mq', pc, pp'

  (* Creates new port, adds to current configuration and sets return variable to new port id *)
  let new_port (xvar: string) (conf: event_conf_t) (pc: pc_map_t) : event_conf_t * pc_map_t * optional_action_t option = 
    let port_id = generate_new_port_id pc in
    let cid, conf, blocked = conf in
    let (conf', port), label, f_lvar_num = 
      (EventSemantics.set_var xvar (Val.from_literal port_id) conf, port_id), None, Formula.True in
    Hashtbl.add pc port cid;
    (cid, conf', blocked), pc, label

  (* Adds both entries to pp map. Note that we assume pre-existing values of p1 and p2 to have been removed. The map is bi-directional *)
  let pair_ports (p1: port_t) (p2: port_t) (plist: port_t list) (pp: pp_map_t) : pp_map_t =
    
    (** Auxiliary function that pairs the ports in the paired ports map *)
    let add_port_to_paired_list (p1: port_t) (p2: port_t) (pp: pp_map_t) : pp_map_t =
      if (Hashtbl.mem pp p1) then (
        let paired_ports = Hashtbl.find pp p1 in
        if (not (List.mem p2 paired_ports)) then
        Hashtbl.replace pp p1 (paired_ports @ [p2]);
      ) else (
        Hashtbl.add pp p1 [p2];
      );  
      pp in
    
    (* Pair p1 and p2 by adding both (p1, p2) and (p2, p1) to the map *)
    (* 1: Adding (p1, p2) to pp *)
    (* I have to assume that both ports belong to the port configuration map *)
    if (List.mem p1 plist && List.mem p2 plist) then (
      let pp'  = add_port_to_paired_list p1 p2 pp in
      let pp'' = add_port_to_paired_list p2 p1 pp' in
      pp''
    ) else pp
        

  (* Returns the ports paired with the given port *)
  let get_paired (xvar: string) (port: port_t) (conf: event_conf_t) (pp: pp_map_t) : event_conf_t =
    let cid, conf, blocked = conf in 
    (*Printf.printf "\nGetPaired: searching for paired port of %s" (Val.str port);*)
    match Hashtbl.find_opt pp port with
    | None ->
      (* return null if no paired port is found *)
      cid, EventSemantics.set_var xvar (Val.from_list []) conf, blocked
    | Some ports -> 
      cid, EventSemantics.set_var xvar (Val.from_list (List.map Val.from_literal ports)) conf, blocked

  let e_confs_str (cq:cq_t) = 
      String.concat "\n" (List.map (
        fun econf -> 
          let cid, conf, _ = econf in
          Printf.sprintf "\n-----Event Conf-----: \n--CID: %s\n--E-Conf: \n\t\t%s" cid (EventSemantics.state_str conf)
      ) cq)

  (* Processes the message obtained from scheduler by calling ES (fire rule) *)
  let process_message (msg: message_t) (port: port_t) (cq: cq_t) (pc: pc_map_t) : cq_t list * pc_map_t =
   let (vs, plist, event_data) = msg  in
   (*Printf.printf "\nProcessing message %s sent to port %s\n" (String.concat ", " (List.map Val.str vs))  (Literal.str port);*)
    (* TODOMP: FIX THIS *)
   let cid = Hashtbl.find pc port in
   L.log L.Normal (lazy (Printf.sprintf "Trying to find conf %s" cid));
    (*Printf.printf "\nFound %d conf for port %s" cid (Literal.str port);*)
    let pc' = redirect plist cid pc in
    (match get_conf cid cq with
    | None -> raise (Failure ("Invalid Configuration Identifier."))
    | Some (cid, econf, blocked) -> 
      let event = Events.MessageEvent (event_data) in
      let econfs' = EventSemantics.fire_event event (vs @ [Val.from_list (List.map (fun p -> (Val.from_literal p)) plist)]) econf false in
      let cq_list = List.map (fun econf' -> set_conf (cid, econf', blocked) cq) econfs' in
            cq_list, pc') 

  let rec process_mp_label (label: mp_label_t) (cids: cid_t list) (econf: event_conf_t) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : reduced_mp_conf_t list = 
      let cid, conf, blocked = econf in
      match label with
      | Send (msg, plist, port_orig, port_dest, event) -> 
        (*L.log L.Normal (lazy (Printf.sprintf "Found send. Port orig:%s, Port dest:%s" (Val.str port_orig) (Val.str port_dest)));*)
        (*Printf.printf "\nProcessing send label\n";*)
        let plist = List.map (fun p -> compute_num_from_val p) plist in
        let econf', mq' = send econf msg plist (compute_num_from_val port_orig) (compute_num_from_val port_dest) event mq pc pp in
        [econf', mq', pc, pp, None, None]
      | NotifyAll (msg, event) ->
        (*Printf.printf "\nFound send_sync. Event:%s\n" (Val.str event);*)
        [econf, mq, pc, pp, Some (Notify (msg, event, cid)), None]
        (*let dest_ports = Hashtbl.fold (fun p _ acc -> acc @ [p]) pc [] in
        let mq' = mq @ [Sync (msg, event, cid), dest_ports] in
        [(cid, conf), mq', pc, pp, None, None]*)
      | Create (id, xvar, url, setup_fid, args) -> 
        (*Printf.printf "\nMP-Semantics: Processing create label, setup_fid: %s" (setup_fid);*)
        let conf'', new_conf, oaction = new_execution id xvar url setup_fid args  cids econf in
        [conf'', mq, pc, pp, oaction, None] 
      | Terminate (xvar, cid') -> 
        (*Printf.printf "\nFound terminate for cid %s\n" (Val.str cid');*)
        let cid' = match cid' with
        | Some cid' -> compute_string_from_val cid'
        | None -> cid in
        (*Printf.printf "\nComputed cid: %d\n" cid'; *)
        let plist = Hashtbl.fold (fun port' cid' acc -> if (cid = cid') then acc @ [port'] else acc) pc [] in
        let mq', pc', pp' = terminate plist mq pc pp in
        [econf, mq', pc', pp', Some (RemConf (cid')), None]
      | NewPort (xvar) -> 
        let conf'', pc', label = new_port xvar econf pc in
        [conf'', mq, pc', pp, label, None]
      | PairPorts (p1, p2) -> 
        let p1 = compute_num_from_val p1 in
        let p2 = compute_num_from_val p2 in
        let pp' = pair_ports p1 p2 (Hashtbl.fold (fun p' _ acc -> acc @ [p']) pc []) pp in
        [econf, mq, pc, pp', None, None]
      | UnpairPort (port) -> 
        let port = compute_num_from_val port in
        let pp' = unpair_port port pp in
        [econf, mq, pc, pp', None, None]
      | GetPaired (xvar, port) -> 
        let port = compute_num_from_val port in
        let conf'' = get_paired xvar port econf pp in 
        [conf'', mq, pc, pp, None, None]
      | BeginAtomic -> L.log L.Normal (lazy "\nFound beginAtomic\n");
        [econf, mq, pc, pp, Some (HoldConf cid), None] 
      | EndAtomic -> L.log L.Normal (lazy "\nFound endAtomic\n");
        [econf, mq, pc, pp, Some (FreeConf cid), None]
      | Assume (f) -> [econf, mq, pc, pp, Some (Assume (f, cid)), None]
      | AssumeType (x, t) -> 
        let f = Formula.Eq (UnOp (TypeOf, (LVar x)), Lit (Type t)) in
        [econf, mq, pc, pp, None, Some f]
      | SpecVar x -> [econf, mq, pc, pp, Some (AddSpecVar x), None]
      | ConfExists (xvar, id) -> 
        [econf, mq, pc, pp, Some (ConfExists (xvar, id)), None]
      | GroupLabel (ls) ->
        (match ls with
        | [] -> [econf, mq, pc, pp, None, None]
        | labels -> List.concat (List.map (fun l -> process_mp_label l cids econf mq pc pp) labels))

  (* Runs a step of the current e-configuration *)
  let run_conf (cids: cid_t list) (econf: event_conf_t) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : reduced_mp_conf_t list * reduced_mp_conf_t option = 
    let cid, conf, blocked = econf in
    L.log L.Normal (lazy (Printf.sprintf "\nCurrent conf: %s\n" cid));
    match EventSemantics.make_step conf (Some (MPInterceptor.intercept)) with
    | [], Some fconf -> [], Some ((cid, fconf, blocked), mq, pc, pp, None, None) 
    | confs, _ ->
      let res = List.concat (List.map (fun (conf', (label : event_label_t option)) ->
        match label with
        | Some MLabel label -> process_mp_label label cids (cid, conf', blocked) mq pc pp 
        | _ -> [(cid, conf', blocked), mq, pc, pp, None, None]
      ) confs) in
      res, None

  let mq_str mq = "Messages: " ^ String.concat ", " (List.map (
    fun (_, msg, ports) ->
      let (data, transfer, event) = msg in
        Printf.sprintf "Data: %s, Event: %s" (String.concat ", " (List.map Val.str data)) (Val.str event)
  ) mq)

  let map_str map (v_to_string : 'b -> string) = ("" ^ (Hashtbl.fold (fun k v acc -> acc ^ Printf.sprintf "\n\t Key: %s, \n\t Val: %s " (Literal.str k) (v_to_string v)) map " "))
      
  let pc_str pc = 
    Printf.sprintf "\nPort-Confs map: %s" (map_str pc (fun cid -> cid))
  
  let pp_str pp =
    Printf.sprintf "\nPort-Port map: %s\n" (map_str pp (fun ports -> String.concat ", " (List.map Literal.str ports)))

  let print_mpconf (mpconf: mp_conf_t) : unit =
    let (econfs, mq, pc, pp, lead_conf) = mpconf in
    let str = e_confs_str econfs ^ mq_str mq ^ pc_str pc ^ pp_str pp in
    L.log L.Normal (lazy (Printf.sprintf
      "\n-------------------MP CONFIGURATION------------------------\n%s\n------------------------------------------------------\n" str))
  
  let string_of_result (rets: result_t list) : string =
    "\n------Event Configuration Queue------\n" ^
    String.concat "\n" (List.map 
      (fun ret -> 
        let (erets, mq, pc, pp) = ret in
          let erets_str = String.concat "\n" 
            (List.map (
              fun (cid, eret) -> "\n----Event Configuration (Cid: " ^ cid ^ ")----" ^ EventSemantics.string_of_result [eret]
            ) erets) in
            erets_str ^ mq_str mq ^ pc_str pc ^ pp_str pp
      ) rets) 
  
  let make_step (conf : mp_conf_t) : (mp_conf_t list) * (mp_conf_t list) = 
    print_mpconf conf;
    let cq, mq, pc, pp, lead_conf = conf in
    let all_confs_awaiting = List.exists (
      fun (_, conf, _) -> EventSemantics.is_awaiting conf
    ) cq && List.for_all (
      fun (_, conf, _) -> EventSemantics.is_awaiting conf || EventSemantics.final conf
    ) cq in
    (*if(List.length mq = 0 && List.length cq > 0 && all_confs_awaiting) then (
      Printf.printf "\nERROR: There is at least a pending promise that will never be resolved\n";
      let cid, econf, blocked = List.hd cq in
      let econfs' = EventSemantics.assert_formula Formula.False econf in
      [], List.map (fun econf' -> (cid, econf', blocked) :: (List.tl cq), mq, pc, pp, lead_conf) econfs'
    ) else ( *)
      match lead_conf with
      | Some cid -> 
        L.log L.Normal (lazy (Printf.sprintf "\nRunning lead conf %s\n" cid));
        (match break_cq_on_cid cq cid [] with
        | cq_pre, Some c, cq_post -> 
          let update = update_full_conf_from_reduced_conf cq_pre cq_post mq pc pp lead_conf in
          let cids = List.map (fun (cid, _, _) -> cid) cq in
          (match run_conf cids c mq pc pp with
          | [], Some fconf -> [], update fconf
          | new_reduced_confs, _ ->
            List.concat (List.map (fun new_reduced_conf -> update new_reduced_conf) new_reduced_confs), [])
        | _, None, _ -> [], []) (*raise (Failure "Configuration not found")*) 
      | None ->
        (* Scheduler decides if a configuration or a message is scheduled *)
        (match Scheduler.schedule cq mq final ready_to_process_msg has_transfer count_msgs_for_conf with
        (* There is nothing left to do *)
        | None -> L.log L.Normal (lazy (Printf.sprintf "MP scheduler chose none")); [], [conf]
        (* Configuration is scheduled *)
        | Some (Conf (cq_pre, c, cq_post)) -> 
          L.log L.Normal (lazy (Printf.sprintf "MP scheduler chose conf"));
          let update = update_full_conf_from_reduced_conf cq_pre cq_post mq pc pp lead_conf in
          let cids = List.map (fun (cid, _, _) -> cid) cq in
          (*L.log L.Normal (lazy (Printf.sprintf "cq_pre: %s" (String.concat ", " (List.map (fun (cid, _) -> string_of_int cid) cq_pre))));
          L.log L.Normal (lazy (Printf.sprintf "cq_post: %s" (String.concat ", " (List.map (fun (cid, _) -> string_of_int cid) cq_post))));*)
          (match run_conf cids c mq pc pp with
          | [], Some fconf -> [], update fconf
          | new_reduced_confs, _ -> List.concat (List.map (fun new_reduced_conf -> update new_reduced_conf) new_reduced_confs), [])
        (* Message is scheduled from message queue *)
        | Some (Message (mq, mq')) -> 
          L.log L.Normal (lazy (Printf.sprintf "MP scheduler chose msg"));
          let (_, msg, port) = mq in
          let cqs, pc' = process_message msg port cq pc in
          List.map (fun cq -> cq, mq', pc', pp, lead_conf) cqs, [])
    (*))*)
    
      

  let rec make_steps (mpconfs: mp_conf_t list) : mp_conf_t list = 
    (*Printf.printf "Make steps: counter: %d" counter;*)
    match mpconfs with
    | [] -> []
    | conf :: mpconfs -> 
      (match make_step conf with
      | [], confs -> 
         confs @ make_steps mpconfs
      | new_confs, _ -> 
         (*Printf.printf "\nGot %d more mp confs\n" (List.length new_confs);*)
         make_steps (new_confs @ mpconfs))

  let evaluate_prog (prog: UP.prog) : result_t list =
    let initial_econf = EventSemantics.create_initial_state prog in
    let first_cid = generate_new_conf_id [] in
    let initial_mpconf = [first_cid, initial_econf, false], [], Hashtbl.create CCommon.medium_tbl_size, Hashtbl.create CCommon.medium_tbl_size, None in
    let final_confs = make_steps [initial_mpconf] in
    (*Printf.printf "\nMP-Semantics: Finished execution with %d MP-configurations.\n" (List.length final_confs);*)
    List.map (fun (cq, mq, pc, pp, _) -> 
      let erets = List.map (fun (cid, econf, blocked) -> (cid, EventSemantics.econf_to_result econf)) cq in
      (erets, mq, pc, pp)) final_confs
  
  let valid_result (rets: result_t list) : bool =
    List.fold_left (
      fun valid_so_far (erets_with_cids, _, _, _) ->
        let (_, erets) = List.split erets_with_cids in 
        valid_so_far && EventSemantics.valid_result erets) true rets

  let from_mp_result_to_esem_result (rets : result_t list) : EventSemantics.result_t list =
    List.fold_left 
      (fun acc ret ->
        let (esemres, _, _, _) = ret in
        let (_, esemres) = List.split esemres in
        acc @ esemres
    ) [] rets


end