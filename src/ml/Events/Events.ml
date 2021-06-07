type ('v) t =
  | GeneralEvent of 'v   (* GeneralEvent (type) *)
  | MessageEvent         (* MessageEvent (msg) *)
  | TimingEvent of float (* TimingEvent used for setTimeout, setInterval *)

let create (val_to_lit: 'v -> Literal.t option) (event_type: 'v) (event_data: ('v)) : ('v) t =
  match val_to_lit event_type with
  | Some (String "General") -> GeneralEvent event_data
  | Some (String "Message") -> MessageEvent
  | Some (String "Timing") -> TimingEvent (0.0)
  | _ -> raise (Failure "Event type not supported") 

let is_concrete (v_to_lit: 'v -> Literal.t option) (event: ('v) t) : bool =
  match event with
  | GeneralEvent (v) -> Option.is_some (v_to_lit v)
  | MessageEvent     -> true
  | TimingEvent _    -> true

let to_expr (v_to_expr: 'v -> Expr.t) (event: ('v) t) : Expr.t =
  match event with
  | GeneralEvent (v) -> v_to_expr v
  | MessageEvent     -> Expr.Lit (Literal.String (EventsConstants.message_event))
  | TimingEvent _    -> Expr.Lit (Literal.String (EventsConstants.timing_event))

let str (v_to_str: 'v -> string) (event: ('v) t) : string = 
  match event with
  | GeneralEvent (v)   -> "GeneralEvent:" ^ v_to_str v
  | MessageEvent       -> "MessageEvent"
  | TimingEvent (time) -> Printf.sprintf "TimingEvent(%f)" time

let is_timing_event (event :('v) t): bool =
  match event with
  | GeneralEvent _ -> false
  | MessageEvent   -> false
  | TimingEvent (time)   -> true
  

        