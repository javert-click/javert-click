open CCommon
open SCommon

module type M = sig 

  type ('conf) conf_q_t = 'conf list

  type ('msg) message_queue_t = 'msg list

  type ('conf, 'msg) scheduled_unit_t = | Conf of (('conf) conf_q_t * 'conf * ('conf) conf_q_t) 
                                        | Message of 'msg * ('msg) message_queue_t

  val schedule : ('conf) conf_q_t -> ('msg) message_queue_t -> (('conf) conf_q_t -> bool) -> ('msg -> bool) -> ('conf, 'msg) scheduled_unit_t option
  
end