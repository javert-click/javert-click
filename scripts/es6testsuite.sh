# USAGE: ./promises.sh [directory] [option: -symbolic, default is concrete]
declare testsdir=$1
declare coverage=$2

declare coveragepdir="$testsdir/coverage"
declare rawcoveragepdir="$testsdir/raw_coverage"
declare outputfile="$testsdir/results.txt"
declare notInCoverage=["$promisesdir/Promise.js","$commondir/NodeList.js"]

# Obtain promises directories from promisesinfo file
. promisesinfo.sh
declare resultsdir="results"
mkdir -p $resultsdir
declare genoutputfile="$resultsdir/testsuite_results.txt"

rm -f $outputfile
touch $outputfile
touch $genoutputfile

echo "Compiling reference implementations..." | tee -a $outputfile 
for filename in {$promisesdir,$assertdir,$mochadir}/*.js; do
    declare name=$(basename $filename)
    declare base=${name%.*}
    declare dir=$(dirname $filename)
    ./js2jsil.native -file "$filename" -line_numbers
    cp "$dir/$base.jsil" .
done

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    sed -i $linenumberspfile -e "/\(main*\)/d"
    sed -i $linenumberspfile -e "/\(init*\)/d"
    sed -i $linenumberspfile -e "/\(p_aux*\)/d"
else
    sed -i "" "/\(main*\)/d" $linenumberspfile
    sed -i "" "/\(init*\)/d" $linenumberspfile
    sed -i "" "/\(p_aux*\)/d" $linenumberspfile
fi

echo "Compiling tests..." | tee -a $outputfile 
declare tests=$(find $testsdir -type f -name "*.js")
for testfile in $tests; do
    ./js2jsil.native -file "$testfile" -promises -line_numbers &>/dev/null
done

# Creating coverage dir in tests folder
mkdir -p $coveragepdir
mkdir -p $rawcoveragepdir

declare passed=0
declare failed=0
declare tested=0
declare ntests=$(find $testsdir -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"

echo "Starting to run $ntests tests" | tee -a $outputfile 
#Running tests for Promises
for testfile in $tests; do
    declare name=$(basename $testfile)
    declare base=${name%.*}
    declare dir=$(dirname $testfile)
    declare raw_coverage_file=$base"_raw_coverage.txt"
    rm -f result.log
    touch result.log
    cp -R "$dir/$base.jsil" . &>/dev/null
    ./jsil.native -file $base".jsil" -promises -silent -line_numbers > result.log 2>/dev/null

    rc=$?;
    tested=$(expr $tested + 1)
    if [[ $rc != 0 ]] || grep -q "Test262:AsyncTestFailure:" result.log; then
        failed=$(expr $failed + 1)
        echo "$tested/$ntests: Test $base failed" | tee -a $outputfile 
    else
        passed=$(expr $passed + 1)
        echo "$tested/$ntests: Test $base passed" | tee -a $outputfile 
    fi
    if [ "$coverage" = "coverage" ]; then
        mv $raw_coverage_file $rawcoveragepdir
        cp $testfile .
        python3 coverage.py $testfile $linenumberspfile "$rawcoveragepdir/" > "$coveragepdir/$base.txt"
    fi
    # Deleting files to avoid polluting the environment folder
    rm -f $base".js"
    rm -f $base".jsil"
done

#Printing tests results
echo -e "Passing tests: $passed" | tee -a $outputfile $genoutputfile
echo -e "Failing tests: $failed" | tee -a $outputfile $genoutputfile
echo -e "------------------------------------" | tee -a $outputfile $genoutputfile
#Running overall coverage for tests found in the DOM tests directory
if [ "$coverage" = "coverage" ]; then
    python3 overall_coverage.py "$testsdir/" > test.txt
    while read line ; do
        echo -e $line | tee -a $outputfile $genoutputfile
    done < test.txt
fi



