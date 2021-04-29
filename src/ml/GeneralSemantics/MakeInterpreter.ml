open CCommon
open SCommon
open Literal

module L = Logging

(** General JSIL Interpreter *)
module M
  (Val         : Val.M)
  (Subst       : Subst.M with type vt = Val.t and type t = Val.st)
  (Store       : Store.M with type vt = Val.t)
  (Error       : Error.M with type vt = Val.t and type st = Subst.t)
  (State       : State.M with type vt = Val.t and type st = Subst.t and type store_t = Store.t and type err_t = Error.t)
    : Interpreter.M with type vt = Val.t and type err_t = Error.t and type state_t = State.t = struct

(* *************** *
 * Auxiliary Types *
 * *************** *)

module CallStack = CallStack.M(Val)(Store)
module External  = External.M(Val)(Subst)(Store)(State)

type vt           = Val.t
type err_t        = Error.t
type state_t      = State.t
type call_stack_t = CallStack.t

type fid_t = vt

type store_t = Store.t

type conf_info_t  = store_t * call_stack_t * int * int * int
type await_cont_t = store_t * call_stack_t * int * int * int * vt * vt list

type cconf_t =
  | ConfErr            of string  * int * State.t * Error.t list
  | ConfCont           of State.t * CallStack.t * int * int * int * (await_cont_t option)
  | ConfFinish         of Flag.t  * State.vt    * State.t * (await_cont_t option)
  (** Equal to Conf cont + the id of the required spec *)
  | ConfSusp   of string  * State.t * CallStack.t * int * int * int

type conf_t =
  | BConfErr    of Error.t list
  | BConfCont   of State.t

type result_t =
  | RFail    of string * int * State.t * Error.t list
  | RSucc    of Flag.t * State.vt * State.t

type econf_t = cconf_t * UP.prog

type event_label_t = (cconf_t, conf_info_t, vt, (vt) MPInterceptor.t) EventInterceptor.t

type mp_label_t = (vt) MPInterceptor.t

type intercept_t = ((vt -> (vt list) option) -> (vt -> Literal.t option) -> (Literal.t -> vt) -> string -> string -> vt list -> event_label_t option) option

exception State_error of (Error.t list) * State.t

(** Internal error, carrying a string description *)
exception Internal_error of string

(** Syntax error, carrying a string description *)
exception Syntax_error of string


let string_of_single_result (res : result_t) : string =
  match res with
    | RFail (proc, i, state, errs) ->
        Printf.sprintf "FAILURE TERMINATION: Procedure %s, Command %d\nErrors: %s\nFINAL STATE:\n%s"
          proc i (String.concat ", " (List.map Error.str errs)) (State.str state)

    | RSucc (fl, v, state) ->
      let which_heap = if !print_by_need then (Some SS.empty) else None in
        Printf.sprintf "SUCCESSFUL TERMINATION: (%s, %s)\nFINAL STATE:\n%s"
          (Flag.str fl) (Val.str v) (State.str ~which_heap state)

let string_of_cconf (c : cconf_t) =
  (match c with
  | ConfErr _ -> "ConfErr <something>"
  | ConfFinish _ -> "ConfFinish <something>"
  | ConfSusp _ -> "ConfSusp <something>"
  | ConfCont (_, cs, _, _, _, _) ->
    "ConfCont: " ^ (CallStack.str cs))

(* ******************* *
 * Auxiliary Functions *
 * ******************* *)

let get_cmd (prog : UP.prog) (cs : CallStack.t) (i : int) : string * (Annot.t * Cmd.t) =
	let pid    = CallStack.get_cur_proc_id cs in
	let proc   = Prog.get_proc prog.prog pid in
  let proc   = (match proc with | Some proc -> proc | None -> raise (Failure ("Procedure " ^ pid ^ " does not exist."))) in
    pid, proc.body.(i)


let get_predecessor (prog : UP.prog) (cs : CallStack.t) (prev : int) (i : int) : int =
  let pid = CallStack.get_cur_proc_id cs in
	try Hashtbl.find prog.prog.predecessors (pid, prev, i)
		with _ ->  raise (Failure (Printf.sprintf "Undefined predecessor: %s %d %d" pid prev i))

let update_store (state : State.t) (x : string) (v : Val.t) : State.t =
  let store  = State.get_store state in
  let store' = Store.copy store in
  let _      = Store.put store' x v in
  let state' = State.copy state in
  let state' = State.set_store state' store' in
    state'

(* FIXME: This function is never used *)
let str_cconf (conf: cconf_t) : string =
  match conf with
  | ConfErr (_, _, state, _) -> "ConfErr: " ^ (State.str state)
  | ConfCont (state, cs, prev, i, b_counter, _) -> "ConfCont: " ^ (Printf.sprintf
    "\n--%s: %i--\nTIME: %f\nBRANCHING: %d\n\n%s\n\n" (CallStack.get_cur_proc_id cs) i (Sys.time()) b_counter (State.str state) )
  | ConfFinish (_, _, state, _) -> "ConfFinish: " ^ (State.str state)
  | ConfSusp(_, state, _, _, _, _) -> "ConfSusp: " ^ (State.str state)

let get_state (conf: cconf_t) : state_t =
  match conf with
  | ConfErr  (_, _, state, _) -> state
  | ConfCont (state, _, _, _, _, _) -> state
  | ConfFinish (_, _, state, _) -> state
  | ConfSusp (_, state, _, _, _, _) -> state

let set_state (conf: cconf_t) (state: state_t) : cconf_t =
  match conf with
  | ConfErr  (proc, i, _, errs) -> ConfErr (proc, i, state, errs)
  | ConfCont (_, cs, prev, j, b_counter, ev_cont) -> ConfCont (state, cs, prev, j, b_counter, ev_cont)
  | ConfFinish (fl, v, _, await_cont) -> ConfFinish (fl, v, state, await_cont)
  | ConfSusp (pid, _, cs, prev, i, b_counter) -> ConfSusp (pid, state, cs, prev, i, b_counter)

