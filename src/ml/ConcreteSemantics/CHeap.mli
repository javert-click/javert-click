type t

val str : ?which:CCommon.SS.t option -> t -> string

val init : unit -> t

val get : t -> string -> (CObject.t * CVal.M.t) option
val set : t -> string -> (CObject.t * CVal.M.t) -> unit

val remove : t -> string -> unit

val copy : t -> t

val get_locs : t -> string list