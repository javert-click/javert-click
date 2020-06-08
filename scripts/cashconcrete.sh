. dominfo.sh
. promisesinfo.sh

declare testfile=$1

#Moving InnerHTML JSIL file
cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

#Compiling DOM Implementation (except SymbolicDOM because we are running only concrete examples here)
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.js; do
    echo "compiling $filename"
    ./js2jsil.native -file "$filename" -events
done

echo "compiling $cash"
./js2jsil.native -file "$cash"

#Copying files from dom implementation to environment
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.jsil; do
	cp $filename .
done

#Copying cash compiled file to environment
cp $cashjsil . 

./js2jsil.native -file "$testfile" -dom
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)
cp -R "$dir/$base.jsil" .
echo -e "\n running $base.jsil"	
./jsil.native -file $base'.jsil' -events -silent
rc=$?; 
if  [[ $rc != 0 ]]; then
    echo -e "\n Test $base failed"
else 
    echo -e "\n Test $base passed"
fi
