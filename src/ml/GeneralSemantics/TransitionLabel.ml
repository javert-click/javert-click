type ('conf, 'sto, 'cs, 'v) t =
    | SyncDispatch      of string * Expr.t * Expr.t * Expr.t * (Expr.t list) * int option         (** Event sync dispatch   (xvar, xscope, xthis, event, args, errorindex)       **)
    | AsyncDispatch     of string * Expr.t * Expr.t * float * Expr.t * (Expr.t list) * int option (** Event async dispatch  (xvar, xscope, xthis, prob, event, args, errorindex) **)
    | AddHandler        of string * Expr.t * Expr.t * (Expr.t list)                               (** Add event handler     (xvar, event, handler, args)                         **)
    | RemoveHandler     of string * Expr.t * Expr.t                                               (** Add event handler     (xvar, event, handler)                               **)
    | Await             of ('conf * ('sto * 'cs * int * int * int) * ('v * 'v list))   
    | Schedule          of string * Expr.t * (Expr.t list) * int option                           (** Schedule              (xvar, fid, args, errorindex)                        **)

