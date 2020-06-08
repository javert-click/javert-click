open CCommon
open Parsing_Utils
open JSParserSyntax
open JS2JSIL_Constants
open JS_Utils

exception CannotHappen
exception No_Codename
exception EarlyError of string

(********************************************)
(********************************************)
(***         Compilation Tables           ***)
(********************************************)
(********************************************)

let string_of_vtf_tbl (var_tbl : var_to_fid_tbl_type) =
  let var_tbl_str =
    Hashtbl.fold
      (fun v fid ac ->
        let v_fid_pair_str = v ^ ": " ^ fid in
        if (ac = "")
          then v_fid_pair_str
          else ac ^ ", " ^ v_fid_pair_str)
      var_tbl
      "" in
  "[ " ^ var_tbl_str ^ "]"


let rec string_of_cc_tbl (cc_tbl : cc_tbl_type)  =
  Hashtbl.fold
    (fun f_id f_tbl ac ->
      let f_tbl_str : string = string_of_vtf_tbl f_tbl in
      let f_str = f_id ^ ": " ^ f_tbl_str ^ "\n" in
      ac ^ f_str)
    cc_tbl
    ""

let update_fun_tbl
  (fun_tbl        : pre_fun_tbl_type)
  (f_id           : string)
  (f_args         : string list)
  (f_body         : JSParserSyntax.exp option)
  (annotations    : JSParserSyntax.annotation list)
  (var_to_fid_tbl : var_to_fid_tbl_type)
  (vis_list       : string list) =
  (* let fun_spec, f_rec = process_js_logic_annotations f_id f_args annotations Requires Ensures EnsuresErr var_to_fid_tbl vis_list in *)
  Hashtbl.replace fun_tbl f_id (f_id, f_args, f_body, (annotations, vis_list, var_to_fid_tbl))


let update_cc_tbl (cc_tbl : cc_tbl_type) (f_parent_id : string) (f_id : string) (f_vars : string list) =
  let f_parent_var_table = get_scope_table cc_tbl f_parent_id in
  let new_f_tbl = Hashtbl.create 101 in
  Hashtbl.iter
    (fun x x_f_id -> Hashtbl.add new_f_tbl x x_f_id)
    f_parent_var_table;
  List.iter
    (fun v -> Hashtbl.replace new_f_tbl v f_id)
    f_vars;
  Hashtbl.add cc_tbl f_id new_f_tbl;
  new_f_tbl


let update_cc_tbl_single_var_er (cc_tbl : cc_tbl_type) (f_parent_id : string) (f_id : string) (x : string) =
  let f_parent_var_table =
    try Hashtbl.find cc_tbl f_parent_id
    with _ ->
      let msg = Printf.sprintf "the parent function of %s -- %s -- was not found in the cc table" f_id f_parent_id in
      L.fail msg in

  let new_f_tbl = Hashtbl.create 101 in
  Hashtbl.iter
    (fun x x_f_id -> Hashtbl.add new_f_tbl x x_f_id)
    f_parent_var_table;
  Hashtbl.replace new_f_tbl x f_id;
  Hashtbl.add cc_tbl f_id new_f_tbl;
  new_f_tbl


let get_vis_list_index vis_list fid =
  let rec loop cur vis_list =
    match vis_list with
    | [] -> raise (Failure ("get_vis_list_index: DEATH: " ^ fid))
    | cur_fid :: rest ->
      if (cur_fid = fid)
        then cur
        else loop (cur + 1) rest in
  loop 0 vis_list


(********************************************)
(********************************************)
(***         Annotations                  ***)
(********************************************)
(********************************************)

let update_annotation annots atype new_value =
  let old_removed = List.filter (fun annot -> annot.annot_type <> atype) annots in
  let annot = {annot_type = atype; annot_formula = new_value} in
  annot :: old_removed


let is_logic_cmd_annot annot = (annot.annot_type = JSParserSyntax.Tactic)

let is_spec_annot annot =
  let annot_type = annot.annot_type in
  (annot_type = JSParserSyntax.Id) || (annot_type = JSParserSyntax.Requires) ||
    (annot_type = JSParserSyntax.Ensures) || (annot_type = JSParserSyntax.EnsuresErr) ||
      (annot_type = JSParserSyntax.BiAbduce)


let get_top_level_annot e =
  match e.JSParserSyntax.exp_stx with
  | Script (_, les) ->
    let first_le = List.nth les 0 in
    let annot = first_le.JSParserSyntax.exp_annot in
    annot
  | _ -> []