let eval_subst_list
    (state     : State.t)
    (subst_lst : (string * (string * Expr.t) list) option) : (string * (string * Val.t) list) option =
  match subst_lst with
    | None -> None
    | Some (lab, subst_lst) ->
        let subst_lst' =
          List.map (fun (x, e) -> x, State.eval_expr state e) subst_lst in
      Some (lab, subst_lst')

let rec protected_get_cell
    (prog    : UP.prog)
    (state   : State.t)
    (e1      : Expr.t)
    (e2      : Expr.t)
    (err_msg : string) : (State.t * Val.t * Val.t * (Val.t option)) list =

  let loc, prop =
    try State.eval_expr state e1, State.eval_expr state e2
    with State.Internal_State_Error (errs, s) -> raise (State_error (errs, s))
    in

  match State.get_cell state loc prop with
    | GCSucc rets -> rets
    | GCFail errs -> raise (State_error (errs, state))

let make_eval_expr state   =
   fun e -> (try State.eval_expr state e
             with State.Internal_State_Error(errs, s) -> raise (State_error(errs, s)))

let cconf_str (cmd : (Annot.t * Cmd.t)) (state : State.t)  (cs : CallStack.t) (i : int) (b_counter : int) : string =
  let annot, cmd = cmd in
  let msg = (match SS.inter (SS.of_list (CallStack.procs cs)) (SS.of_list CCommon.forbidden_prints) = SS.empty with
  | false -> ""
  | true ->
    let which_store = if (!CCommon.print_by_need) then Some (Cmd.vars cmd) else (
      let store_dom, _ = Store.partition (State.get_store state) (fun _ -> true) in
      Some store_dom) in
    let which_heap = if (!CCommon.print_by_need) then Some SS.empty else None in
    Printf.sprintf
      "-----------------------------------\nJSIL Configuration:\n-----------------------------------\nCMD: %s\n%s: %i--\nTIME: %f\nCS: %s\nBRANCHING: %d\n\n%s\n------------------------------------------------------\n"
      (Cmd.str "" 0 cmd) (CallStack.get_cur_proc_id cs) i (Sys.time()) (CallStack.str cs) b_counter (State.str ~which_store ~which_heap state))  in
      msg

let print_configuration (cmd : (Annot.t * Cmd.t)) (state : State.t)  (cs : CallStack.t) (i : int) (b_counter : int) : unit =
  L.log L.Normal (lazy (cconf_str cmd state cs i b_counter))


let print_lconfiguration (lcmd : LCmd.t) (state : State.t) : unit =
  let which_store = if (!CCommon.print_by_need) then Some SS.empty else None in
  let which_heap = if (!CCommon.print_by_need) then Some SS.empty else None in
  let msg = (lazy (Printf.sprintf
    "------------------------------------------------------\nTIME: %f\nLCMD: %s\n\n%s\n------------------------------------------------------\n"
    (Sys.time()) (LCmd.str lcmd) (State.str ~which_store ~which_heap state) )) in
  L.log L.Normal msg

let printing_allowed (cconf: cconf_t) : bool =
    match cconf with
    | ConfCont (_, cs, _, _, _, _) ->  SS.inter (SS.of_list (CallStack.procs cs)) (SS.of_list CCommon.forbidden_prints) = SS.empty
    | _ -> false

let assert_formula (f: Formula.t) (state: State.t) : State.t list =
  let store_subst = Store.to_ssubst (State.get_store state) in
    let f'        = Formula.substitution store_subst true f in
    (match State.assert_a state [ f' ] with
    | true -> [ state ]
    | false ->
      let err : Error.t = ESpec ([], Not f', [ [ MPF f' ]]) in
      let failing_model = State.sat_check_f state [ Not f' ] in
      let fm_str        = Option.map_default (fun subst -> Subst.str subst) "CANNOT CREATE MODEL" failing_model in
      let _             = State.simplify state in
      let msg           = Printf.sprintf "\nAssert failed with argument %s.\nFailing Model:\n\t%s" (Formula.str f') fm_str  in
      if (not !SCommon.bi) then (print_to_all msg);
      L.log L.Normal (lazy msg);
      raise (State_error ([ err ], state)))

(* ************** *
 * Main Functions *
 * ************** *)

(**
    Evaluation of logic commands

    @param prog JSIL program
    @param lcmd Logic command to be evaluated
    @param state Current state
    @param preds Current predicate set
    @return List of states/predicate sets resulting from the evaluation
  *)
  let rec evaluate_lcmd
      (prog   : UP.prog)
      (lcmd   : LCmd.t)
      (state_labels  : State.t * mp_label_t list) : (State.t * mp_label_t list) list =

      let state, labels = state_labels in
    
      let eval_expr = make_eval_expr state in

    print_lconfiguration lcmd state;

    match lcmd with
    | AssumeType (x, t) ->
        (match Val.from_expr (LVar x) with
          | Some v_x ->
            (match State.assume_t state v_x t with
            | Some state' -> [ state', [MPInterceptor.AssumeType (x, t)] ] 
            | _ -> raise (Failure (Printf.sprintf "ERROR: AssumeType: Cannot assume type %s for variable %s." (Type.str t) x)))
          | _ -> raise (Failure (Printf.sprintf "ERROR: AssumeType: Variable %s cannot be turned into a value." x)))

    | Assume f ->
        let store_subst = Store.to_ssubst (State.get_store state) in
        let f' = Formula.substitution store_subst true f in
        let f' = State.simplify_formula state f' in
        (match State.assume_a state [ f' ] with
          | Some state' -> [ state', [MPInterceptor.Assume (f)] ]
          | _ -> (* Printf.printf "WARNING: ASSUMING FALSE\n"; *) [])

    | SpecVar xs -> [ State.add_spec_vars state (Var.Set.of_list xs), [MPInterceptor.SpecVar xs] ]

    | FreshLVar (x, s) ->
        (* I need to evaluate the expression - it needs to be a real string *)
        let new_lvar  = fresh_lvar () ^ s in
        let state'    = State.add_spec_vars state (Var.Set.of_list [ new_lvar ]) in
        let v         = make_eval_expr state (LVar new_lvar) in
        let state''   = update_store state' x v in
        [state'', []]

    | Assert f -> List.map (fun s -> s, []) (assert_formula f state)

    | Macro (name, args) ->
        let macro = Macro.get prog.prog.macros name in
        (match macro with
        | None ->
          L.log L.Verboser (lazy (Printf.sprintf "Current MACRO TABLE:\n%s\n" (Macro.str_of_tbl prog.prog.macros)));
          raise (Failure (Printf.sprintf "NO MACRO found when executing: %s" (LCmd.str lcmd)))
        | Some macro ->
          let lcmds = Macro.expand_macro macro args in
            evaluate_lcmds prog lcmds state_labels)

    (* We have to understand what is the intended semantics of the logic if *)
    | If (e, lcmds_t, lcmds_e) ->
        let ve = eval_expr (Expr.UnOp (Not, e)) in
        if (State.sat_check state ve)
          then evaluate_lcmds prog lcmds_e state_labels
          else evaluate_lcmds prog lcmds_t state_labels

    | Branch e ->
        let ve = eval_expr e in
        let nve = eval_expr (UnOp (Not, e)) in
        (match Val.to_expr ve with
        | Lit (Bool true) | Lit (Bool false) -> [ state, [] ]
        | _ ->
          let state' = State.copy state in
          let f_true = Formula.Eq (Val.to_expr ve, Expr.Lit (Bool true)) in
          let f_false = Formula.Eq (Val.to_expr ve, Expr.Lit (Bool false)) in
          let state  = List.map (fun s -> s, [MPInterceptor.Assume (f_true)]) (State.assume state ve) in
          let state' = List.map (fun s -> s, [MPInterceptor.Assume (f_false)]) (State.assume state' nve) in
          let states = state @ state' in
            branch := Val.branch_friendly ve && List.length states > 1;
            (*if !branch then print_to_all (Printf.sprintf "BranchTrue: %d : %s" (Unix.getpid()) (Val.str ve));*)
            states)

    | SL sl_cmd -> List.map (fun s -> s, []) (State.evaluate_slcmd prog sl_cmd state)

  and evaluate_lcmds
    (prog    : UP.prog)
    (lcmds   : LCmd.t list)
    (state_labels   : State.t * mp_label_t list) : (State.t * mp_label_t list) list =

    match lcmds with
    | [] -> [ state_labels ]
    | lcmd :: rest_lcmds ->
      let rets = evaluate_lcmd prog lcmd state_labels in
      List.concat (List.map (fun state_labels -> evaluate_lcmds prog rest_lcmds state_labels) rets)

