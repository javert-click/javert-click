(** Implementation of JSIL call stacks *)
module M 
  (Val       : Val.M) 
  (Store     : Store.M with type vt = Val.t) = struct 

  (** Type of call stacks: a call stack is a list of tuples, each of which contains
    1) identifier of the current procedure (string)
    2) arguments of the current procedure (list of values)
    3) calling store
    4) variable that should hold the return value
    5) index of the calling procedure from whence the procedure was called
    6) normal continuation index in the calling procedure
    7) optional error continuation index in the calling procedure
  *)
  type t = (string * (Val.t list) * (Store.t option) * Var.t * int * int * (int option)) list 

  (** 
    Get current procedure identifier

    @param cs Target call stack
    @return Identifier of the procedure currently being executed
  *)

  let get_cur_proc_id (cs : t) : string = 
  match cs with 
  | (pid, _, _, _, _, _, _) :: _ -> pid 
  | _ -> raise (Failure "Malformed configuration") 

  (** 
    Get current arguments

    @param cs Target call stack
    @return Arguments of the procedure currently being executed
  *)
  let get_cur_args (cs : t) : Val.t list = 
  match cs with 
  | (_, args, _, _, _, _, _) :: _ -> args 
  | _ -> raise (Failure "Malformed configuration") 

  (** 
    Call stack copy

    @param cs Target call stack
    @return Copy of the given call stack
  *)
  let copy (cs : t) : t = 
    List.map (fun (a, b, c, d, e, f, g) -> a, b, (Option.map Store.copy c), d, e, f, g) cs

  let procs (cs : t) : string list = List.map (fun (x, _, _, _, _, _, _) -> x) cs

  let str (cs : t) = String.concat ", " (procs cs)

  let truncate (cs : t) : t = 
    match cs with 
      | (fid, vs, p_sto, ret_var, i, j, k) :: _ -> [ (fid, vs, None, "ret", -1, -1, None) ]
      | _ -> cs 
    
    


end