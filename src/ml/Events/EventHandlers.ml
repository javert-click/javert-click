type ('a, 'b) ehs_concrete = (Literal.t, ('b * ('a list)) list) Hashtbl.t 

type ('a, 'b) ehs_symbolic = ('a  * ('b * ('a list)) list) list  

module L = Logging

(** explain the parameters - 
    * a -> concrete values
    * b -> fid 
    * c -> general values 
*)
type ('a, 'b) t = (('a, 'b) ehs_concrete) * (('a, 'b) ehs_symbolic)

(** find concrete event in concrete tbl*)
let find_concrete_concrete (key: Literal.t) (ehs: ('a, 'b) ehs_concrete) : ('b * ('a list)) list option =
  Hashtbl.find_opt ehs key 

(** find symbolic event in concrete tbl*)
let find_symbolic_concrete (key : 'a) (ehs : ('a, 'b) ehs_concrete) (val_to_expr : 'a -> Expr.t) : (('b * ('a list)) list * Formula.t) list =  
  Hashtbl.fold 
    (fun ev hdlrs ac -> (hdlrs, Formula.Eq (val_to_expr key, Expr.Lit ev)) :: ac)
    ehs
    []

(** find event in symbolic tbl*)
let find_any_symbolic (key: 'a) (ehs: ('a, 'b) ehs_symbolic) (val_to_expr : 'a -> Expr.t): (('b * ('a list)) list * Formula.t) list = 
  List.map (
    fun elem -> let (ev_name, handlers) = elem in
                let p : Formula.t = Eq (val_to_expr key, val_to_expr ev_name) in
                    (handlers, p)
    ) ehs

