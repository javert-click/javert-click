open CCommon
open SCommon

let file    = ref ""
let js2jsil = ref false

let arguments () =
  let usage_msg="Usage: -file <path>" in
  Arg.parse
    [
  	  (* file containing the program to symbolically execute *)
  	  "-file", Arg.String(fun f -> file := f), "file to run";
  	  (* *)
  	  "-js2jsil", Arg.Unit (fun () -> js2jsil := true), "js2jsil output";

      (* no outputs *)
      "-pbn",  Arg.Unit(fun () -> CCommon.print_by_need := true), "suppress heap output";

      (* no outputs *)
      "-noheap",  Arg.Unit(fun () -> CCommon.noheap := true), "suppress heap output";
      
      (* *)
      "-silent",  Arg.Unit(fun () -> Logging.silent := true), "suppress output";

      (* *)
      "-stats",  Arg.Unit(fun () -> CCommon.stats := true), "display statistics";

      (* *)
      "-par",  Arg.Int(fun n -> CCommon.parallel := true; CCommon.mthread := n), "multi-threading";

      (* *)
      "-bi", Arg.Unit (fun () -> SCommon.bi := true), "bi-abduction active";

      (* *)
      "-js", Arg.Unit (fun () -> SCommon.js := true), "bi-abduction active";

      (* *)
      "-bug_propagation",  Arg.Unit (fun () -> CCommon.bug_specs_propagation := true), "Propagate bug specs";

      (* *)
      "-output_verification",  Arg.Unit (fun () -> CCommon.output_verification := true), "Output for verification";

      "-events", Arg.Unit(fun () -> SCommon.events := true), "include event model";

      (* reduce printing *)
      "-branch", Arg.Int(fun d -> CCommon.max_branching := d), "Maximum branching";

      (* show line numbers *)
      "-line_numbers", Arg.Unit(fun () -> CCommon.jsil_line_numbers := true), "show line numbers";
    
      (* promises *)
      "-promises", Arg.Unit(fun () -> SCommon.events := true; CCommon.promises := true), "include promises model";
    
      (* include message passing model *)
      "-mp", Arg.Unit(fun () -> mp := true), "include message passing model";
    ]
    (fun s -> Format.eprintf "WARNING: Ignored argument %s.@." s)
    usage_msg

let process_file (path : string) : unit =

  SCommon.cosette := true;
  
  (** Step 1: PARSING                                            *)
  (*  -----------------------------------------------------------*)
  L.log L.Normal (lazy "\n***Stage 1: Parsing program. ***\n");
  let e_prog     = Parsing_Utils.parse_eprog_from_file path in
  let fname = Filename.basename !file in
  let basename = Filename.basename (Filename.chop_extension !file) in
  let e_prog = {e_prog with filename = basename} in
  let proc_names = e_prog.proc_names in 
	
  (** Step 2: Syntactic Checks + Program transformation          *)
  (*  -----------------------------------------------------------*)
  L.log L.Normal (lazy "*** Stage 2: Transforming the program.\n");
  let prog = Parsing_Utils.eprog_to_prog e_prog in
  EProg.perform_syntax_checks e_prog prog;
  L.log L.Normal (lazy "\n*** Stage 2: DONE transforming the program.\n");
  
  (** Step 3: Symbolic Execution                                 *)
  (*  -----------------------------------------------------------*)	
  L.log L.Normal (lazy "*** Stage 3: Symbolic Execution.\n");
  if (!SCommon.bi) then (
    raise (Failure "No bi-abduction here.")
  ) else ( 
    (match UP.init_prog prog with
    | Error _ -> raise (Failure "Creation of unification plans failed.")
    | Ok prog' ->  
        if (!events) then (
          let rets = EventSSemantics.M.evaluate_prog prog' in
          L.log L.Normal (lazy(Printf.sprintf "Final Event States: \n%s\n" (EventSSemantics.M.string_of_result rets)));
        ) else if (!mp) then (
          let rets = MPSSemantics.M.evaluate_prog prog' in
          L.log L.Normal (lazy(Printf.sprintf "Final MP States: \n%s\n" (MPSSemantics.M.string_of_result rets)));
        ) else ( 
          let rets = SInterpreter.M.evaluate_proc (fun x -> x) prog' (JS2JSIL_Constants.main_fid ^ basename) [] (SState.M.init None) in
          L.log L.Normal (lazy(Printf.sprintf "Final states: \n%s\n" (SInterpreter.M.string_of_result rets)));
        ) 
    )
  )
  

let main () =
		arguments ();
    process_file !file;
    if (!stats) then print_statistics ();
    Logging.wrap_up();

    if (!CCommon.parallel) then (
      let left : int = CCommon.atomic_incr (-1) in ()
      (* print_to_all (Printf.sprintf "Left: %d" left) *)
    );

    (* Synchronise with children *)
    try while true do 
      let _ = Unix.wait() in () 
    done;
    with Unix.Unix_error (Unix.ECHILD, "wait", _) -> ()

let _ = main()