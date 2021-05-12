open CCommon
open SCommon
open Literal 

module L = Logging

module M 
  (Val           : Val.M) 
  (Error         : Error.M with type vt = Val.t and type event_t = string)
  (Interpreter   : Interpreter.M with type vt = Val.t and type err_t = Error.t) 
    : EventSemantics.M with type vt = Val.t and type await_conf_t = Interpreter.cconf_t and type conf_info_t = Interpreter.conf_info_t = struct

  type vt = Val.t 

  type event_t = vt

  type err_t = Error.t 

  type fid_t = Interpreter.fid_t

  type await_conf_t = Interpreter.cconf_t
  
  type conf_info_t = Interpreter.store_t * Interpreter.call_stack_t * int * int * int

  type message_label_t = (vt) MPInterceptor.t

  type event_label_t = (Interpreter.cconf_t, Interpreter.conf_info_t, vt, message_label_t) EventInterceptor.t

  type event_queue_t = (string * event_t * vt list) list (** xvar, event, args **)

  type event_handlers_t = (vt, (fid_t * vt list) list) SymbMap.t 

  type hq_element = | Handler  of string * fid_t * event_t * (vt list) (** xvar, funname, event, arguments **) 
                    | Conf     of Interpreter.econf_t
                    | CondConf of conf_info_t * vt * (vt list)

  type handler_queue_t = hq_element list 

  type state_t = Interpreter.econf_t * event_handlers_t * handler_queue_t

  type result_t = Interpreter.result_t * event_handlers_t * handler_queue_t

  exception Event_not_found of string;;

  let lines_executed : (string * int, unit) Hashtbl.t = Hashtbl.create 1

  let add_event_handler (state: state_t) (event : event_t) (fid : fid_t) (args : vt list) : state_t list =  
    let ((conf, prog), ehs, hq) = state in
    let rets = 
      List.map 
        (fun (ehs', f) -> 
          Option.map 
            (fun conf' -> ((conf', prog), ehs', hq))
            (Interpreter.assume conf [f]))
        (SymbMap.replace ehs event [(fid,args)] Val.to_literal Val.to_expr
          (fun handlers_old handlers_new -> 
            let fids, _ = List.split handlers_old in
            let handlers_new = List.filter (fun (fid, _) -> not (List.mem fid fids)) handlers_new in
            handlers_old @ handlers_new)) in 
        CCommon.get_list_somes rets 


  let remove_event_handler (state: state_t) (event : event_t) (fid : fid_t) : state_t list = 
    let ((conf, prog), ehs, hq) = state in
    let rets = 
      List.map 
        (fun (ehs', f) -> 
          Option.map 
            (fun conf' -> ((conf', prog), ehs', hq))
            (Interpreter.assume conf [f]))
        (SymbMap.replace ehs event [(fid, [])] Val.to_literal Val.to_expr
          (fun handlers handlers_rem -> 
              let fids, _ = List.split handlers_rem in
              List.filter (fun (fid, _) -> not (List.mem fid fids)) handlers)) in 
        CCommon.get_list_somes rets
    

  let final (state : state_t) : bool =
    let (conf, _, hq) = state in
    if (Interpreter.final conf) then (
      match hq with
      | [] -> true
      | _ -> false
    ) else ( false )

  let assume (state: state_t) (f: Formula.t) : state_t option =
    let (conf, prog), ehs, hq = state in
    Option.map (fun conf' -> (conf', prog), ehs, hq) (Interpreter.assume conf [f])

  let eval_expr (estate: state_t) (expr: Expr.t) : vt = 
    let ((cconf,_), _, _) = estate in
    Interpreter.eval_expr cconf expr

  (** Continuation **)
  let exec_handler (state : state_t) : state_t list =
    let (conf : Interpreter.econf_t), ehs, hq = state in
    Interpreter.check_handler_continue conf; 
    (** Exec Handler *)
      match hq with
      (** No more handlers to execute *)
      | [] -> [] 
      (** Execute next handler *)
      | (x :: hs) ->
        match x with
        | Handler (xvar, fid, _, args) -> 
            List.map (fun conf -> (conf, ehs, hs)) (Interpreter.continue_with_h conf xvar fid args) 
        
        | Conf conf' -> 
            let merged_conf = Interpreter.continue_with_conf conf conf' in
            [(merged_conf, ehs, hs)] 
        
        | CondConf (conf_info, pred, vs) -> 
            (* Printf.printf "I am checking if a condconf can continue its work\n"; *)
            let pred_b = 
              match Interpreter.run_proc conf pred vs with 
                | Some (v, _) ->
                    (match Val.to_literal v with 
                      | Some (Bool b) -> b
                      | _ -> raise (Failure "Await expects bool as result"))
                | None -> raise (Failure "pred condition failed!") in 
            if pred_b then (
              (* Printf.printf "It can continue!!!\n"; *)
              let merged_conf = Interpreter.continue_with_conf_info conf conf_info in 
              [(merged_conf, ehs, hs)]
            ) else (
               (* Printf.printf "It cannot continue!!\n"; *)
               let hq' = hs @ [ (CondConf (conf_info, pred, vs)) ] in 
               [ (conf, ehs, hq') ]
            )

  let handlers_str handlers = (String.concat " " (List.map (fun (fid, _) -> Printf.sprintf "\n\t\t\t Fid: %s" (Val.str fid)) handlers))
  
  let hq_elem_string (x: hq_element) : string = 
    let args_string args = (String.concat ", Args--: \n" (List.map (fun (arg) -> Printf.sprintf "Arg: %s" (Val.str arg)) args)) in
    match x with
    | Conf (c, _) -> Interpreter.string_of_cconf c
    | CondConf _ -> ""
    | Handler (_, fid, event, args) -> Printf.sprintf "\t Fid: %s, Event: %s, Args: %s \n" (Val.str fid) (Val.str event) (args_string args)
  
  let hq_string (hq: handler_queue_t) : string = (String.concat "\n" (List.map hq_elem_string hq))

  let state_str (state : state_t) : string =
    let (_, ehs, hq) = state in
    (*"\n--JSIL Conf--" ^ Interpreter.print_cconf econf ^*)
    "\n--Event Handlers--" ^ (SymbMap.str ehs Val.str handlers_str) ^ "\n--Handlers Queue--\n" ^ hq_string hq ^ "\n"
  
  let string_of_result (rets: result_t list) : string =
    String.concat "Event Semantics Result: \n" (List.map 
      (fun ret -> 
        let (lret, ehs, hq) = ret in
          Interpreter.string_of_result [lret] ^ 
          "\n--Event Handlers--" ^ (SymbMap.str ehs Val.str handlers_str) ^
          "\n--Handlers Queue--\n" ^ hq_string hq ^ "\n"
      ) rets) 
    
  let print_state (state : state_t) : unit = 
    L.log L.Normal (lazy (Printf.sprintf
        "\n-------------------EVENT CONFIGURATION------------------------\n%s------------------------------------------------------\n" (state_str state)))

  let dispatch 
      (ev_name             : event_t) 
      (state               : state_t) 
      (potential_listeners : ((fid_t * Val.t list) list * Formula.t) list) 
      (xvar                : Var.t)
      (argsv               : Val.t list)
      (sync                : bool) : state_t list =
    L.log L.Normal (lazy (Printf.sprintf "Dispatching event %s" (Val.str ev_name)));
    let (conf, ehs, hq) = state in
    let (cconf, prog) = conf in
    (* Configurations in which a listener applies *)
    let listener_confs = List.map (fun (hdlrs, f) -> 
      Interpreter.assume (Interpreter.copy_conf cconf) [ f ], hdlrs
    ) potential_listeners in 
    (* Configuration where no listener applies *)
    let no_listener_formulae = List.map (fun (_, f) -> Formula.Not f) potential_listeners in 
    let no_listener_conf = (Interpreter.assume cconf no_listener_formulae, []) in 
    (* All applicable configurations *)
    let confs = List.filter (fun (x, _) -> x <> None) (listener_confs @ [ no_listener_conf ]) in 
    let confs = List.map (fun (x, hdlrs) -> Option.get x, hdlrs) confs in 
    (* Dispatch *)
    List.fold_left
      (fun confs_so_far (new_conf, hdlrs) ->
        (match hdlrs with
          (* No handlers *)
          | [] -> confs_so_far @ [ (new_conf, prog), ehs, hq ]
          (* At least one handler *)
          | (fid_0, args0) :: next_handlers -> 
            L.log L.Normal (lazy (Printf.sprintf "Found handler %s" (Val.str fid_0)));
            if (sync) then (
              let new_hq = (List.map (fun (fid, args') -> Handler (xvar, fid, ev_name, argsv @ args')) next_handlers) @ [Conf (new_conf, prog)] @ hq in
              let new_confs = Interpreter.continue_with_h (new_conf, prog) xvar fid_0 (argsv @ args0) in 
                  confs_so_far @ (List.map (fun new_conf -> new_conf, ehs, new_hq) new_confs)
            ) else (
              let new_hq = hq @ (List.map (fun (fid, args') -> Handler (xvar, fid, ev_name, argsv @ args')) hdlrs) in
                confs_so_far @ [((new_conf, prog), ehs, new_hq) ]
            )
          )
      ) [] confs
    
  let process_event_label (conf': Interpreter.econf_t)(label : event_label_t) (state: state_t) : state_t list =
    let (conf, ehs, hq) = state in 
    let (cconf, prog) = conf in

    match label with
    | SyncDispatch (xvar, event, args) -> 
        (** Synchronous event dispatch*)           
        let listeners = SymbMap.find ehs event Val.to_literal Val.to_expr in 
        dispatch event (conf', ehs, hq) listeners xvar args true 

    | AsyncDispatch (xvar, event, args) ->
        (** Asynchronous event dispatch*)
        let listeners = SymbMap.find ehs event Val.to_literal Val.to_expr in 
        dispatch event (conf', ehs, hq) listeners xvar args false

    | AddHandler (event, handler, args) -> 
        (** Add Event Handler *)
        let states = add_event_handler state event handler args in 
        List.map 
          (fun (conf, ehs, hq) -> 
            conf', ehs, hq
          ) states

    | RemoveHandler (event, handler) ->
        (** Remove Event Handler *)
        let states = remove_event_handler state event handler in
        List.map 
          (fun (conf, ehs, hq) -> 
            conf', ehs, hq
          ) states
    
    | Await (conf, conf_info, (pred, args)) ->  
        (* Await *)
        let hq' = hq @ [ (CondConf (conf_info, pred, args)) ] in
          [ (conf, prog), ehs, hq' ]
      
    | Schedule (xvar, fid, args) -> 
        let (conf, ehs, hq) = state in
        let (cconf, prog) = conf' in
        (* Dispatch *)
        List.fold_left
          (fun confs_so_far (new_conf, hdlrs) ->
            (match hdlrs with
              (* No handlers *)
              | [] -> confs_so_far @ [ (new_conf, prog), ehs, hq ]
              (* At least one handler *)
              | _ -> 
                let new_hq = hq @ (List.map (fun fid -> Handler (xvar, fid, Val.from_literal (String "__schedule__"), args)) hdlrs) in
                    confs_so_far @ [((new_conf, prog), ehs, new_hq)]
              )
          ) [] [ cconf, [ fid ] ]

      | _ -> [state]

  let process_label (conflab : (Interpreter.econf_t * event_label_t option)) (state: state_t) : (state_t * event_label_t option) list =
    let (conf', lab) = conflab in
    let (conf, ehs, hq) = state in 
    let (cconf', _) = conf' in 
    
    let lab' = 
      match lab with 
        | Some lab -> Some lab
        | None ->  Interpreter.synthetic_lab cconf' in 
    match lab' with 
        | None -> [ (conf', ehs, hq), None ]
        | Some MLabel other_label -> [ (conf', ehs, hq), Some (MLabel other_label) ]
        | Some label -> List.map (fun r -> r, None) (process_event_label conf' label state)
         

  let print_jsil_line_numbers (prog : UP.prog) : unit =
    let file_numbers_name = prog.prog.filename ^ "_raw_coverage.txt" in
      let out = open_out_gen [Open_wronly; Open_append; Open_creat; Open_text] 0o666 file_numbers_name in
        Hashtbl.iter (fun (proc_name, i) _ -> output_string out ("\""^proc_name^"\"" ^ " " ^ (string_of_int i) ^ "\n")) lines_executed;
        close_out out

  let make_step (state : state_t) (ext_intercept : ((vt -> (vt list) option) -> (vt -> Literal.t option) -> (Literal.t -> vt) -> string -> string -> vt list -> message_label_t option) option) : (state_t * event_label_t option) list * state_t option = 
    let (conf : Interpreter.econf_t), ehs, hq = state in
    (*if (Interpreter.printing_allowed cconf) then 
      print_state state;*)
    if (Interpreter.final conf) then (
      (*Printf.printf "\nConfiguration is final!";*)
      let new_states = List.map (fun s -> s, None) (exec_handler state) in
      match new_states with
      | [] -> [], Some state
      | new_states -> new_states, None
    ) else (
      (** Conf is NOT final *)
      let rets = Interpreter.make_step lines_executed conf (Some (EventInterceptor.intercept ext_intercept)) in 
      List.concat (List.map (fun ret -> process_label ret state) rets), None
    )

  let rec make_steps (states: state_t list) : state_t list = 
    match states with
    | [] -> []
    | state :: sts ->
      (** We ignore the labels here, as the top-level semantics interacts via make_step *)
      let (states, fconf) = make_step state None in
      let (states, _) = List.split states in 
      (match states, fconf with 
      | [], Some fconf -> [fconf]
      | st :: rest, _ when final st -> st :: (make_steps sts)
      | _ -> make_steps (states @ sts)
      )

  let create_initial_state (prog: UP.prog) : state_t = 
    let initial_conf = (Interpreter.create_initial_conf prog None, prog) in
    initial_conf, SymbMap.init (), []

  let econf_to_result (state: state_t) : result_t =
    let (econf, eh, hq) = state in let (conf, _) = econf in (Interpreter.conf_to_result conf, eh, hq)

  let evaluate_prog (prog: UP.prog) : result_t list =
    let initial_state = create_initial_state prog in
    let states = make_steps [initial_state] in
    if (!jsil_line_numbers) then print_jsil_line_numbers prog;
    List.map econf_to_result states

  let new_conf (url: string) (setup_fid: string) (args: vt list) (state: state_t) : state_t = 
    let (econf, _, _) = state in
    let econf' = Interpreter.new_conf url setup_fid args econf in
    econf', SymbMap.init (), []
  
  let set_var (xvar: Var.t) (v: vt) (state: state_t) : state_t = 
    let ((c, prog), h, q) = state in
    ((Interpreter.set_var xvar v c, prog), h, q)

  (* Environment event dispatch. Adds handlers at the back of the continuation queue *) 
  let fire_event (event: event_t) (args: vt list) (state: state_t) : state_t list =
    let (c, ehs, hq) = state in 
    let listeners = SymbMap.find ehs event Val.to_literal Val.to_expr in 
    (* How to obtain xvar? The ideal thing to do would be allow calls without ret vars... *) 
    dispatch event state listeners "" args false

  let fresh_lvar (x: string) (v: string) (state: state_t) (vart: Type.t) : state_t * vt =
    let ((conf, prog), ehs, hq) = state in
    let conf', v = Interpreter.fresh_lvar x v conf vart in
    ((conf', prog), ehs, hq), v

  let valid_result (rets: result_t list) : bool =
    let lrets = List.map (fun (lret, _, _) -> lret) rets in
    Interpreter.valid_result lrets

  let add_spec_var (x:string list) (state: state_t) : state_t =
    let ((conf, prog), ehs, hq) = state in
    ((Interpreter.add_spec_var x conf), prog), ehs, hq
  
  let assume_type (x: string) (t: Type.t) (state: state_t) : state_t =
    let ((conf, prog), ehs, hq) = state in
    ((Interpreter.assume_type x t conf), prog), ehs, hq

end 