. dominfo.sh
. workersinfo.sh

declare testfile=$1
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)

declare workersexamples="$dir/workers"
declare promisesdir="js/Promises"
declare libfile="js/MessagePassing/libplus.js"
declare heapfile="heapplus.json"
declare setupconffile="js/MessagePassing/webworker-promise/ConfSetup.js"
declare workerfile=$2

#echo "Compiling lib file"
#Running libfile and generating json file with heap
cp $libfile .
./js2jsil.native -file ./libplus.js -mp
#echo "Generating heap for lib file"
./jsil.native -file ./libplus.jsil -silent -mp -printheap $heapfile

#echo "Compiling setup conf file"
#Compiling setup conf file 
cp $setupconffile .
./js2jsil.native -file "ConfSetup.js" -noimports -loadheapfromjson $heapfile

#echo "Compiling worker file"
#Compiling worker file
cp $workerfile .
declare nameworker=$(basename $workerfile)
declare baseworker=${nameworker%%.*}
./js2jsil.native -file "$baseworker.js" -cosette -noimports -noinitialheap

#echo "Joining files"
#Joining files
cat "$baseworker.jsil" > "temp.jsil"
cat "libplus.jsil" "ConfSetup.jsil" "temp.jsil" > "$baseworker.jsil"

#echo "Compiling $base.js"
cp $testfile .
./js2jsil.native -file "$base.js" -cosette -noimports -loadheapfromjson $heapfile
echo -e "\nRunning test $testfile"
cat "$base.jsil" > "temp.jsil"
cat "libplus.jsil" "temp.jsil" > "$base.jsil"

time ./cosette.native -file "$base.jsil" -js -silent -mp -stats



