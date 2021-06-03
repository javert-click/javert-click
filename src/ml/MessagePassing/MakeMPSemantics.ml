open CCommon
open SCommon
open Literal 

module L = Logging

module M 
  (Val              : Val.M) 
  (Error            : Error.M with type vt = Val.t)
  (EventSemantics   : EventSemantics.M with type vt = Val.t)
  (Scheduler        : Scheduler.M) = struct 

  (* Values come from UL. Can be either concrete or symbolic *)
  type vt = Val.t

  (* Message Ports *)
  type port_t = Literal.t

  (* Configuration Identifiers *)
  type cid_t = int

  (* Event Configurations are opaque to the MPSemantics *)
  type event_conf_t = cid_t * EventSemantics.state_t

  (* Messages can be just values or tuples including a list of transferred ports *)
  type message_t = (vt list) * (port_t list)

  (* List of active Event configurations *)
  type cq_t = event_conf_t list

  (* Port Confs Map *)
  type pc_map_t = (port_t, cid_t) Hashtbl.t

  (* Paired Ports Map *)
  type pp_map_t = (port_t, port_t) Hashtbl.t

  (* Message Queue *)
  type mq_t = (message_t * port_t) list
 
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
                           | HoldConf of cid_t
                           | FreeConf of cid_t
                           | AddSpecVar of string list

  (* Most of the operations will manipulate a single configuration. There is then a function to update the mp_conf based on the new reduced conf and the optional action *)
  type reduced_mp_conf_t = event_conf_t * mq_t * pc_map_t * pp_map_t * optional_action_t option * Formula.t option
  
  (* Message Passing Result *)
  (* 1. Respective results of event configurations, each with the assciated cid *)
  (* 2. Final message queue *)
  (* 3. Final port configurations map *)
  (* 4. Final paired ports map *)
  type result_t = (cid_t * EventSemantics.result_t) list * mq_t * pc_map_t * pp_map_t
  
  (***** AUXILIARY FUNCTIONS *****)

  (* Enqueues message in message queue by adding message to the back of the queue *)
  let enqueue (msg: vt list) (plist: port_t list) (port: port_t) (mq: mq_t) : mq_t = 
    mq @ [(msg, plist), port]

  (* Redirects ports in the port list to the configuration with identifier cid *)
  let redirect (plist: port_t list) (cid: cid_t) (pc: pc_map_t) : pc_map_t = 
    List.iter (fun port -> Hashtbl.replace pc port cid) plist;
    pc

  (* Returns Some conf if conf is in the list cs and None otherwise *)
  let get_conf (cid: cid_t) (cq: cq_t) : event_conf_t option = 
    List.find_opt (fun (cid', _) -> cid = cid') cq

  (* Sets event configuration of id equal to cid in cs, if it exists *)
  let set_conf (conf: event_conf_t) (cq: cq_t) : cq_t = 
    let (cid', econf') = conf in
    List.map (fun (cid, econf) -> if cid = cid' then cid, econf' else cid, econf) cq

  (* Returns true if all configurations in the list cs are final, false otherwise *)
  let final (cq: cq_t) : bool = 
    List.fold_left (fun final_so_far (cid, e_conf) -> final_so_far && EventSemantics.final e_conf) true cq

  (* Generates port id randomly making sure that port does not exist yet *)
  let rec generate_new_conf_id (cids: cid_t list) : cid_t =
    Random.self_init ();
    let cid = Random.int 1000 in
    if (List.mem cid cids) then (generate_new_conf_id cids) else cid

  (* Generates port id randomly making sure that port does not exist yet *)
  let rec generate_new_port_id (pc: pc_map_t) : port_t =
    Random.self_init ();
    let port_id = Num (float_of_int (Random.int 1000)) in
    if (Hashtbl.mem pc port_id) then (generate_new_port_id pc) else port_id

  (* Adds a constraint f to the path condition of each configuration in cq *)
  let assume (cq: cq_t) (f: Formula.t) : cq_t =
    let cq' = List.fold_left (fun acc (cid, conf) -> 
      (*L.log L.Normal (lazy (Printf.sprintf "\nASSUME: conf: %s" (EventSemantics.state_str conf)));*)
      match EventSemantics.assume conf f with
      | Some conf' -> acc @ [(cid, conf')] 
      | None -> acc ) [] cq in
    cq'

  (* Updates the configuration queue based on the result of running a single configuration *)
  let update_full_conf_from_reduced_conf (cq_pre: cq_t) (cq_pos: cq_t) (mq: mq_t) (pc: pc_map_t) (pp:pp_map_t) (lead_conf: cid_t option) (new_reduced_conf: reduced_mp_conf_t) : mp_conf_t =
    let (econf, mq', pc', pp', o_action, f) = new_reduced_conf in
    let cq' = cq_pre @ [econf] @ cq_pos in
    let cq'', lead_conf' =
    (match o_action with  
    | Some AddConf new_conf -> cq' @ [new_conf], lead_conf
    | Some RemConf cid -> List.filter (fun (cid', c') -> cid <> cid') cq', lead_conf
    | Some HoldConf cid -> cq', Some cid
    | Some FreeConf cid -> 
      (match lead_conf with
      | Some cid' when cid' = cid -> cq', None
      | _ -> cq', lead_conf)
    | Some AddSpecVar x -> 
      (List.map (fun (cid, conf) -> 
        (*Printf.printf "\nAdding specvar %s to conf %d\n" (String.concat "," (List.map (fun v -> v) x)) cid;*)
        cid, EventSemantics.add_spec_var x conf) cq'), lead_conf
    | None -> cq', lead_conf) in
    let new_cq = 
    match f with
    | None -> cq''
    | Some f -> 
      assume cq'' f in 
    (*L.log L.Normal (lazy (Printf.sprintf "\n*******************\n"));*)
    (*List.iter (fun (cid, econf) -> L.log L.Normal (lazy (Printf.sprintf "\nCID: %d, CONF: \n%s\n" cid (EventSemantics.state_str econf)))) new_cq;*)
    (*L.log L.Normal (lazy (Printf.sprintf "\n*******************\n"));*)
    new_cq, mq', pc', pp', lead_conf'


  let compute_int_from_val (v: vt) : int =
    let lit = Val.to_literal v in
    match lit with
    | Some Num n -> int_of_float n
    | _ -> raise (Failure ("Val could not be converted to int."))

  let compute_num_from_val (v:vt) : Literal.t =
    let lit = Val.to_literal v in
    match lit with
    | Some Num n -> Num n
    | _ -> raise (Failure ("Val could not be converted to literal."))

  let rec break_cq_on_cid (cq: cq_t) (cid: cid_t) (cq_pre: cq_t) : cq_t * event_conf_t option * cq_t =
    match cq with
    | [] -> cq_pre, None, []
    | (c:: cq_post) -> 
      let (cid', _) = c in
      if cid = cid' then cq_pre, Some c, cq_post
      else break_cq_on_cid cq_post cid (cq_pre @ [c])

  (***** MAIN FUNCTIONS *****)


  (* Updates mp conf based on new message msg sent to the specified port *)
  let send (cid: cid_t) (msg: vt list) (plist: port_t list) (port_1: port_t) (port_2: port_t) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : mq_t =
    (*Printf.printf "\nFound msg: %s\n" (String.concat "," (List.map Val.str msg));*)
    (*Printf.printf "\nDest port: %s\n" (Literal.str port_2);*)
    (*let port_2 = Hashtbl.find pp port_1 in*)
    (* We need to guarantee that the sender belongs to the current configuration *)
    let port_belongs_to_curr_conf = Hashtbl.fold (fun port' cid' acc -> if (cid = cid' && port_1 = port') then true else acc) pc false in 
    if (port_belongs_to_curr_conf) then enqueue msg plist port_2 mq else mq

  (* Creates new configuration and also sets return variable to new configuration identifier *)
  let new_execution (xvar: string) (url: string) (setup_fid: string) (args: vt list) (cids: cid_t list) (conf: event_conf_t) : event_conf_t * event_conf_t =
    let cid, econf = conf in
    let new_cid = generate_new_conf_id cids in
    let conf' = EventSemantics.set_var xvar (Val.from_literal (Num (float_of_int new_cid))) econf in
    let new_conf = EventSemantics.new_conf url setup_fid args econf in
    (cid, conf'), (new_cid, new_conf)

  (* Unpairs a port. Unpair means removing both p and port paired with p in pp map. We assume that the map is bi-directional *)
  let unpair_port (port: port_t) (pp: pp_map_t) : pp_map_t =
    (* 1st step: finding the port(s) paired with the given port *) 
    match Hashtbl.find_opt pp port with
    | Some paired -> 
      Hashtbl.remove pp port;
      Hashtbl.remove pp paired;
      pp
    | None -> pp

  (* Removes all info related to configuration with identifier cid, including the ports belonging to it *)
  let terminate (plist: port_t list) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : mq_t * pc_map_t * pp_map_t =
    (* 1. Removing ports from pc map *)
    List.iter (fun port -> Hashtbl.remove pc port) plist;
    (* 2. Removing ports from pp map*)
    let pp' = List.fold_left (fun pp' port -> unpair_port port pp') pp plist in
    (* 3. Removing messages sent to ports in the given port list *)
    let mq' = List.filter (fun (_,p) -> not (List.mem p plist)) mq in
    mq', pc, pp'

  (* Creates new port, adds to current configuration and sets return variable to new port id *)
  let new_port (xvar: string) (conf: event_conf_t) (pc: pc_map_t) : event_conf_t * pc_map_t * optional_action_t option = 
    let port_id = generate_new_port_id pc in
    let (cid, conf) = conf in
    let (conf', port), label, f_lvar_num = 
      (EventSemantics.set_var xvar (Val.from_literal port_id) conf, port_id), None, Formula.True in
    Hashtbl.add pc port cid;
    (cid, conf'), pc, label

  (* Adds both entries to pp map. Note that we assume pre-existing values of p1 and p2 to have been removed. The map is bi-directional *)
  let pair_ports (p1: port_t) (p2: port_t) (plist: port_t list) (pp: pp_map_t) : pp_map_t =
    (* Pair p1 and p2 by adding both (p1, p2) and (p2, p1) to the map *)
    (* 1: Adding (p1, p2) to pp *)
    (* I have to assume that both ports belong to the port configuration map *)
    if (List.mem p1 plist && List.mem p2 plist) then (
      Hashtbl.add pp p1 p2;
      Hashtbl.add pp p2 p1;
      pp
    ) else pp
        

  (* Returns the port paired with the given port *)
  let get_paired (xvar: string) (port: port_t) (conf: event_conf_t) (pp: pp_map_t) : event_conf_t =
    let (cid, conf) = conf in 
    (*Printf.printf "\nGetPaired: searching for paired port of %s" (Val.str port);*)
    match Hashtbl.find_opt pp port with
    | None ->
      (* return null if no paired port is found *)
      cid, EventSemantics.set_var xvar (Val.from_literal Null) conf
    | Some port' -> 
      cid, EventSemantics.set_var xvar (Val.from_literal port') conf


  (* Processes the message obtained from scheduler by calling ES (fire rule) *)
  let process_message (msg: message_t) (port: port_t) (cq: cq_t) (pc: pc_map_t) : cq_t list * pc_map_t =
    Printf.printf "\nProcessing message sent to port %s\n" (Literal.str port);
    let (vs, plist) = msg in
    (*Printf.printf "\nMessage parameters: %s" (String.concat ", " (List.map Val.str vs));*)
    let cid = Hashtbl.find pc port in
    (*Printf.printf "\nFound %d confs for port %s" (List.length cids_fs) (Val.str port);*)
    let pc' = redirect plist cid pc in
    (match get_conf cid cq with
    | None -> raise (Failure ("Invalid Configuration Identifier."))
    | Some (cid, econf) -> 
      let event = Val.from_literal (String MPConstants.mevent) in
      let econfs' = EventSemantics.fire_event event (vs @ [Val.from_list (List.map (fun p -> (Val.from_literal p)) plist)]) econf in
      let cq_list = List.map (fun econf' -> set_conf (cid, econf') cq) econfs' in
            cq_list, pc') 

  let rec process_mp_label (label: mp_label_t) (cids: cid_t list) (cid: cid_t) (conf: EventSemantics.state_t) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : reduced_mp_conf_t list = 
      match label with
      | Send (msg, plist, port_orig, port_dest) -> 
        L.log L.Normal (lazy (Printf.sprintf "Found send. Port orig:%s, Port dest:%s" (Val.str port_orig) (Val.str port_dest)));
        (*Printf.printf "\nProcessing send label";*)
        let plist = List.map (fun p -> compute_num_from_val p) plist in
        let mq' = send cid msg plist (compute_num_from_val port_orig) (compute_num_from_val port_dest) mq pc pp in
        [(cid, conf), mq', pc, pp, None, None]
      | Create (xvar, url, setup_fid, args) -> 
        (*Printf.printf "\nMP-Semantics: Processing create label, setup_fid: %s" (setup_fid);*)
        let conf'', new_conf = new_execution xvar url setup_fid args  cids (cid, conf) in
        [conf'', mq, pc, pp, Some (AddConf new_conf), None] 
      | Terminate (xvar, cid') -> 
        Printf.printf "\nFound terminate for cid %s\n" (Val.str cid');
        let cid' = compute_int_from_val cid' in
        Printf.printf "\nComputed cid: %d\n" cid'; 
        let plist = Hashtbl.fold (fun port' cid' acc -> if (cid = cid') then acc @ [port'] else acc) pc [] in
        let mq', pc', pp' = terminate plist mq pc pp in
        [(cid, conf), mq', pc', pp', Some (RemConf (cid')), None]
      | NewPort (xvar) -> 
        let conf'', pc', label = new_port xvar (cid, conf) pc in
        [conf'', mq, pc', pp, label, None]
      | PairPorts (p1, p2) -> 
        let p1 = compute_num_from_val p1 in
        let p2 = compute_num_from_val p2 in
        let pp' = pair_ports p1 p2 (Hashtbl.fold (fun p' _ acc -> acc @ [p']) pc []) pp in
        [(cid, conf), mq, pc, pp', None, None]
      | UnpairPort (port) -> 
        let port = compute_num_from_val port in
        let pp' = unpair_port port pp in
        [(cid, conf), mq, pc, pp', None, None]
      | GetPaired (xvar, port) -> 
        let port = compute_num_from_val port in
        let conf'' = get_paired xvar port (cid, conf) pp in 
        [conf'', mq, pc, pp, None, None]
      | BeginAtomic -> L.log L.Normal (lazy "\nFound beginAtomic\n");
        [(cid, conf), mq, pc, pp, Some (HoldConf cid), None] 
      | EndAtomic -> L.log L.Normal (lazy "\nFound endAtomic\n");
        [(cid, conf), mq, pc, pp, Some (FreeConf cid), None]
      | Assume (f) -> [(cid, conf), mq, pc, pp, None, Some f]
      | AssumeType (x, t) -> 
        let f = Formula.Eq (UnOp (TypeOf, (LVar x)), Lit (Type t)) in
        [(cid, conf), mq, pc, pp, None, Some f]
      | SpecVar x -> [(cid, conf), mq, pc, pp, Some (AddSpecVar x), None]
      | GroupLabel (ls) ->
        (match ls with
        | [] -> [(cid, conf), mq, pc, pp, None, None]
        | labels -> List.concat (List.map (fun l -> process_mp_label l cids cid conf mq pc pp) labels))

  (* Runs a step of the current e-configuration *)
  let run_conf (cids: cid_t list) (econf: event_conf_t) (mq: mq_t) (pc: pc_map_t) (pp: pp_map_t) : reduced_mp_conf_t list * reduced_mp_conf_t option = 
    let (cid, conf) = econf in
    L.log L.Normal (lazy (Printf.sprintf "\nCurrent conf: %d\n" cid));
    match EventSemantics.make_step conf (Some (MPInterceptor.intercept)) with
    | [], Some fconf -> [], Some ((cid, fconf), mq, pc, pp, None, None) 
    | confs, _ ->
      let res = List.concat (List.map (fun (conf', (label : event_label_t option)) ->
        match label with
        | Some MLabel label -> process_mp_label label cids cid conf' mq pc pp 
        | _ -> [(cid, conf'), mq, pc, pp, None, None]
      ) confs) in
      res, None

  let mq_str mq = "Messages: " ^ String.concat ", " (List.map (
    fun (msg, port) ->
      let (data, transfer) = msg in
      Printf.sprintf "Data: %s" (String.concat ", " (List.map Val.str data))
  ) mq)

  let map_str map (v_to_string : 'b -> string) = ("" ^ (Hashtbl.fold (fun k v acc -> acc ^ Printf.sprintf "\n\t Key: %s, \n\t Val: %s " (Literal.str k) (v_to_string v)) map " "))
      
  let pc_str pc = 
    Printf.sprintf "\nPort-Confs map: %s" (map_str pc string_of_int)
  
  let pp_str pp =
    Printf.sprintf "\nPort-Port map: %s\n" (map_str pp Literal.str)

  let print_mpconf (mpconf: mp_conf_t) : unit =
    let (econfs, mq, pc, pp, lead_conf) = mpconf in
    let e_confs_str = 
      String.concat "\n" (List.map (
        fun econf -> 
          let (cid, conf) = econf in
          Printf.sprintf "\n-----Event Conf-----: \n--CID: %d\n--E-Conf: \n\t\t%s" cid (EventSemantics.state_str conf)
      ) econfs) in
    let str = e_confs_str ^ mq_str mq ^ pc_str pc ^ pp_str pp in
    L.log L.Normal (lazy (Printf.sprintf
      "\n-------------------MP CONFIGURATION------------------------\n%s\n------------------------------------------------------\n" str))
  
  let string_of_result (rets: result_t list) : string =
    "\n------Event Configuration Queue------\n" ^
    String.concat "\n" (List.map 
      (fun ret -> 
        let (erets, mq, pc, pp) = ret in
          let erets_str = String.concat "\n" 
            (List.map (
              fun (cid, eret) -> "\n----Event Configuration (Cid: " ^ string_of_int cid ^ ")----" ^ EventSemantics.string_of_result [eret]
            ) erets) in
            erets_str ^ mq_str mq ^ pc_str pc ^ pp_str pp
      ) rets) 
  
  let make_step (conf : mp_conf_t) : (mp_conf_t list) * (mp_conf_t option) = 
    print_mpconf conf;
    let cq, mq, pc, pp, lead_conf = conf in
    match lead_conf with
    | Some cid -> 
      L.log L.Normal (lazy (Printf.sprintf "\nRunning lead conf %d\n" cid));
      (match break_cq_on_cid cq cid [] with
      | cq_pre, Some c, cq_post -> 
        let update = update_full_conf_from_reduced_conf cq_pre cq_post mq pc pp lead_conf in
        let cids, _ = List.split cq in
        (match run_conf cids c mq pc pp with
        | [], Some fconf -> [], Some (update fconf)
        | new_reduced_confs, _ ->
          List.map (fun new_reduced_conf -> update new_reduced_conf) new_reduced_confs, None)
      | _, None, _ -> [], None) (*raise (Failure "Configuration not found")*) 
    | None ->
      (* Scheduler decides if a configuration or a message is scheduled *)
      (match Scheduler.schedule cq mq final with
      (* There is nothing left to do *)
      | None -> [], Some conf
      (* Configuration is scheduled *)
      | Some (Conf (cq_pre, c, cq_post)) -> 
        let update = update_full_conf_from_reduced_conf cq_pre cq_post mq pc pp lead_conf in
        let cids, _ = List.split cq in
        (match run_conf cids c mq pc pp with
        | [], Some fconf -> [], Some (update fconf)
        | new_reduced_confs, _ -> List.map (fun new_reduced_conf -> update new_reduced_conf) new_reduced_confs, None)
      (* Message is scheduled from message queue *)
      | Some (Message (mq, mq')) -> 
        let (msg, port) = mq in
        let cqs, pc' = process_message msg port cq pc in
        List.map (fun cq -> cq, mq', pc', pp, lead_conf) cqs, None)
      

  let rec make_steps (mpconfs: mp_conf_t list) : mp_conf_t list = 
    (*Printf.printf "Make steps: counter: %d" counter;*)
    match mpconfs with
    | [] -> []
    | conf :: mpconfs -> 
      (match make_step conf with
      | [], Some conf -> 
         conf :: make_steps mpconfs
      | new_confs, _ -> 
         (*Printf.printf "\nGot %d more mp confs\n" (List.length new_confs);*)
         make_steps (new_confs @ mpconfs))

  let evaluate_prog (prog: UP.prog) : result_t list =
    let initial_econf = EventSemantics.create_initial_state prog in
    let first_cid = generate_new_conf_id [] in
    let initial_mpconf = [first_cid, initial_econf], [], Hashtbl.create CCommon.medium_tbl_size, Hashtbl.create CCommon.medium_tbl_size, None in
    let final_confs = make_steps [initial_mpconf] in
    Printf.printf "\nMP-Semantics: Finished execution with %d MP-configurations.\n" (List.length final_confs);
    List.map (fun (cq, mq, pc, pp, _) -> 
      let erets = List.map (fun (cid, econf) -> cid, EventSemantics.econf_to_result econf) cq in
      (erets, mq, pc, pp)) final_confs
  
  let valid_result (rets: result_t list) : bool =
    List.fold_left (
      fun valid_so_far (erets_with_cids, _, _, _) ->
        let (_, erets) = List.split erets_with_cids in 
        valid_so_far && EventSemantics.valid_result erets) true rets

end