let evaluate_lcmd_top
  (prog   : UP.prog)
  (lcmd   : LCmd.t)
  (state  : State.t) : (State.t * event_label_t) list =
    let state_labels = evaluate_lcmd prog lcmd (state, []) in
    List.map (fun (s, l) -> s, EventInterceptor.MLabel (MPInterceptor.GroupLabel (l))) state_labels

(**
  Evaluation of basic commands

  @param prog JSIL program
  @param bcmd Basic command to be evaluated
  @param state Current state
  @param preds Current predicate set
  @return List of states/predicate sets resulting from the evaluation
*)
let evaluate_bcmd
    (prog   : UP.prog)
    (bcmd   : BCmd.t)
    (state  : State.t) : State.t list =

	let eval_expr = make_eval_expr state in
  let protected_get_cell = protected_get_cell prog in

	match bcmd with
	| Skip -> [ state ]

	| Assignment (x, e) ->
		let v      = State.simplify_val state (eval_expr e) in
    let state' = update_store state x v in
		  [ state' ]

	| New (x, loc, metadata) ->
    let l_val       = Option.map eval_expr loc in
		let m_val       = Option.map_default eval_expr (Val.from_literal Null) metadata in
		let loc, state' = State.alloc state l_val m_val in
		let state''     = update_store state' x loc in
		  [ state'' ]

	| Lookup (x, e1, e2) ->
    List.map
			(fun (state', loc, prop, pval) ->
			  match pval with
				  | Some pval -> update_store state' x pval
				  | None ->
              let err : Error.t = EResource [ MCell (loc, prop) ] in
              raise (State_error ([ err ], state)))
			(protected_get_cell state e1 e2 "Lookup")

	| Mutation (e1, e2, e3) ->
		let v = State.simplify_val state (eval_expr e3) in
		List.map
			(fun (state', loc, prop, _) ->
				State.set_cell state' loc prop (Some v)
			) (protected_get_cell state e1 e2 "Mutation")

	| Delete (e1, e2) ->
		List.map
			(fun (state', loc, prop, _) ->
				State.set_cell state' loc prop None
			) (protected_get_cell state e1 e2 "Delete")

	| DeleteObj e ->
		[ State.delete_object state e ]

	| HasField (x, e1, e2) ->
    List.map
			(fun (state', _, _, pval) ->
				match pval with
			  | Some pval -> update_store state' x (Val.from_literal (Bool true))
				| None      -> update_store state' x (Val.from_literal (Bool false)))
			(protected_get_cell state e1 e2 "HasField")

	| GetFields (x, e) ->
		let props_v = State.get_domain state (eval_expr e) in
    (match props_v with
    | GDSucc [ state', props_v ] -> [ update_store state' x props_v ]
    | GDFail errs -> raise (State_error (errs, state)))

  | MetaData (x, e) ->
    let loc = eval_expr e in
    (match State.get_metadata state loc with
      | GMSucc [ ] -> raise (Failure "Empty Metadata")
      | GMSucc [ state', _, vm ] -> [ update_store state' x vm ]
      | GMFail errs ->
          raise (State_error (errs, state))
    )

let get_pid_from_val (state: State.t) =
  fun (pid: vt) : string ->
  (match Val.to_literal pid with
  | Some (String pid) -> pid
  | Some other_thing  ->
      let err = [ Error.EProc pid ] in
      raise (State_error (err, state))
  | None -> raise (Internal_error "Procedure Call Error - unlifting procedure ID failed"))

let evaluate_procedure_call (state : State.t) (old_store : Store.t option) (cs: CallStack.t) (prog : UP.prog) x pid v_args i j prev subst b_counter =
    let pid = get_pid_from_val state pid in

    let proc   = Prog.get_proc prog.prog pid in
    let spec   = Hashtbl.find_opt prog.specs pid in
    let params =
      match proc, spec with
        | Some proc, _ -> Proc.get_params proc
        | None, Some spec -> Spec.get_params spec.spec
        | _ ->
            L.log L.Normal  (lazy (Printf.sprintf "Cannot find the proc %s \n" pid));
            raise (State_error ([Error.EProc (Val.from_literal (String pid))], state)) in
    let prmlen = List.length params in

    let args   = Array.make prmlen (Val.from_literal Undefined) in
    let _      = List.iteri (fun i v_arg -> if (i < prmlen) then (args.(i) <- v_arg)) v_args in
    let args   = Array.to_list args in

    (match spec with
      | Some spec ->
          let subst = eval_subst_list state subst in
          L.log L.Verboser  (lazy (Printf.sprintf "ABOUT TO USE THE SPEC OF %s IN BIABDUCTION!!!\n" pid));
          let rets : (State.t * Val.t option * Flag.t) list = State.run_spec spec state args subst in
           L.log L.Verboser (lazy (Printf.sprintf "Run_spec returned %d Results!!!\n" (List.length rets)));
          let b_counter = if (List.length rets > 1) then (
            print_to_all (Printf.sprintf "SBranching: %d" (b_counter + 1));
            b_counter + 1;
          ) else b_counter in
          List.map (fun (ret_state, v_ret, fl) ->
            match v_ret, fl, j with
              | Some v_ret, Flag.Normal, _ ->
                  let ret_state = update_store ret_state x v_ret in
                  ConfCont (ret_state, (CallStack.copy cs), i, i+1, b_counter, None)

              | Some v_ret, Flag.Error, Some j ->
                  let ret_state = update_store ret_state x v_ret in
                  ConfCont (ret_state, (CallStack.copy cs), i, j, b_counter, None)

              | Some v_ret, Flag.Error, None ->
                  let msg = Printf.sprintf "SYNTAX ERROR: No error label provided when calling procedure %s" pid in
                  L.log L.Normal (lazy msg);
                  raise (Syntax_error msg)

              | None, _, _ ->
                  let msg = Printf.sprintf "SYNTAX ERROR: The postcondition of %s does not define the return variable" pid in
                  L.log L.Normal (lazy msg);
                  raise (Syntax_error msg)
          ) rets

     | _ ->
     if (Hashtbl.mem prog.prog.bi_specs pid) then (
      [ ConfSusp (pid, state, cs, prev, i, b_counter) ]
    ) else (
      let new_store  = Store.init (List.combine params args) in
      let state'     = State.set_store state new_store in
      let cs'        = (pid, v_args, old_store, x, i, i+1, j) :: cs in
      [ ConfCont (state', cs', -1, 0, b_counter, None) ]
    )

    )

(**
  Evaluation of commands

  @param prog JSIL program
  @param state Current state
  @param preds Current predicate set
  @param cs Current call stack
  @param prev Previous index
  @param i Current index
  @param intercept interceptor (events or message passing) for procedure calls
  @return List of configurations resulting from the evaluation
*)
let evaluate_cmd
	(prog           : UP.prog)
	(state          : State.t)
	(cs             : CallStack.t)
	(prev           : int)
	(i              : int)
  (b_counter      : int)
  (intercept      : intercept_t) : (cconf_t * event_label_t option) list =

  (* State simplification *)
  (if (!javert) then let _ = State.simplify state in ());

  let store                = State.get_store state in
  let eval_expr            = make_eval_expr state in
  let proc_name, annot_cmd = get_cmd prog cs i in
  let _, cmd    = annot_cmd in

  let vtrue  = Val.from_literal (Bool true) in
  let vfalse = Val.from_literal (Bool false) in

  exec_cmds := !exec_cmds + 1;

  let first_time = UP.first_time_running prog proc_name i in
  UP.update_coverage prog proc_name i;

  if (printing_allowed (ConfCont(state, cs, prev, i, b_counter, None))) then
    print_configuration annot_cmd state cs i b_counter;

  let evaluate_return (v_ret : Val.t) (ev_cont : await_cont_t option) : cconf_t list =
    let result =
      (match cs with
        | (_, _, None, _, _, _, _) :: _ ->
            (* Printf.printf "In the finish case!\n"; *)
            [ ConfFinish (Normal, v_ret, state, ev_cont) ]

        | (_, _, Some old_store, x, prev', j, _) :: cs' ->
            let state'  = State.set_store state old_store in
            let state'' = update_store state' x v_ret in
            [ ConfCont (state'', cs', prev', j, b_counter, ev_cont) ]

        | _ -> raise (Failure "Malformed callstack")) in
    (* L.log L.Verboser (lazy "Returning."); *)
    result in


  match cmd with
  | Basic bcmd ->
      let resulting_states : State.t list = evaluate_bcmd prog bcmd state in
      let b_counter = if (List.length resulting_states > 1) then (
        (* print_to_all (Printf.sprintf "BBranching: %d" (b_counter + 1)); *)
        b_counter + 1
      ) else b_counter in
      List.map (fun state -> ConfCont (state, cs, i, i+1, b_counter, None), None) resulting_states

  | Logic lcmd ->
      let resulting_states : (State.t * mp_label_t list) list = evaluate_lcmd prog lcmd (state, []) in
      (match lcmd with
          | SL (Invariant _) when (not first_time) -> []
          | _ ->
            let b_counter = if (List.length resulting_states > 1) then (
              b_counter + 1
            ) else b_counter in
            List.map (fun (state, labels) -> ConfCont (state, cs, i, i+1, b_counter, None), Some (EventInterceptor.MLabel (MPInterceptor.GroupLabel (labels)))) resulting_states)


  | Goto j -> [ ConfCont (state, cs, i, j, b_counter, None), None ]

  (* When executing the guarded goto, we copy only when needed and parallelise *)
  | GuardedGoto (e, j, k) ->
      let vt  = State.simplify_val state (eval_expr e) in
      let lvt = Val.to_literal vt in
      let vf = (match lvt with
        | Some (Bool true)  -> vfalse
        | Some (Bool false) -> vtrue
        | _ -> State.simplify_val state (eval_expr (UnOp (Not, e)))) in
      (* L.log L.Verboser (lazy (Printf.sprintf "Evaluated expressions: %s, %s" (Val.str vt) (Val.str vf))); *)
      let can_put_t, can_put_f = (match lvt with
        | Some (Bool true)  -> true ,false
        | Some (Bool false) -> false, true
        | _ -> State.sat_check state vt, State.sat_check state vf) in
      let sp_t, sp_f = (match can_put_t, can_put_f with
        | false, false -> [], []
        | true,  false -> List.map (fun x -> x, j) (State.assume state vt), []
        | false, true -> [], List.map (fun x -> x, k) (State.assume state vf)
        | true,  true ->
          let state' = State.copy state in
          List.map (fun x -> x, j) (State.assume state vt), List.map (fun x -> x, k) (State.assume state' vf)
      ) in
      let sp = sp_t @ sp_f in
      if List.length sp = 2 then (
        List.iter (fun (st, _) -> let _ = State.simplify st in ()) sp
      );

      let b_counter = if (List.length sp > 1) then (
          (* print_to_all (Printf.sprintf "GBranching: %d: %s" (b_counter + 1) (Val.str vt)); *)
          b_counter + 1
      ) else b_counter in
      let result = List.mapi (fun j (state, next) -> ConfCont (state, (if j = 0 then cs else CallStack.copy cs), i, next, b_counter, None), None) sp in
      if ((List.length result) = 2) then (L.log L.Verboser (lazy (Printf.sprintf "BRANCHING ON CONDITIONAL GOTO.")));
        branch := (List.length result > 1) && (Val.branch_friendly vt);
        result

  | PhiAssignment lxarr ->
      let j = get_predecessor prog cs prev i in
      let state' = List.fold_left (fun state (x, x_arr) ->
        let e = List.nth x_arr j in
        let v = eval_expr e in
          update_store state x v) state lxarr in
        [ ConfCont (state', cs, i, i+1, b_counter, None), None ]

    (* this should be a dedicated syntactic construct *)
  | Call (x, Lit (String f), [ e1; e2; e3 ], _, _)
      when f = JS2JSIL_Constants.js_symbolic_constructs.jsil_internal_await ->
        let v_ret = Val.from_literal (Undefined) in
        let pred  = eval_expr e1 in
        let scope  = eval_expr e2 in
        let ridiculous = eval_expr e3 in
        let cs' = CallStack.truncate cs in
        (* Printf.printf "calling the native JSIL await...\n"; *)
        List.map (fun r -> r, None) (evaluate_return v_ret (Some (store, cs', i, i+1, b_counter, pred, [scope; ridiculous])))

  | Call (x, e, args, j, subst) ->
      let pid = eval_expr e in
      let v_args = List.map eval_expr args in
      (* Checking wether or not call is intercepted *)
      (match intercept with
      | None -> let result = evaluate_procedure_call state (Some (State.get_store state)) cs prog x pid v_args i j prev subst b_counter in
                List.map (fun r -> r, None) result
      | Some intercept -> 
        (match (intercept (Val.to_list) (Val.to_literal) (Val.from_literal) x (get_pid_from_val state pid) v_args) with
          | None -> 
            let result = evaluate_procedure_call state (Some (State.get_store state)) cs prog x pid v_args i j prev subst b_counter in
            List.map (fun r -> r, None) result
          | Some label -> 
            (* updating return variable and returning label *)
            let state' = update_store state x (Val.from_literal Literal.Empty) in
            [ ConfCont (state', cs, i, i+1, b_counter, None), Some label ]
        )
      )

  | ECall (x, pid, args, j) ->
      let pid = (match pid with | PVar pid -> pid) in
      let v_args = List.map eval_expr args in
        List.map
          (fun (state, cs, i, j) -> ConfCont (state, cs, i, j, b_counter, None), None)
          (External.execute prog.prog state cs i x pid v_args j)

  | Apply (x, pid_args, j) ->
      let v_pid_args = eval_expr pid_args in
      let v_pid_args_list = Val.to_list v_pid_args in
      (match v_pid_args_list with
      | Some v_pid_args_list ->
          let pid = List.hd v_pid_args_list in
          let v_args = List.tl v_pid_args_list in
            List.map (fun r -> r, None) (evaluate_procedure_call state (Some (State.get_store state)) cs prog x pid v_args i j prev None b_counter)
      | None -> raise (Failure (Printf.sprintf "Apply not called with a list: %s" (Val.str v_pid_args))))

  | Arguments x ->
      let args = CallStack.get_cur_args cs in
      let args = Val.from_list args in
      let state' = update_store state x args in
        [ ConfCont (state', cs, i, i+1, b_counter, None), None ]

  | Print e ->
      let msg = eval_expr e in
      print_to_all (Val.str msg);
      [ ConfCont (state, cs, i, i+1, b_counter, None), None ]

  | ReturnNormal ->
      let v_ret = Store.get store Flag.return_variable in
      let v_ret =
        (match v_ret with
          | None  -> raise (Failure "nm_ret_var not in store (normal return)")
          | Some v_ret -> v_ret) in
      List.map (fun r -> r, None) (evaluate_return v_ret None)

  | ReturnError ->
      let v_ret = Store.get store Flag.return_variable in
      (match v_ret, cs with
      | None, _  -> raise (Failure "Return variable not in store (error return) ")
      | Some v_ret, (_, _, None, _, _, _, _) :: _ -> [ ConfFinish (Error, v_ret, state, None), None ]
      | Some v_ret, (pid, _, Some old_store, x, prev', _, Some j) :: cs' ->
          let state'  = State.set_store state old_store in
          let state'' = update_store state' x v_ret in
          [ ConfCont (state'', cs', prev', j, b_counter, None), None ]
      | _ -> raise (Failure "Malformed callstack"))


let protected_evaluate_cmd
  (prog      : UP.prog)
  (state     : State.t)
  (cs        : CallStack.t)
  (prev      : int)
  (i         : int)
  (b_counter : int)
  (intercept : intercept_t) : (cconf_t * event_label_t option) list =

  try
    evaluate_cmd prog state cs prev i b_counter intercept
  with
    | State_error (errs, state)
    | State.Internal_State_Error (errs, state) ->
    (* Return: current procedure name, current command index, the state, and the associated errors *)
    let proc = CallStack.get_cur_proc_id cs in
    [ ConfErr (proc, i, state, errs), None ]



(**
  Iterative evaluation of commands

  @param prog JSIL program
  @param confs Current configurations
  @param results Current evaluation outcomes
  @return List of final configurations
*)
let rec evaluate_cmd_iter
  (ret_fun        : (result_t -> 'a))
  (retry          : bool)
	(prog           : UP.prog)
  (hold_results   : 'a list)
  (on_hold        : (cconf_t * string) list)
  (lines_executed : (string * int, unit) Hashtbl.t)
	(confs          : (cconf_t * event_label_t option) list)
  (results        : result_t list) : 'a list * (string * int, unit) Hashtbl.t =

  let f = evaluate_cmd_iter ret_fun retry prog hold_results on_hold lines_executed in

  match confs with
  | [] ->
    let results = List.map ret_fun results in
    let results = hold_results @ results in
    if (not retry) then (
       results, lines_executed
    ) else (
      L.log L.Verboser (lazy (Printf.sprintf "Relaunching suspended confs: %d left" (List.length on_hold)));
      let hold_confs = List.filter (fun (_, pid) -> Hashtbl.mem prog.specs pid) on_hold in
      let hold_confs = List.map (fun (conf, _) -> conf, None) hold_confs in
      evaluate_cmd_iter ret_fun false prog results [] lines_executed hold_confs [ ]
    )

  | (ConfCont (state, cs, prev, i, b_counter, None), _) :: rest_confs
        when (b_counter <= !CCommon.max_branching) ->
      let proc_name, annot_cmd = get_cmd prog cs i in
      (*Printf.printf "Executing fun: %s" proc_name;*)
      if (!jsil_line_numbers) && (not (List.mem proc_name forbidden_prints)) then Hashtbl.replace lines_executed (proc_name, i) ();
      let next_confs = protected_evaluate_cmd prog state cs prev i b_counter None in
      f (next_confs @ rest_confs) results

  | (ConfCont (state, cs, prev, i, b_counter, None), _) :: rest_confs ->
      Printf.printf "WARNING: MAX BRANCHING STOP: %d.\n" b_counter;
      L.log L.Verboser (lazy (Printf.sprintf "Stopping Symbolic Execution due to MAX BRANCHING with %d. STOPPING CONF:\n" b_counter));
      (* print_configuration annot_cmd state cs i b_counter; *)
      f rest_confs results

  | (ConfErr (proc, i, state, errs), _) :: rest_confs ->
      let errs = Error.sanitise errs in
      let result = RFail (proc, i, state, errs) in
      f rest_confs (result :: results)

  | (ConfFinish (fl, v, state, None), _) :: rest_confs ->
      let result = RSucc (fl, v, state) in
      f rest_confs (result :: results)

  | (ConfSusp (fid, state, cs, prev, i, b_counter), _) :: rest_confs
        when retry ->
    let conf = ConfCont (state, cs, prev, i, b_counter, None) in
    L.log L.Verboser (lazy (Printf.sprintf "Suspending a computation that was trying to call %s" fid));
    evaluate_cmd_iter ret_fun retry prog  hold_results ((conf, fid) :: on_hold) lines_executed rest_confs results

  | _ :: rest_confs -> f rest_confs results


(**
  Evaluation of procedures

  @param prog JSIL program
  @param name Identifier of the procedure to be evaluated
  @param params Parameters of the procedure to be evaluated
  @state state Current state
  @preds preds Current predicate set
  @return List of final configurations
*)
let evaluate_proc
    (ret_fun : (result_t -> 'a))
    (prog     : UP.prog)
    (name     : string)
    (params   : string list)
    (state    : State.t) : 'a list =

  L.log L.Normal (lazy (
    "*******************************************\n" ^
    "*** Executing procedure: " ^ name ^ "\n" ^
    "*******************************************\n"
  ));

  let store = State.get_store state in
  L.log L.Normal (lazy (Printf.sprintf "ARGS: %s" (String.concat ", " params)));
  let args  =
    List.map
      (fun x ->
        match Store.get store x with
          | Some v_x -> v_x
          | None -> raise (Failure "Symbolic State does NOT contain formal parameter"))
      params in

  let cs   : CallStack.t = [ (name, args, None, "out", -1, -1, (Some (-1))) ] in
  let conf : cconf_t     = ConfCont (state, cs, (-1), 0, 0, None) in
  let (res, _) = evaluate_cmd_iter ret_fun true prog [] [] (Hashtbl.create CCommon.medium_tbl_size) [ conf, None ] [ ] in
  res

let create_initial_cs (prog: UP.prog) (fid_args: (string * vt list) option) : call_stack_t =
  let main_fid = Prog.get_main prog.prog in
  let fid, args = (match fid_args with
  | None -> main_fid, []
  | Some (fid, args) -> fid, args) (* @ [Val.from_literal (String main_fid)]) *) in
  [ (fid, args, None, "out", -1, -1, (Some (-1))) ] 

let create_initial_conf (prog: UP.prog) (fid_args: (string * vt list) option) : cconf_t =
  L.log L.Normal (lazy (Printf.sprintf "\nMain: %s.\n" (Prog.get_main prog.prog)));
  let initial_cs   = create_initial_cs prog fid_args in
  let initial_state = State.init (Some prog.preds) in
  let bindings =
    (match fid_args with
    | Some (fid, args) -> 
      let proc   = Prog.get_proc prog.prog fid in
      let params =
        (match proc with
          | Some proc -> Proc.get_params proc
          | _ -> let msg = Printf.sprintf "Procedure %s not found" fid in
                  raise (Failure msg)) in
      (List.combine params args)
    | None -> []) in
  let initial_store = Store.init bindings in
  let state = State.set_store initial_state initial_store in
  ConfCont (state, initial_cs, -1, 0, 0, None)

let print_jsil_line_numbers (line_numbers : (string * int, unit) Hashtbl.t) (prog : UP.prog) : unit =
  (**print_to_all (Printf.sprintf "Line numbers: %d" (Hashtbl.length line_numbers));*)
  let file_numbers_name = prog.prog.filename ^ "_raw_coverage.txt" in
    let out = open_out_gen [Open_wronly; Open_append; Open_creat; Open_text] 0o666 file_numbers_name in
      Hashtbl.iter (fun (proc_name, i) _ -> output_string out ("\""^proc_name^"\"" ^ " " ^ (string_of_int i) ^ "\n")) line_numbers;
      close_out out

(**
  Evaluation of programs

  @param prog Target JSIL program
  @return Final configurations
*)
let evaluate_prog (prog : UP.prog) : result_t list =
	Random.self_init();
  let ret_fun = fun x -> x in
  let initial_conf = (create_initial_conf prog None) in
  let (res, line_numbers) = evaluate_cmd_iter ret_fun true prog [] [] (Hashtbl.create CCommon.medium_tbl_size) [ initial_conf, None ] [] in
  if(!jsil_line_numbers) then (
    print_jsil_line_numbers line_numbers prog
  );
  res


(**
  Configuration printer

  @param result Target configuration
  @return String representation of the configuration
*)
let string_of_result (result : result_t list) : string =

  let f i res = Printf.sprintf "\nJSIL RESULT: %d.\n%s" i (string_of_single_result res) in

  String.concat "" (List.mapi f result)

let valid_result (ret : result_t list) : bool =
  assert(0 < List.length ret);
  List.for_all (fun ret ->
    (match ret with
    | RSucc (Flag.Normal, _, _) -> true
    | _ -> false
    )) ret

let deconstruct_result (ret : result_t list) : vt * state_t =
  assert(List.length ret = 1);
  let ret = List.hd ret in
  match ret with
    | RSucc (Flag.Normal, v, st) -> (v, st)
    | RSucc (Flag.Error, _, _) -> print_to_all "ERROR"; assert(false);
    | RFail _ -> print_to_all "FAIL"; assert(false)


let conf_to_result (confs: cconf_t ) : result_t =
  match confs with
  | ConfFinish (fl, v, state, _) -> RSucc (fl, v, state)
  | ConfErr (proc, i, state, errs) -> RFail (proc, i, state, errs)
  | _ -> raise (Failure "Invalid Final Configuration")

let assume (conf: cconf_t) (formulas: Formula.t list) : cconf_t option =
  let state = get_state conf in
  match State.assume_a state formulas with
  | Some new_state ->
      (match conf with
      | ConfErr  (proc, i, state, errs) -> Some (ConfErr (proc, i, new_state , errs))
      | ConfCont (state, cs, i, prev, b_counter, _) -> Some (ConfCont (new_state, cs, i, prev, b_counter, None))
      | ConfFinish (fl, v, state, _) -> Some (ConfFinish (fl, v, new_state, None))
      | ConfSusp (pid, state, cs, prev, i, b_counter) -> Some (ConfSusp (pid, new_state, cs, prev, i, b_counter)))
  | None -> None


(** Event Interface *)
let final (econf : econf_t) : bool =
  match econf with
    | ConfCont (state, cs, _, _, _, _), _ -> false
    | ConfSusp _, _-> false
    | _, _ -> true

let eval_expr (cconf: cconf_t) (expr: Expr.t) : vt = 
    make_eval_expr (get_state cconf) expr 

let continue_with_conf_info (econf: econf_t) (conf_info: conf_info_t) : econf_t =
    (*  This is the case where we need to merge two configurations. We take the non-control flow part of conf' and the rest comes from the current conf. **)
    let (store, cs, i, j, b_counter) = conf_info in
    let (conf, prog) = econf in
    ConfCont ((State.set_store (get_state conf) store), cs, i, j, b_counter, None), prog

let continue_with_conf (econf: econf_t) (conf': econf_t) : econf_t =
    (*  This is the case where we need to merge two configurations. We take the non-control flow part of conf' and the rest comes from the current conf. **)
    (match conf' with
    | ConfCont (state, cs, i, prev, b_counter, _), prog ->
      let (conf, prog) = econf in
      ConfCont (State.set_store (get_state conf) (State.get_store state), cs, i, prev, b_counter, None), prog
    | _ ->
      let msg = Printf.sprintf "Invalid configuration error" in
      raise (Failure msg))


let continue_with_h (econf: econf_t) (xvar: string) (fid: fid_t) (args: vt list) : econf_t list =
  (*  This is the case where we need to execute a handler. We take the non-control flow part of conf and start executing the specified procedure. **)
  L.log L.Normal (lazy (Printf.sprintf "\nExecuting handler Fid: %s\n" (Val.str fid)));
  let (conf, prog) = econf in
  let cur_state = get_state conf in
  let state = State.set_store cur_state (Store.init []) in
  let rets = (evaluate_procedure_call state None [] prog xvar fid args 0 None (-1) None 0) in
    List.map (fun ret -> ret, prog) rets

let check_handler_continue (econf: econf_t) : unit =
 match econf with
 | ConfFinish (Error, _, state, _), _ ->
    (try
        assert_formula Formula.False state;
        ()
    with
    | State_error (errs, state)
    | State.Internal_State_Error (errs, state) -> ())
 | c, _ -> ()


let make_step (lines_executed : (string * int, unit) Hashtbl.t) (econf : econf_t) (intercept : intercept_t) 
  : (econf_t * event_label_t option) list =
  branch := false;
  let (conf, up_prog) = econf in
  match conf with
    | ConfCont (state, cs, prev, i, b_counter, _) when (b_counter <= !CCommon.max_branching) ->
          (* Adding line numbers *)
          if (!jsil_line_numbers) then (
            let proc_name, annot_cmd = get_cmd up_prog cs i in
            if not (List.mem proc_name forbidden_prints) then
              Hashtbl.replace lines_executed (proc_name, i) ()
          );
          (* Evaluating command *)
          let rets = protected_evaluate_cmd up_prog state cs prev i b_counter intercept in
          let rets = List.map (fun (x, label) -> (x, up_prog), label) rets in
          (match !branch && !parallel with
          | false -> rets
          | true ->
            assert (List.length rets > 1);
            while (try CCommon.threads () >= !CCommon.mthread with _ -> true) do Unix.sleepf 0.01 done;
            (* print_to_all (Printf.sprintf "Active threads: %d" threads); *)
            let pid = Unix.fork () in
            (match pid with
              | 0 -> [ List.hd rets ]
              | n -> List.tl rets))

    | ConfCont _ -> print_to_all "Maximum branching reached"; []
    | c -> [(c, up_prog), None]

let print_cconf (econf: econf_t) : string =
  let (cconf, prog) = econf in
  match cconf with
  | ConfCont (state, cs, prev, i, b_counter, _) ->
    let proc_name, annot_cmd = get_cmd prog cs i in
    cconf_str annot_cmd state cs i b_counter
  | _ -> "\n"

let copy_conf (cconf: cconf_t) : cconf_t =
  match cconf with
  | ConfCont (state, cs, prev, i, b_counter, _) -> ConfCont (State.copy state, CallStack.copy cs, prev, i, b_counter, None)
  | c -> c

let synthetic_lab (cconf : cconf_t) : event_label_t option =
  match cconf with
    | ConfCont (st, cs, i, j, b_counter, Some (store, cs', i', j', b_counter', pred, vs)) ->
       (* Printf.printf "Synthetic lab - conf cont!\n"; *)
      let cconf  = ConfCont (st, cs, i, j, b_counter, None) in
      Some (Await (cconf, (store, cs', i', j', b_counter'), (pred, vs)))

    | ConfFinish (fl, v, st, Some (store, cs, i, j, b_counter, pred, vs)) ->
      (* Printf.printf "Synthetic lab - conf finish!\n"; *)
      let cconf = ConfFinish (fl, v, st, None) in
      Some (Await (cconf, (store, cs, i, j, b_counter), (pred, vs)))

    | _ -> None


let run_proc (econf: econf_t) (fid : vt) (args : vt list) : (vt * state_t) option =
  L.log L.Normal (lazy (Printf.sprintf "ARGS: %s " (String.concat ", " (List.map Val.str args))));
  let (cconf, prog) = econf in
  let st =
    match cconf with
      | ConfCont (st, _, _, _, _, _)
      | ConfErr (_, _, st, _)
      | ConfFinish (_, _, st, _) -> Some (State.copy st)
      | _ -> None in
  let fid =
    match Val.to_literal fid with
      | Some (String fid) -> Some fid
      | _ -> None in
  let params : string list option =
    Option.map_default
      (fun (fid : string) ->
        match Prog.get_proc prog.prog fid with
        | Some proc -> Some (Proc.get_params proc)
        | _ -> None)
      None
      fid in
  let ret_fun (res : result_t) : (state_t * vt) option =
     match res with
       | RSucc (Flag.Normal, vt, st) -> Some (st, vt)
       | _ -> None in

  let ret =
    match st, fid, params with
      | Some st, Some fid, Some params ->
        let store = State.get_store st in
        let bindings = List.combine params args in
        List.iter (fun (p,v) -> Store.put store p v) bindings;
        (* Printf.printf "going to do evaluate_proc!"; *)
        evaluate_proc ret_fun prog fid params st
      | _ -> [] in

  match ret with
    | [ Some (st, v) ] -> Some (v, st)
    | _ -> None

let set_var (xvar: Var.t) (v: vt) (conf: cconf_t) : cconf_t =
  let state = get_state conf in
  let state' = update_store state xvar v in
  set_state conf state'

let new_conf (url: string) (setup_fid: string) (args: vt list) : econf_t =
  let jsil_path = IO_Utils.parse_url url in
  let ext_prog = Parsing_Utils.parse_eprog_from_file jsil_path in
  let basename = Filename.basename (Filename.chop_extension jsil_path) in
  let ext_prog = {ext_prog with filename = basename} in
  let prog = Parsing_Utils.eprog_to_prog ext_prog in
  let main_fid = Prog.get_main prog in
  let prog = UP.init_prog prog in
  match prog with 
  | Ok prog -> 
    let initial_conf = create_initial_conf prog (Some (setup_fid, args @ [Val.from_literal (String main_fid)])) in
    initial_conf, prog
  | _ -> raise (Failure "Program could not be initialised")


  let fresh_lvar (x: string) (s:string) (conf: cconf_t) (vart: Type.t) : cconf_t =
    let state     = get_state conf in
    let state'    = State.add_spec_vars state (Var.Set.of_list [ s ]) in
    let f = Formula.Eq (UnOp (TypeOf, (LVar s)), Lit (Type vart)) in
    match State.assume_a state' [ f ] with
    | Some state'' -> let v = make_eval_expr state'' (LVar s) in
                      let state'' = update_store state'' x v in
                      set_state conf state'' 
    | None -> raise (Failure "Cannot create fresh lvar")

end
