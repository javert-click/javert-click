open CCommon
open SCommon
open SVal

(* When reduction fails *)
exception ReductionException of Expr.t * string

module L = Logging

module CStore = MakeStore.M(CVal.M)

(*  ------------------------------------------------------------------
 *  List Preprocessing
 *  ------------------------------------------------------------------
 *  Preprocess list logical expressions for which we know
 *  the length statically. If a |- l-len(le) = i, where i is
 *  a concrete number, we add the assertion le = {{ #x1, ..., #xi }}
 *  to a and replace all the occurrences of l-nth(le, j) for #xj in a
 *  ------------------------------------------------------------------
**)
let pre_process_list_exprs (a : Asrt.t) =

  (* 1 - Find the lists for which we know the length *)
  let find_list_exprs_to_concretize (a : Asrt.t) : (Expr.t, (Expr.t list)) Hashtbl.t =
    let f_ac_1 a _ _ ac =
      (match (a : Asrt.t) with
      | Pure (Eq (EList _, EList _)) -> (List.concat ac)
      | Pure (Eq (le, EList les))
      | Pure (Eq (EList les, le)) -> (le, les) :: (List.concat ac)
      | _ -> (List.concat ac)) in
    let lists1 = Asrt.fold None None f_ac_1 None None a in

    let f_ac_2 a _ _ ac =
      (match (a : Asrt.t) with
      | Pure (Eq (UnOp (LstLen, le), Lit (Num i))) ->
        let vars_le = Array.to_list (Array.init (int_of_float i) (fun j -> Expr.LVar (fresh_lvar ()))) in
        (le, vars_le) :: (List.concat ac)
      | _ -> (List.concat ac)) in
    let lists2 = Asrt.fold None None f_ac_2 None None a in

    let lst_exprs = lists2 @ lists1 in
    let lists_tbl = Hashtbl.create (List.length lst_exprs) in
    List.iter (fun (le, les) ->
      if (Hashtbl.mem lists_tbl le) then () else (
        Hashtbl.replace lists_tbl le les
    )) lst_exprs;
    lists_tbl in


  (* 2 - Replace expressions of the form l-nth(le, i) where le denotes a list for which
         we know the length and i a concrete number with the newly created logical variable.
         E.g. if we associated in 2) le with a the list of logical variables
              {{ V1, ..., Vi, ..., Vn}}, l-nth(le, i) is replaced with Vi  *)
  let concretize_list_accesses
    (a : Asrt.t)
    (new_lists : (Expr.t, (Expr.t list)) Hashtbl.t) : Asrt.t =
    let f_e le =
      match (le : Expr.t) with
      | BinOp (le', LstNth, Lit (Num i)) ->
        (try
          let vs = Hashtbl.find new_lists le' in
          let le'' = List.nth vs (int_of_float i) in
          le'', false
        with _ -> le, false)
      | _ -> le, true  in
    Asrt.map None None (Some (Expr.map f_e None)) None a in


  (* 3 - Generate the equalities relating the expressions that denote lists whose
         length is statically known with the lists of the newly created logical variables *)
  let make_new_list_as
    (a : Asrt.t)
    (new_lists : (Expr.t, (Expr.t list)) Hashtbl.t) : Asrt.t  =
    let new_list_as =
      Hashtbl.fold
        (fun le les (ac : Asrt.t list) -> (Pure (Eq (le, EList les))) :: ac)
        new_lists [ a ] in
    Asrt.star new_list_as in

  (* Doing IT *)
  let new_lists = find_list_exprs_to_concretize a in
  let a'        = concretize_list_accesses a new_lists in
  make_new_list_as a' new_lists




(** Rewrite logical expressions involving lists as: 
      n_list ::= {{ E_1,  ..., E_n }} @ E | {{ E_1, ..., E_n }}
  where E is not of the form {{ E_1,  ..., E_n }}
 **)
let rec normalise_list_expressions (le : Expr.t) : Expr.t =
  let f = normalise_list_expressions in 
  
  let rec tl_cat_mems (le : Expr.t) : Expr.t list = 
    match le with 
      | BinOp (le_l, LstCat, le_r) -> (tl_cat_mems le_l) @ (tl_cat_mems le_r)
      | _ -> [ le ] in 
    
  let merge_cat_mems (les : Expr.t list) : Expr.t list = 
    let (ac_les : Expr.t list), (last : Expr.t list option) =
      List.fold_left (fun (ac_les, last) le -> 
        match (last : Expr.t list option), (le : Expr.t) with 
          | Some les', EList les'' -> (ac_les, Some (les' @ les''))
          | None, EList les'' -> (ac_les, Some les'')
          | Some les', _ -> (ac_les @ [Expr.EList les'; le]), None 
          | None, _ -> (ac_les @ [ le ]), None 
      ) ([], None) les in 
    match last with 
      | Some les' -> ac_les @ [ EList les' ]
      | None -> ac_les in 

  let right_cat_assoc (les : Expr.t list) : Expr.t = 
    let le = 
      List.fold_right (fun le ac ->
        match ac with 
          | None -> Some le 
          | Some le_ac -> 
              Some (Expr.BinOp (le, LstCat, le_ac))
      ) les None in 
    match le with 
      | Some le -> le 
      | None -> raise (Failure "DEATH. right_cat_assoc") in 

  let normalise_assoc_cat (le : Expr.t) : Expr.t = 
    let cat_mems = tl_cat_mems le in 
    let cat_mems = merge_cat_mems cat_mems in 
    right_cat_assoc cat_mems in  

  let ret = 
    match (le : Expr.t) with 
  
    (** Literals **)
    | Lit (LList lst) -> Expr.from_lit_list (LList lst)

    | Lit _ -> le 

    (** lvar, aloc, pvar **)
    | LVar _ | ALoc _ | PVar _ -> le 

    (** Binary Operators **)
    | BinOp (hd, LstCons, tl) -> 
      let hd' = f hd in 
      (match f tl with 
      | EList lst                      -> EList (hd' :: lst)
      | BinOp (EList lst, LstCat, tl') -> BinOp (EList (hd' :: lst), LstCat, tl') 
      | tl                             -> BinOp (EList [ hd' ], LstCat, tl))
    
    | BinOp (lst_l, LstCat, lst_r) ->    
      (match f lst_l with 
      | EList lst_l ->
        if ((List.length lst_l) = 0) then lst_r else ( 
        (match f lst_r with 
        | EList lst_r                            -> EList (lst_l @ lst_r)
        | BinOp (EList lst_rl, LstCat, lst_rr)   -> BinOp (EList (lst_l @ lst_rl) , LstCat, lst_rr)
        | lst_r                                  -> BinOp (EList lst_l, LstCat, lst_r)))
      | lst_l -> BinOp (lst_l, LstCat, f lst_r))

    | BinOp (le, LstNth, n) -> 
      (match (f le), (f n) with 
        | EList lst, Lit (Num n) -> 
          (try List.nth lst (int_of_float n) with Failure _ -> raise (ReductionException (BinOp (le, LstNth, Lit (Num n)), "Invalid List Expression")))
        | BinOp (EList lst, LstCat, tl), Lit (Num n) when (n < (float_of_int (List.length lst))) -> 
          (try List.nth lst (int_of_float n) with Failure _ ->  raise (ReductionException (BinOp (le, LstNth, Lit (Num n)), "Invalid List Expression")))
        | BinOp (EList lst, LstCat, tl), Lit (Num n) when (n >= (float_of_int (List.length lst))) -> 
          (BinOp (tl, LstNth, Lit (Num (n -. (float_of_int (List.length lst))))))
        | le, n -> BinOp (le, LstNth, n)) 

    | BinOp (le1, op, le2) -> BinOp (f le1, op, f le2)

    (** Unary Operators **)
    | UnOp (Car, lst) -> 
      (match f lst with 
      | EList lst -> 
        (try List.hd lst with Failure _ ->  raise (ReductionException (UnOp (Car, EList lst), "Invalid List Expression")))
      | BinOp (EList lst_l, LstCat, tl) -> 
        (try List.hd lst_l with Failure _ -> raise (ReductionException (UnOp (Car, lst), "Invalid List Expression")))
      | lst -> UnOp(Car, lst))

    | UnOp (Cdr, lst) -> 
      (match f lst with 
      | EList lst -> 
        (try EList (List.tl lst) with Failure _ -> raise (ReductionException (UnOp (Cdr, EList lst), "Invalid List Expression")))
      | BinOp (EList lst_l, LstCat, tl) -> 
        (try BinOp (EList (List.tl lst_l), LstCat, tl) with Failure _ -> raise (ReductionException (UnOp (Cdr, lst), "Invalid List Expression")))
      | lst -> UnOp(Cdr, lst))

    | UnOp (LstLen, le) ->
      (match f le with 
      | EList lst                      -> Lit (Num (float_of_int (List.length lst)))
      | BinOp (EList lst, LstCat, tl) -> BinOp (Lit (Num (float_of_int (List.length lst))), Plus, f (UnOp (LstLen, tl)))
      | le                              -> UnOp (LstLen, le))

    | UnOp (op, le) -> UnOp (op, f le) 

    | NOp (op, les) -> NOp (op, List.map f les)

    (** Uninteresting cases **)
    | EList lst        -> EList (List.map f lst)
    | ESet lst         -> ESet (List.map f lst)  
    | Nono             -> Nono in 

  normalise_assoc_cat ret 
  


(*  -----------------------------------------------------
  Resolving locations and lists
  -----------------------------------------------------
  _____________________________________________________
*)


let resolve_list (le : Expr.t) (pfs : Formula.t list) : Expr.t = 

  let rec search x pfs =
    (match (pfs : Formula.t list) with
    | [] -> None
    
    | Eq (LVar x', le) :: rest
    | Eq (le, LVar x') :: rest  when x' = x ->
      let le' = normalise_list_expressions le in
      (match le' with 
      | EList le_lst  
      | BinOp (EList le_lst, LstCat, _) -> Some le' 
      | _ -> search x rest)

    | _ :: rest -> search x rest) in 


  match normalise_list_expressions le with 
  | LVar x -> 
    (match search x pfs with 
    | Some le -> le 
    | None    -> LVar x)
  | le     -> le 

let reshape_list (le_list : Expr.t) (len : int) : (Expr.t list) * Expr.t = 
  (match le_list with 
  | EList lst -> 
    let lst_l = Array.to_list (Array.sub (Array.of_list lst) 0 len) in 
    let lst_r = Array.to_list (Array.sub (Array.of_list lst) len ((List.length lst) - len)) in 
    lst_l, EList lst_r 
  | BinOp (EList lst_l, LstCat, lst_r) -> 
    let lst_l'   = Array.to_list (Array.sub (Array.of_list lst_l) 0 len) in 
    let lst_l''  = Array.to_list (Array.sub (Array.of_list lst_l) len ((List.length lst_l) - len)) in 
    if ((List.length lst_l'') > 0) 
      then lst_l', BinOp (EList lst_l'', LstCat, lst_r)
      else lst_l', lst_r 
  | _ -> raise (Failure "DEATH: List could not be reshaped"))

let resolve_location (lvar : string) (pfs : Formula.t list) : (string * SSubst.t) option =
  
  let original_pfs = 
    List.map (fun (a : Formula.t) : Formula.t -> 
      match (a : Formula.t) with 
      | Eq (le1, le2) -> 
        let le1' = normalise_list_expressions le1 in 
        (match (le1' : Expr.t) with 
        | EList _ 
        | BinOp (EList _, LstCat, _) -> Eq (le1', le2)
        | _ -> 
          let le2' = normalise_list_expressions le2 in
          Eq (le2', le1'))
      | _ -> a 
    ) pfs in 

  let subst = SSubst.init [] in 

  let rec shallow_loop pfs traversed_pfs found_other_bindings =
    (match (pfs : Formula.t list) with
    | [] -> None, found_other_bindings
    
    | Eq (LVar cur_lvar, ALoc loc) :: rest
    | Eq (ALoc loc, LVar cur_lvar) :: rest  ->
      if (cur_lvar = lvar) 
        then Some loc, found_other_bindings
        else (
          let found_other = SSubst.mem subst cur_lvar in  
          SSubst.put subst cur_lvar (ALoc loc); 
          shallow_loop rest ((List.hd pfs) :: traversed_pfs) found_other
        )

    | Eq (LVar cur_lvar, Lit (Loc loc)) :: rest
    | Eq (Lit (Loc loc), LVar cur_lvar) :: rest ->
      if (cur_lvar = lvar) 
        then Some loc, found_other_bindings 
        else (
          let found_other = SSubst.mem subst cur_lvar in
          SSubst.put subst cur_lvar (Lit (Loc loc)); 
          shallow_loop rest ((List.hd pfs) :: traversed_pfs) found_other
        )
    
    | Eq (le1, le2) :: rest ->
      (match le1 with 
      | EList le1_lst 
      | BinOp (EList le1_lst, LstCat, _) ->
        let le2' = resolve_list le2 (traversed_pfs @ rest) in 
        (match le2' with 
        | EList le2_lst 
        | BinOp (EList le2_lst, LstCat, _) -> 
          let min_len              = min (List.length le2_lst) (List.length le1_lst) in
          let le1_lst_l, le1_lst_r = reshape_list le1 min_len in 
          let le2_lst_l, le2_lst_r = reshape_list le2' min_len in 
          if ((List.length le1_lst_l) <> (List.length le2_lst_l)) then raise (Failure "DEATH") else (
            match shallow_loop_lists le1_lst_l le2_lst_l found_other_bindings with 
            | None, new_found_other_bindings -> 
              shallow_loop rest ((List.hd pfs) :: traversed_pfs) new_found_other_bindings
            | Some loc, new_found_other_bindings -> 
              Some loc, new_found_other_bindings)
        | _ -> shallow_loop rest ((List.hd pfs) :: traversed_pfs) found_other_bindings)
      | _ -> shallow_loop rest ((List.hd pfs) :: traversed_pfs) found_other_bindings)

    | _ :: rest -> shallow_loop rest ((List.hd pfs) :: traversed_pfs) found_other_bindings) 
  
  and shallow_loop_lists lst_1 lst_2 found_other_bindings = 
    shallow_loop (List.map2 (fun (le1 : Expr.t) (le2 : Expr.t) : Formula.t -> Eq (le1, le2)) lst_1 lst_2) [] found_other_bindings in

  let rec loop pfs =
    match shallow_loop pfs [] false with 
    | Some loc, _ -> Some (loc, subst) 
    | None, false -> None
    | None, true  -> loop (List.map (Formula.substitution subst true) pfs) in

  loop original_pfs

(***************************)
(* TYPING HELPER FUNCTIONS *)
(***************************)

let typable gamma (le : Expr.t) (target_type : Type.t) : bool = 
  let t, success, _ = Typing.type_lexpr gamma le in
    if success then 
      Option.map_default
      (fun t -> t = target_type) 
      (match le with | LVar _ | PVar _ -> true | _ -> false)
      t
    else
      (let msg : string = Printf.sprintf "TYPE ERROR: %s not typable in typing environment %s" (Expr.str le) (TypEnv.str gamma) in 
        L.fail msg)

(* Lists *)
let lexpr_is_list ?(gamma=TypEnv.init()) (le : Expr.t) : bool =
  typable gamma le ListType

(* Strings *)
let lexpr_is_string ?(gamma=TypEnv.init()) (le : Expr.t) : bool =
  typable gamma le StringType

(* Numbers *)
let lexpr_is_number ?(gamma=TypEnv.init()) (le : Expr.t) : bool =
  typable gamma le NumberType

(* Booleans *)
let lexpr_is_bool ?(gamma=TypEnv.init()) (le : Expr.t) : bool =
  typable gamma le BooleanType

(* Sets *)
let lexpr_is_set ?(gamma=TypEnv.init()) (le : Expr.t) : bool =
  typable gamma le SetType

(**********************************)
(* Pure formulae helper functions *)
(**********************************)

let find_first_equality_in_pfs (pfs : PFS.t) (le : Expr.t) : Expr.t option =
  let lpfs = PFS.to_list pfs in
  let lpfs = List.find_opt (fun x -> match x with | Formula.Eq (x, y) -> (x = le) || (y = le) | _ -> false) lpfs in
  let result = Option.map (fun x -> match x with | Formula.Eq (x, y) -> if x = le then y else x) lpfs in
    result

(***********************************)
(* LIST REASONING HELPER FUNCTIONS *)
(***********************************)

(* Finding the length of a list *)
let rec get_length_of_list (lst : Expr.t) : int option =
  let f = get_length_of_list in

  (match lst with
  | PVar _ -> None
  | LVar _ -> None
  | Lit (LList l) -> Some (List.length l)
  | EList l -> Some (List.length l)
  | BinOp (_, LstCons, le) -> Option.map (fun len -> 1 + len) (f le)
  | BinOp (lel, LstCat, ler) -> Option.default None (Option.map (fun ll -> Option.map (fun lr -> ll + lr) (f ler)) (f lel)) 
  | _ -> raise (Failure (Printf.sprintf "get_length_of_list: list equals %s, impossible" (Expr.str lst)))
  )

(* Finding the nth element of a list *)
let rec get_nth_of_list (lst : Expr.t) (idx : int) : Expr.t option =
  let f = get_nth_of_list in

  let err_msg = "get_nth_of_list: index out of bounds." in

  (* If we can compute the length of the list, then the index needs to be compatible *)
  let olen = get_length_of_list lst in
  let _ = match olen with
    | None -> ()
    | Some len -> if (len <= idx) then raise (ReductionException (Nono, err_msg))
  in

  (match lst with
  (* Nothing can be done for variables *)
  | PVar _ -> None
  | LVar _ -> None
  (* Base lists of literals and logical expressions *)
  | Lit (LList l) -> it_must_hold_that (lazy (idx < List.length l)); Some (Lit (List.nth l idx))
  | EList l       -> it_must_hold_that (lazy (idx < List.length l)); Some (List.nth l idx)
  | BinOp (hd, LstCons, lst) -> 
    if (idx = 0) 
      then Some hd
      else f lst (idx - 1)
  | BinOp (lel, LstCat, ler) ->
    Option.default None 
      (Option.map 
        (fun llen -> 
          let lst, idx = if (idx < llen) then lel, idx else ler, (idx - llen) in
            f lst idx)
        (get_length_of_list lel)
      )

  | _ -> raise (Failure (Printf.sprintf "get_nth_of_list: list equals %s, impossible" (Expr.str lst)))
  ) 

(* Finding the nth element of a list *)
let rec get_head_and_tail_of_list ?(pfs : PFS.t option) (unacceptable : Expr.Set.t) (lst : Expr.t) : (Expr.t * Expr.t) option =

  let f = get_head_and_tail_of_list unacceptable in

  (match lst with
  (* Nothing can be done for variables *)
  | PVar _ -> None
  | LVar _ -> 
      let ole = Option.map_default (fun x -> find_first_equality_in_pfs x lst) None pfs in 
      (match ole with 
      | None -> None
      | Some le when (Expr.Set.mem le unacceptable) -> None 
      | Some le -> get_head_and_tail_of_list ?pfs:pfs (Expr.Set.add lst unacceptable) le)
  (* Base lists of literals and logical expressions *)
  | Lit (LList l) -> if (l = []) then None else Some (Lit (List.hd l), Lit (LList (List.tl l)))
  | EList l       -> if (l = []) then None else Some (List.nth l 0, EList (List.tl l))
  | BinOp (hd, LstCons, lst) -> Some (hd, lst)
  | BinOp (lel, LstCat, ler) -> 
    Option.default None 
      (Option.map 
        (fun (hd, tl) -> 
          Some (hd, Expr.BinOp (tl, LstCat, ler)))
        (f lel)
      )

  | _ -> None
  )

(*************************************)
(* STRING REASONING HELPER FUNCTIONS *)
(*************************************)

let find_string_length pfs x = 
  let n = ref 0 in
  let len = ref 0 in 
  let found = ref false in 
  while (!n < PFS.length pfs && not !found) do
    (match PFS.nth_get pfs !n with 
    | Eq (UnOp(StrLen, LVar y), Lit (Num l)) when y = x -> found := true; len := int_of_float l
    | Eq (Lit (Num l), UnOp(StrLen, LVar y)) when y = x -> found := true; len := int_of_float l
    | _ -> n := !n + 1)
  done;
  if !found then Some !len else None

(* Finding the length of a string *)
let rec get_length_of_string ?(pfs = PFS.init()) (str : Expr.t) : int option =
  let f = get_length_of_string ~pfs in

  (match str with
  | Lit (String s) -> Some (String.length s)
  | PVar _ -> None
  | LVar x -> find_string_length pfs x 
  | BinOp (sl, StrCat, sr) -> Option.default None (Option.map (fun ll -> Option.map (fun lr -> ll + lr) (f sr)) (f sl)) 
  | BinOp (_, StrNth, _) -> Some 1
  | UnOp (ToStringOp, UnOp (ToUint32Op, UnOp (ToNumberOp, x))) -> f x
  | _ -> raise (Failure (Printf.sprintf "get_length_of_string: string equals %s, impossible\n%s" (Expr.str str) (PFS.str pfs)))
  )

(* Finding the nth element of a list *)
let rec get_nth_of_string (str : Expr.t) (idx : int) : Expr.t option =
  let f = get_nth_of_string in

  let err_msg = Printf.sprintf "get_nth_of_string: (%s, %d) index out of bounds." (Expr.str str) idx in

  (* If we can compute the length of the list, then the index needs to be compatible *)
  let olen = get_length_of_string str in
  let _ = match olen with
    | None -> ()
    | Some len -> if (len <= idx) then raise (ReductionException (Nono, err_msg))
  in

  let result : Expr.t option = (match str with
  (* Nothing can be done for variables *)
  | PVar _ -> None
  | LVar _ -> None
  (* Base lists of literals and logical expressions *)
  | Lit (String s) -> it_must_hold_that (lazy (idx < String.length s)); Some (Lit (String (String.sub s idx 1)))
  | BinOp (ls, StrCat, rs) ->
    Option.default None 
      (Option.map 
        (fun llen -> 
          let lst, idx = if (idx < llen) then ls, idx else rs, (idx - llen) in
            f lst idx)
        (get_length_of_string ls)
      )
  | BinOp (_, StrNth, _) when idx = 0 -> Some str
  | UnOp (ToStringOp, UnOp (ToUint32Op, UnOp (ToNumberOp, x))) -> f x idx
  | _ -> raise (Failure (Printf.sprintf "Impossible: get_nth_of_string: (%s, %d)" (Expr.str str) idx))
  ) in result

(**********************************)
(* SET REASONING HELPER FUNCTIONS *)
(**********************************)

let is_different (pfs : Formula.t list) (li : Expr.t) (lj : Expr.t) : bool option = 
  (match li = lj with
  | true -> Some false
  | false -> (match li, lj with
    | Expr.Lit x, Expr.Lit y when x <> y -> Some true
    | _, _ -> if (List.mem (Formula.Not (Formula.Eq (li, lj))) pfs || List.mem (Formula.Not (Formula.Eq (lj, li))) pfs)
      then Some true else None
    )
  )

(** I dont understand this! *)
let rec set_member (pfs : Formula.t list) m s = 
  let f = set_member pfs m in 
  (match s with
  | Expr.LVar x -> m = s
  | Expr.ESet s -> List.mem m s
  | Expr.NOp (SetUnion, les) -> List.exists  (fun x -> f x) les
  | Expr.NOp (SetInter, les) -> List.for_all (fun x -> f x) les
  | _ -> List.mem (Formula.SetMem (m, s)) pfs
  )

let rec not_set_member pfs m s = 
  let f = not_set_member pfs m in 
  (match s with
  | Expr.NOp (SetUnion, les) -> List.for_all (fun x -> f x) les
  | Expr.NOp (SetInter, les) -> List.exists  (fun x -> f x) les
  | Expr.ESet les -> List.for_all (fun le -> is_different pfs m le = Some true) les
  | _ -> List.mem (Formula.Not (Formula.SetMem (m, s))) pfs
  )

let rec set_subset pfs s s' = 
  let f = set_subset pfs s in 
  (match s' with
  | Expr.LVar _ -> s = s'
  | Expr.NOp (SetUnion, les) -> List.exists  (fun x -> f x) les
  | Expr.NOp (SetInter, les) -> List.for_all (fun x -> f x) les
  | _ -> 
    (match s with 
    | Expr.ESet les -> List.for_all (fun x -> set_member pfs x s') les
    | _ -> false
    )
  )

let rec contained_in_union (pfs : Formula.t list) (le1 : Expr.t) (le2 : Expr.t) = 
  (match le2 with 
  | LVar _ -> 
      (match pfs with 
      | [] -> false 
      | Eq (le, NOp (SetUnion, les)) :: rest when (le = le2) -> if (List.mem le1 les) then true else contained_in_union rest le1 le2
      | _ :: rest -> contained_in_union rest le1 le2)
  | _ -> false)

let all_different pfs les = 
  let result = ref true in
  let len = List.length les in
  let les = Array.of_list les in
  let i = ref 0 in
  while !result && (!i < len - 1) do 
    let j = ref (!i + 1) in
    while !result && (!j < len) do
      let li, lj = Array.get les !i, Array.get les !j in
        if (is_different pfs li lj <> Some true) then result := false;
        j := !j + 1
    done;
    i := !i + 1
  done;
  !result

let rec ascending (ln : int list) (n : int) : bool = 
  match ln with 
  | [] -> true
  | n' :: ln when n' = n -> ascending ln (n + 1)
  | _ -> false

let rec get_cat_constituents (le: Expr.t) : (string * int) list option = 
  let f = get_cat_constituents in 
    (match le with 
    | BinOp (LVar s', StrNth, Lit (Num n)) -> Some [ s', int_of_float n ] 
    | BinOp (lel, StrCat, ler) -> 
        (match f lel, f ler with 
        | Some ll, Some lr -> 
            Some (ll @ lr)
        | _ -> None)
    | _ -> None
    ) 

let is_full_contiguous_string pfs le : bool * string = 
  let oconst = get_cat_constituents le in 
  (match oconst with 
  | None -> false, ""
  | Some const -> 
      let s, idxs = List.split const in 
      let ss = SS.of_list s in 
      (match SS.cardinal ss = 1 with 
      | false -> false, "" 
      | true -> 
        let s = SS.choose ss in 
        let olen = get_length_of_string ~pfs (LVar s) in 
        (match olen with 
        | None -> false, "" 
        | Some len when len <> List.length idxs -> false, ""
        | Some len -> 
            if idxs <> List.mapi (fun i _ -> i) idxs 
              then false, ""
              else true, s
        )
      )
  )

(*************)
(* REDUCTION *)
(*************)

(** 
  Reduction of logical expressions 

  - gamma is used for:
  - pfs  are used for: Car, Cdr, SetDiff
*)
let rec reduce_lexpr ?(no_timing: unit option) ?(gamma=TypEnv.init()) ?(pfs=PFS.init()) (le : Expr.t) = 

  (* if (no_timing = None) then Printf.printf "%s\n" (Expr.str le); *)

  let f = reduce_lexpr ?no_timing:(Some ()) ~gamma ~pfs in
  let result = (match le with

  (* Base lists *)
  | EList les -> 
    let fles = List.map f les in
    let all_literals = List.for_all (fun x -> (match x with | Expr.Lit _ -> true | _ -> false)) fles in
    (match all_literals with
    | false -> Expr.EList fles
    | true  -> 
      let lits = List.map (fun x -> (match x with | Expr.Lit x -> x)) fles in
        Lit (LList lits)
    )

  (* Base sets *)
  | ESet les -> ESet (Expr.Set.elements (Expr.Set.of_list (List.map f les)))

  | UnOp (StrLen, Lit (String s)) -> 
      (* print_to_all (Printf.sprintf "StrLen: %s" s); *)
      Lit (Num (float_of_int (String.length s)))

  | UnOp (M_sgn, le) when 
      (let fle = f le in 
        PFS.mem pfs (Less (Lit (Num 0.), fle)))
      -> Lit (Num 1.)

  | UnOp (ToIntOp, UnOp (StrLen, le)) -> 
      UnOp (StrLen, f le)

  | le when (match is_full_contiguous_string pfs le with true, _ -> true | _ -> false) -> 
      let _, s = is_full_contiguous_string pfs le in 
        f (LVar s)

  (* Number-to-string-to-number-to-string-to... *)
  | UnOp (ToNumberOp, UnOp (ToStringOp, le)) -> 
    let fle = f le in 
    (match fle with 
    | (Lit (Num n)) -> Lit (Num n)
    | fle -> 
        let tfle, how, _ = Typing.type_lexpr gamma fle in
          (match how, tfle with
          | true, Some NumberType -> fle
          | _, _ -> UnOp (ToNumberOp, UnOp (ToStringOp, fle))
          )
    )

  | UnOp (LstRev, (UnOp (LstRev, le))) -> f le 

  (* List indexing *)
  | BinOp (le, LstNth, idx) ->
    let fle = f le  in
    let fidx = f idx in
    (match fidx with
    (* Index is a non-negative integer *)
    | Lit (Num n) when (Arith_Utils.is_int n && 0. <= n) ->
        (match (lexpr_is_list fle) with
        | true -> 
          Option.default (Expr.BinOp (fle, LstNth, fidx)) (get_nth_of_list fle (int_of_float n))
        | false -> 
          let err_msg = "LstNth(list, index): list is not a JSIL list." in
          raise (ReductionException (BinOp (fle, LstNth, fidx), err_msg))
        )

    (* Index is a number, but is either not an integer or is negative *)
    | Lit (Num n) -> 
      let err_msg = "LstNth(list, index): index is non-integer or smaller than zero." in
      raise (ReductionException (BinOp (fle, LstNth, fidx), err_msg))

    (* All other cases *)
    | _ -> BinOp (fle, LstNth, fidx)
    )

  (* String indexing *)
  | BinOp (le, StrNth, idx) ->
    let fle = f le  in
    let fidx = f idx in
    (match fidx with
    (* Index is a non-negative integer *)
    | Lit (Num n) when (Arith_Utils.is_int n && 0. <= n) ->
      (match (lexpr_is_string ~gamma fle) with
      | true -> Option.default (Expr.BinOp (fle, StrNth, fidx)) (get_nth_of_string fle (int_of_float n))
      | false -> 
        let err_msg = "StrNth(str, index): string is not a JSIL string." in
        raise (ReductionException (Expr.BinOp (fle, StrNth, fidx), err_msg))
      )

    (* Index is a number, but is either not an integer or is negative *)
    | Lit (Num n) -> 
      let err_msg = "StrNth(str, index): index is non-integer or smaller than zero." in
      raise (ReductionException (Expr.BinOp (fle, StrNth, fidx), err_msg))

    (* All other cases *)
    | _ -> BinOp (fle, StrNth, fidx)
    )

  | NOp (SetUnion, les) ->
    let fles = List.map f les in
    (* Flatten unions *)
    let unions, rest = List.partition (fun x -> match x with | Expr.NOp (SetUnion, _) -> true | _ -> false) fles in
    let unions = List.fold_left
      (fun ac u -> 
        let ls = (match u with
        | Expr.NOp (SetUnion, ls) -> ls
        | _ -> raise (Failure "LSetUnion: flattening unions: impossible.")) in
        ac @ ls
      ) 
      []
      unions in
    let fles = unions @ rest in 
    (* Join ESets *)
    let lesets, rest = List.partition (fun x -> match x with | Expr.ESet _ -> true | _ -> false) fles in
    let lesets = List.fold_left
      (fun ac u -> 
        let ls = (match u with
        | Expr.ESet ls -> ls
        | _ -> raise (Failure "LSetUnion: joining ESets: impossible.")) in
        ac @ ls
      ) 
      []
      lesets in
    let lesets = Expr.Set.elements (Expr.Set.of_list lesets) in
    let fles = Expr.ESet lesets :: rest in 
    (* Remove empty sets *)
    let fles = List.filter (fun s -> s <> Expr.ESet []) fles in
    (* Remove duplicates *)
    let fles = Expr.Set.elements (Expr.Set.of_list fles) in
      (match fles with
      | [ ] -> ESet [ ] 
      | [ x ] -> x
      | _ -> NOp (SetUnion, fles))

  | NOp (SetInter, [ BinOp (le1, SetDiff, le2); ESet le3 ]) -> 
      f (NOp (SetInter, [ le2; BinOp (ESet le3, SetDiff, le1) ]))

  | NOp (SetInter, les) ->
    let fles = List.map f les in
    (* Flatten intersections *)
    let inters, rest = List.partition (fun x -> match x with | Expr.NOp (SetInter, _) -> true | _ -> false) fles in
    let inters = List.fold_left
      (fun ac u -> 
        let ls = (match u with
        | Expr.NOp (SetInter, ls) -> ls
        | _ -> raise (Failure "LSetInter: flattening intersections: impossible.")) in
        ac @ ls
      ) 
      []
      inters in
    let fles = inters @ rest in 
    (* Join ESets *)
    let lesets, rest = List.partition (fun x -> match x with | Expr.ESet _ -> true | _ -> false) fles in
    let lesets = List.fold_left
      (fun ac u -> 
        let ls = (match u with
        | Expr.ESet ls -> ls
        | _ -> raise (Failure "LSetUnion: joining ESets: impossible.")) in
        ac @ ls
      ) 
      []
      lesets in
    let lesets = Expr.Set.elements (Expr.Set.of_list lesets) in
    let fles = Expr.ESet lesets :: rest in 
    (* If there is an empty set, the intersection is empty *)
    if (List.mem (Expr.ESet []) fles) 
      then Expr.ESet []
      else 
      let fles = Expr.Set.elements (Expr.Set.of_list fles) in
        (match fles with
        | [ ] -> ESet [ ] 
        | [ x ] -> x
        | _ -> NOp (SetInter, fles))

  | UnOp (op, le) ->
    let fle = f le in
    let def = Expr.UnOp (op, fle) in
    (match fle with
    | Lit lit -> (try (Lit (CExprEval.evaluate_unop op lit))
      with 
        | CExprEval.TypeError       err_msg -> raise (ReductionException (def, err_msg))
        | CExprEval.EvaluationError err_msg -> raise (ReductionException (def, err_msg))
        | e -> raise e)
    | _ -> 
      (match op with
      (* The TypeOf operator *)
      | TypeOf ->
        (match fle with 
        | BinOp (_, StrNth, _) -> Lit (Type StringType)
        | _ -> 
          let tfle, how, _ = Typing.type_lexpr gamma fle in
          (match how with
          | false -> 
            let err_msg = "LTypeOf(le): expression is not typable." in
            raise (ReductionException (def, err_msg))
          | true -> 
            (match tfle with
            | None -> def
            | Some t -> Lit (Type t)
            )
          )
        )
      (* List head *)
      | Car ->
        (match (lexpr_is_list fle) with
        | true -> 
            let ohdtl = get_head_and_tail_of_list ~pfs Expr.Set.empty fle in
            Option.map_default (fun (hd, _) -> hd) def ohdtl
        | false -> 
          let err_msg = "UnOp(Car, list): list is not a JSIL list." in
          raise (ReductionException (def, err_msg))
        )

      (* List tail *)
      | Cdr ->
        (match (lexpr_is_list fle) with
        | true -> 
          let ohdtl = get_head_and_tail_of_list ~pfs Expr.Set.empty fle in
          Option.map_default (fun (_, tl) -> tl) def ohdtl
        | false -> 
          let err_msg = "UnOp(Cdr, list): list is not a JSIL list." in
          raise (ReductionException (def, err_msg))
        )

      (* List length *)
      | LstLen ->
        (match (lexpr_is_list ~gamma fle) with
        | true -> 
          (match fle with
          | Lit (LList le) -> Lit (Num (float_of_int (List.length le)))
          | EList le -> Lit (Num (float_of_int (List.length le)))
          | BinOp (_, LstCons, lr) -> f (BinOp (Lit (Num 1.), Plus, UnOp (LstLen, lr)))
          | BinOp (ll, LstCat, lr) -> f (BinOp (UnOp (LstLen, ll), Plus, UnOp (LstLen, lr)))
          | _ -> def)
        | false -> 
          let err_msg = "UnOp(LstLen, list): list is not a JSIL list." in
          raise (ReductionException (def, err_msg))
        )

      (* List reverse *)
      | LstRev ->
        (match (lexpr_is_list ~gamma fle) with
        | true -> 
          (match fle with
          | EList le -> EList (List.rev le)
          | BinOp (le1, LstCat, le2) -> f (BinOp (UnOp (LstRev, le2), LstCat, UnOp (LstRev, le1)))
          | _ -> def)
        | false -> 
          let err_msg = "UnOp(LstRev, list): list is not a JSIL list." in
          raise (ReductionException (def, err_msg))
        )

      (* List reverse *)
      | SetToList ->
          (match fle with
          | ESet le -> EList (Expr.Set.elements (Expr.Set.of_list le))
          | _ -> def)

      (* String length *)
      | StrLen ->
        (match (lexpr_is_string ~gamma fle) with
        | true -> let len = get_length_of_string ~pfs fle in
          Option.map_default (fun len -> Expr.Lit (Num (float_of_int len))) def len
        | false -> 
          let err_msg = (Printf.sprintf "%s: string is not a JSIL string.\n%s" (Expr.str fle) (TypEnv.str gamma)) in
          raise (ReductionException (def, err_msg))
        )

      | UnaryMinus when (lexpr_is_number ~gamma def) -> 
        simplify_arithmetic_lexpr gamma pfs def

      | Not -> 
          (match fle with 
          | BinOp (a, LessThan, b) -> f (BinOp (b, LessThanEqual, a))
          | BinOp (a, LessThanEqual, b) -> f (BinOp (b, LessThan, a))
          | UnOp (Not, a) -> f a
          | _ -> def)

      | _ -> UnOp (op, fle)
      )
    )

  (* CHECK: Times and Div are the same, how does the 'when' scope? *)
  | BinOp (lel, op, ler) ->
    let flel = f lel in
    let fler = f ler in
    let def = Expr.BinOp (flel, op, fler) in
    (match flel, fler with
    | Lit ll , Lit lr -> 
      (try (Lit (CExprEval.evaluate_binop (CStore.init []) op (Lit ll) (Lit lr)))
      with 
        | CExprEval.TypeError       err_msg -> raise (ReductionException (def, err_msg))
        | CExprEval.EvaluationError err_msg -> raise (ReductionException (def, err_msg))
        | e -> raise e)
    | _ -> 
      (match op with
      | Equal -> 
        let t1, _, _ = Typing.type_lexpr gamma flel in
        let t2, _, _ = Typing.type_lexpr gamma fler in
          (match t1, t2 with
          | Some t1, Some t2 when t1 <> t2 -> Lit (Bool false)
          | Some _, Some _ -> 
            (match flel, fler with 
            | Lit (Bool true), fler -> f fler
            | Lit (Bool false), fler -> f (UnOp (Not, fler))
            | flel, Lit (Bool true) -> f flel 
            | flel, Lit (Bool false) -> f (UnOp (Not, flel))
            | _, _ -> let fle = Formula.lift_logic_expr def in 
              (match fle with 
              | None -> def 
              | Some (Formula.Eq (e1, e2), _) -> 
                  if (PFS.mem pfs (Eq (e1, e2)) || PFS.mem pfs (Eq (e2, e1))) then Lit (Bool true)
                  else if (PFS.mem pfs (Not (Eq (e1, e2))) || PFS.mem pfs (Not (Eq (e2, e1)))) then Lit (Bool false)
                    else def 
              | _ -> def)
            )
          | _, _             -> def)

      | Plus when (lexpr_is_number ~gamma def) ->
          simplify_arithmetic_lexpr gamma pfs def 

      | Minus when (lexpr_is_number ~gamma def) ->
          simplify_arithmetic_lexpr gamma pfs def 

      | Times when (lexpr_is_number ~gamma def) ->
        (match flel, fler with
        (* 1 is the neutral *)
        | Lit (Num 1.), x 
        | x, Lit (Num 1.) -> x
        | Lit (Num x), _ when (x == nan) -> Lit (Num nan)
        | _, Lit (Num x) when (x == nan) -> Lit (Num nan)
        | BinOp (Lit (Num x), Times, y), Lit (Num z) -> BinOp (Lit (Num (x *. z)), Times, y)
        | Lit (Num z), BinOp (Lit (Num x), Times, y) -> BinOp (Lit (Num (z *. x)), Times, y)
        (* Rest *)
        | _, _ -> def
        )
      | Div when (lexpr_is_number ~gamma def) ->
        (match flel, fler with
        (* 1 is the neutral *)
        | Lit (Num 1.), x 
        | x, Lit (Num 1.) -> x
        (* Rest *)
        | _, _ -> def
        )
      | And when (lexpr_is_bool ~gamma def) ->
        (match flel, fler with
        (* 1 is the neutral *)
        | Lit (Bool true), x 
        | x, Lit (Bool true) -> x
        | Lit (Bool false), _ 
        | _, Lit (Bool false) -> Lit (Bool false)
        (* Rest *)
        | _, _ -> def
        )
      | Or when (lexpr_is_bool ~gamma def) ->
        (match flel, fler with
        (* 1 is the neutral *)
        | Lit (Bool true), _
        | _, Lit (Bool true) -> Lit (Bool true)
        | Lit (Bool false), x
        | x, Lit (Bool false) -> x
        (* Rest *)
        | _, _ -> def
        )
      | LstCons when (lexpr_is_list ~gamma def) ->
        (match fler with
        | Lit (LList y) -> Expr.EList (flel :: (List.map (fun x -> Expr.Lit x) y))
        | EList y -> EList (flel :: y)
        | BinOp (EList ll, LstCat, lr) -> BinOp (EList (flel :: ll), LstCat, lr)
        | _ -> BinOp (EList [ flel ], LstCat, fler)
        )
      | LstCat when (lexpr_is_list ~gamma def) ->
        (match flel, fler with
        (* Empty list is the neutral *)
        | x, Lit (LList [])
        | x, EList []
        | Lit (LList []), x
        | EList [], x -> x
        | EList x, EList y -> Expr.EList (x @ y)
        | Lit (LList x), EList y -> Expr.EList (List.map (fun x -> Expr.Lit x) x @ y)
        | EList x, Lit (LList y) -> Expr.EList (x @ List.map (fun x -> Expr.Lit x) y)
        | EList x, BinOp (EList y, LstCat, z) -> f (BinOp (EList (x @ y), LstCat, z))
        | Lit (LList x), BinOp (EList y, LstCat, z) -> f (BinOp (EList (List.map (fun x -> Expr.Lit x) x @ y), LstCat, z))
        (* Rest *)
        | _, _ -> def
        )
      | StrCat when (lexpr_is_string ~gamma def) ->
        (match flel, fler with
        (* Empty list is the neutral *)
        | x, Lit (String "")
        | Lit (String ""), x -> x
        (* Rest *)
        | BinOp(el, StrCat, Lit (String s1)), Lit(String s2) -> f (BinOp (el, StrCat, Lit (String (s1 ^ s2))))
        | _, _ -> def
        )

      | SetDiff when (lexpr_is_set ~gamma def) ->
        let pfs = PFS.to_list pfs in
        if (contained_in_union pfs flel fler) then ESet [] else
        (match flel, fler with
        | x, y when (x = y) -> ESet []
        | ESet [], _ -> ESet []
        | x, ESet [] -> x
        | ESet left, ESet right when (Expr.all_literals left && Expr.all_literals right) ->
            ESet (Expr.Set.elements (Expr.Set.diff (Expr.Set.of_list left) (Expr.Set.of_list right)))
        | ESet left, s when (Expr.all_literals left) ->
          if (List.for_all (fun x -> set_member pfs x s) left) then ESet [] else def
        | NOp (SetUnion, les), _ -> 
          let diffs = List.map (fun le -> f (BinOp (le, SetDiff, fler))) les in
            NOp (SetUnion, diffs)
        | _, NOp (SetUnion, les) -> f (NOp (SetInter, List.map (fun le -> Expr.BinOp (flel, SetDiff, le)) les))
        | x, ESet [ el ] when (List.mem (Formula.Not (SetMem (el, x))) pfs) -> x
        | LVar _, _ -> if (set_subset pfs flel fler) then ESet [] else def
        | ESet les, fler -> 
          (* We must know that the elements of les are all different, and for that we need the pure formulae *)
          (match all_different pfs les with
          | false -> def
          | true -> 
              let _, rest = List.partition (fun x -> set_member pfs x fler) les in
              if (List.for_all (fun x -> not_set_member pfs x fler) rest) then ESet rest else
              BinOp (ESet rest, SetDiff, fler)
          )
        | _, _ -> def)

        (* let hM = f (BinOp (flel, SetSub, fler)) in
          (match hM with
          | Lit (Bool true) -> ESet []
          | _ -> def)) *)

      | SetMem when (lexpr_is_bool ~gamma def) ->
        (match flel, fler with
        | _, ESet [] -> Lit (Bool false)
        | _, ESet [ x ] -> BinOp (flel, Equal, x)
        | le, ESet les -> 
          (match (List.mem le les) with
          | true -> Lit (Bool true)
          | false -> (match le with
            | Lit _ -> if (Expr.all_literals les) then Lit (Bool false) else def
            | _ -> def)
          )

        | _, _ -> def)

      | SetSub when (lexpr_is_bool ~gamma def) ->
        (match flel, fler with
        | ESet [], _ -> Lit (Bool true)
        | _, ESet [] -> Lit (Bool false)
        | ESet left, ESet right when (Expr.all_literals left && Expr.all_literals right) ->
          Lit (Bool (Expr.Set.subset (Expr.Set.of_list left) (Expr.Set.of_list right)))
        | LVar v, NOp (SetUnion, les) -> if (List.mem flel les) then (Lit (Bool true)) else def
        | _, _ -> def)

      | LessThan -> 
        (match flel, fler with
        | UnOp (LstLen, _), Lit (Num n) when (n <= 0.)-> Lit (Bool false)
        | UnOp (LstLen, le), Lit (Num 1.) -> BinOp (le, Equal, EList [])
        | _, _ -> def)

      | _ -> def
      )
    )

  (* The remaining cases cannot be reduced *)
  | _ -> le 
  ) in
  
  let result = normalise_list_expressions result in 
  let final_result = if (compare le result <> 0) 
    then f result
    else result in

  (* if (no_timing <> None) then (let end_time = Sys.time () in update_statistics "reduce_lexpr" (end_time -. start_time)); *)
  final_result

and simplify_arithmetic_lexpr (gamma: TypEnv.t) (pfs: PFS.t) (le : Expr.t) = 
  let f = reduce_lexpr ?no_timing:(Some ()) ~gamma ~pfs in 
    (match le with 
    | BinOp (l, Plus, Lit (Num 0.))
    | BinOp (Lit (Num 0.), Plus, l) -> l
    (* Binary minus to unary minus *)
    | BinOp (l, Minus, r) -> f (BinOp (l, Plus, (UnOp (UnaryMinus, r))))
    (* Unary minus distributes over + *)
    | UnOp (UnaryMinus, e) -> 
      (match e with 
      | BinOp (l, Plus, r) -> f (BinOp (UnOp (UnaryMinus, l), Plus, (UnOp (UnaryMinus, r))))
      | _ -> le)
    (* Plus - we collect the positives and the negatives, see what we have and deal with them *)
    | BinOp (l, Plus, r) -> compose_pluses_minuses (collect_pluses_minuses le)
    | _ -> le)

and collect_pluses_minuses (le : Expr.t) : (Expr.t list * Expr.t list) = 
  (match le with 
  | BinOp (l, Plus, r) -> 
      let (pl, ml) = collect_pluses_minuses l in 
      let (pr, mr) = collect_pluses_minuses r in 
        List.sort Pervasives.compare (pl @ pr), List.sort Pervasives.compare (ml @ mr)
  | UnOp (UnaryMinus, e) -> [], [ e ]
  | _ -> [ le ], [])
  
and compose_pluses_minuses (pluses_and_minuses : Expr.t list * Expr.t list) : Expr.t = 
  let pluses, minuses = pluses_and_minuses in 
    let nump, pluses = numbers_and_rest pluses in
    let numm, minuses = numbers_and_rest minuses in 
    let pluses_stay = ExtList.List.remove_if (fun x -> List.mem x minuses) pluses in 
    let minuses_stay = List.map (fun minus -> Expr.UnOp (UnaryMinus, minus)) (ExtList.List.remove_if (fun x -> List.mem x pluses) minuses) in 
    let result = List.fold_right (fun plus (ac : Expr.t) -> if (ac = Lit (Num 0.)) then plus else (BinOp (plus, Plus, ac))) (pluses_stay @ minuses_stay) (Lit (Num 0.)) in 
    let diff = nump -. numm in 
      if (diff = 0.) then result else 
        if (result = (Lit (Num 0.))) then (Lit (Num diff))
          else BinOp (Lit (Num diff), Plus, result)

and numbers_and_rest (numbers : Expr.t list) = 
  List.fold_left (fun (nump, restp) num -> 
    match num with 
    | Expr.Lit (Num x) -> (nump +. x, restp)
    | _ -> (nump, num :: restp)) (0., []) numbers 

let organise_numbers (e1 : Expr.t) (e2 : Expr.t) : Expr.t * Expr.t = 
  (match e1, e2 with 
  | Lit (Num n), e2 -> 
      let pluses, minuses = collect_pluses_minuses e2 in 
      let nump, pluses = numbers_and_rest pluses in
      let numm, minuses = numbers_and_rest minuses in 
      let num = n -. (nump -. numm) in 
      let e1 : Expr.t = Lit (Num num) in 
      let e2 : Expr.t = compose_pluses_minuses (pluses, minuses) in 
        e1, e2
  | e1, Lit (Num n) -> 
      let pluses, minuses = collect_pluses_minuses e1 in 
      let nump, pluses = numbers_and_rest pluses in
      let numm, minuses = numbers_and_rest minuses in 
      let num = n -. (nump -. numm) in 
      let e1 : Expr.t = compose_pluses_minuses (pluses, minuses) in 
      let e2 : Expr.t = Lit (Num num) in 
        e1, e2
  | _ -> e1, e2)
  