type('v) t = 
  | Send of 'v list * 'v list * 'v * 'v * 'v                            (* msg, port list, port_orig, port_dest, event *)
  | NotifyAll of 'v list * 'v                                            (* msg, event *)
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

let rec str (label: ('v) t) (v_to_str: 'v -> string) : string =

  let v_list_to_str vlist = "(" ^ String.concat "," (List.map (fun v -> v_to_str v) vlist) in

  match label with 
  | Send (msg, plist, porig, pdest, event) -> Printf.sprintf "Send<%s, %s, %s, %s, %s>" (v_list_to_str msg) (v_list_to_str plist) (v_to_str porig) (v_to_str pdest) (v_to_str event)
  | NotifyAll (msg, event) -> Printf.sprintf "NotifyAll<%s, %s>" (v_list_to_str msg) (v_to_str event)
  | Create (xvar, url, fid, args) -> Printf.sprintf "%s = Create<%s, %s, %s>" xvar url fid (v_list_to_str args) 
  | Terminate (xvar, cid) -> Printf.sprintf "%s = Terminate<%s>" xvar (v_to_str cid)
  | NewPort (xvar) ->  Printf.sprintf "%s = NewPort<>" xvar
  | PairPorts (p1, p2) -> Printf.sprintf "PairPorts<%s, %s>" (v_to_str p1) (v_to_str p2)
  | UnpairPort (p) -> Printf.sprintf "UnpairPorts<%s>" (v_to_str p)
  | GetPaired (xvar, p) -> Printf.sprintf "%s = GetPaired<%s>" xvar (v_to_str p)
  | BeginAtomic -> Printf.sprintf "BeginAtomic<>"
  | EndAtomic -> Printf.sprintf "EndAtomic<>"
  | Assume (f) -> Printf.sprintf "Assume<%s>" (Formula.str f)
  | AssumeType (xvar, typ) -> Printf.sprintf "%s = AssumeType<%s>" xvar (Type.str typ)
  | SpecVar (vars) -> Printf.sprintf "SpecVar<%s>" (String.concat "," vars)
  | GroupLabel (labels) -> String.concat ", " (List.map (fun label' -> str label' v_to_str) labels)

(* Generates the appropriate M-Label given the command. Both the procedure name and number of arguments need to match. Only intercepts commands not intercepted by ES *)
let intercept 
(list_of_val : 'v -> ('v list) option) 
(v_to_lit: 'v -> Literal.t option) 
(lit_to_v: Literal.t -> 'v) 
(xvar : string) 
(fid: string) 
(vs : 'v list) : ('v t) option =
  match fid, vs with 
    | mc, [_; _; msg; plist; port_orig; port_dest; event] when mc = MPConstants.send -> 
      (match list_of_val plist, list_of_val msg with
        | Some plist, Some msg ->
          let msg = (lit_to_v (Loc JS2JSIL_Constants.locGlobName)) :: msg in
          Some (Send (msg, plist, port_orig, port_dest, event))
        | _, _ -> raise (Failure ("__MP__wrapper__send: Invalid input parameter for port/message.")))
    | mc, [_; _; msg; port_orig; event] when mc = MPConstants.notify_all ->
          let msg = (lit_to_v (Loc JS2JSIL_Constants.locGlobName)) :: [msg; port_orig] in
          Some (NotifyAll (msg, event))
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
