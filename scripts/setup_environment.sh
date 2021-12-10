#!/bin/bash
mkdir -p environment
cp -r src/js environment
cp -r src/TestSuites environment
cp src/js/MessagePassing/URLParsing/URLParser.js environment

cp scripts/*.sh environment
cp *.native environment

cp src/ml/JSLogic/runtime/* environment
cp src/ml/JS2JSIL/runtime/*.jsil environment
cp src/ml/JS2JSIL/biruntime/*.jsil environment
cp src/ml/JS2JSIL/runtime/harness.js environment
cp src/ml/JS2JSIL/ES5_runtime/*.jsil environment
cp src/ml/JS2JSIL/DOM_runtime/*.jsil environment
cp src/ml/JS2JSIL/MP_runtime/*.jsil environment

mkdir -p environment/UnitTests_JSIL