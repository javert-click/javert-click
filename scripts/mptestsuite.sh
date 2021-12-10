. workersinfo.sh

declare testsdir=$1
declare outputfile=$2
declare tests=$(find $testsdir -type f -name "*.js" -not -path "*/workers/*" -not -path "*/support/*")
declare ntests=$(find $tests -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"
declare workers=$(find $testsdir -type f -name "*.js" -path "*/workers/*")
declare worker_syntax_error="./js/MessagePassing/WebWorkers/backup_worker_syntax_error.js"

rm -f $outputfile
touch $outputfile

echo "Compiling workers..."
echo "Compiling workers..." >> $outputfile
for filename in $workers; do
    declare workername=$(basename $filename)
    echo "Compiling worker $filename" >> $outputfile
    npx webpack --config ../webpack.config.js --env entry=$filename --env out=$filename > result.log
    rc=$?;
    if [[ $rc != 0 ]] || grep -q "Module parse failed" result.log; then
    # Copy backup worker to worker used
      echo "Found SyntaxError in worker, compiling backup worker" >> $outputfile
      npx webpack --config ../webpack.config.js --env entry=$worker_syntax_error --env out=$worker_syntax_error
      cp $worker_syntax_error $workername
      ./js2jsil.native -file $workername -noinitialheap -mp
    else
      cp $filename .
      ./js2jsil.native -file $workername -noinitialheap -mp > result.log
    fi
done

declare log_test_file="log_test.log"

declare passed=0
declare failed=0
declare n=1

echo "compiling setupConf file" >> $outputfile
npx webpack --config ../webpack.config.js --env entry=$setupconffilejs --env out=$setupconffilejs
./js2jsil.native -file $setupconffilejs
cp $setupconffilejsil .

echo "Going to run $ntests tests"
echo "Going to run $ntests tests" >> $outputfile
#Running tests
for testfile in $tests; do
  npx webpack --config ../webpack.config.js --env entry=$testfile --env out=$testfile
  cp $testfile .

  declare name=$(basename $testfile)
  declare base=${name%%.*}
  declare dir=$(dirname $testfile)

  ./js2jsil.native -file $name -mp

  echo -e "\n-----Running test $n/$ntests: $testfile-----"
  echo -e "\n-----Running test $n/$ntests: $testfile-----" >> $outputfile
  
  ./jsil.native -file $name -silent -mp -js2jsil

  declare nasserts=`grep -c "TestHarnessAssert.*: 0" $log_test_file`
  declare nasserts_passed=`grep -c "CMD: return" $log_test_file`
  declare nasserts_failed=`grep -c "CMD: throw" $log_test_file`
  echo "NUMBER OF ASSERTS CHECKED: $nasserts" >> $outputfile
  echo "--Passing: $nasserts_passed" >> $outputfile
  echo "--Failing: $nasserts_failed" >> $outputfile
  n=$(expr $n + 1)
  if [[ $nasserts_failed = 0 ]] 
  then
    echo "TEST PASSED"
    echo "TEST PASSED" >> $outputfile
    passed=$(expr $passed + 1)
  else 
    echo "TEST FAILED"
    echo "TEST FAILED" >> $outputfile
    failed=$(expr $failed + 1)
  fi
done

echo "Finished running tests"
echo "Finished running tests" >> $outputfile
echo "$passed tests passed"
echo "$passed tests passed" >> $outputfile
echo "$failed tests failed"
echo "$failed tests failed" >> $outputfile

