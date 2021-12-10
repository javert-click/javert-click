. dominfo.sh
. workersinfo.sh

declare testsdir="./TestSuites/webworker-promise"
declare tests=$(find $testsdir -type f -name "*.js" -not -path "*/workers/*" -not -path "*/support/*")
declare ntests=$(find $tests -name '*.js' | wc -l)
ntests="${ntests#"${ntests%%[![:space:]]*}"}"

declare workers=$(find $testsdir -type f -name "*.js" -path "*/workers/*")
declare promisesdir="js/Promises"
declare libfile="js/MessagePassing/libplus.js"
declare heapfile="heapplus.json"
declare setupconffile="js/MessagePassing/webworker-promise/ConfSetup.js"
declare workerfile=$2

#Running libfile and generating json file with heap
cp $libfile .
./js2jsil.native -file ./libplus.js -mp
./jsil.native -file ./libplus.jsil -silent -mp -printheap $heapfile

#Compiling setup conf file 
cp $setupconffile .
./js2jsil.native -file "ConfSetup.js" -noimports -loadheapfromjson $heapfile

#Compiling worker file
for worker in $workers; do
  cp $worker .
  declare nameworker=$(basename $worker)
  declare baseworker=${nameworker%%.*}
  ./js2jsil.native -file "$baseworker.js" -cosette -noimports -noinitialheap

  #Joining files
  cat "$baseworker.jsil" > "temp.jsil"
  cat "libplus.jsil" "ConfSetup.jsil" "temp.jsil" > "$baseworker.jsil"
done

echo "Going to run $ntests tests"

declare n=1

for testfile in $tests; do
  declare name=$(basename $testfile)
  declare base=${name%%.*}
  cp $testfile .
  ./js2jsil.native -file "$base.js" -cosette -noimports -loadheapfromjson $heapfile
  echo -e "\nRunning test $n/$ntests: $testfile"
  cat "$base.jsil" > "temp.jsil"
  cat "libplus.jsil" "temp.jsil" > "$base.jsil"

  time ./cosette.native -file "$base.jsil" -js -silent -mp -stats
  n=$(expr $n + 1)
done