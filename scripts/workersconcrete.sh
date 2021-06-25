. dominfo.sh
. workersinfo.sh

declare testfile=$1
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)

declare log_test_file="log_test.log"

declare workersexamples="$dir/workers"
declare promisesdir="js/Promises"

declare url_parser_file="js/MessagePassing/URLParsing/URLParser.js"

cp $url_parser_file .

npx webpack --config ../webpack.config.js --env entry=$testfile --env out=$testfile
cp $testfile .
# PostMessage and WebWorkers reference implementations
#echo "compiling DOM, postMessage and WebWorkers files"
#for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$mpcommon,$utilsdir,$promisesdir}/*.js; do
#    echo "Compiling $filename"
#    ./js2jsil.native -file $filename
#done

# We assume the workers are previously compiled to JSIL
#echo "compiling workers"
if [ -d $workersexamples ] && [[ $2 = "-workers" ]]
then
  for filename in $workersexamples/*.js; do
    npx webpack --config ../webpack.config.js --env entry=$filename --env out=$filename
    cp $filename .
    declare workername=$(basename $filename)
    ./js2jsil.native -file $workername -noinitialheap -mp
  done
else
  echo "No worker found in this directory"
fi

#echo "compiling setupConf file"
npx webpack --config ../webpack.config.js --env entry=$setupconffilejs --env out=$setupconffilejs
./js2jsil.native -file $setupconffilejs #-noinitialheap
#mv "webpack_ConfSetup.jsil" "ConfSetup.jsil"
cp $setupconffilejsil .

#Copying files from dom implementation to environment
#for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$workersexamples,$mpcommon,$utilsdir,$promisesdir}/*.jsil; do
#	cp $filename .
#done
#echo "Compiling resulting file to JSIL"
./js2jsil.native -file $name -mp
#cp -R "$dir/$base.jsil" .
echo -e "-----Running $base.jsil-----"
./jsil.native -file "$base.jsil" -pbn -mp

declare nasserts=`grep -c "TestHarnessAssert.*: 0" $log_test_file`
declare nasserts_passed=`grep -c "CMD: return" $log_test_file`
declare nasserts_failed=`grep -c "CMD: throw" $log_test_file`
echo "NUMBER OF ASSERTS CHECKED: $nasserts"
echo "--Passing: $nasserts_passed"
echo "--Failing: $nasserts_failed"
if [[ $nasserts_failed = 0 ]] 
  then
    echo "TEST PASSED"
else 
    echo "TEST FAILED"
fi


