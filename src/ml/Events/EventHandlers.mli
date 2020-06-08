  type ('a, 'b) t

  val find : 'a -> ('a, 'b) t -> ('a -> Expr.t) ->  ('a -> Literal.t option) -> (('b * ('a list)) list * Formula.t) list

  val add_event_handler : ('a, 'b) t -> 'a -> 'b ->  'a list -> ('a -> Literal.t option) -> ('a -> Expr.t) -> (('a, 'b) t * Formula.t) list 
  
  val remove_event_handler : ('a, 'b) t -> 'a -> 'b -> ('a -> Literal.t option) -> ('a -> Expr.t) -> (('a, 'b) t * Formula.t) list  

  val str : ('a, 'b) t -> ('a -> string) -> ('b -> string) -> string 

  val init : unit -> ('a, 'b) t