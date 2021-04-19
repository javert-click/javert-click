. dominfo.sh
. workersinfo.sh

declare testfile=$1
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)

declare workersexamples="$dir/workers"
declare promisesdir="js/Promises"

# PostMessage and WebWorkers reference implementations
echo "compiling DOM, postMessage and WebWorkers files"
for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$mpcommon,$utilsdir,$promisesdir}/*.js; do
    ./js2jsil.native -file $filename -cosette
done

# We assume the workers are previously compiled to JSIL
echo "compiling workers"
for filename in $workersexamples/*.js; do
    ./js2jsil.native -file $filename -mp -noinitialheap -cosette
done

echo "compiling setupConf file"
./js2jsil.native -file $setupconffilejs -noinitialheap -cosette
cp $setupconffilejsil .

#Copying files from dom implementation to environment
for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$workersexamples,$mpcommon,$utilsdir,$promisesdir}/*.jsil; do
	cp $filename .
done

./js2jsil.native -file "$testfile" -mp -cosette
cp -R "$dir/$base.jsil" .
echo -e "running $base.jsil"
./cosette.native -file $base'.jsil' -pbn -mp -js


