#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
apt-get -y update
apt-get -y upgrade
apt-get install -y curl wget
apt-get install -y --no-install-recommends patch unzip bubblewrap rsync git make m4 gcc python3 nodejs g++
apt-get install -y python2.7 libgmp-dev
curl -sL https://github.com/ocaml/opam/releases/download/2.0.7/opam-2.0.7-x86_64-linux > /usr/bin/opam
chmod +x /usr/bin/opam
opam init --disable-sandboxing --yes
opam  install --unlock-base ocaml.4.07.1 --yes
opam install --yes batteries.2.10.0
opam install --yes conf-gmp
opam install --yes conf-m4
opam install --yes containers.2.6.1
opam install --yes extlib
opam install --yes zarith
opam install --yes Z3.4.8.1
opam pin dune 1.11.3 --yes
echo 'export LD_LIBRARY_PATH=/root/.opam/default/lib/z3/' >> ~/.bashrc
echo 'export PATH=$PATH:/root/.opam/default/bin' >> ~/.bashrc
echo 'eval $(opam env)' >> ~/.bashrc
cd /javert-click
ls
apt-get install -y npm 
npm install
make init
sed -i -e 's/Z3/z3/g' _tags
sed -i -e 's/mk_quantifier_const/mk_quantifier/g' src/ml/FOLogic/Z3Encoding.ml
