open CCommon
open SCommon


let lloc (loc : string) : Expr.t = Lit (Loc loc)
let lstr (str : string) : Expr.t = Lit (String str)

let field2cmd (loc : Expr.t) (prop : string) (v : Expr.t) : LabCmd.t list  =  
  [ LBasic (Mutation (loc, lstr prop, v)) ]
 

let new_cmd (ovar : string) (v : Expr.t) : LabCmd.t list =
  [ LBasic (New (ovar, None, Some v)) ]




let rec object2cmds_props (found_locs : (string, Expr.t) Hashtbl.t) (heap : CHeap.t) (loc : string) : LabCmd.t list = 
  let ovar = Hashtbl.find found_locs loc in 
  let obj = CHeap.get heap loc in 
  (match obj with 
    | Some (obj, _) -> 
      List.concat 
        (List.map  
          (fun p -> 
            let pval = CObject.get obj p in 
            match pval with 
              | Some v -> 
                  let (e_v, cmds_v) = val2cmds found_locs heap v in 
                  let cmds = field2cmd ovar p e_v in
                  (cmds_v @ cmds)  
              | None   -> raise (Failure "Incomplete Heap!"))
          (CObject.properties obj))
         
    | _ -> raise (Failure "Incomplete Heap!"))

and object2cmds_mtdt (found_locs : (string, Expr.t) Hashtbl.t) (heap : CHeap.t) (loc : string) : (Expr.t * LabCmd.t list) * string list = 
  (match Hashtbl.find_opt found_locs loc with 
    | Some e -> ((e, []), [])
    | None -> 
      let ovar = fresh_pvar () in 
      Hashtbl.add found_locs loc (PVar ovar);
      
      L.log L.Verboser (lazy (
        Printf.sprintf "Going to process location %s assigned it variable %s" loc ovar
      )); 

      let obj = CHeap.get heap loc in 
      (match obj with 
        | Some (_, mtdt) -> 
          let (e_mtdt, mtdt_cmds, locs) = val2cmds_mtdt found_locs heap mtdt in 
          let mtdt_cmds' = new_cmd ovar e_mtdt in 
          ((PVar ovar, mtdt_cmds @ mtdt_cmds'), loc :: locs)
        | _ -> raise (Failure "Incomplete Heap!")))

and val2cmds (found_locs : (string, Expr.t) Hashtbl.t) (heap : CHeap.t) (v : CVal.M.t) : Expr.t * LabCmd.t list =
    (match CVal.M.to_literal v with 
      | None -> raise (Failure "DEATH!")
      | Some (Loc loc') -> object2cmds found_locs heap loc'
      | Some (LList lits) -> 
          let es, cmds =  
            List.split
              (List.map 
                (fun (lit : Literal.t) ->
                  match lit with 
                    | Loc loc' -> object2cmds found_locs heap loc'
                    | _        -> Lit lit, [] 
                )
                lits) in
          let cmds = List.concat cmds in  
          EList es, cmds   
      | Some lit -> (Lit lit, []))

and val2cmds_mtdt (found_locs : (string, Expr.t) Hashtbl.t) (heap : CHeap.t) (v : CVal.M.t) : Expr.t * LabCmd.t list * string list =
    (match CVal.M.to_literal v with 
      | None -> raise (Failure "DEATH!")
      | Some (Loc loc') -> 
        let (e, cmds), locs = object2cmds_mtdt found_locs heap loc' in 
        e, cmds, locs 
      | Some (LList lits) -> 
          let es_cmds, locs =  
            List.split
              (List.map 
                (fun (lit : Literal.t) ->
                  match lit with 
                    | Loc loc' -> object2cmds_mtdt found_locs heap loc'
                      (* let (e, cmds), locs = object2cmds_mtdt found_locs heap loc' in 
                      e, cmds, locs *)
                    | _        -> (Lit lit, []), []
                )
                lits) in
          let es, cmds = List.split es_cmds in 
          let cmds = List.concat cmds in  
          let locs = List.concat locs in 
          EList es, cmds, locs  
      | Some lit -> (Lit lit, [], []))

and object2cmds (found_locs : (string, Expr.t) Hashtbl.t) (heap : CHeap.t) (loc : string) : Expr.t * LabCmd.t list = 
  (match object2cmds_mtdt found_locs heap loc with 
    | ((e, []), []) -> (e, []) 
    | ((e, cmds), locs) -> 
        let prop_cmds = List.concat (List.map (object2cmds_props found_locs heap) (loc :: locs)) in 
        e, cmds @ prop_cmds 
    | _ -> raise (Failure "DEATH"))
  



 
let heap2proc (name : string) (heap : CHeap.t) (loc : string) (found_locs: (string, Expr.t) Hashtbl.t) : EProc.t = 
  (*let found_locs = Hashtbl.create 501 in*)
  let (e, cmds) = object2cmds found_locs heap loc in 
  let ret_cmd : LabCmd.t = LBasic (Assignment ("ret", e)) in 
  let lab_cmds = 
    List.map 
     (fun cmd ->
       let annot : Annot.t = Annot.init () in   
       (annot, None, cmd))
     (cmds @ [ ret_cmd; LReturnNormal ]) in 
  let lab_cmds_arr = Array.of_list lab_cmds in 
  { 
    name   = name; 
    body   = lab_cmds_arr; 
    params = []; 
    spec   = None
  }

  let heap2prog (name : string) (heap : CHeap.t) (loc : string) (found_locs: (string, Expr.t) Hashtbl.t) : EProg.t =
    let proc =  heap2proc name heap loc found_locs in 
    let procs = Hashtbl.create 3 in 
    Hashtbl.add procs proc.name proc; 
    { 
      imports    = [];
      lemmas     = Hashtbl.create 0; 
      preds      = Hashtbl.create 0; 
      only_specs = Hashtbl.create 0; 
      macros     = Hashtbl.create 0; 
      bi_specs   = Hashtbl.create 0; 
      proc_names = [ name ]; 
      filename   = name; 
      procs      = procs 
    }