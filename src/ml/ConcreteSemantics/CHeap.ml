open CCommon
open CVal

type t = (string, (CObject.t * CVal.M.t)) Hashtbl.t

let init () : t = 
  Hashtbl.create medium_tbl_size

let get (heap : t) (loc : string) = 
  Hashtbl.find_opt heap loc

let set (heap : t) (loc : string) (obj_with_mv : CObject.t * CVal.M.t) = 
  Hashtbl.replace heap loc obj_with_mv

let remove (heap : t) (loc : string) = 
  Hashtbl.remove heap loc

let copy (heap : t) =
  Hashtbl.copy heap

let get_locs (heap: t) : string list =
  Hashtbl.fold (fun loc _ locs -> locs @ [loc]) heap []

let str ?(which = None) (heap : t) : string = 
  let print_all = which = None in 
  let which = Option.default SS.empty which in 
  let which = List.fold_left (fun (ac : SS.t) (loc : string) -> 
    let md = Hashtbl.find_opt heap loc in 
    (match md with 
    | Some (_, Loc loc) -> SS.add loc ac 
    | _ -> ac)) which (SS.elements which) in 
  let sorted_locs = SS.elements (if print_all then SS.of_list (get_locs heap) else CCommon.SS.filter (fun x -> Hashtbl.mem heap x) which) in 
  let sorted_locs_with_vals = List.map (fun loc -> (loc, Option.get (get heap loc))) sorted_locs in  
  let objs_str_lst = List.map (fun (loc, (obj, metadata)) -> CObject.str loc obj metadata) sorted_locs_with_vals in 
  String.concat "\n" objs_str_lst

let to_json (heap : t) : string =
  "{ " ^ (
    String.concat
      ",\n "
      (Hashtbl.fold (fun loc (obj, metadata) acc -> (Printf.sprintf "\"%s\": {\n\t\"properties\": %s, \n\t\"metadata\": %s}" loc (CObject.to_json obj) (CVal.M.to_json metadata))::acc) heap [])
  ) ^ " }"