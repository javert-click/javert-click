module L = Logging

(**************
 * Exceptions *
 **************)

exception Syntax_error of string

(**************
 * Hashtables *
 **************)

let small_tbl_size  = 1
let medium_tbl_size = 1
let big_tbl_size    = 1

(**********
 * Syntax *
 **********)

let syntax_js = ref false
let perform_syntax_checks = ref false

(*************
 * JS-2-JSIL *
 *************)

let js2jsil_harnessing   = ref false
let js2jsil_line_numbers = ref false
let js2jsil_sep_procs    = ref false
let dom                  = ref false
let dom_level1           = ref false
let events               = ref false
let promises             = ref false
let mp                   = ref false
let noinitialheap        = ref false
let heap_json_file       = ref ""

(* Maximum branching *)
let max_branching = ref 50

(*********************
 * Biabduction stuff *
 *********************)

let bug_specs_propagation = ref false
let output_verification = ref false

(*************
 * Debugging *
 *************)

let debug        = ref false
let sanity       = ref true

let forbidden_prints = [ "initDOMHeap"; "initUIEventsFiles"; "initDocumentLoading"](*); "i__getValue" ]*)
let assert_fun_names = ["TestHarnessAssertEquals"; "TestHarnessAssertNotEquals"; "TestHarnessAssertTrue"; "TestHarnessAssertFalse"; 
  "TestHarnessAssertThrows"; "TestHarnessAssertThrowsJs"; "TestHarnessAssertThrowsExactly"; "TestHarnessAssertThrowsDom";
  "TestHarnessAssertUnreached"; "TestHarnessAssertArrayEquals"; "TestHarnessAssertGreaterThanEqual"; "TestHarnessAssertGreaterThan"; "TestHarnessAssertLessThanEqual";
  "TestHarnessAssertLessThan"; "TestHarnessAssertOwnProperty"; "TestHarnessAssertClassString"; "TestHarnessAssertObjectEquals"]

let html_parser_path = "HTMLParser.js"
let url_parser_path  = "URLParser.js"
let html_json_path   = "htmlfile.json"

let debugger_eval_re = Str.regexp "eval(\(.*\))"

let get_string_hashtbl_keys ht =
  Hashtbl.fold
    (fun key _ ac -> key :: ac)
    ht
    []

let print_var_list var_list =
  List.fold_left
    (fun ac var -> if (ac = "") then var else ac ^ "; " ^ var)
    ""
    var_list

(**********************
 * Sets and multisets *
 **********************)

module MyInt =
  struct
    type t = int
    let compare = Pervasives.compare
  end

module MyNumber =
  struct
    type t = float
    let compare = Pervasives.compare
  end

module MyBool =
  struct
    type t = bool
    let compare = Pervasives.compare
  end

module SS = Set.Make(String)
module MS = CCMultiSet.Make(String)
module SI = Set.Make(MyInt)
module SB = Set.Make(MyBool)
module SN = Set.Make(MyNumber)

(**********************
 * Lists              *
 **********************)

