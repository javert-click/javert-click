. dominfo.sh
. promisesinfo.sh

#declare cashTestsDir="TestSuites/Cash/symbolic"
declare cashTestsDir="TestSuites/Cash/symbolic"

declare cashcoveragedir="$cashTestsDir/coverage"
declare cashrawcoveragedir="$cashTestsDir/raw_coverage"
declare functionsfile="TestSuites/Cash/functions.txt"
declare resultsdir="results"
mkdir -p $resultsdir
declare genoutputfile="$resultsdir/cash_results.txt"
declare outputfile="$cashTestsDir/results.txt"

touch $outputfile
touch $genoutputfile

# Creating folders
mkdir -p "$cashcoveragedir"
mkdir -p "$cashrawcoveragedir"

# Moving InnerHTML JSIL file
cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

# Compiling DOM Implementation 
echo 'Compiling reference implementation...'
echo 'Compiling reference implementation...' > $outputfile
for filename in {$commondir,$eventsdir,$promisesdir,$assertdir,$mochadir}/*.js; do
  ./js2jsil.native -file "$filename" -events -cosette
done

# Copying files from dom implementation to environment
for filename in {$commondir,$eventsdir,$promisesdir,$assertdir,$mochadir}/*.jsil; do
	cp -R $filename .
done

echo 'Compiling cash...'
echo 'Compiling cash...' >> $outputfile
# Compiling and copying Cash
./js2jsil.native -file "$cash" -cosette -line_numbers
cp $cashjsil .

declare ntests=$(find $cashTestsDir -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"

echo "Starting to run $ntests tests"
echo "Starting to run $ntests tests" >> $outputfile

# Compiling Cash tests
#exec 3<> $outputfile
for filename in $cashTestsDir/*.js; do
  ./js2jsil.native -file "$filename" -dom -cosette -line_numbers
  name=${filename##*/}
  base=${name%%.*}
  declare raw_coverage_file=$base"_raw_coverage.txt"
  cp "$cashTestsDir/$base.jsil" .
  echo -e "\nRunning $base"
  echo -e "\nRunning $base" >> $outputfile
  echo -e "\nRunning $base" >> $genoutputfile
  resultfile="$cashTestsDir/result.log"
  ./cosette.native -file $base'.jsil' -js -events -branch 128 -stats -silent -line_numbers > $resultfile
  cmdinfo=$(grep -i "Executed commands:" $resultfile)
  numbercmds=$(echo $cmdinfo | grep -o -E '[0-9]+')
  #$numbercmds=$(echo $cmdinfo | sed 's/[^0-9]*//g')
  ( { time ./cosette.native -file $base'.jsil' -js -events -branch 128 -silent -par 8; } 2>&1 ) > /tmp/foo
  while read line ; do
    echo $line >> $outputfile
    echo $line >> $genoutputfile
    echo $line
  done < /tmp/foo
  echo "Number of commands: $numbercmds"
  echo "Number of commands: $numbercmds" >> $outputfile
  echo "Number of commands: $numbercmds" >> $genoutputfile
  mv $raw_coverage_file $cashrawcoveragedir
  python3 coverage.py $filename $cashlinenumbersfile "$cashrawcoveragedir/" > "$cashcoveragedir/$base.txt"
done
#exec 3>&-

echo -e "\n----Coverage----"
echo -e "\n----Coverage----" >> $outputfile
echo -e "\n----Coverage----" >> $genoutputfile

#Running overall coverage for tests found in the DOM tests directory
python3 overall_coverage.py "$cashTestsDir/" $functionsfile > /tmp/foo
while read line ; do
    echo $line >> $genoutputfile
    echo $line >> $outputfile
    echo $line
done < /tmp/foo