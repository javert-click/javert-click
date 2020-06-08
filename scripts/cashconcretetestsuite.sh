
#declare testharness="TestSuites/UIEvents/Testharness.js"

. dominfo.sh
. promisesinfo.sh

declare testsdir=$1
declare coveragedir="$testsdir/coverage"
declare rawcoveragedir="$testsdir/raw_coverage"
declare functionsfile="TestSuites/Cash/functions.txt"
declare resultsdir="results"
mkdir -p $resultsdir
declare genoutputfile="$resultsdir/cash_results.txt"
declare outputfile="$testsdir/results.txt"

touch $genoutputfile

#Moving InnerHTML JSIL file
cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

echo 'Compiling reference implementation...'
#Compiling DOM Implementation (except SymbolicDOM because we are running only concrete examples here)
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.js; do
  ./js2jsil.native -file "$filename" -events 
done

./js2jsil.native -file "$cash" -line_numbers

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    $(sed -i $cashlinenumbersfile -e '/\(main*\)/d' )
    $(sed -i $cashlinenumbersfile -e '/\(init*\)/d' )
else
    $(sed -i '' '/\(main*\)/d' $cashlinenumbersfile)
    $(sed -i '' '/\(init*\)/d' $cashlinenumbersfile)
fi

#Compiling concrete tests from cash
declare tests=$(find $testsdir -type f -name "*.js")

echo 'Compiling tests...'
#Compiling tests to JSIL
for testfile in $tests; do
    ./js2jsil.native -file "$testfile" -dom -line_numbers
done

#Copying files from dom implementation to environment
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.jsil; do
	cp $filename .
done

#Copying cash compiled file to environment
cp $cashjsil . 

#Creating coverage dir in tests folder
mkdir -p $coveragedir
mkdir -p $rawcoveragedir

declare passed=0
declare failed=0
declare tested=0
declare ntests=$(find $testsdir -name '*.js' | wc -l) 
ntests="${ntests#"${ntests%%[![:space:]]*}"}"

echo -e "Starting to run $ntests tests" > $outputfile
#Running tests for DOM Core Level 1
exec 3<> $outputfile
for testfile in $tests; do
    declare name=$(basename $testfile)
    declare base=${name%%.*}
    declare dir=$(dirname $testfile)
    declare raw_coverage_file=$base"_raw_coverage.txt"
    cp -R "$dir/$base.jsil" .
    #echo -e "\n running $base.jsil"
    echo -e "\nRunning $base" 	
    echo -e "\nRunning $base" >> $outputfile
    ./jsil.native -file $base'.jsil' -events -silent -line_numbers 
    rc=$?; 
    tested=$(expr $tested + 1)
    if  [[ $rc != 0 ]]; then
        failed=$(expr $failed + 1) 
        echo "$tested/$ntests: Test $base failed" 
        echo "$tested/$ntests: Test $base failed" >> $outputfile
    else 
        passed=$(expr $passed + 1) 
        echo "$tested/$ntests: Test $base passed"
        echo "$tested/$ntests: Test $base passed" >> $outputfile
    fi
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        $(sed -i $raw_coverage_file -e '/\(main*\)/d' )
        $(sed -i $raw_coverage_file -e '/\(init*\)/d' )
    else
        $(sed -i '' '/\(main*\)/d' $raw_coverage_file)
        $(sed -i '' '/\(init*\)/d' $raw_coverage_file)
    fi
    mv $raw_coverage_file $rawcoveragedir 
    cp $testfile .
    #Running coverage script
    python3 coverage.py $testfile $cashlinenumbersfile "$rawcoveragedir/"> "$coveragedir/$base.txt"
    #Deleting files to avoid polluting the environment folder
    rm $base".js" 
    rm $base".jsil"
done
exec 3>&-

#Printing tests results
echo "Passing tests: $passed" 
echo "Passing tests: $passed" >> $outputfile
echo "Passing tests: $passed" >> $genoutputfile
echo "Failing tests: $failed"
echo "Failing tests: $failed" >> $outputfile
echo "Failing tests: $failed" >> $genoutputfile


echo -e "\n----Coverage----"
echo -e "\n----Coverage----" >> $genoutputfile
#Running overall coverage for tests found in the DOM tests directory
python3 overall_coverage.py "$testsdir/" $functionsfile > /tmp/foo 
while read line ; do
    echo $line
    echo $line >> $outputfile
    echo $line >> $genoutputfile
done < /tmp/foo
