open Yojson.Basic
open Yojson.Basic.Util
open Literal

let rec parse_property_from_json (json: Yojson.Basic.t) : Literal.t =
    let pval = json |> member "value" in
    match pval with
    | `Bool b -> Bool b 
    | `Float f -> Num f
    | `Int n -> Num (float_of_int n)
    | `List l -> 
       LList (List.map parse_property_from_json l)
    | `Null -> Null 
    | `String s -> 
      (match json |> member "type" with
      | `String "Loc" -> Loc s
      | `String "Undefined" -> Undefined
      | `String "String" -> String s
      | `String "Empty" -> Empty
      | `String "Num" ->
        (match s with
        |"-inf" -> Num (float_of_string "-infinity")
        |"inf" -> Num (float_of_string "infinity")
        |"nan" -> Num (float_of_string "nan"))  
      | `String x -> Printf.printf "Invalid json heap! type: %s" x; raise (Failure "Invalid json heap!")
      | _ -> raise (Failure "Invalid json heap!"))
  | _ -> raise (Failure "Invalid property")


let parse_properties_from_json (props_json: Yojson.Basic.t) : CObject.t =
  let obj = CObject.init () in
  (match props_json with
  | `Assoc fvl ->  
        List.iter (fun (pname, jsonval) -> 
        let pval = parse_property_from_json jsonval in
        CObject.set obj pname pval) fvl;
        obj 
  | _ -> raise (Failure "Properties need to be a list"))

let parse_heap_from_json (json_file : string) : CHeap.t =
  let data = Yojson.Basic.from_file json_file in
  let heap = CHeap.init () in
  match data with
  | `Assoc heap_global -> 
    List.iter (fun (loc, data_json) -> 
      let props_json = data_json |> member "properties" in
      let obj = parse_properties_from_json props_json in
      let meta_json = data_json |> member "metadata" in
      let meta_lit = parse_property_from_json meta_json in
      CHeap.set heap loc (obj, meta_lit)) heap_global;
      Printf.printf "\nHEAP_TO_JSON: %s\n" (CHeap.to_json heap);
      heap
  | _ -> raise (Failure "Unexpected heap file format. Expecting a JSON object.")
  
  