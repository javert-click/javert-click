. dominfo.sh
declare domlinenumbersfile="$domdir/DOMLineNumbers.txt"
declare notInCoverage=["$commondir/NodeList.js","$commondir/JsUnitCore.js","$commondir/DocumentLoading.js","$commondir/DOMTestCase.js","$corelevel1dir/DOM.js","$commondir/ArrayUtils.js","$commondir/StringUtils.js"]
#Script to run tests from DOMCoreLevel1
#Usage: ./domcorelevel1.sh [testsdir]
#     E.g.: ./domcorelevel1.sh Examples/DOM/Level1Tests/xml
#Coverage is only computed for the tests found in the specified directory

declare testsdir=$1
declare coverage=$2

declare outputfile="$testsdir/results.txt"
declare coveragedir="$testsdir/coverage"
declare rawcoveragedir="$testsdir/raw_coverage"
declare resultsdir="results"
mkdir -p $resultsdir
declare genoutputfile="$resultsdir/testsuite_results.txt"

rm -f $outputfile
touch $outputfile
touch $genoutputfile

#Compiling DOM JS Implementation to JSIL
echo "Compiling library code..." | tee -a $outputfile 
for filename in {$commondir,$corelevel1dir,$assertdir}/*.js; do
    if [[ ${notInCoverage[*]} =~ $filename ]]; then
        ./js2jsil.native -file "$filename"
    else
        ./js2jsil.native -file "$filename" -line_numbers
    fi
done

#Concatenating all files with line numbers into a single one
for f in {$commondir,$corelevel1dir}/*line_numbers.txt; do
    if [[ "$f" != $documentparsing ]]; then
        cat $f; echo -e;
    fi
done > $domlinenumbersfile

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
    ./js2jsil.native -file "$testfile" -dom_level1 -line_numbers
done

#Copying JSIL files to environment folder
for filename in {$commondir,$corelevel1dir,$assertdir}/*.jsil; do
    cp -R $filename .
done

#Creating coverage dir in tests folder
mkdir -p $coveragedir
mkdir -p $rawcoveragedir

#Creating output file for tests
touch $outputfile

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
    ./jsil.native -file $base".jsil" -silent -line_numbers
    rc=$?;
    tested=$(expr $tested + 1)
    if [[ $rc != 0 ]]; then
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
        python3 coverage.py $testfile $domlinenumbersfile "$rawcoveragedir/" > "$coveragedir/$base.txt"
    fi
    #Deleting files to avoid polluting the environment folder
    rm -f $base".js"
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


