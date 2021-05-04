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
#    ./js2jsil.native -file $filename -cosette
#done

# We assume the workers are previously compiled to JSIL
echo "compiling workers"
for filename in $workersexamples/*.js; do
    cp $filename .
    declare workername=$(basename $filename)
    ./js2jsil.native -file $workername -mp -noinitialheap -cosette
done

echo "compiling setupConf file"
npx webpack --config ../webpack.config.js --env entry=$setupconffilejs
./js2jsil.native -file "webpack_ConfSetup.js" -cosette #-noinitialheap
mv "webpack_ConfSetup.jsil" "ConfSetup.jsil"
#cp $setupconffilejsil .

#Copying files from dom implementation to environment
#for filename in {$assertdir,$commondir,$eventsdir,$postmessagedir,$workersdir,$workersexamples,$mpcommon,$utilsdir,$promisesdir}/*.jsil; do
#	cp $filename .
#done
echo "Compiling resulting file to JSIL"
./js2jsil.native -file "webpack_"$name -mp -cosette
#cp -R "$dir/$base.jsil" .
echo -e "running webpack_$base.jsil"
./cosette.native -file "webpack_$base.jsil" -mp -js -pbn


