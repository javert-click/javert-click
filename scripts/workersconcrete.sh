. dominfo.sh
. workersinfo.sh

declare testfile=$1
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)

declare workersexamples="$dir/workers"
declare promisesdir="js/Promises"

npx webpack --config ../webpack.config.js --env entry=$testfile

# PostMessage and WebWorkers reference implementations
#echo "compiling DOM, postMessage and WebWorkers files"
#for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$mpcommon,$utilsdir,$promisesdir}/*.js; do
#    echo "Compiling $filename"
#    ./js2jsil.native -file $filename
#done

# We assume the workers are previously compiled to JSIL
#echo "compiling workers"
#for filename in $workersexamples/*.js; do
#    ./js2jsil.native -file $filename -mp -noinitialheap
#done

#echo "compiling setupConf file"
#./js2jsil.native -file $setupconffilejs -noinitialheap
#cp $setupconffilejsil .

#Copying files from dom implementation to environment
#for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$workersexamples,$mpcommon,$utilsdir,$promisesdir}/*.jsil; do
#	cp $filename .
#done
echo "Compiling resulting file to JSIL"
./js2jsil.native -file "main.js"
#cp -R "$dir/$base.jsil" .
echo -e "running main.jsil"
./jsil.native -file 'main.jsil' -pbn -mp