let get_annotations_from_f_id fun_tbl f_id =
  let (_, _, _, (annotations, _, _)) = Hashtbl.find fun_tbl f_id in
  annotations

(********************************************)
(********************************************)
(***       IDs and CodeNames              ***)
(********************************************)
(********************************************)

let sanitise name =
  let s = Str.global_replace (Str.regexp "\$") "_" name in
  s

let update_codename_annotation annots fresh_name_generator : JSParserSyntax.annotation list * string =
  let ids = List.filter (fun annot -> annot.annot_type = Id) annots in
  (match ids with
  | [ ]    ->
     let new_id = fresh_name_generator () in
     update_annotation annots Codename new_id, new_id
  | [ id ] -> update_annotation annots Codename id.annot_formula, id.annot_formula
  | _ :: _ -> raise (Failure "you cannot have more than one identifier per function"))

let get_codename exp =
  let codenames = List.filter (fun annot -> annot.annot_type = Codename) exp.exp_annot in
  match codenames with
    | [codename] -> codename.annot_formula
    | _ -> raise No_Codename


let rec add_codenames exp =
  let code_names = ref [] in
  let f_m e =
    match e.exp_stx with
    | FunctionExp _ ->
      let new_annot, id = update_codename_annotation e.exp_annot fresh_anonymous in
      code_names := id :: (!code_names);
      {e with exp_stx = e.exp_stx; exp_annot = new_annot }

    | Function (str, Some name, args, fb, async) ->
      let name_generator : unit -> string = (fun () -> fresh_named (sanitise name)) in
      let new_annot, id = update_codename_annotation e.exp_annot name_generator in
      code_names := id :: (!code_names);
      {exp with exp_stx = e.exp_stx; exp_annot = new_annot }

    | Function (str, None, args, fb, async) ->
      let name = fresh_anonymous () in
      let name_generator : unit -> string = (fun () -> fresh_named (name)) in
      let new_annot, id = update_codename_annotation e.exp_annot name_generator in
      code_names := id :: (!code_names);
      {exp with exp_stx = e.exp_stx; exp_annot = new_annot }
    | Try _ ->
      let catch_id = fresh_catch_anonymous () in
      let annot = [{annot_type = Codename; annot_formula = catch_id}] in
      { exp with exp_stx = e.exp_stx; exp_annot = annot }
    | ArrowExp _ -> e
    | _ -> e in

  let new_exp = js_map f_m exp in
  new_exp, (List.rev !code_names)


(********************************************)
(********************************************)
(***         Closure Clarification        ***)
(********************************************)
(********************************************)

let closure_clarification
    (cc_tbl       : JS2JSIL_Constants.cc_tbl_type)
    (fun_tbl      : JS2JSIL_Constants.pre_fun_tbl_type)
    (vis_tbl      : vis_tbl_type)
    (f_id         : string)
    (visited_funs : string list)
    (exp          : JSParserSyntax.exp) =

  let rec f_state e state =
    match state with
    | None -> None
    | Some (f_id, visited_funs) -> (
      let cur_annot = e.JSParserSyntax.exp_annot in
      match e.exp_stx with
      | FunctionExp (_, f_name, args, fb, _, _) ->
        (match f_name with
        | None ->
          let new_f_id = get_codename e in
          let new_f_tbl = update_cc_tbl cc_tbl f_id new_f_id (get_all_vars_f fb args) in
          let new_visited_funs = visited_funs @ [ new_f_id ] in
          update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl new_visited_funs;
          Hashtbl.replace vis_tbl new_f_id new_visited_funs;
          Some (new_f_id, new_visited_funs)
        | Some f_name ->
          let new_f_id = get_codename e in
          let new_f_id_outer = new_f_id ^ "_outer" in
          let _ = update_cc_tbl_single_var_er cc_tbl f_id new_f_id_outer f_name in
          let new_f_tbl = update_cc_tbl cc_tbl new_f_id_outer new_f_id (get_all_vars_f fb args) in
          update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl (visited_funs @ [ new_f_id_outer; new_f_id ]);
          Hashtbl.replace vis_tbl new_f_id (visited_funs @ [ new_f_id_outer; new_f_id ]);
          Some (new_f_id, (visited_funs @ [ new_f_id_outer; new_f_id ])))
      | Function (_, f_name, args, fb, _) ->
        let new_f_id = get_codename e in
        let new_f_tbl = update_cc_tbl cc_tbl f_id new_f_id (get_all_vars_f fb args) in
        update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl (visited_funs @ [ new_f_id ]);
        Hashtbl.replace vis_tbl new_f_id (visited_funs @ [ new_f_id ]);
        Some (new_f_id, (visited_funs @ [ new_f_id ]))
      | Try (_, Some (_, _), _)  -> None
      | _     -> state) in

  let rec f_ac e state prev_state ac =
    match prev_state with
    | None -> ac
    | Some (f_id, visited_funs) ->
      match e.exp_stx with
      | Try (e1, Some (x, e2), e3) ->
        let f = js_fold true f_ac f_state in
        let _ = f prev_state e1 in
        let _ = Option.map (f prev_state) e3 in
        let new_f_id = get_codename e in
        update_cc_tbl_single_var_er cc_tbl f_id new_f_id x;
        f (Some (new_f_id, (visited_funs @ [ new_f_id ]))) e2
      | _ -> [] in
  js_fold true f_ac f_state (Some (f_id, visited_funs)) exp


