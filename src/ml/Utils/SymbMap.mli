
  
  type ('a, 'b) t

  val find : ('a, 'b) t -> 'a -> ('a -> bool) -> ('a -> Expr.t) -> ('b * Formula.t) list

  val get_keys : ('a, 'b) t -> 'a list

  val filter: ('a, 'b) t -> 'b -> 'a list 

  val add : ('a, 'b) t -> 'a -> 'b -> ('a -> bool) -> ('a -> Expr.t) -> (('a, 'b) t * Formula.t) list

  val replace : ('a, 'b) t -> 'a -> 'b -> ('a -> bool) -> ('a -> Expr.t) -> ('b -> 'b -> 'b) -> (('a, 'b) t * Formula.t) list 

  val remove : ('a, 'b) t -> 'a -> ('a -> bool) -> ('a -> Expr.t) -> (('a, 'b) t * Formula.t) list
  
  val replace_seq : ('a, 'b) t -> 'a list -> 'b -> ('a -> bool) -> ('a -> Expr.t) -> ('b -> 'b -> 'b) -> (('a, 'b) t * Formula.t) list

  val remove_seq : ('a, 'b) t -> 'a list -> ('a -> bool) -> ('a -> Expr.t) -> (('a, 'b) t * Formula.t) list
  
  val str : ('a, 'b) t -> ('a -> string) -> ('b -> string) -> string 

  val init : unit -> ('a, 'b) t

  