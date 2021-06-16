open CCommon
open SCommon
open Literal 

module L = Logging

module M 
    : MPScheduler.M = struct

      (* The configuration queue is a list of tuples, each containing an identifier and an event configuration *)
      type ('conf) conf_q_t = 'conf list

      (* The message queue is a list of tuples, each containing a message and a destination port *)
      type ('msg) message_queue_t = 'msg list

      (* The scheduler either schedules a message or a configuration *)
      type ('conf, 'msg) scheduled_unit_t = | Conf of (('conf) conf_q_t * 'conf * ('conf) conf_q_t) 
                                            | Message of 'msg * ('msg) message_queue_t

      (** Splits the configuration queue into three parts: 
        (1) pre: all configurations coming before the first non-final configuration 
        (2) curr: the current configuration to be chosen, which is the first non-final
        (3) post: configurations coming after curr 
        Returns None if all configurations are final
      **)
      let rec separate_cq (cq: ('conf) conf_q_t) (final: ('conf) conf_q_t -> bool) (post : ('conf) conf_q_t) : 
        (('conf) conf_q_t * 'conf * ('conf) conf_q_t) option = 
        match cq with
        | [] -> None
        | (c :: cq') -> 
          if (final [c]) then (separate_cq cq' final ([c] @ post))
          else Some (List.rev cq', c, post)

      (* Schedules next event configuration to run. It always choose the first non-final configuration, if any *)
      let schedule_conf (cq: ('conf) conf_q_t) (final: ('conf list -> bool)) : (('conf) conf_q_t * 'conf * ('conf) conf_q_t) option = 
        separate_cq (List.rev cq) final []

      (* Schedules the next message to be processed. It chooses the first message given that the configurations are final *)
      (* If the configurations are not final or the queue is empty, returns None *)
      let schedule_msg  (cq: ('conf) conf_q_t) (mq: ('msg) message_queue_t) (ready_to_process_msg: ('conf) conf_q_t -> bool) (has_transfer: 'msg -> bool) : ('msg * ('msg) message_queue_t) option = 
        let mq' = (List.filter has_transfer mq) @ (List.filter (fun msg -> not (has_transfer msg)) mq) in
        match mq' with
        | [] -> None
        | (msg :: mq') -> if (ready_to_process_msg cq) then (Some (msg, mq'))
                         else None

      (* Main function. Tries to schedule a configuration first. If not possible, tries to schedule message. Otherwise returns None *)
      let schedule (cq: ('conf) conf_q_t) (mq: ('msg) message_queue_t) (final: ('conf) conf_q_t -> bool) (ready_to_process_msg: ('conf) conf_q_t -> bool) (has_transfer: 'msg -> bool) : ('conf, 'msg) scheduled_unit_t option =
        match schedule_msg cq mq ready_to_process_msg has_transfer with
        | None -> 
          (* There is no msg to be processed. In this case, we run a conf *)
          (match schedule_conf cq final with
          (* We have nothing else to do *)
          | None -> None
          (* There are still confs to run *)
          | Some (cq_pre, c, cq_pos) -> Some (Conf (cq_pre, c, cq_pos)))
        | Some (mp, mq') -> Some (Message (mp, mq'))
        

end