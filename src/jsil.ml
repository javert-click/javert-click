open CCommon
open Lexing
open JS2JSIL_Constants
open Heap2Program

let file      = ref ""
let js        = ref false
let compile   = ref false
let test262   = ref false
let events    = ref false
let heap_file = ref ""


  let arguments () =
    let usage_msg="Usage: -file <path>" in
    Arg.parse
      [
        (* file to compile *)
        "-file", Arg.String(fun f -> file := f), "file to run";

        (* access debugging information *)
        "-debug", Arg.Unit(fun () -> debug := true), "debug information";

        (* it is a compiled js program *)
        "-js", Arg.Unit(fun () -> js := true), "input is a compiled js program";

        (* no outputs *)
        "-noheap",  Arg.Unit(fun () -> CCommon.noheap := true), "suppress heap output";

        (* no outputs *)
        "-pbn",  Arg.Unit(fun () -> CCommon.print_by_need := true), "print by need";

        (* compile and run *)
        "-js2jsil", Arg.Unit(fun () -> js := true; compile := true), "compile and run";

        (* use test262 harness *)
        "-test262",  Arg.Unit(fun () -> js := true; compile := true; test262 := true), "use test262 harness";

        (* no outputs *)
        "-silent",  Arg.Unit(fun () -> Logging.silent := true), "suppress output";

        (* *)
        "-stats",  Arg.Unit(fun () -> CCommon.stats := true), "display statistics";

        (* *)
        "-par",  Arg.Int(fun n -> CCommon.parallel := true; CCommon.mthread := n), "multi-threading";

        (* show line numbers *)
        "-line_numbers", Arg.Unit(fun () -> CCommon.jsil_line_numbers := true), "show line numbers";

        (* include event model *)
        "-events", Arg.Unit(fun () -> events := true), "include event model";

        (** print heap as program *)
        "-printheap",  Arg.String(fun f -> heap_file := f), "file to hold the heap";

        (* promises *)
        "-promises", Arg.Unit(fun () -> events := true; promises := true), "include promises model";
      ]
      (fun s -> Format.eprintf "WARNING: Ignored argument %s.@." s)
      usage_msg

let burn_to_disk (path : string) (data : string) : unit =
  let oc = open_out path in
  output_string oc data;
  close_out oc

let init_prog (prog: Prog.t) =
  let prog    = UP.init_prog prog in 
  (match prog with | Ok prog -> prog | _ -> raise (Failure "Program could not be initialised"))

let print_heap_as_prog (rets : CInterpreter.M.result_t list) : unit = 
  if ((!heap_file) <> "") then (
    let ih_ext_prog = Parsing_Utils.parse_eprog_from_file "initial_heap.jsil" in
    let ih_prog = Parsing_Utils.eprog_to_prog ih_ext_prog in
    L.log L.Normal (lazy (Printf.sprintf "print_heap_as_prog"));
    let res_ih_prog = CInterpreter.M.evaluate_prog (init_prog ih_prog) in
    L.log L.Normal (lazy (Printf.sprintf "program evaluated"));
    match res_ih_prog with
    | [] -> raise (Failure "ERROR - Not possible to evaluate initial heap prog")
    | res ::_ -> 
      (match res with
      | RFail _ -> raise (Failure "ERROR - Not possible to evaluate initial heap prog")
      | RSucc (_, _, cinitialstate) -> 
          let (initial_heap, _, _) = cinitialstate in
          let found_locs = Hashtbl.create 500 in
          let initial_locs = CHeap.get_locs initial_heap in
          L.log L.Normal (lazy (Printf.sprintf "initial locs size: %d" (List.length initial_locs)));
          List.iter 
            (fun loc -> Hashtbl.replace found_locs loc (Expr.Lit (Loc loc))) initial_locs;
            let name = !heap_file in 
            let (v, st) : (CVal.M.t * CState.t) = CInterpreter.M.deconstruct_result rets in 
            let (heap, _, _) = st in 
            let loc = 
              match CVal.M.to_literal v with 
                | Some (Loc loc) -> loc 
                | _              -> raise (Failure "print_heap_as_prog: no location returned") in 
            let heap_prog = heap2prog name heap loc found_locs in 
            burn_to_disk (name ^ ".jsil") (EProg.str heap_prog) 
          )
    )


let return_to_exit (ret_ok : bool) : unit =
  match ret_ok with
  | false -> exit 1
  | true  -> ()

let string_of_ret_val (heap : CHeap.t) (ret_flag : Flag.t) (v : Literal.t) : string =
  match ret_flag with
  | Normal -> Literal.str v
  | Error -> if (!js) then CInterpreter.M.string_of_js_error heap v else ""

let run f (prog : Prog.t) : unit = 
  let prog = init_prog prog in
  let ret     = f prog in
  CCommon.print_by_need := false; 
  L.log L.Normal (lazy( Printf.sprintf "Final state: \n%s\n" (CInterpreter.M.string_of_result ret)));
  print_heap_as_prog ret; 
  return_to_exit (CInterpreter.M.valid_result ret)

let main () =
  arguments ();
  JSParserMain.init ();
  if (!compile) then (
    try
      JSParserMain.verbose := false;
      let main : string = IO_Utils.load_file (!file) in
      let all  = if (!test262) then (IO_Utils.load_file "harness.js") ^ "\n" ^ main else main in
      let offset_converter = JS_Utils.memoized_offsetchar_to_offsetline all in
      let e    = JSParserMain.exp_from_string ~force_strict:true all in
      let basename = Filename.basename (Filename.chop_extension !file) in
      let (ext_prog, cc_tbl, vis_tbl) = JS2JSIL_Compiler.js2jsil e offset_converter false basename in
        let prog = Parsing_Utils.eprog_to_prog ext_prog in
          run CInterpreter.M.evaluate_prog prog
        with
          | JSParser.ParserFailure file -> Printf.printf "\nParsing problems with the file '%s'.\n" file; exit 1
          | JS2JSIL_Preprocessing.EarlyError e -> Printf.printf "\nParser post-processing threw an EarlyError: %s\n" e; exit 1
          | _ -> Printf.printf "Uncaught parser exception.\n"; exit 1)
  else (
    let ext_prog = Parsing_Utils.parse_eprog_from_file !file in
    let basename = Filename.basename (Filename.chop_extension !file) in
    let ext_prog = {ext_prog with filename = basename} in
    let prog = Parsing_Utils.eprog_to_prog ext_prog in
    let f = if (!events) 
      then EventCSemantics.M.evaluate_prog
      else CInterpreter.M.evaluate_prog in 
      run f prog
  );
  if (!stats) then print_statistics ();
  Logging.wrap_up ()

let _ = main ()