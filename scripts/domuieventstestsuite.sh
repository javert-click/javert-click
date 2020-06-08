. dominfo.sh
. promisesinfo.sh

declare notInCoverage=["$mochadir/Mocha.js","$eventsdir/TestHarness.js","$commondir/NodeList.js","$assertdir/JsUnitCore.js","$commondir/DocumentLoading.js","$commondir/DOMTestCase.js","$eventsdir/DOM.js","$commondir/ArrayUtils.js"]

declare testsdir=$1
declare coverage=$2

declare outputfile="$testsdir/results.txt"
declare domlinenumbersfile="$eventsdir/EventTarget_line_numbers.txt"
declare coveragedir="$testsdir/coverage"
declare rawcoveragedir="$testsdir/raw_coverage"
declare resultsdir="results"
mkdir -p $resultsdir
declare genoutputfile="$resultsdir/testsuite_results.txt"

rm -f $outputfile
touch $outputfile
touch $genoutputfile

cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

echo "Compiling library code..." | tee -a $outputfile
for filename in {$mochadir,$assertdir,$commondir,$eventsdir,$promisesdir,$cashdir}/*.js; do
      if [ "$filename" = "$eventsdir/EventTarget.js" ]; then
        ./js2jsil.native -file "$filename" -dom -events -line_numbers
      else
        ./js2jsil.native -file "$filename" -dom -events
      fi
done

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sed -i $domlinenumbersfile -e '/\(main*\)/d'
    sed -i $domlinenumbersfile -e '/\(init*\)/d'
else
    sed -i '' '/\(main*\)/d' $domlinenumbersfile
    sed -i '' '/\(init*\)/d' $domlinenumbersfile
fi

declare tests=$(find $testsdir -type f -name "*.js")
echo "Compiling tests..." | tee -a $outputfile
#Compiling tests to JSIL
for testfile in $tests; do
    ./js2jsil.native -file "$testfile" -dom -line_numbers
done

#Copying files from dom implementation to environment
for filename in {$assertdir,$mochadir,$commondir,$eventsdir,$cashdir,$promisesdir}/*.jsil; do
	cp $filename .
done

#Creating coverage dir in tests folder
mkdir -p $coveragedir
mkdir -p $rawcoveragedir

declare passed=0
declare failed=0
declare tested=0
declare ntests=$(find $testsdir -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"

echo "Starting to run $ntests tests" | tee -a $outputfile 
#Running tests for DOM Core Level 1
for testfile in $tests; do
    declare name=$(basename $testfile)
    declare base=${name%%.*}
    declare dir=$(dirname $testfile)
    declare raw_coverage_file=$base"_raw_coverage.txt"
    cp -R "$dir/$base.jsil" .
    ./jsil.native -file $base'.jsil' -silent -events -line_numbers > result.log
    rc=$?;
    tested=$(expr $tested + 1)
    if  [[ $rc != 0 ]] || grep -q "TestHarness: assert error:" result.log; then
        failed=$(expr $failed + 1)
        echo "$tested/$ntests: Test $base failed" | tee -a $outputfile 
    else
        passed=$(expr $passed + 1)
        echo "$tested/$ntests: Test $base passed" | tee -a $outputfile 
    fi
    if [ "$coverage" = "coverage" ]; then
      if [[ "$OSTYPE" == "linux-gnu"* ]]; then
          sed -i $raw_coverage_file -e '/\(main*\)/d'
          sed -i $raw_coverage_file -e '/\(init*\)/d'
      else
          sed -i '' '/\(main*\)/d' $raw_coverage_file
          sed -i '' '/\(init*\)/d' $raw_coverage_file
      fi
      cp $testfile .
      mv $raw_coverage_file $rawcoveragedir
      #Running coverage script
      python3 coverage.py $testfile $domlinenumbersfile "$rawcoveragedir/"> "$coveragedir/$base.txt"
    fi
    #Deleting files to avoid polluting the environment folder
    rm -f $base".jsil"
done

#Printing tests results
echo -e "Passing tests: $passed" | tee -a $outputfile $genoutputfile
echo -e "Failing tests: $failed" | tee -a $outputfile $genoutputfile
echo -e "------------------------------------" | tee -a $outputfile $genoutputfile

#Running overall coverage for tests found in the DOM tests directory
if [ "$coverage" = "coverage" ]; then
  python3 overall_coverage.py "$testsdir/" > temp.txt
  while read line ; do
      echo -e $line | tee -a $outputfile $genoutputfile
  done < temp.txt
  rm -f temp.txt
fi