(* Cross product of two lists, l1 and l2, combining its elements with function f *)
let cross_product
    (l1 : 'a list) (l2 : 'b list)
    (f : 'a -> 'b -> 'c) : 'c list =
  List.fold_left (fun result e1 -> result @ (List.map (f e1) l2)) [] l1

let remove_string_duplicates strings =
  let string_set = SS.of_list strings in
  SS.elements string_set

let remove_number_duplicates numbers =
  let number_set = SN.of_list numbers in
  SN.elements number_set

let remove_int_duplicates ints =
  let int_set = SI.of_list ints in
  SI.elements int_set


let list_sub (lst : 'a list) (i : int) (len : int) : 'a list =
  let a = Array.of_list lst in
  let a' = Array.sub a i len in
  Array.to_list a'

let list_inter (lst1 : 'a list) (lst2 : 'a list) : 'a list =
  let lst = cross_product lst1 lst2 (fun a b -> if (a = b) then Some a else None) in
  List.map Option.get (List.filter (fun x -> x <> None) lst)

let right_combine (lst1 : 'a list) (lst2 : 'b list) : ('a * 'b) list =
    let rec loop lst1 lst2 comb_lst =
      match lst1, lst2 with
      | _, [] -> List.rev comb_lst
      | a :: r_lst1, b :: r_lst2 -> loop r_lst1 r_lst2 ((a, b) :: comb_lst)
      | _, _ -> raise (Failure "Unsupported list right-combine.") in
    loop lst1 lst2 []

let get_list_somes (lst : 'a option list) : 'a  list =
  let lst = List.filter (fun x -> x <> None) lst in
  List.map (fun x -> Option.get x) lst


 let super_split (lst : 'a list) : ('a list * 'a * 'a list) list =
  let (res, _) = List.fold_left
    (fun (ret_ac, prefix) a ->
      let ret_ac' = List.map (fun (prefix, elem, suffix) -> (prefix, elem, suffix @ [ a ])) ret_ac in
      (ret_ac' @ [ (prefix, a, [])], prefix @ [ a ])
    ) ([], []) lst in res


(*************************)
(** Generic fresh names **)
(*************************)

let fresh_sth (name : string) : (unit -> string) =
  let counter = ref 0 in
  let rec f () =
    let v = name ^ (string_of_int !counter) in
    counter := !counter + 1;
    v
  in f

(************
 * Printing *
 ************)

let escape_string     = ref false
let specs_on          = ref true
let line_numbers_on   = ref false
let jsil_line_numbers = ref false
let print_by_need     = ref false
let noheap            = ref false

let rec repeat_string (str : string) (i : int) : string  =
	if i = 0 then "" else str ^ (repeat_string str (i - 1))

(** Auxiliary function for printing floating-point numbers *)
let string_of_float (x : float) : string =
  if (x == nan)
  		then "nan"
  		else if (x == neg_infinity)
  			then "-inf"
  			else if (x == infinity)
  				then "inf"
  				else Batteries.Float.to_string x

(************
 * Globals *
 ************)

let previously_normalised = ref false
let verification          = ref false
let symb_testing          = ref false
let unfolding             = ref false
let manual_proof          = ref false

(********************
 * Paralell threads *
 ********************)
let parallel = ref false

let branch = ref false

let mthread = ref 1

let lockfile = "lock.javert"

let _ =
  let file = open_out lockfile in
    output_value file 1;
  close_out file

let rec atomic_incr (incr : int) : int =
  try
    let file = open_in lockfile in
      let athread : int = input_value file in
    close_in file;
    let file = open_out lockfile in
      output_value file (athread + incr);
    close_out file;
    athread + incr
  with
  | _ -> atomic_incr incr

let threads () : int =
  let file = open_in lockfile in
  let athread : int = input_value file in
    close_in file;
    athread

(*************************
 * Timing and Statistics *
 *************************)

let stats = ref false

let time () = if (not !stats) && (!L.silent) then 0. else Sys.time()

let exec_cmds = ref 0

(* Performance statistics *)
let statistics = Hashtbl.create 511

(* Update the value of the fname statistic in the table, or add it if not present *)
let update_statistics (fname : string) (time : float) =
  if (not !stats) && (!L.silent) then () else (
  if (Hashtbl.mem statistics fname)
    then let stat = Hashtbl.find statistics fname in
    Hashtbl.replace statistics fname (time :: stat)
    else Hashtbl.add statistics fname [ time ])

let print_to_all (str : string) =
  L.log L.Normal (lazy str);
  print_endline str

let print_statistics () =

  print_to_all "\n STATISTICS \n ========== \n";

  let keys : SS.t = SS.of_list (Hashtbl.fold (fun k _ ac -> k :: ac) statistics []) in

  print_to_all (Printf.sprintf "Executed commands: %d" !exec_cmds);
  (** let out = open_out_gen [Open_wronly; Open_append; Open_creat; Open_text] 0o666 "./Stats.txt" in
  output_string out ((string_of_int !exec_cmds) ^ "\n");
  close_out out;  *)

  (* Process each item in statistics table *)
  SS.iter (fun f ->
    let lt = Hashtbl.find statistics f in
    (* Calculate average, min, max *)
    let min = ref infinity in
    let max = ref 0. in
    let tot = ref 0. in
    let avg = ref 0. in
    let std = ref 0. in
    let len = float_of_int (List.length lt) in
    tot := List.fold_left (fun ac t ->
      (if t < !min then min := t); (if t > !max then max := t);
      ac +. t) 0. lt;
    avg := !tot/.len;
    std := ((List.fold_left (fun ac t -> ac +. (!avg -. t) ** 2.) 0. lt) /. len) ** 0.5;
    print_to_all (Printf.sprintf "\t%s" f);
    print_to_all (Printf.sprintf "Tot: %f\tCll: %d\nMin: %f\tMax: %f\nAvg: %f\tStd: %f\n" !tot (int_of_float len) !min !max !avg !std)) keys

