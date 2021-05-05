open CCommon
open SCommon

module type M = sig 
  
  type vt 

  type fid_t = vt

  type event_t = vt

  type state_t

  type result_t

  type conf_info_t

  type await_conf_t

  type message_label_t = (vt) MPInterceptor.t

  type event_label_t = (await_conf_t, conf_info_t, vt, message_label_t) EventInterceptor.t

  val make_step : state_t -> (((vt -> (vt list) option) -> (vt -> Literal.t option) -> (Literal.t -> vt) -> string -> string -> vt list -> message_label_t option) option) -> (state_t * event_label_t option) list * state_t option

  val fire_event : event_t -> vt list -> state_t -> state_t list

  val final : state_t -> bool

  val new_conf : string -> string -> vt list -> state_t -> state_t

  val set_var : Var.t -> vt -> state_t -> state_t  

  val create_initial_state : UP.prog -> state_t

  val econf_to_result : state_t -> result_t

  val evaluate_prog : UP.prog -> result_t list

  val state_str : state_t -> string

  val assume : state_t -> Formula.t -> state_t option

  val fresh_lvar : string -> string -> state_t -> Type.t -> state_t

  val string_of_result : result_t list -> string

  val valid_result : result_t list -> bool

  val add_spec_var : string list -> state_t -> state_t

  val assume_type : string -> Type.t -> state_t -> state_t
  
end