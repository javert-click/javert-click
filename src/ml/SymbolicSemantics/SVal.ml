
open CCommon
open SCommon

(*********************)
(*                   *)
(*  Symbolic values  *)
(*                   *)
(*********************)

module L = Logging

module rec M : (Val.M with type t = Expr.t and type st = SSubst.t) = struct 
  
  type t = Expr.t
  type st = SSubst.t 

  let str = Expr.str

  let full_str = Expr.full_str 

  let to_json = Expr.str

  let to_literal le = 
    (match (le : Expr.t) with 
    | Lit lit -> Some lit
    | _ -> None)

  let from_literal lit = Expr.Lit lit

  let to_expr   le = le 
  
  let from_expr le = Some le

  let from_list = Expr.from_list
  
  let to_list   = Expr.to_list

  let base_elements = Expr.base_elements

  let is_concrete = Expr.is_concrete

  let brancher = ref None

  let rec branch_friendly (e : Expr.t) =
  let f = branch_friendly in 
  match e with 
  | BinOp (UnOp (StrLen, s), Equal, _)
  | BinOp (s, Equal, UnOp (StrLen, _)) -> 
      (match !brancher with 
      | None -> brancher := Some s; true
      | Some s' -> s = s'
      )
  | BinOp (e1, And, e2) -> f e1 && f e2
  | _ -> false
end 

and 
  SSubst : (Subst.M with type vt = M.t) = MakeSubst.M(M) 