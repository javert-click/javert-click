declare testsdir=$1
declare tests=$(find $testsdir -type f -name "*.js")

declare log_test_file="log_test.log"

declare passed=0
declare failed=0

#Running tests for postMessage
for testfile in $tests; do
  ./workersconcrete.sh $testfile $2

  declare nasserts=`grep -c "TestHarnessAssert.*: 0" $log_test_file`
  declare nasserts_passed=`grep -c "CMD: return" $log_test_file`
  declare nasserts_failed=`grep -c "CMD: throw" $log_test_file`
  echo "NUMBER OF ASSERTS CHECKED: $nasserts"
  echo "--Passing: $nasserts_passed"
  echo "--Failing: $nasserts_failed"
  if [[ $nasserts_failed = 0 ]] 
  then
    passed=$(expr $passed + 1)
    echo "TEST PASSED"
  else 
    failed=$(expr $failed + 1)
    echo "TEST FAILED"
  fi
done

echo "Finished running tests"
echo "$passed tests passed"
echo "$failed tests failed"

