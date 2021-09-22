module L = Logging

module M 
    : EventScheduler.M = struct

  let timing_event_cycle = 10

  type ('conf, 'v, 'conf_info) scheduled_unit_t = 
    | Handler  of string * 'v * ('v) Events.t * ('v list) (** xvar, funname, event, arguments **) 
    | Conf     of 'conf
    | CondConf of 'conf_info * 'v * ('v list)

  type ('conf, 'v, 'conf_info) hq_t = ('conf, 'v, 'conf_info) scheduled_unit_t list

  let lt (su1: ('conf, 'v, 'conf_info) scheduled_unit_t) (su2: ('conf, 'v, 'conf_info) scheduled_unit_t) : bool =
    match su1, su2 with
    | Handler (_, _, e1, _), Handler (_, _, e2, _) -> Events.lt e1 e2
    | _, _ -> raise (Failure "Less than operator not defined for non-handlers") 
  
  let rec sort_timing_events = function
    [] -> []
    | su1::sus -> let small = List.filter (fun su2 -> (lt su2 su1)) sus
           and large = List.filter (fun su2 -> not(lt su2 su1)) sus

  in sort_timing_events small @ (su1 :: sort_timing_events large);;

  let schedule (hq: ('conf, 'v, 'conf_info) hq_t) (n_handlers: int) : ('conf, 'v, 'conf_info) scheduled_unit_t option * ('conf, 'v, 'conf_info) hq_t =
    match hq with
    | [] -> None, []
    | (h::hq') ->
      if (n_handlers <= timing_event_cycle) then
      (
        let hq_timing_events = List.filter (
          fun e -> 
            match e with
            | Handler (_, _, event, _) -> Events.is_timing_event event 
            | Conf _ -> false
            | CondConf _ -> false
          ) hq in 
        let hq_reordered = 
        List.filter (
          fun e -> 
            match e with
            | Handler (_, _, event, _) -> not (Events.is_timing_event event)
            | Conf _ -> true
            | CondConf _ -> true
          ) hq @ 
        sort_timing_events hq_timing_events in
        Some (List.hd hq_reordered), List.tl hq_reordered 
      ) else (
        Some h, hq' 
      )
end  