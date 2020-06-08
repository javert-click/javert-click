# This script runs all tests for JaVerT.Click

declare resultsdir="results"
mkdir -p $resultsdir
declare outputfile="$resultsdir/testsuite_results.txt"
> $outputfile

# DOM Core Level 1 official test suite
echo -e "------------------------------------\nCore Level 1\n------------------------------------" | tee -a $outputfile

declare level1dir="TestSuites/CoreLevel1/tests/official";
declare applicabledomlevel1=$(find $level1dir -name '*.js' | wc -l)
applicabledomlevel1="${applicabledomlevel1#"${applicabledomlevel1%%[![:space:]]*}"}"
declare level1dircompl="TestSuites/CoreLevel1/tests/complementary";
declare compldomlevel1=$(find $level1dircompl -name '*.js' | wc -l)
compldomlevel1="${compldomlevel1#"${compldomlevel1%%[![:space:]]*}"}"

# DOM Core Level 1 official tests
echo -e "Applicable Tests: $applicabledomlevel1" | tee -a $outputfile
echo -e "Filtered Tests: 0" | tee -a $outputfile
echo -e "Available Tests: $applicabledomlevel1" | tee -a $outputfile
./domcorelevel1testsuite.sh $level1dir coverage
echo -e "Additional tests: $compldomlevel1" | tee -a $outputfile

# DOM Core Level 1 complementary tests
echo -e "\n----Core Level 1 (Additional tests report)----" | tee -a $outputfile
./domcorelevel1testsuite.sh TestSuites/CoreLevel1/tests/complementary coverage

echo -e "\n----Core Level 1 Full coverage report (including additional tests)----" | tee -a $outputfile
mkdir -p TestSuites/CoreLevel1/tests/coverage
cp -R TestSuites/CoreLevel1/tests/official/coverage/. TestSuites/CoreLevel1/tests/coverage/
cp -R TestSuites/CoreLevel1/tests/complementary/coverage/. TestSuites/CoreLevel1/tests/coverage/

declare totalnumberoftests=$(($applicabledomlevel1+$compldomlevel1))
echo -e "Total Number of Tests: $totalnumberoftests" | tee -a $outputfile
python3 overall_coverage.py "TestSuites/CoreLevel1/tests/" > temp.txt
while read line ; do
    echo -e $line | tee -a $outputfile
done < temp.txt
rm temp.txt

# DOM UI Events official test suite
echo -e "\n------------------------------------\nEvents\n------------------------------------" | tee -a $outputfile

declare eventsofficialdir="TestSuites/UIEvents/tests/official";
declare applicableevents=$(find $eventsofficialdir -name '*.js' | wc -l)
applicableevents="${applicableevents#"${applicableevents%%[![:space:]]*}"}"
declare filteredevents=$(find "TestSuites/UIEvents/filtered_out" -name '*.js' -o -name '*.html' | wc -l)
filteredevents="${filteredevents#"${filteredevents%%[![:space:]]*}"}"
declare availableevents=$(($applicableevents+$filteredevents))
declare eventscompl="TestSuites/UIEvents/tests/complementary";
declare complevents=$(find $eventscompl -name '*.js' | wc -l)
complevents="${complevents#"${complevents%%[![:space:]]*}"}"

echo -e "Available Tests: $availableevents" | tee -a $outputfile
echo -e "Filtered Tests: $filteredevents" | tee -a $outputfile
echo -e "Applicable Tests: " $applicableevents | tee -a $outputfile
./domuieventstestsuite.sh TestSuites/UIEvents/tests/official coverage
echo -e "Additional Tests: $complevents" | tee -a $outputfile

# DOM UI Events complementary tests
echo -e "\n----Events Additional tests report----" | tee -a $outputfile
./domuieventstestsuite.sh TestSuites/UIEvents/tests/complementary coverage

echo -e "\n----Events Full coverage report (including additional tests)----" | tee -a $outputfile
mkdir -p TestSuites/UIEvents/tests/coverage
cp -R TestSuites/UIEvents/tests/official/coverage/. TestSuites/UIEvents/tests/coverage/
cp -R TestSuites/UIEvents/tests/complementary/coverage/. TestSuites/UIEvents/tests/coverage/

declare totalnumberoftests=$(($applicableevents+$complevents))
echo -e "Total Number of Tests: $totalnumberoftests" | tee -a $outputfile

python3 overall_coverage.py "TestSuites/UIEvents/tests/" > temp.txt
while read line ; do
    echo -e $line | tee -a $outputfile
done < temp.txt


# Promises
echo -e "\n------------------------------------\nPromises\n------------------------------------" | tee -a $outputfile

declare promisesofficialdir="TestSuites/test262/Promises_tests";
declare applicablepromises=$(find $promisesofficialdir -name '*.js' | wc -l)
applicablepromises="${applicablepromises#"${applicablepromises%%[![:space:]]*}"}"
declare filteredpromises=$(find "TestSuites/test262/Promises_filtered_out" -name '*.js'| wc -l)
filteredpromises="${filteredpromises#"${filteredpromises%%[![:space:]]*}"}"
declare availablepromises=$(($applicablepromises+$filteredpromises))

echo -e "Available Tests: $availablepromises" | tee -a $outputfile
echo -e "Filtered Tests: $filteredpromises" | tee -a $outputfile
echo -e "Applicable Tests: $applicablepromises" | tee -a $outputfile

./es6testsuite.sh TestSuites/test262/Promises_tests coverage
echo -e "Additional Tests: 0" | tee -a $outputfile

# Async/Await
echo -e "\n------------------------------------\nasync/await\n------------------------------------" | tee -a $outputfile

declare asyncawaitofficialdir="TestSuites/test262/AsyncAwait_tests";
declare applicableasyncawait=$(find $asyncawaitofficialdir -name '*.js' | wc -l)
applicableasyncawait="${applicableasyncawait#"${applicableasyncawait%%[![:space:]]*}"}"
declare filteredasyncawait=$(find "TestSuites/test262/AsyncAwait_filtered_out" -name '*.js' | wc -l)
filteredasyncawait="${filteredasyncawait#"${filteredasyncawait%%[![:space:]]*}"}"
declare availableasyncawait=$(($applicableasyncawait+$filteredasyncawait))

echo -e "Available Tests: $availableasyncawait" | tee -a $outputfile
echo -e "Filtered Tests: $filteredasyncawait" | tee -a $outputfile
echo -e "Applicable Tests: " $applicableasyncawait | tee -a $outputfile

./es6testsuite.sh TestSuites/test262/AsyncAwait_tests

echo -e "Test Suite Line Coverage: N/A" | tee -a $outputfile
echo -e "Number of Untested Lines: N/A" | tee -a $outputfile
echo -e "Additional Tests: N/A" | tee -a $outputfile