(********************************************)
(********************************************)
(***         Folds and Unfolds            ***)
(********************************************)
(********************************************)

let rec propagate_annotations e =

  let f_state state exp =
    let _, prev_annots = state in
    match exp.exp_stx with
    (* Propagate the specs *)
    | Call _ | New _ ->
      let spec_annots = (List.filter is_spec_annot prev_annots) @ (List.filter is_spec_annot exp.exp_annot) in
      false, spec_annots
    (* Propagate the lcmds *)
    | Function _ | FunctionExp _ ->
      let lcmd_annots = (List.filter is_logic_cmd_annot prev_annots) @ (List.filter is_logic_cmd_annot exp.exp_annot) in
      false, lcmd_annots
    (* Propagate the lcmds and specs *)
    | _ ->
      let spec_annots = List.filter is_spec_annot exp.exp_annot in
      let lcmd_annots = List.filter is_logic_cmd_annot exp.exp_annot in
      false, (prev_annots @ spec_annots @ lcmd_annots) in

  let f_transform exp new_exp_stx state_i state_f =
    let no_propagation_i, prev_annots         = state_i in
    let no_propagation_f, annots_to_propagate = state_f in

    let annots_to_stay =
      match exp.exp_stx with
      (* everything stays except for the specs *)
      | Call _ | New _ ->
        let f annot = not (is_spec_annot annot) in
        (List.filter f prev_annots) @ (List.filter f exp.exp_annot)
      (* everything stays except for the lcmds *)
      | Function _ | FunctionExp _ ->
        let f annot = not (is_logic_cmd_annot annot) in
        let ret = (List.filter f prev_annots) @ (List.filter f exp.exp_annot) in
        (* Printf.printf "I am transforming the function literal %s annotating it with: %s\n"
          (JSPrettyPrint.string_of_exp true exp) (JSPrettyPrint.string_of_annots ret); *)
        ret
      (* everything stays except specs and lcmds *)
      | _ ->
        let f annot = not (is_spec_annot annot || is_logic_cmd_annot annot) in
         (List.filter f prev_annots) @ (List.filter f exp.exp_annot) in

    let annots_to_stay, annots_to_propagate =
      if (no_propagation_i) then ((annots_to_propagate @ annots_to_stay), []) else annots_to_stay, annots_to_propagate in

    (* Printf.printf "I found the following annots to stay: %s and the following annots to propagate: %s in the expression %s\n"
      (JSPrettyPrint.string_of_annots annots_to_stay)
      (JSPrettyPrint.string_of_annots annots_to_propagate)
      (JSPrettyPrint.string_of_exp_syntax_1 new_exp_stx true); *)

    { exp with exp_stx = new_exp_stx; exp_annot = annots_to_stay }, (no_propagation_f, annots_to_propagate) in

  let init_state = (true, []) in

  js_map_with_state f_transform f_state init_state init_state e



(********************************************)
(********************************************)
(***     Early Errors                     ***)
(********************************************)
(********************************************)


let test_expr_eval_arguments_assignment exp =
  List.exists (fun it -> it = "eval" || it = "arguments") (get_all_assigned_declared_identifiers exp)

let test_early_errors e =
  if test_func_decl_in_block e then raise (EarlyError "Function declaration in statement position or use of `with`");
  if test_expr_eval_arguments_assignment e then raise (EarlyError "Expression assigns to `eval` or `arguments`.")


