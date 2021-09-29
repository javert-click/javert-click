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

  type conf_t = 
    | BConfErr    of err_t list 
    | BConfCont   of state_t

  type result_t = 
    | RFail    of string * int * state_t * err_t list 
    | RSucc    of Flag.t * vt * state_t  
  
  type econf_t = cconf_t * UP.prog

  type event_label_t = (cconf_t, conf_info_t, vt, (vt) MPInterceptor.t) EventInterceptor.t

  type mp_label_t = (vt) MPInterceptor.t

  type intercept_t = ((vt -> (vt list) option) -> (vt -> Literal.t option) -> (Literal.t -> vt) -> string -> string -> vt list -> event_label_t option) option

  (* val get_state : cconf_t -> state_t *)

  (** lab_name, event_name, fun_name, args *)
  val make_step : (string * int, unit) Hashtbl.t -> econf_t -> intercept_t -> (econf_t * event_label_t option) list 

  val run_proc : econf_t -> vt -> vt list -> (vt * state_t) option

  val final  : econf_t -> bool 

  val evaluate_prog : UP.prog -> result_t list

  val string_of_result : result_t list -> string

  val deconstruct_result : result_t list -> (vt * state_t)

  val evaluate_proc : (result_t -> 'a) -> UP.prog -> string -> string list -> state_t -> 'a list

  val evaluate_lcmds : UP.prog -> LCmd.t list -> (state_t * mp_label_t list) -> (state_t * mp_label_t list) list 

  val create_initial_conf : UP.prog -> (string * vt list) option -> cconf_t

  val eval_expr : cconf_t -> Expr.t -> vt

  val fresh_lvar : string -> string -> cconf_t -> Type.t -> cconf_t * vt

  val continue_with_conf : econf_t -> econf_t -> econf_t

  val continue_with_conf_info : econf_t -> conf_info_t -> econf_t

  val continue_with_h : econf_t -> string -> fid_t -> vt list -> econf_t list

  val add_setup_proc : string -> vt list -> econf_t -> econf_t

  val str_cconf : cconf_t -> string

  val valid_result : result_t list -> bool

  val conf_to_result : cconf_t -> result_t

  val assume : cconf_t -> Formula.t list -> cconf_t option

  val check_handler_continue : econf_t -> unit

  val print_cconf : econf_t -> string

  val printing_allowed : cconf_t -> bool

  val copy_conf : cconf_t -> cconf_t

  val string_of_cconf : cconf_t -> string 

  val synthetic_lab : cconf_t -> event_label_t option 

  val set_var : Var.t -> vt -> cconf_t -> cconf_t

  val new_conf : string -> string -> vt list -> econf_t -> econf_t

  val add_spec_var : string list -> cconf_t -> cconf_t

  val assume_type : string -> Type.t -> cconf_t -> cconf_t

  val assert_formula_from_conf : Formula.t -> cconf_t -> cconf_t list

  val is_conf_finish : cconf_t -> bool
  
end