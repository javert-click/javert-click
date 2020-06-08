open CCommon
open SCommon

module type M = sig 
  
  type vt 

  type fid_t = vt 

  type err_t

  type state_t 

  type call_stack_t 
  
  type store_t 

  type conf_info_t  = store_t * call_stack_t * int * int * int
  type await_cont_t = store_t * call_stack_t * int * int * int * vt * vt list

  (** Type of configurations: state, optional predicate set, call stack, previous index, current index *)
  type cconf_t = 
    | ConfErr    of string * int * state_t * err_t list 
    | ConfCont   of state_t * call_stack_t * int * int * int * (await_cont_t option)
    | ConfFinish of Flag.t  * vt * state_t * (await_cont_t option) 
    (** Equal to Conf cont + the id of the required spec *)
    | ConfSusp   of string  * state_t * call_stack_t * int * int * int 

  type transition_label_t = (cconf_t, store_t, call_stack_t, vt) TransitionLabel.t

  type conf_t = 
    | BConfErr    of err_t list 
    | BConfCont   of state_t

  type result_t = 
    | RFail    of string * int * state_t * err_t list 
    | RSucc    of Flag.t * vt * state_t  
  
  type econf_t = cconf_t * UP.prog

  val make_eval_expr : state_t -> (Expr.t -> vt) 

  val get_state : cconf_t -> state_t 

  (** lab_name, event_name, fun_name, args *)
  val make_step : (string * int, unit) Hashtbl.t -> econf_t -> (state_t -> Cmd.t -> (transition_label_t option)) -> (econf_t * transition_label_t option) list 

  val run_proc : econf_t -> vt -> vt list -> (vt * state_t) option

  val is_final  : econf_t -> bool 

  val evaluate_prog : UP.prog -> result_t list

  val string_of_result : result_t list -> string

  val deconstruct_result : result_t list -> (vt * state_t)

  val evaluate_proc : (result_t -> 'a) -> UP.prog -> string -> string list -> state_t -> 'a list

  val evaluate_lcmds : UP.prog -> LCmd.t list -> state_t -> state_t list 

  val create_initial_conf : UP.prog -> cconf_t

  val continue_with_conf : econf_t -> econf_t -> econf_t

  val continue_with_conf_info : econf_t -> conf_info_t -> econf_t

  val continue_with_h : econf_t -> string -> fid_t -> vt list -> econf_t list

  val get_next : econf_t -> string option -> econf_t

  val str_cconf : cconf_t -> string
  
  val get_pid_from_val : vt -> state_t -> string

  val valid_result : result_t list -> bool

  val conf_to_result : cconf_t list -> result_t list

  val assume : cconf_t -> Formula.t list -> cconf_t option

  val check_handler_continue : econf_t -> unit

  val print_cconf : econf_t -> string

  val printing_allowed : cconf_t -> bool

  val copy_conf : cconf_t -> cconf_t

  val string_of_cconf : cconf_t -> string 

  val synthetic_lab : cconf_t -> transition_label_t option 
  
end