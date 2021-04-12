(* Wrapper functions *)
let send                  = "__MP__wrapper__send"
let create                = "__MP__wrapper__create"
let terminate             = "__MP__wrapper__terminate"
let new_port              = "__MP__wrapper__newPort"
let pair_ports            = "__MP__wrapper__pairPorts"
let unpair_port           = "__MP__wrapper__unpairPort"
let get_paired            = "__MP__wrapper__getPaired"  
let begin_atomic          = "__MP__wrapper__beginAtomic"
let end_atomic            = "__MP__wrapper__endAtomic"  

(* Message event *)
let mevent                = "ProcessMessage"

let portvarsuffix         = "#port"