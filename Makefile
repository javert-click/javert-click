OCAMLBUILDFLAGS=-use-ocamlfind

# Please add new default build targets into sjsil.itarget, to improve build speed
default:
	ocamlbuild ${OCAMLBUILDFLAGS} sjsil.otarget

init: init_build
	.git-hooks/install.sh .

init_build:
	opam pin -y add JS_Parser "https://github.com/resource-reasoning/JS_Parser.git#d196ea50f551c6a721e50658790edf6038298fab"
	#opam pin -y add JS_Parser ../JS_Parser
	opam pin -yn add .
	opam install -y javert-post --deps-only

clean:
	ocamlbuild ${OCAMLBUILDFLAGS} -clean
