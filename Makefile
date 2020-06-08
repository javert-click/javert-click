OCAMLBUILDFLAGS=-use-ocamlfind

# Please add new default build targets into sjsil.itarget, to improve build speed
default:
	ocamlbuild ${OCAMLBUILDFLAGS} sjsil.otarget

init: init_build
	.git-hooks/install.sh .

init_build:
	opam pin -y add JS_Parser "https://github.com/resource-reasoning/JS_Parser.git#fad17e13dde5c1feadf897e4d4f1f5be43de47da"
	#opam pin -y add JS_Parser ../JS_Parser
	opam pin -yn add .
	opam install -y javert-click --deps-only

clean:
	ocamlbuild ${OCAMLBUILDFLAGS} -clean
