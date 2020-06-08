open String

let string_split (s : string) (len : int) : string option * string option =
	assert (len > 0);
	try (
		let char = String.sub s 0   len in
		let str  = String.sub s len (String.length s - len) in
			Some char, Some str)
	with Invalid_argument _ -> 
		None, None

let string_head_and_tail s = string_split s 1

let surprise_substitute_string = "ItIsExtremelyUnlikelyForThisStringToExistInTheProgram"

type state = 
	| TheUsual
	| InString
	| InCmd of int * string
	| InCmdAndInString of int * string

exception Unparseable of string

let rec stringify_cosette_aux (s_in : string) (s_out : string) (s : state) : string =
	let f = stringify_cosette_aux in
	(match s_in with
	| "" -> 
		(match s with
		| TheUsual -> s_out
		| InString -> raise (Unparseable "Reached EOF: non-terminated string literal.")
		| InCmd _ -> raise (Unparseable "Reached EOF: assume or assert not terminated.")
		| InCmdAndInString _ -> raise (Unparseable "Reached EOF: a string literal inside assume or assert not terminated."))
	| _ -> 
			let next_char, rest_of_string = string_head_and_tail s_in in
			assert (next_char <> None); assert (rest_of_string <> None);
			let next_char, rest_of_string = Option.get next_char, Option.get rest_of_string in
			(match s with
			| TheUsual ->
					(match next_char with
					| "\"" -> f rest_of_string (s_out ^ "\"") InString
					| "J" -> (* JavertAssume/JavertAssert/JavertBranch *)
						let next_eleven_chars, new_rest_of_string = string_split rest_of_string 11 in
						(match next_eleven_chars, new_rest_of_string with
            | Some next_eleven_chars, Some new_rest_of_string when
                (next_eleven_chars = "avertAssume" || next_eleven_chars = "avertAssert" || next_eleven_chars = "avertBranch") -> 
								f (new_rest_of_string) (s_out ^ "J" ^ next_eleven_chars) (InCmd (0, ""))
            | _, _ -> f rest_of_string (s_out ^ "J") TheUsual)
					| _    -> f rest_of_string (s_out ^ next_char) TheUsual)
			| InString -> 
					(match next_char with
					| "\"" -> f rest_of_string (s_out ^ "\"") TheUsual
					| "\\" -> 
							let next_char, rest_of_string = string_head_and_tail rest_of_string in
							(match next_char, rest_of_string with
							| None,    None                -> raise (Unparseable "Reached EOF: non-terminated string literal.")
							| Some nc, Some rest_of_string -> f rest_of_string (s_out ^ "\\" ^ nc) InString)
					| _ -> f rest_of_string (s_out ^ next_char) InString)
			| InCmd (depth, str) ->
					assert (depth >= 0);
					(match next_char with
					| "(" -> (match depth with
						| 0 -> f rest_of_string (s_out ^ "(") (InCmd (1, str))
						| _ -> f rest_of_string s_out (InCmd (depth + 1, str ^ next_char)))
					| ")" -> 
							(match depth with
							| 1 -> 
								let str = Str.global_replace (Str.regexp "\\\\\"") surprise_substitute_string str in
								let str = Str.global_replace (Str.regexp "\"") "\\\"" str in 
								let str = Str.global_replace (Str.regexp surprise_substitute_string) "\\\\\\\\\\\"" str in
								f rest_of_string (s_out ^ "\"" ^ str ^ "\")") TheUsual
							| _ -> f rest_of_string s_out (InCmd (depth - 1, str ^ next_char)))
					| " " | "\t" when depth = 0 -> f rest_of_string (s_out ^ next_char) (InCmd (depth, str))
					| _ -> (match depth with
						| 0 -> raise (Unparseable ("Parsing error: assume/assert/branch not followed by an open parenthesis but by " ^ next_char ^ "."))
						| _ -> (match next_char with
							| "\"" ->  f rest_of_string s_out (InCmdAndInString (depth, str ^ next_char))
							| _ -> f rest_of_string s_out (InCmd (depth, str ^ next_char))))
					)
			| InCmdAndInString (depth, str) ->
  				(match next_char with
  				| "\"" -> f rest_of_string s_out (InCmd (depth, str ^ "\""))
  				| "\\" -> 
  						let next_char, rest_of_string = string_head_and_tail rest_of_string in
  						(match next_char, rest_of_string with
  						| None,    None                -> raise (Unparseable "Reached EOF: a string literal inside assume or assert not terminated.")
  						| Some nc, Some rest_of_string -> f rest_of_string s_out (InCmdAndInString (depth, str ^ "\\" ^ nc)))
  				| _ -> f rest_of_string s_out (InCmdAndInString (depth, str ^ next_char)))
			)
	)

let stringify_cosette (s : string) = stringify_cosette_aux s "" TheUsual