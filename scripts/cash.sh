declare resultsdir="results"
mkdir -p $resultsdir
declare outputfile="$resultsdir/cash_results.txt"
declare functionsfile="TestSuites/Cash/functions.txt"
> $outputfile

# Cash library (concrete tests)
echo -e "\n------------------------------------\nCash Concrete Tests\n------------------------------------" >> $outputfile
echo -e "\n------------------------------------\nCash Concrete Tests\n------------------------------------"

declare cashconcretedir="TestSuites/Cash/concrete/events/official";
declare officialcachconcrete=$(find $cashconcretedir -name '*.js' | wc -l)
officialcachconcrete="${officialcachconcrete#"${officialcachconcrete%%[![:space:]]*}"}" 
declare cachconcretecompl="TestSuites/Cash/concrete/events/complementary";
declare complcashconcrete=$(find $cachconcretecompl -name '*.js' | wc -l)
complcashconcrete="${complcashconcrete#"${complcashconcrete%%[![:space:]]*}"}" 

echo -e "\n----Official tests-----" >> $outputfile 
echo -e "\n----Official tests-----"
./cashconcretetestsuite.sh "TestSuites/Cash/concrete/events/official"

echo -e "\n----Complementary tests-----" >> $outputfile
echo -e "\n----Complementary tests-----" 
./cashconcretetestsuite.sh "TestSuites/Cash/concrete/events/complementary"

echo -e "\n----Full coverage report (including additional tests)----" 
echo -e "\n----Full coverage report (including additional tests)----" >> $outputfile
mkdir -p "TestSuites/Cash/concrete/events/coverage"
cp -R TestSuites/Cash/concrete/events/official/coverage/. TestSuites/Cash/concrete/events/coverage/
cp -R TestSuites/Cash/concrete/events/complementary/coverage/. TestSuites/Cash/concrete/events/coverage/

declare totalnumberoftests=$(($officialcachconcrete+$complcashconcrete))
echo -e "\nTotal Number of Tests: $totalnumberoftests"
echo -e "\nTotal Number of Tests: $totalnumberoftests" >> $outputfile
python3 overall_coverage.py "TestSuites/Cash/concrete/events/" $functionsfile > /tmp/foo
while read line ; do
    echo $line >> $outputfile
    echo $line
done < /tmp/foo

# Cash library (symbolic tests)
echo -e "\n------------------------------------\nCash Symbolic Tests\n------------------------------------" >> $outputfile
echo -e "\n------------------------------------\nCash Symbolic Tests\n------------------------------------"
./cashsymbolictestsuite.sh