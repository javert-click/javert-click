type ('conf, 'cinfo, 'v, 'm) t =
  | SyncDispatch      of string * 'v * ('v list)                                     (** Event sync dispatch   (xvar, event, args)       **)
  | AsyncDispatch     of string * 'v * ('v list)                                     (** Event async dispatch  (xvar, prob, event, args) **)
  | AddHandler        of 'v * 'v * ('v list)                                         (** Add event handler     (xvar, event, handler, args) **)
  | RemoveHandler     of 'v * 'v                                                     (** Add event handler     (xvar, event, handler) **)
  | Await             of ('conf * 'cinfo * ('v * 'v list))   
  | Schedule          of string * 'v * ('v list)                                     (** Schedule (xvar, fid, args) **)
  | MLabel            of 'm                                                          (* Message Passing Label (See MPInterceptor for more details) *)


let intercept 
      (m_intercept : (('v -> ('v list) option) -> ('v -> Literal.t option) -> (Literal.t -> 'v) -> string -> string -> 'v list -> 'm option) option)
      (list_of_val : 'v -> ('v list) option)
      (v_to_lit    : 'v -> Literal.t option) 
      (lit_to_v    : Literal.t -> 'v)
      (x           : string)
      (fid_str     : string) 
      (vs          : 'v list) : (('conf, 'cinfo, 'v, 'm) t) option =  
      (match fid_str, vs with
        | ec, (_ :: _ :: event :: args) when ec = EventsConstants.sync_dispatch -> 
            (** Synchronous Dispatch (as used in DOM) **)
            (** Event is fst_arg and we assume the use of flag @JSIL **)
            Some (SyncDispatch (x, event, args))

        | ec, (xscope :: xthis :: event :: args) when ec = EventsConstants.sync_dispatch_native ->
            (** Synchronous Dispatch (native) **)
            (** Event is fst_arg and we assume that the handler was compiled normaly **)
            Some (SyncDispatch (x, event, [xscope; xthis] @ args))

        | ec, (_ :: _ :: event :: args) when ec = EventsConstants.async_dispatch ->
            (** Asynchronous Dispatch. We assume the use of flag @JSIL **)
            Some (AsyncDispatch (x, event, args))

        | ec, (xscope :: xthis :: event :: args) when ec = EventsConstants.async_dispatch_native ->
            (** Asynchronous Dispatch (native) **)
            (** Event will be triggered with probability prob. We assume the use of flag @JSIL **)
            Some (AsyncDispatch (x, event, [xscope; xthis] @ args))
        
        | ec, (_ :: _ :: event :: handler :: args) when ec = EventsConstants.add_handler ->
            (** Add Handler (event is fst_arg) **)
            Some (AddHandler(event, handler, args))
        
        | ec, [_; _; event; handler] when ec = EventsConstants.remove_handler -> 
            (** Remove Handler (event is fst arg) **) 
            Some (RemoveHandler(event, handler))

        | ec, (_ :: _ :: fid :: args) when ec = EventsConstants.schedule ->
            (** Schedule **)
            Some (Schedule (x, fid, args))

        | _ -> 
        (match m_intercept with 
            | None -> None 
            | Some m_intercept -> 
            (match m_intercept list_of_val v_to_lit lit_to_v x fid_str vs with 
                | None -> None 
                | Some x -> Some (MLabel x))))
