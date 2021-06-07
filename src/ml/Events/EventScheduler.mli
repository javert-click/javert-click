module type M = sig 

  type ('conf, 'v, 'conf_info) scheduled_unit_t = 
                    | Handler  of string * 'v * ('v) Events.t * ('v list) (** xvar, funname, event, arguments **) 
                    | Conf     of 'conf
                    | CondConf of 'conf_info * 'v * ('v list)

  type ('conf, 'v, 'conf_info) hq_t = ('conf, 'v, 'conf_info) scheduled_unit_t list

  val schedule : ('conf, 'v, 'conf_info) hq_t -> ('conf, 'v, 'conf_info) scheduled_unit_t option * ('conf, 'v, 'conf_info) hq_t 
  
end