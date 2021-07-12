type ('v) t =
  | GeneralEvent of 'v         (* GeneralEvent (type) *)
  | MessageEvent of 'v         (* MessageEvent (msg) *)
  | TimingEvent of int * float (* TimingEvent (id, time) *)

let create (val_to_lit: 'v -> Literal.t option) (event_id: int) (event_type: 'v) (event_data: ('v)) : ('v) t =
  match val_to_lit event_type with
  | Some (String "General") -> GeneralEvent event_data
  | Some (String "Message") -> MessageEvent event_data
  | Some (String "Timing") -> 
    (
      match val_to_lit event_data with
      | Some (Num time) -> TimingEvent (event_id, time)
      | _ -> raise (Failure "Wrong parameters given to timing event") 
    )
  | _ -> raise (Failure "Event type not supported") 

let is_concrete (v_to_lit: 'v -> Literal.t option) (event: ('v) t) : bool =
  match event with
  | GeneralEvent (v) -> Option.is_some (v_to_lit v)
  | MessageEvent (v) -> Option.is_some (v_to_lit v)
  | TimingEvent _    -> true

let to_expr (v_to_expr: 'v -> Expr.t) (event: ('v) t) : Expr.t =
  match event with
  | GeneralEvent (v) -> v_to_expr v
  | MessageEvent (v) -> v_to_expr v
  | TimingEvent _    -> Expr.Lit (Literal.String (EventsConstants.timing_event))

let str (v_to_str: 'v -> string) (event: ('v) t) : string = 
  match event with
  | GeneralEvent (v)   -> "GeneralEvent:" ^ v_to_str v
  | MessageEvent (v)   -> "MessageEvent:" ^ v_to_str v
  | TimingEvent (_, time) -> Printf.sprintf "TimingEvent(%f)" time

let is_timing_event (event :('v) t): bool =
  match event with
  | GeneralEvent _ -> false
  | MessageEvent _ -> false
  | TimingEvent _  -> true

let lt (e1: ('v) t) (e2: ('v) t): bool =
  match e1, e2 with
  | TimingEvent (_, t1), TimingEvent (_, t2) -> t1 < t2
  | _, _ -> raise (Failure "less than operator not defined for non-timing events")
  

        