let find (key: 'a) (ehs: ('a, 'b) t) (val_to_expr: 'a -> Expr.t) (val_to_lit : 'a -> Literal.t option) : (('b * ('a list)) list * Formula.t) list =
  let (ehs_concrete, ehs_symbolic) = ehs in
  match val_to_lit key with 
    | Some l -> 
      (match find_concrete_concrete l ehs_concrete with 
         | Some hdlrs -> [ hdlrs, Formula.True ]
         | None -> find_any_symbolic key ehs_symbolic val_to_expr)
    | None -> 
      (find_any_symbolic key ehs_symbolic val_to_expr) @ (find_symbolic_concrete key ehs_concrete val_to_expr)


 let add_event_handler_concrete 
    (ehs : ('a, 'b) t) 
    (event : Literal.t) 
    (fid : 'b) 
    (args : 'a list)
    (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
  let (ehs_concrete, ehs_symbolic) = ehs in
  try 
    let hdlrs = Hashtbl.find ehs_concrete event in 
    let (fids, _) = List.split hdlrs in
    if(not (List.mem fid fids)) then(
      Hashtbl.replace ehs_concrete event (hdlrs @ [ (fid, args) ])); 
    [ (ehs_concrete, ehs_symbolic), Formula.True ]
  with Not_found -> 
    (** Concrete event does not correspond to any symbolic *)
    if(List.length ehs_symbolic > 0) then(
      let (symb_events, _) = List.split ehs_symbolic in
      let symb_events_expr = List.map (fun e -> val_to_expr e) symb_events in
      let ehs_concrete_nf = Hashtbl.copy ehs_concrete in   
      Hashtbl.add ehs_concrete_nf event [ (fid, args) ]; 
      let f_nf = Formula.Not (Formula.SetMem (Expr.Lit event, Expr.ESet symb_events_expr)) in 
      let ehs_nf = (ehs_concrete_nf, ehs_symbolic) in
      (* Concrete event corresponds to an existing symbolic event *)
      let ehs_symbolic_splits = CCommon.super_split ehs_symbolic in 
      let rets = 
        List.map 
          (fun (before, (ev', hdlrs), after) -> 
            let f_ev' = Formula.Eq (Expr.Lit event, val_to_expr ev') in 
            let ehs_symbolic_ev' = before @ [ (ev', hdlrs @ [ (fid, args) ]) ] @ after in 
            let ehs_concrete_ev' = Hashtbl.copy ehs_concrete in  
            (ehs_concrete_ev', ehs_symbolic_ev'), f_ev') ehs_symbolic_splits in 
      (ehs_nf, f_nf) :: rets
    ) else (
      Hashtbl.add ehs_concrete event [(fid, args)];
      [ (ehs_concrete, ehs_symbolic), Formula.True ]
    ) 

let add_event_handler_symbolic 
  (ehs : ('a, 'b) t) 
  (event : 'a) 
  (fid : 'b) 
  (args : 'a list)
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
      let (ehs_concrete, ehs_symbolic) = ehs in
      (* CASE 1: The SYMBOLIC event is equal to one of the existing CONCRETE ones *)
      (*  Here we have to branch for each element of the concrete ehs and add the handler in the concrete table *)
      let ehs_symb_conc = Hashtbl.fold 
          (fun conc_event handlers tbls ->
            let new_ehs_concrete = Hashtbl.copy ehs_concrete in
            Hashtbl.replace new_ehs_concrete conc_event (handlers @ [(fid, args)]);
            let f = Formula.Eq (val_to_expr event, Expr.Lit conc_event) in
            let new_ehs = (new_ehs_concrete, ehs_symbolic) in
            tbls @ [(new_ehs, f)]) ehs_concrete [] in

      (* CASE 2: The SYMBOLIC event is equal to one of the existing SYMBOLIC ones *)
      (*  Here we have to branch for each element of the symbolic ehs and add the handler in the symbolic list *)
      let ehs_symb_splits = CCommon.super_split ehs_symbolic in
      let ehs_symb_symb = List.map 
         (fun (before, (symb_event, handlers), after) ->
            let f = Formula.Eq (val_to_expr event, val_to_expr symb_event) in
            let new_ehs_symbolic = before @ [ (symb_event, handlers @ [ (fid, args) ]) ] @ after in 
            (ehs_concrete, new_ehs_symbolic), f
          )  ehs_symb_splits in 

      (* CASE 3: The SYMBOLIC event is not equal to any of the existing CONCRETE AND SYMBOLIC ones *)
      let new_ehs_symbolic = ehs_symbolic @ [(event, [(fid, args)])] in
      let existing_conc_events = Hashtbl.fold 
        (fun conc_event _ acc ->
          acc @ [Expr.Lit conc_event]
        ) ehs_concrete [] in
      let (symb_events, _) = List.split ehs_symbolic in
      let existing_symb_events = List.map
        (
          fun symb_event -> val_to_expr symb_event
        ) symb_events in
      let existing_events = Expr.ESet (existing_conc_events @ existing_symb_events) in
      let f = Formula.Not (Formula.SetMem (val_to_expr event, existing_events) ) in
      let ehs_not_found = (ehs_concrete, new_ehs_symbolic), f in

      (* We finally return the concatenation of the lists computed, as any of the cases can hold *)
      ehs_not_found :: (ehs_symb_conc @ ehs_symb_symb)

let add_event_handler (ehs: ('a, 'b) t) (event : 'a) (fid : 'b) (args : 'a list) (val_to_lit : 'a -> Literal.t option) (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list  = 
  try 
    match val_to_lit event with 
      | Some l -> 
        add_event_handler_concrete ehs l fid args val_to_expr
      | None -> 
        add_event_handler_symbolic ehs event fid args val_to_expr
  with _ -> raise (Failure "add_event_handler")
 
let remove_event_handler_concrete
  (ehs : ('a, 'b) t) 
  (event : Literal.t) 
  (fid : 'b) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list =
  let (ehs_concrete, ehs_symbolic) = ehs in
  try 
    let hdlrs = Hashtbl.find ehs_concrete event in 
    try 
      let _ = List.find (fun (existing_fid, _) -> existing_fid = fid) hdlrs in
      Hashtbl.replace ehs_concrete event (List.filter (fun (existing_fid, _) -> existing_fid <> fid) hdlrs); 
      let _ = Hashtbl.find ehs_concrete event in
      [ (ehs_concrete, ehs_symbolic), Formula.True ]
    with Not_found ->
      raise (Failure "remove_event_handler: handler not found")
  with Not_found -> 
    (* Concrete event corresponds to an existing symbolic event *)
    let ehs_symbolic_splits = CCommon.super_split ehs_symbolic in 
      List.map 
        (fun (before, (ev', hdlrs), after) -> 
          let f_ev' = Formula.Eq (Expr.Lit event, val_to_expr ev') in 
            let _ = try List.find (fun (existing_fid, _) -> existing_fid = fid) hdlrs 
              with Not_found -> raise (Failure "remove_event_handler: handler not found") in
            let ehs_symbolic_ev' = before @ [ (ev', (List.filter (fun (existing_fid, _) -> existing_fid <> fid) hdlrs)) ] @ after in 
            let ehs_concrete_ev' = Hashtbl.copy ehs_concrete in  
          (ehs_concrete_ev', ehs_symbolic_ev'), f_ev'
        ) ehs_symbolic_splits 

let remove_event_handler_symbolic 
  (ehs : ('a, 'b) t) 
  (event : 'a) 
  (fid : 'b) 
  (val_to_expr: 'a -> Expr.t) : (('a, 'b) t * Formula.t) list = 
    let (ehs_concrete, ehs_symbolic) = ehs in
    (* CASE 1: The SYMBOLIC event is equal to one of the existing CONCRETE ones *)
    (*  Here we have to branch for each element of the concrete ehs and add the handler in the concrete table *)
    let ehs_symb_conc = Hashtbl.fold 
        (fun conc_event handlers tbls ->
          let new_ehs_concrete = Hashtbl.copy ehs_concrete in
          let _ = try List.find (fun (existing_fid, _) -> existing_fid = fid) handlers 
          with Not_found -> raise (Failure "remove_event_handler: handler not found") in
          Hashtbl.replace new_ehs_concrete conc_event (List.filter (fun (existing_fid, _) -> existing_fid <> fid) handlers); 
          let f = Formula.Eq (val_to_expr event, Expr.Lit conc_event) in
          let new_ehs = (new_ehs_concrete, ehs_symbolic) in
          tbls @ [(new_ehs, f)]) ehs_concrete [] in

    (* CASE 2: The SYMBOLIC event is equal to one of the existing SYMBOLIC ones *)
    (*  Here we have to branch for each element of the symbolic ehs and add the handler in the symbolic list *)
    let ehs_symb_splits = CCommon.super_split ehs_symbolic in
    let ehs_symb_symb = List.map 
      (fun (before, (symb_event, handlers), after) ->
          let f = Formula.Eq (val_to_expr event, val_to_expr symb_event) in
          let new_ehs_symbolic = before @ [ (symb_event, (List.filter (fun (existing_fid, _) -> existing_fid <> fid) handlers)) ] @ after in 
          (ehs_concrete, new_ehs_symbolic), f
      )  ehs_symb_splits in 

    (* We finally return the concatenation of the lists computed, as any of the cases can hold *)
    ehs_symb_conc @ ehs_symb_symb

let remove_event_handler (ehs: ('a, 'b) t) (event : 'a) (fid : 'b) (val_to_lit : 'a -> Literal.t option) (val_to_expr: 'a -> Expr.t) : (('a, 'b)  t * Formula.t) list = 
  try 
    match val_to_lit event with 
      | Some l -> 
        remove_event_handler_concrete ehs l fid val_to_expr 
      | None -> 
        remove_event_handler_symbolic ehs event fid val_to_expr 
  with _ -> raise (Failure "remove_event_handler")

let str_concrete (ehs : ('a, 'b) ehs_concrete) (fid_to_string : 'b -> string) : string = 
  let handlers_string handlers = (String.concat " " (List.map (fun (fid, _) -> Printf.sprintf "\n\t\t\t Fid: %s" (fid_to_string fid)) handlers))  in 
  ("" ^ (Hashtbl.fold (fun e handlers acc -> acc ^ Printf.sprintf "\n\t Event: %s, \n\t Handlers: %s " (Literal.str e) (handlers_string handlers)) ehs " "))

let str_symbolic (ehs : ('a, 'b) ehs_symbolic) (val_to_str : 'a -> string) (fid_to_string : 'b -> string) : string =
  let strs = 
    List.map 
      (fun (ev, hdlrs) -> 
        let hdlrs_str = String.concat " " (List.map (fun (fid, _) -> Printf.sprintf "\n\t\t\t Fid: %s" (fid_to_string fid)) hdlrs) in 
        Printf.sprintf "Event: %s, \n\t Handlers: %s " (val_to_str ev) hdlrs_str
      ) ehs in 
  String.concat "\n\t" strs

let str (ehs : ('a, 'b) t) (val_to_str : 'a -> string) (fid_to_string : 'b -> string) : string =
  let (ehs_concrete, ehs_symbolic) = ehs in
  "[\n" ^ 
     (str_concrete ehs_concrete fid_to_string) ^ "\n" ^ 
     (str_symbolic ehs_symbolic val_to_str fid_to_string) ^ 
  "\n]"


let init () : ('a, 'b) t = (Hashtbl.create CCommon.medium_tbl_size, [])