(**************************************************)
(**************************************************)
(***   Translation of logic annotations         ***)
(**************************************************)
(**************************************************)

let get_predicate_defs_from_annots annots : JSPred.t list =
  let pred_def_annots = List.filter (fun annot -> annot.annot_type == JSParserSyntax.Pred) annots in
  let pred_defs = List.map (fun pred_def -> parse_js_logic_predicate_from_string ("pred " ^ pred_def.annot_formula)) pred_def_annots in
  pred_defs


let get_only_specs_from_annots annots : JSSpec.t list =
  let only_specs_annots = List.filter (fun annot -> annot.annot_type == JSParserSyntax.OnlySpec) annots in
  List.map (fun only_spec -> parse_js_only_spec_from_string ("js_only_spec " ^ only_spec.annot_formula)) only_specs_annots


let parse_annots_formulae annots =
  let lcmds = List.map
    (fun annot ->
      let lcmds = parse_js_logic_commands_from_string annot.annot_formula in
      lcmds) annots in
  List.concat lcmds


let translate_lannots_in_exp
    (cc_tbl                  : cc_tbl_type)
    (vis_tbl                 : vis_tbl_type)
    (fun_tbl                 : pre_fun_tbl_type)
    (fid                     : string)
    (scope_var               : string)
    (inside_stmt_compilation : bool)
    e =
  let is_e_expr = not (is_stmt e) in
  if (is_e_expr && inside_stmt_compilation) then ([], [], None) else (
    let lcmds   = parse_annots_formulae (List.filter is_logic_cmd_annot e.exp_annot) in

    let lcmds', usubst_lst =
      List.partition
        (fun lcmd ->
          match (lcmd : JSLCmd.t) with
            | UseSubst _ -> false
            | _ -> true)
        lcmds in

    let use_subst_lcmd =
      match usubst_lst with
        | [] -> None
        | [ UseSubst (spec_lab, subst_lst) ] ->
          let subst_lst = List.map (fun (x, le) -> x, (JSExpr.js2jsil (Some (Expr.PVar scope_var)) le)) subst_lst in
          Some (spec_lab, subst_lst)
        | _ -> raise (Failure "ONE USE SUBST PER FUNCTION CALL!!! BE REASONABLE!!") in

    let t_lcmds = List.concat (List.map (JSLCmd.js2jsil cc_tbl vis_tbl fun_tbl fid scope_var) lcmds') in

    let rec fold_partition lcmds lcmds_so_far =
      (match lcmds with
      | []                         -> (List.rev lcmds_so_far), []
      | (LCmd.SL (Fold _)) :: rest -> (List.rev lcmds_so_far), lcmds
      | lcmd :: rest               -> fold_partition rest (lcmd :: lcmds_so_far)) in

    match e.exp_stx with
    | Call _ | New _ ->
        let lcmds, lcmds' = fold_partition t_lcmds [] in
        lcmds, lcmds', use_subst_lcmd
    | _              -> t_lcmds, [], None
  )


let translate_invariant_in_exp
    (cc_tbl : cc_tbl_type) (vis_tbl : vis_tbl_type) (fun_tbl : pre_fun_tbl_type)
    (fid : string) (sc_var : string) (e : JSParserSyntax.exp) : Asrt.t option =
  let invariant = List.filter (fun annot -> annot.annot_type == JSParserSyntax.Invariant) e.exp_annot in
  match invariant with
  | _ :: _ :: _   -> raise (Failure "DEATH: No more than one invariant per command")
  | [ ]           -> None
  | [ invariant ] ->
    let a = parse_js_logic_assertion_from_string invariant.annot_formula in
    Some (JSAsrt.js2jsil_tactic cc_tbl vis_tbl fun_tbl fid sc_var a)


let translate_single_func_specs
      (cc_tbl              : cc_tbl_type)
      (vis_tbl             : vis_tbl_type)
      (fun_tbl             : pre_fun_tbl_type)
      (fid                 : string)
      (fun_args            : string list)
      (annotations         : JSParserSyntax.annotation list)
      (requires_flag       : JSParserSyntax.annotation_type)
      (ensures_normal_flag : JSParserSyntax.annotation_type)
      (ensure_err_flag     : JSParserSyntax.annotation_type) =
  (* Printf.printf "Inside process_js_logic_annotations. function: %s.\n\nAnnotations: \n%s\n\n" fid (JSPrettyPrint.string_of_annots annotations); *)

  let var_to_fid_tbl : var_to_fid_tbl_type = get_scope_table cc_tbl fid in
  let vis_list = get_vis_list vis_tbl fid in

  (*
  let annot_types_str : string = String.concat ", " (List.map (fun annot -> JSPrettyPrint.string_of_annot_type annot.annot_type) annotations) in
  Printf.printf "annot types: %s\n\n" annot_types_str; *)

  let preconditions  = List.filter (fun annotation -> annotation.annot_type = requires_flag) annotations in
  let postconditions = List.filter (fun annotation -> (annotation.annot_type = ensures_normal_flag) || (annotation.annot_type = ensure_err_flag)) annotations in

  (* Printf.printf "number of preconditions: %d. number of postconditions: %d\n" (List.length preconditions) (List.length postconditions); *)

  let single_specs =
    if ((List.length preconditions) <> (List.length postconditions)) then (
      Printf.printf "WARNING: In %s, preconditions do NOT match postconditions.\n" fid;
      [] ) else
    List.map2
    (fun pre posts ->
      let pre_str   = pre.annot_formula in
      let post_str  = posts.annot_formula in
      let annot_type = posts.annot_type in
      let ret_flag  =
        if (annot_type = ensures_normal_flag)
          then Flag.Normal
          else (if (annot_type = ensure_err_flag)
            then Flag.Error
            else raise (Failure "DEATH: process_js_logic_annotations")) in
      (* Printf.printf "pre_str: %s. post_str: %s\n" pre_str post_str; *)
      let (lab_js, pre_js) : (string * string list) option * JSAsrt.t      = parse_js_pre_from_string pre_str in
      let posts_js : JSAsrt.t list = parse_js_logic_assertion_list_from_string post_str in
      (* Printf.printf "I managed to parse the js assertions\n"; *)

      let pre_jsil, posts_jsil = JSSpec.js2jsil_st pre_js posts_js cc_tbl vis_tbl fun_tbl fid fun_args in
      let new_spec  = Spec.s_init ?label:lab_js pre_jsil posts_jsil ret_flag true in
      new_spec)
    preconditions
    postconditions in


  let fun_spec = if ((List.length single_specs) > 0)
    then Some (Spec.init fid fun_args single_specs false true)
    else None in
  fun_spec


(**
  * Populates the new fun_tbl given the old fun_tbl
  * by compiling the specs in the old fun_tbl
*)
let translate_specs
    (cc_tbl      : cc_tbl_type)
    (vis_tbl     : vis_tbl_type)
    (old_fun_tbl : JS2JSIL_Constants.pre_fun_tbl_type)
    (new_fun_tbl : JS2JSIL_Constants.fun_tbl_type) =

  (* Understand bi-abduction *)
  if (!SCommon.bi) then (
    Hashtbl.iter (fun _ (_, _, _, (annotations, _, _)) ->
      List.iter (fun annot ->
        if annot.annot_type = JSParserSyntax.BiAbduce then
          SCommon.bi_dflt := false) annotations
    ) old_fun_tbl
  ) else ();

  Hashtbl.iter
    (fun f_id (f_id, f_args, f_body, (annotations, _, _)) ->
      let only_jsil = List.filter (fun ann -> ann.annot_type == JSIL_only) annotations in
      let non_main_args =
      (match only_jsil with
      | [] -> JS2JSIL_Constants.var_scope :: (JS2JSIL_Constants.var_this :: f_args)
      | _ -> f_args) in
      let fun_specs =
        if (not (is_main f_id))
          then translate_single_func_specs cc_tbl vis_tbl old_fun_tbl f_id non_main_args annotations Requires Ensures EnsuresErr
          else translate_single_func_specs cc_tbl vis_tbl old_fun_tbl f_id [] annotations TopRequires TopEnsures TopEnsuresErr in
      Hashtbl.add new_fun_tbl f_id (f_id, f_args, f_body, fun_specs, annotations))
    old_fun_tbl


let rec get_predicate_definitions exp =
  let f_ac exp state prev_state ac =
    let new_pred_defs : JSPred.t list = (get_predicate_defs_from_annots exp.JSParserSyntax.exp_annot) in
     new_pred_defs @ ac in
  js_fold true f_ac (fun x y -> y) true exp


let translate_only_specs cc_tbl old_fun_tbl fun_tbl vis_tbl js_only_specs main_fid =
  let only_specs = Hashtbl.create medium_tbl_size in
  List.iter
  (fun { JSSpec.name; JSSpec.params; JSSpec.sspecs } ->
    Hashtbl.replace vis_tbl name [ name; main_fid ];
    let sspecs =
      List.map (fun { JSSpec.pre; JSSpec.post; JSSpec.flag; JSSpec.label } : Spec.st ->
        let pre, post = JSSpec.js2jsil_st pre post cc_tbl vis_tbl (Hashtbl.create 0) name params in
        { pre = pre; posts = post; flag = flag; to_verify = true; label = label }) sspecs in
    let spec : Spec.t =
      {
        name       = name;
        params     = [JS2JSIL_Constants.var_scope; JS2JSIL_Constants.var_this] @ params;
        sspecs     = sspecs;
        normalised = false;
        to_verify  = true
      } in
    Hashtbl.replace only_specs  name spec;
    Hashtbl.replace cc_tbl      name (Hashtbl.create 1);
    Hashtbl.replace old_fun_tbl name (name, params, None, ([], [ name; main_fid ], Hashtbl.create 1));
    Hashtbl.replace fun_tbl     name (name, params, None, Some spec, []);
  ) js_only_specs;
  only_specs



(********************************************)
(********************************************)
(***   Initial Preprocessing Function     ***)
(********************************************)
(********************************************)

let preprocess
  (cc_tbl      : cc_tbl_type)
  (fun_tbl     : fun_tbl_type)
  (vis_tbl     : vis_tbl_type)
  (e           : JSParserSyntax.exp)
  (main_fid    : string) =

  (* 0 - testing early errors                      *)
  test_early_errors e;

  (* 1 - propagating annotations                   *)
  let e, _ = propagate_annotations e in

  (* 2 - obtaining and compiling only-specs        *)
  let top_annots = get_top_level_annot e in
  let js_only_specs = get_only_specs_from_annots top_annots in
  let old_fun_tbl : pre_fun_tbl_type = Hashtbl.create medium_tbl_size in
  let only_specs = translate_only_specs cc_tbl old_fun_tbl fun_tbl vis_tbl js_only_specs main_fid in

  (* 3 - Adding the main to the translation tables *)
  let main_tbl = Hashtbl.create medium_tbl_size in
  List.iter (fun v -> Hashtbl.replace main_tbl v main_fid) (get_all_vars_f e []);
  Hashtbl.add cc_tbl main_fid main_tbl;
  Hashtbl.add old_fun_tbl main_fid (main_fid, [], Some e, (top_annots, [ main_fid ], main_tbl));
  Hashtbl.add vis_tbl main_fid [ main_fid ];

  (* 4 - Add unique ids to function literals       *)
  let e, code_names = add_codenames e in

  (* 5 - Closure clarification                     *)
  closure_clarification cc_tbl old_fun_tbl vis_tbl main_fid [ main_fid ] e;

  (* 6 - Translate JS Specs                        *)
  translate_specs cc_tbl vis_tbl old_fun_tbl fun_tbl;

  (* 7 - Translate JS Predicate Definitions        *)
  let js_predicate_definitions : JSPred.t list = get_predicate_definitions e in
  let jsil_predicate_definitions =
    List.map (fun pred_def -> JSPred.js2jsil pred_def cc_tbl vis_tbl old_fun_tbl) js_predicate_definitions in
  let predicates : (string, Pred.t) Hashtbl.t = Pred.init jsil_predicate_definitions in

  e, only_specs, predicates, code_names

(********************************************)
(********************************************)
(***         Closure Clarification        ***)
(********************************************)
(********************************************)

let get_them_functions
    (cc_tbl       : JS2JSIL_Constants.cc_tbl_type)
    (fun_tbl      : JS2JSIL_Constants.pre_fun_tbl_type)
    (vis_tbl      : vis_tbl_type)
    (f_id         : string)
    (visited_funs : string list)
    (exp          : JSParserSyntax.exp) =

  let rec f_state e state =
    match state with
    | None -> None
    | Some (f_id, visited_funs) -> (
      let cur_annot = e.JSParserSyntax.exp_annot in
      match e.exp_stx with
      | FunctionExp (_, f_name, args, fb, _, _) ->
        (match f_name with
        | None ->
          let new_f_id = get_codename e in
          let new_f_tbl = update_cc_tbl cc_tbl f_id new_f_id (get_all_vars_f fb args) in
          let new_visited_funs = visited_funs @ [ new_f_id ] in
          update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl new_visited_funs;
          Hashtbl.replace vis_tbl new_f_id new_visited_funs;
          Some (new_f_id, new_visited_funs)
        | Some f_name ->
          let new_f_id = get_codename e in
          let new_f_id_outer = new_f_id ^ "_outer" in
          let _ = update_cc_tbl_single_var_er cc_tbl f_id new_f_id_outer f_name in
          let new_f_tbl = update_cc_tbl cc_tbl new_f_id_outer new_f_id (get_all_vars_f fb args) in
          update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl (visited_funs @ [ new_f_id_outer; new_f_id ]);
          Hashtbl.replace vis_tbl new_f_id (visited_funs @ [ new_f_id_outer; new_f_id ]);
          Some (new_f_id, (visited_funs @ [ new_f_id_outer; new_f_id ])))
      | Function (_, f_name, args, fb, _) ->
        let new_f_id = get_codename e in
        let new_f_tbl = update_cc_tbl cc_tbl f_id new_f_id (get_all_vars_f fb args) in
        update_fun_tbl fun_tbl new_f_id args (Some fb) cur_annot new_f_tbl (visited_funs @ [ new_f_id ]);
        Hashtbl.replace vis_tbl new_f_id (visited_funs @ [ new_f_id ]);
        Some (new_f_id, (visited_funs @ [ new_f_id ]))
      | Try (_, Some (_, _), _)  -> None
      | _     -> state) in

  let rec f_ac e state prev_state ac =
    match prev_state with
    | None -> ac
    | Some (f_id, visited_funs) ->
      match e.exp_stx with
      | Try (e1, Some (x, e2), e3) ->
        let f = js_fold true f_ac f_state in
        let _ = f prev_state e1 in
        let _ = Option.map (f prev_state) e3 in
        let new_f_id = get_codename e in
        update_cc_tbl_single_var_er cc_tbl f_id new_f_id x;
        f (Some (new_f_id, (visited_funs @ [ new_f_id ]))) e2
      | _ -> [] in
  js_fold true f_ac f_state (Some (f_id, visited_funs)) exp

let preprocess_eval
  (cc_tbl      : cc_tbl_type)
  (vis_tbl     : vis_tbl_type)
  (e           : JSParserSyntax.exp)
  (fid_parent  : string)
  (params      : string list) =

  let offset_converter x = 0 in
  let fid                =
    if ((List.length params) > 0)
      then fresh_anonymous ()
      else fresh_anonymous_eval () in
  let pre_fun_tbl        = Hashtbl.create small_tbl_size in
  let fun_tbl            = Hashtbl.create small_tbl_size in

  let vislist =
    try (Hashtbl.find vis_tbl fid_parent) @ [ fid ]
      with _ -> raise (Failure (Printf.sprintf "Function %s not found in visibility table" fid_parent)) in

  (* 0 - testing early errors                      *)
   let hacked_e = (match e.exp_stx with
    | Block les -> { e with exp_stx = Script (true, les) }
    | _ -> e) in
    test_early_errors hacked_e;

  (* 1 - Add unique ids to function literals       *)
  let (e : JSParserSyntax.exp), _ = add_codenames e in

  (* 2 - Adding the eval body to the translation tables *)
  update_cc_tbl cc_tbl fid_parent fid (get_all_vars_f e params);
  Hashtbl.add pre_fun_tbl fid (fid, [var_scope; var_this] @ params, Some e, ([], vislist, Hashtbl.create small_tbl_size));
  Hashtbl.add vis_tbl fid vislist;

  (* 3 - Closure clarification                     *)
  closure_clarification cc_tbl pre_fun_tbl vis_tbl fid vislist e;


  (* 4 - Translate Specs                           *)
  translate_specs cc_tbl vis_tbl pre_fun_tbl fun_tbl;

  e, fid, vislist, fun_tbl


let preprocess_eval_jsil
    (e : JSParserSyntax.exp) : string * fun_tbl_type =

  let proc_eval_id = fresh_anonymous_eval () in
  let fun_tbl = Hashtbl.create 3 in

  Hashtbl.add fun_tbl proc_eval_id (proc_eval_id, [var_scope; var_this], Some e, None, []);
  proc_eval_id, fun_tbl




