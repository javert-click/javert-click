type('v) t = 
  | Send of 'v list * 'v list * 'v * 'v                                 (* msg, port list, port_orig, port_dest *)
  | Create of string * string * string * 'v list                        (* xvar, url, fid_t, args *)
  | Terminate of string * 'v                                            (* xvar, cid *)
  | NewPort of string                                                   (* xvar *)
  | PairPorts of 'v * 'v                                                (* port1, port2 *)
  | UnpairPort of 'v                                                    (* port *)
  | GetPaired of string * 'v                                            (* xvar, port *)
  | BeginAtomic                                                         (* start of atomic block in current configuration *)
  | EndAtomic                                                           (* end of atomic block in current configuration *)
  | Assume of Formula.t
  | AssumeType of string * Type.t
  | SpecVar of string list
  | GroupLabel of ('v) t list


(* Generates the appropriate M-Label given the command. Both the procedure name and number of arguments need to match. Only intercepts commands not intercepted by ES *)
let intercept 
(list_of_val : 'v -> ('v list) option) 
(v_to_lit: 'v -> Literal.t option) 
(lit_to_v: Literal.t -> 'v) 
(xvar : string) 
(fid: string) 
(vs : 'v list) : ('v t) option =
  match fid, vs with 
    | mc, [_; _; msg; plist; port_orig; port_dest] when mc = MPConstants.send -> 
      (match list_of_val plist, list_of_val msg with
        | Some plist, Some msg ->
          let msg = (lit_to_v (Loc JS2JSIL_Constants.locGlobName)) :: msg in
          Some (Send (msg, plist, port_orig, port_dest))
        | _, _ -> raise (Failure ("__MP__wrapper__send: Invalid input parameter for port/message.")))
    | mc, [_; _; url; setup_fid; args] when mc = MPConstants.create -> 
      (*Printf.printf "\nFound call to create";*)
      let url = Literal.unwrap_string (v_to_lit url) in
      let setup_fid = Literal.unwrap_string (v_to_lit setup_fid) in
      (match url, setup_fid, list_of_val args with
      | Some url, Some setup_fid, Some args -> 
        Some (Create (xvar, url, setup_fid, args))
      | _, _, _ -> raise (Failure ("Invalid input parameters for MPSemantics.create"))) 
      (*(match list_of_val args with
      | Some args -> Some (Create (xvar, url, setup_fid, args))
      | None -> raise (Failure ("Arguments for create setup procedure should be a list."))) *)

    | mc, [_; _; arg] when mc = MPConstants.terminate -> Some (Terminate (xvar, arg))

    | mc, [_;_] when mc = MPConstants.new_port -> Some (NewPort (xvar))
    
    | mc, [_; _; p1; p2] when mc = MPConstants.pair_ports -> Some (PairPorts (p1, p2))

    | mc, [_; _; p] when mc = MPConstants.unpair_port -> Some (UnpairPort (p))
    
    | mc, [_; _; p] when mc = MPConstants.get_paired -> Some (GetPaired (xvar, p))
    
    | mc, [_;_] when mc = MPConstants.begin_atomic -> Some (BeginAtomic)

    | mc, [_;_] when mc = MPConstants.end_atomic -> Some (EndAtomic)
    
    | _ -> if(fid = "__MP__wrapper__newPort") then Printf.printf "args do not match";None 
