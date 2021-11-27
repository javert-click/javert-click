. workersinfo.sh

declare testsdir=$1
declare tests=$(find $testsdir -type f -name "*.js" -not -path "*/workers/*" -not -path "*/support/*")
declare ntests=$(find $tests -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"
echo "Going to run $ntests tests"
declare workers=$(find $testsdir -type f -name "*.js" -path "*/workers/*")
declare worker_syntax_error="./js/MessagePassing/WebWorkers/backup_worker_syntax_error.js"


echo "Compiling workers"
for filename in $workers; do
    declare workername=$(basename $filename)
    echo "Compiling worker $filename"
    npx webpack --config ../webpack.config.js --env entry=$filename --env out=$filename > result.log
    rc=$?;
    if [[ $rc != 0 ]] || grep -q "Module parse failed" result.log; then
    # Copy backup worker to worker used
      echo "Found SyntaxError in worker, compiling backup worker"
      npx webpack --config ../webpack.config.js --env entry=$worker_syntax_error --env out=$worker_syntax_error
      cp $worker_syntax_error $workername
      ./js2jsil.native -file $workername -noinitialheap -mp
    else
      cp $filename .
  #    echo "Going to call js2jsil for worker $filename"
      ./js2jsil.native -file $workername -noinitialheap -mp > result.log
      #echo "Worker compiled
    fi
done

declare log_test_file="log_test.log"

declare passed=0
declare failed=0

echo "compiling setupConf file"
npx webpack --config ../webpack.config.js --env entry=$setupconffilejs --env out=$setupconffilejs
./js2jsil.native -file $setupconffilejs #-noinitialheap
#mv "webpack_ConfSetup.jsil" "ConfSetup.jsil"
cp $setupconffilejsil .

#Running tests
for testfile in $tests; do
  npx webpack --config ../webpack.config.js --env entry=$testfile --env out=$testfile
  cp $testfile .

  declare name=$(basename $testfile)
  declare base=${name%%.*}
  declare dir=$(dirname $testfile)

  ./js2jsil.native -file $name -mp
  #cp -R "$dir/$base.jsil" .
  echo -e "-----Running $testfile-----"
  #./jsil.native -file "$base.jsil" -pbn -mp -js2jsil
  ./jsil.native -file $name -silent -mp -js2jsil -stats

  declare nasserts=`grep -c "TestHarnessAssert.*: 0" $log_test_file`
  declare nasserts_passed=`grep -c "CMD: return" $log_test_file`
  declare nasserts_failed=`grep -c "CMD: throw" $log_test_file`
  echo "NUMBER OF ASSERTS CHECKED: $nasserts"
  echo "--Passing: $nasserts_passed"
  echo "--Failing: $nasserts_failed"
  if [[ $nasserts_failed = 0 ]] 
  then
    echo "TEST PASSED"
    passed=$(expr $passed + 1)
  else 
    echo "TEST FAILED"
    failed=$(expr $failed + 1)
  fi
done

echo "Finished running tests"
echo "$passed tests passed"
echo "$failed tests failed"

