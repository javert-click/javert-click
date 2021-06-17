(** Logging levels *)
type t = 
  | Normal    (** Normal output *)
  | Verboser  (** More verbose output *)
  | Test      (** Only asserts output *)

(** Logging enabled *)
let silent = ref false

(** File prefix for log files *)
let log_prefix = "log_"

(** File extension for log files *)
let log_extension = "log"

(** 
  Log filenames 

  @param lvl Logging level
  @return Filename of the level
*)
let filename (lvl : t) : string = log_prefix ^ 
  (match lvl with
  | Normal ->  "normal"
  | Verboser -> "verboser"
  | Test -> "test") ^ "." ^ log_extension

(** File descriptors for log files *)
let log_normal = ref (open_out (filename Normal))
let log_verboser = ref (open_out (filename Verboser))
let log_test = ref (open_out (filename Test))

let wrap_up () : unit = 
  close_out !log_normal;
  close_out !log_verboser;
  close_out !log_test

(** 
  Actual logging

  @param lvl Logging level
  @param msg Log message
*)
let log lvl (msg : string lazy_t) : unit = 
   if (not !silent) then
    let msg = Lazy.force msg in 
    if (msg <> "") then (
    let msg = Printf.sprintf "%s\n%!" msg in 
    let msg = Printf.sprintf "%s\n%!" msg in 
    (match lvl with 
    | Normal -> output_string !log_normal msg; output_string !log_verboser msg 
    | Verboser -> output_string !log_verboser msg
    | Test -> output_string !log_test msg))

(** Closing file descriptors *)

let log_with_close lvl (msg : string lazy_t) : unit = 
  if (not !silent) then
    let msg = Lazy.force msg in 
    if (msg <> "") then (
      let msg = Printf.sprintf "%s\n%!" msg in 
      (match lvl with 
      | Normal -> output_string !log_normal msg; output_string !log_verboser msg  
      | Verboser -> output_string !log_normal msg
      | Test -> output_string !log_test msg
    ));
    wrap_up ();
    log_normal := open_out_gen [Open_creat; Open_text; Open_append] 0o640 (filename Normal);
    log_verboser := open_out_gen [Open_creat; Open_text; Open_append] 0o640 (filename Verboser);
    log_test := open_out_gen [Open_creat; Open_text; Open_append] 0o640 (filename Test)

(** Failure *)
let fail msg = 
  log Normal (lazy msg);
  raise (Failure msg)