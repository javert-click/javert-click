type ('a, 'b) map_concrete = ('a, 'b) Hashtbl.t 

type ('a, 'b) map_symbolic = ('a  * 'b) list 

module L = Logging

type ('a, 'b) map = (('a, 'b) map_concrete) * (('a, 'b) map_symbolic)

type ('a, 'b) t = ('a, 'b) map          

(** find concrete elem in concrete tbl*)
let find_concrete_concrete (map: ('a, 'b) map_concrete) (key: 'a) : 'b option =
  Hashtbl.find_opt map key 

(** find symbolic elem in concrete tbl*)
let find_symbolic_concrete (map : ('a, 'b) map_concrete) (key : 'a) (val_to_expr : 'a -> Expr.t) : ('b * Formula.t) list =  
  Hashtbl.fold 
    (fun k v ac -> (v, Formula.Eq (val_to_expr key, val_to_expr k)) :: ac)
    map
    []

(** find 1st elem in symbolic tbl*)
let find_any_symbolic (map: ('a, 'b) map_symbolic) (key: 'a) (val_to_expr : 'a -> Expr.t): ('b * Formula.t) list = 
  List.map (
    fun elem -> let (k, v) = elem in
                let p : Formula.t = Eq (val_to_expr key, val_to_expr k) in
                    (v, p)
    ) map

let find (map: ('a, 'b) t) (key: 'a) (is_concrete : 'a -> bool) (val_to_expr: 'a -> Expr.t) : ('b * Formula.t) list =
  let (map_concrete, map_symbolic) = map in
  if (is_concrete key) then (
    (match find_concrete_concrete map_concrete key with 
         | Some hdlrs -> [ hdlrs, Formula.True ]
         | None -> find_any_symbolic map_symbolic key val_to_expr)
  ) else (
    (find_any_symbolic map_symbolic key val_to_expr) @ (find_symbolic_concrete map_concrete key val_to_expr)
  )   

let get_keys (map: ('a, 'b) t) : 'a list =
  let (map_concrete, map_symbolic) = map in
  let conc_keys = Hashtbl.fold (
    fun k _ acc -> acc @ [k]) map_concrete [] in
  let (symb_keys, _) = List.split map_symbolic in
  conc_keys @ symb_keys

let filter_concrete (map: ('a, 'b) map_concrete) (v: 'b) : 'a list =
  Hashtbl.fold (fun k v' acc -> if (v = v') then acc @ [k] else acc) map []

let filter_symbolic (map: ('a, 'b) map_symbolic) (v: 'b) : 'a list =
  List.fold_left (fun acc (k, v') -> if (v = v') then acc @ [k] else acc) [] map

let filter (map: ('a, 'b) t) (v: 'b) : 'a list =
  let (map_concrete, map_symbolic) = map in
  (filter_concrete map_concrete v) @ (filter_symbolic map_symbolic v) 

(** Concrete key does not correspond to any symbolic *) 
let concrete_nf_symb 
  (map_concrete: ('a, 'b) map_concrete) 
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) map_concrete * ('a, 'b) map_symbolic) * Formula.t =
    let (symb_keys, _) = List.split map_symbolic in
    let symb_keys_expr = List.map (fun e -> val_to_expr e) symb_keys in
    let map_concrete_nf = Hashtbl.copy map_concrete in 
    let f_nf = Formula.Not (Formula.SetMem (val_to_expr k, Expr.ESet symb_keys_expr)) in 
    (map_concrete_nf, map_symbolic), f_nf

(* Concrete key corresponds to an existing symbolic one *)
let replace_concrete_one_symb
  (map_concrete: ('a, 'b) map_concrete)
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (v: 'b)
  (val_to_expr: 'a -> Expr.t)
  (update_v: 'b -> 'b -> 'b) =
    let map_symbolic_splits = CCommon.super_split map_symbolic in  
    List.map 
      (fun (before, (k', old_v), after) -> 
        let f_k' = Formula.Eq (val_to_expr k, val_to_expr k') in
        let new_item = [ (k', (update_v old_v v)) ] in
        let map_symbolic_k' = before @ new_item @ after in 
        let map_concrete_k' = Hashtbl.copy map_concrete in  
        (map_concrete_k', map_symbolic_k'), f_k') map_symbolic_splits

let replace_concrete 
  (map : ('a, 'b) t) 
  (k : 'a)
  (v: 'b) 
  (val_to_expr: 'a -> Expr.t)
  (update_v: 'b -> 'b -> 'b) : (('a, 'b) t * Formula.t) list = 
    let (map_concrete, map_symbolic) = map in
    try  
    let old_v = Hashtbl.find map_concrete k in
    Hashtbl.replace map_concrete k (update_v old_v v);
    [ (map_concrete, map_symbolic), Formula.True ]
    with Not_found -> 
    if(List.length map_symbolic > 0) then(
      (** CASE 1: Concrete key does not correspond to any symbolic *) 
      let ((map_concrete_nf, map_symb_nf), f_nf) = concrete_nf_symb map_concrete map_symbolic k val_to_expr in
      Hashtbl.add map_concrete_nf k v; 
      (* CASE 2: Concrete key corresponds to an existing symbolic one *)
      let rets = replace_concrete_one_symb map_concrete map_symbolic k v val_to_expr update_v in
      ((map_concrete_nf, map_symb_nf), f_nf) :: rets
    ) else (
      (* CASE 3: Concrete key does not correspond to neither a concrete nor a symbolic one *)
      Hashtbl.add map_concrete k v;
      [ (map_concrete, map_symbolic), Formula.True ]
    )

let symbolic_one_conc
  (map_concrete: ('a, 'b) map_concrete)
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (val_to_expr: 'a -> Expr.t)
  (op: ('a, 'b) map_concrete -> 'a -> 'b -> unit) : (('a, 'b) t * Formula.t) list =
    Hashtbl.fold 
    (fun conc_k old_v tbls ->
      let new_map_concrete = Hashtbl.copy map_concrete in
      op new_map_concrete conc_k old_v;
      let f = Formula.Eq (val_to_expr k, val_to_expr conc_k) in
      let new_map = (new_map_concrete, map_symbolic) in
      tbls @ [(new_map, f)]) map_concrete []

let symbolic_one_symb 
  (map_concrete: ('a, 'b) map_concrete)
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (val_to_expr: 'a -> Expr.t)
  (op: 'a -> 'b -> ('a * 'b) list) : (('a, 'b) t * Formula.t) list =
    let map_symb_splits = CCommon.super_split map_symbolic in
    List.map 
         (fun (before, (symb_k, old_v), after) ->
            let f = Formula.Eq (val_to_expr k, val_to_expr symb_k) in
            let new_map_symbolic = before @ (op symb_k old_v) @ after in 
            (map_concrete, new_map_symbolic), f
          )  map_symb_splits

(* The SYMBOLIC key is not equal to any of the existing CONCRETE AND SYMBOLIC ones *)
let symbolic_nf
  (map_concrete: ('a, 'b) map_concrete)
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (v: 'b option)
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list =
  let kvpairs = Option.map_default (fun v -> [k, v]) [] v in 
  let new_map_symbolic = map_symbolic @ kvpairs in
  let existing_conc_ks = Hashtbl.fold 
    (fun conc_k _ acc ->
      acc @ [val_to_expr conc_k]
    ) map_concrete [] in
  let (symb_ks, _) = List.split map_symbolic in
  let existing_symb_ks = List.map
    (
      fun symb_k -> val_to_expr symb_k
    ) symb_ks in
  let existing_ks = Expr.ESet (existing_conc_ks @ existing_symb_ks) in
  let f = Formula.Not (Formula.SetMem (val_to_expr k, existing_ks) ) in
  [(map_concrete, new_map_symbolic), f]

let replace_symbolic 
  (map : ('a, 'b) t) 
  (k : 'a) 
  (v : 'b) 
  (val_to_expr: 'a -> Expr.t)
  (update_v: 'b -> 'b -> 'b) : (('a, 'b) t * Formula.t) list = 
      let (map_concrete, map_symbolic) = map in
      (* CASE 1: The SYMBOLIC event is equal to one of the existing CONCRETE ones *)
      (*  Here we have to branch for each element of the concrete ehs and add the handler in the concrete table *)
      let map_symb_conc = symbolic_one_conc map_concrete map_symbolic k val_to_expr (fun map_c k' old_v -> Hashtbl.replace map_c k' (update_v old_v v)) in

      (* CASE 2: The SYMBOLIC key is equal to one of the existing SYMBOLIC ones *)
      (*  Here we have to branch for each element of the symbolic ehs and add the handler in the symbolic list *)
      let map_symb_symb = symbolic_one_symb map_concrete map_symbolic k val_to_expr (fun s_k v_k -> [s_k, update_v v_k v]) in 

      (* CASE 3: The SYMBOLIC key is not equal to any of the existing CONCRETE AND SYMBOLIC ones *)
      let map_not_found = symbolic_nf map_concrete map_symbolic k (Some v) val_to_expr in

      (* We finally return the concatenation of the lists computed, as any of the cases can hold *)
      map_not_found @ map_symb_conc @ map_symb_symb

let replace (map: ('a, 'b) t) (k : 'a) (v : 'b) (is_concrete : 'a -> bool) (val_to_expr: 'a -> Expr.t) (update_v: 'b -> 'b -> 'b) : (('a, 'b) t * Formula.t) list  = 
  if (is_concrete k) then ( 
      (* Key is concrete *)
      replace_concrete map k v val_to_expr update_v
      (* Key is symbolic *)
  ) else (
      replace_symbolic map k v val_to_expr update_v
  )

(* Replaces keys in ks to value v in the given map consecutively *)
let replace_seq (map: ('a, 'b) t) (ks: 'a list) (v: 'b) (is_concrete: 'a -> bool) (val_to_expr: 'a -> Expr.t) (update_v: 'b -> 'b -> 'b) : (('a, 'b) t * Formula.t) list =
  List.fold_left (
      fun acc k ->
        List.concat (List.map (
            fun ((m: ('a,'b) t), (f: Formula.t)) ->
              let m_list = replace m k v is_concrete val_to_expr update_v in
              List.map (fun (new_map, new_f) -> new_map, Formula.And (f, new_f)) m_list) acc)) 
        [(map, Formula.True)] ks

let add_concrete
  (map : ('a, 'b) t) 
  (k : 'a)
  (v: 'b) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
    let (map_concrete, map_symbolic) = map in
    try  
    Hashtbl.find map_concrete k;
    raise (Failure "Add map entry: entry already exists")
    with Not_found -> 
    if (List.length map_symbolic > 0) then (
      (** Concrete key does not correspond to any symbolic *) 
      let (map_concrete_nf, map_symb_nf), f_nf = concrete_nf_symb map_concrete map_symbolic k val_to_expr in
      Hashtbl.add map_concrete_nf k v; 
      [(map_concrete_nf, map_symb_nf), f_nf]
    ) else (
      (** Concrete key not found in both concrete and symbolic ones *) 
      Hashtbl.add map_concrete k v;
      [ (map_concrete, map_symbolic), Formula.True ]
    )

let add_symbolic 
  (map : ('a, 'b) t) 
  (k : 'a) 
  (v : 'b) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
      let (map_concrete, map_symbolic) = map in
      (* The SYMBOLIC event is not equal to any of the existing CONCRETE AND SYMBOLIC ones *)
      symbolic_nf map_concrete map_symbolic k (Some v) val_to_expr

let add (map: ('a, 'b) t) (k : 'a) (v : 'b) (is_concrete : 'a -> bool) (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list  = 
  if (is_concrete k) then ( 
    (* Key is concrete *)
    add_concrete map k v val_to_expr
    (* Key is symbolic *)
  ) else (
    add_symbolic map k v val_to_expr
  )

(* Concrete key corresponds to an existing symbolic one *)
let remove_concrete_one_symb
  (map_concrete: ('a, 'b) map_concrete)
  (map_symbolic: ('a, 'b) map_symbolic)
  (k: 'a)
  (val_to_expr: 'a -> Expr.t) =
    let map_symbolic_splits = CCommon.super_split map_symbolic in  
    List.map 
      (fun (before, (k', old_v), after) -> 
        let f_k' = Formula.Eq (val_to_expr k, val_to_expr k') in
        let map_symbolic_k' = before @ after in 
        let map_concrete_k' = Hashtbl.copy map_concrete in  
        (map_concrete_k', map_symbolic_k'), f_k') map_symbolic_splits

let remove_concrete
  (map : ('a, 'b) t) 
  (k : 'a) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
    let (map_concrete, map_symbolic) = map in
    try  
    Hashtbl.find map_concrete k;
    Hashtbl.remove map_concrete k;
    [ (map_concrete, map_symbolic), Formula.True ]
    with Not_found -> 
    if (List.length map_symbolic > 0) then (
      (** Concrete key does not correspond to any symbolic *) 
      let map_nf = concrete_nf_symb map_concrete map_symbolic k val_to_expr in
      (* Concrete key corresponds to an existing symbolic one *)
      let rets = remove_concrete_one_symb map_concrete map_symbolic k val_to_expr in
      map_nf :: rets
    ) else (
      (* Concrete key not found. We do nothing *)
      [ (map_concrete, map_symbolic), Formula.True ]
      (*raise (Failure "Remove map entry: entry does not exists ")*)
    ) 

let remove_symbolic 
  (map : ('a, 'b) t) 
  (k : 'a) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
      let (map_concrete, map_symbolic) = map in
      (* CASE 1: The SYMBOLIC key is equal to one of the existing CONCRETE ones *)
      (*  Here we have to branch for each element of the concrete map *)
      let map_symb_conc = symbolic_one_conc map_concrete map_symbolic k val_to_expr (fun map_c k' _ -> Hashtbl.remove map_c k') in

      (* CASE 2: The SYMBOLIC key is equal to one of the existing SYMBOLIC ones *)
      (*  Here we have to branch for each element of the symbolic map *)
      let map_symb_symb = symbolic_one_symb map_concrete map_symbolic k val_to_expr (fun _ _ -> []) in

      (* CASE 3: The SYMBOLIC key is not equal to any of the existing CONCRETE AND SYMBOLIC ones *)
      let map_not_found = symbolic_nf map_concrete map_symbolic k None val_to_expr in

      (* We finally return the concatenation of the lists computed, as any of the cases can hold *)
      map_not_found @ map_symb_conc @ map_symb_symb

let remove (map: ('a, 'b) t) (k : 'a) (is_concrete : 'a -> bool) (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list  = 
  if (is_concrete k) then ( 
    (* Key is concrete *)
    remove_concrete map k val_to_expr
    (* Key is symbolic *)
  ) else (
    remove_symbolic map k val_to_expr
  )

(* Removes keys in ks in the given map consecutively *)
let remove_seq (map: ('a, 'b) t) (ks: 'a list) (is_concrete: 'a -> bool) (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list =
  List.fold_left (
      fun acc k ->
        List.concat (List.map (
            fun ((m: ('a,'b) t), (f: Formula.t)) ->
              let m_list = remove m k is_concrete val_to_expr in
              List.map (fun (new_map, new_f) -> new_map, Formula.And (f, new_f)) m_list) acc)) 
        [(map, Formula.True)] ks

let str_concrete (map : ('a, 'b) map_concrete) (k_to_string: 'a -> string) (v_to_string : 'b -> string) : string = 
  ("" ^ (Hashtbl.fold (fun k v acc -> acc ^ Printf.sprintf "\n\t Key: %s, \n\t Val: %s " (k_to_string k) (v_to_string v)) map " "))

let str_symbolic (map : ('a, 'b) map_symbolic) (k_to_string : 'a -> string) (v_to_string : 'b -> string) : string =
  let strs = 
    List.map 
      (fun (k, v) -> 
        Printf.sprintf "Key: %s, \n\t Val: %s " (k_to_string k) (v_to_string v)) map in 
  String.concat "\n\t" strs

let str (map : ('a, 'b) t) (k_to_string : 'a -> string) (v_to_string : 'b -> string) : string =
  let (map_concrete, map_symbolic) = map in
  "[\n" ^ 
     (str_concrete map_concrete k_to_string v_to_string) ^ "\n" ^ 
     (str_symbolic map_symbolic k_to_string v_to_string) ^ 
  "\n]"


let init () : ('a, 'b) t = (Hashtbl.create CCommon.medium_tbl_size, [])