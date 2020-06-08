open CCommon
open SCommon
open Literal 

module L = Logging

module M 
  (Val           : Val.M) 
  (Error         : Error.M with type vt = Val.t and type event_t = string)
  (Interpreter   : Interpreter.M with type vt = Val.t and type err_t = Error.t) = struct 

  type vt = Val.t 

  type event_t = vt

  type err_t = Error.t 

  type fid_t = Interpreter.fid_t 
  
  type conf_info_t = Interpreter.store_t * Interpreter.call_stack_t * int * int * int

  type transition_label_t = (Interpreter.cconf_t, Interpreter.store_t, Interpreter.call_stack_t, vt) TransitionLabel.t

  type event_queue_t = (string * event_t * vt list) list (** xvar, event, args **)

  type event_handlers_t = (fid_t, vt) EventHandlers.t 

  type hq_element = | Handler  of string * fid_t * event_t * (vt list) (** xvar, funname, event, arguments **) 
                    | Conf     of Interpreter.econf_t
                    | CondConf of conf_info_t * vt * (vt list)

  type handler_queue_t = hq_element list 

  type state_t = Interpreter.econf_t * event_handlers_t * handler_queue_t

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
        (EventHandlers.add_event_handler ehs event fid args Val.to_literal Val.to_expr) in 
        CCommon.get_list_somes rets 


  let remove_event_handler (state: state_t) (event : event_t) (fid : fid_t) : state_t list = 
    let ((conf, prog), ehs, hq) = state in
    let rets = 
      List.map 
        (fun (ehs', f) -> 
          Option.map 
            (fun conf' -> ((conf', prog), ehs', hq))
            (Interpreter.assume conf [f]))
        (EventHandlers.remove_event_handler ehs event fid Val.to_literal Val.to_expr) in 
        CCommon.get_list_somes rets 
    

  let is_final (state : state_t) : bool =
    let (conf, _, hq) = state in
    if (Interpreter.is_final conf) then (
      match hq with
      | [] -> true
      | _ -> false
    ) else ( false )

  let interceptor (state : Interpreter.state_t) (cmd: Cmd.t) : transition_label_t option =
    match cmd with
    | Call (xvar, pid, args, j, _) -> 
          let fid = Interpreter.make_eval_expr state pid in
          let fid_str = Interpreter.get_pid_from_val fid state in
          (match args with
            | [] -> None
            | (xscope :: xthis :: fst_arg :: rem_args) ->
              (match fid_str with
                | event_command when event_command = EventsConstants.sync_dispatch ->  
                    let event = fst_arg in
                    Some (SyncDispatch (xvar, xscope, xthis, event, rem_args, j))

                | event_command when event_command = EventsConstants.async_dispatch ->
                    let prob = float_of_string (Val.str (Interpreter.make_eval_expr state fst_arg)) in
                    let event = List.hd rem_args in
                    Some (AsyncDispatch (xvar, xscope, xthis, prob, event, List.tl rem_args, j))
                
                | event_command when event_command = EventsConstants.add_handler ->
                    (match rem_args with
                    [] -> None
                    | (handler :: rest_args) ->
                      let event = fst_arg in
                      Some (AddHandler(xvar, event, handler, rest_args)))
                
                | event_command when event_command = EventsConstants.remove_handler -> 
                    (match rem_args with
                    | (handler :: _) ->
                      let event = fst_arg in
                      Some (RemoveHandler(xvar, event, handler))
                    | _ ->  None)

                | event_command when event_command = EventsConstants.schedule ->
                    Some (Schedule (xvar, List.hd args, List.tl args, j))

                | _ -> None)

              | _ -> None)    
          
    | _ -> None

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
          
    let state_str (state : state_t) : string =
      let (econf, ehs, hq) = state in
      let args_string args = (String.concat ", Args--: \n" (List.map (fun (arg) -> Printf.sprintf "Arg: %s" (Val.str arg)) args)) in
      let hq_elem_string x = 
        match x with
        | Conf (c, _) -> Interpreter.string_of_cconf c
        | CondConf _ -> ""
        | Handler (_, fid, event, args) -> Printf.sprintf "\t Fid: %s, Event: %s, Args: %s \n" (Val.str fid) (Val.str event) (args_string args) in
      let hq_string = (String.concat "\n" (List.map hq_elem_string hq)) in
        "\n--Event Handlers--" ^ (EventHandlers.str ehs Val.str Val.str) ^ "\n--Handlers Queue--\n" ^ hq_string ^ "\n"
  
  let string_of_result (states: state_t list) : string =
    String.concat "Final Result: \n" (List.map (fun state -> state_str state) states) 
    
  let print_state (state : state_t) = 
    L.log L.Normal (lazy (Printf.sprintf
        "\n-------------------EVENT STATE------------------------\n%s------------------------------------------------------\n" (state_str state)))

  let dispatch 
      (ev_name             : event_t) 
      (state               : state_t) 
      (potential_listeners : ((fid_t * Val.t list) list * Formula.t) list) 
      (xvar                : Var.t)
      (argsv               : Val.t list)
      (sync                : bool) : state_t list =
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
          | [] -> confs_so_far @ [ Interpreter.get_next (new_conf, prog) (Some xvar), ehs, hq ]
          (* At least one handler *)
          | (fid_0, args0) :: next_handlers -> 
            if (sync) then (
              let new_hq = (List.map (fun (fid, args') -> Handler (xvar, fid, ev_name, argsv @ args')) next_handlers) @ [Conf (Interpreter.get_next (new_conf, prog) (Some xvar))] @ hq in
              let new_confs = Interpreter.continue_with_h (new_conf, prog) xvar fid_0 (argsv @ args0) in 
                  confs_so_far @ (List.map (fun new_conf -> new_conf, ehs, new_hq) new_confs)
            ) else (
              let new_hq = hq @ (List.map (fun (fid, args') -> Handler (xvar, fid, ev_name, argsv @ args')) hdlrs) in
                confs_so_far @ [(Interpreter.get_next (new_conf, prog) (Some xvar), ehs, new_hq) ]
            )
          )
      ) [] confs

  let process_lab (conflab : (Interpreter.econf_t * transition_label_t option)) (state: state_t) : state_t list =
    let (conf', lab) = conflab in
    let (conf, ehs, hq) = state in 
    let (cconf, prog) = conf in
    let (cconf', _) = conf' in 
    let state_i = Interpreter.get_state cconf in
    (* Printf.printf "INSIDE PROCESS LAB!!!\n"; *)
    let lab' = 
      match lab with 
        | Some lab -> (* Printf.printf "there is already a lab!\n"; *) Some lab 
        | None ->  (* Printf.printf "there is no lab!!!\n"; *) Interpreter.synthetic_lab cconf' in 
    match lab' with 
        | None ->
            (** Parameter Language Transition *) 
            [ conf', ehs, hq ]

        | Some SyncDispatch (xvar, _, _, event, args, j) -> 
            (** Synchronous event dispatch*)        
            let argsv  = List.map (fun arg -> Interpreter.make_eval_expr state_i arg) args in
            L.log L.Verboser (lazy (Printf.sprintf "process_lab: intercepted sync dispatch arguments: %s" 
              (String.concat ", " (List.map2 (fun arg earg -> (Expr.str arg) ^ " : " ^ Val.str earg) args argsv))));    
            let event = Interpreter.make_eval_expr state_i event in
            let listeners = EventHandlers.find event ehs Val.to_expr Val.to_literal in 
            dispatch event state listeners xvar argsv true 

        | Some AsyncDispatch (xvar, xscope, xthis, prob, event, args, j) ->
            (** Asynchronous event dispatch*)
            let argsv  = List.map (fun arg -> Interpreter.make_eval_expr state_i arg) args in
            let event = Interpreter.make_eval_expr state_i event in
            let listeners = EventHandlers.find event ehs Val.to_expr Val.to_literal in 
  
            Random.self_init ();
            let random = Random.float 1.0 in
            (*L.log L.Normal (lazy (Printf.sprintf "random: %f" random));*)
            if (random <= prob) then (
              dispatch event state listeners xvar argsv false
            ) else (
              [Interpreter.get_next conf' (Some xvar), ehs, hq]
            )

        | Some AddHandler (xvar, event, handler, args) -> 
            (** Add Event Handler *)
            let event  = Interpreter.make_eval_expr state_i event in
            let handler = Interpreter.make_eval_expr state_i handler in
            let argsv  = List.map (fun arg -> Interpreter.make_eval_expr state_i arg) args in
            let states = add_event_handler state event handler argsv in 
            List.map 
              (fun (conf, ehs, hq) -> 
                (Interpreter.get_next conf' (Some xvar)), ehs, hq
              ) states

        | Some RemoveHandler (xvar, event, handler) ->
            (** Remove Event Handler *)
            let event = Interpreter.make_eval_expr state_i event in
            let states = remove_event_handler state event (Interpreter.make_eval_expr state_i handler) in
            List.map 
              (fun (conf, ehs, hq) -> 
                (Interpreter.get_next conf' (Some xvar)), ehs, hq
              ) states
        
        | Some Await (conf, conf_info, (pred, args)) ->  
            (* Printf.printf "I am registering a condconf!!\n"; *)
            let hq' = hq @ [ (CondConf (conf_info, pred, args)) ] in
              [ (conf, prog), ehs, hq' ]
          
        | Some Schedule (xvar, fid, args, j) -> 
            let (conf, ehs, hq) = state in
            let (cconf, prog) = conf in
            let fid = Interpreter.make_eval_expr state_i fid in
            let argsv  = List.map (fun arg -> Interpreter.make_eval_expr state_i arg) args in
    
            (* Dispatch *)
            List.fold_left
              (fun confs_so_far (new_conf, hdlrs) ->
                (match hdlrs with
                  (* No handlers *)
                  | [] -> confs_so_far @ [ Interpreter.get_next (new_conf, prog) (Some xvar), ehs, hq ]
                  (* At least one handler *)
                  | _ -> 
                    let new_hq = hq @ (List.map (fun fid -> Handler (xvar, fid, Val.from_literal (String "__schedule__"), argsv)) hdlrs) in
                        confs_so_far @ [(Interpreter.get_next (new_conf, prog) (Some xvar), ehs, new_hq)]
                  )
              ) [] [ cconf, [ fid ] ]
         

  let print_jsil_line_numbers (prog : UP.prog) : unit =
    let file_numbers_name = prog.prog.filename ^ "_raw_coverage.txt" in
      let out = open_out_gen [Open_wronly; Open_append; Open_creat; Open_text] 0o666 file_numbers_name in
        Hashtbl.iter (fun (proc_name, i) _ -> output_string out ("\""^proc_name^"\"" ^ " " ^ (string_of_int i) ^ "\n")) lines_executed;
        close_out out

  let make_step (state : state_t) : state_t list = 
    let (conf : Interpreter.econf_t), ehs, hq = state in
    let cconf, _ = conf in
    if (Interpreter.printing_allowed cconf) then 
      print_state state;
    if (Interpreter.is_final conf) then (
      exec_handler state 
    ) else (
      (** Conf is NOT final *)
      let rets = Interpreter.make_step lines_executed conf interceptor in 
      List.concat (List.map (fun ret -> process_lab ret state) rets) 
    )

  let rec make_steps (states: state_t list) : state_t list = 
    match states with
    | [] -> []
    | state :: sts ->
      let states = make_step state in 
      (match states with 
      | st :: rest when is_final st -> st :: (make_steps sts)
      | _ -> make_steps (states @ sts)
      )

  let evaluate_prog (prog: UP.prog) : Interpreter.result_t list =
    let initial_econf = (Interpreter.create_initial_conf prog, prog) in
    let initial_state = initial_econf, EventHandlers.init (), [] in
    let states = make_steps [initial_state] in
    if (!jsil_line_numbers) then print_jsil_line_numbers prog;
    Interpreter.conf_to_result (List.map (fun state -> let (econf, _, _) = state in let (conf, _) = econf in conf) states)


end 