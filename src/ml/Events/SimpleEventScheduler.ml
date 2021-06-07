module L = Logging

module M 
    : EventScheduler.M = struct

  type ('conf, 'v, 'conf_info) scheduled_unit_t = 
    | Handler  of string * 'v * ('v) Events.t * ('v list) (** xvar, funname, event, arguments **) 
    | Conf     of 'conf
    | CondConf of 'conf_info * 'v * ('v list)

  type ('conf, 'v, 'conf_info) hq_t = ('conf, 'v, 'conf_info) scheduled_unit_t list

  let schedule (hq: ('conf, 'v, 'conf_info) hq_t) : ('conf, 'v, 'conf_info) scheduled_unit_t option * ('conf, 'v, 'conf_info) hq_t =
    match hq with
    | [] -> None, []
    | hq ->
      let hq_reordered = 
      List.filter (
          fun e -> 
            match e with
            | Handler (_, _, event, _) -> not (Events.is_timing_event event)
            | Conf _ -> true
            | CondConf _ -> true
          ) hq @ 
      List.filter (
          fun e -> 
            match e with
            | Handler (_, _, event, _) -> Events.is_timing_event event 
            | Conf _ -> false
            | CondConf _ -> false
          ) hq in
      Some (List.hd hq_reordered), List.tl hq_reordered 
end  