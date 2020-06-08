. dominfo.sh
. promisesinfo.sh

declare testfile=$1

cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

for filename in {$mochadir,$assertdir,$commondir,$eventsdir,$promisesdir,$cashdir}/*.js; do
    echo "compiling $filename"
    ./js2jsil.native -file "$filename" -dom -events
done

#Copying files from dom implementation to environment
for filename in {$assertdir,$mochadir,$commondir,$eventsdir,$cashdir,$promisesdir}/*.jsil; do
	cp $filename .
done

declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)
./js2jsil.native -file "$testfile" -dom
cp -R "$dir/$base.jsil" .
echo -e "\n running $base.jsil"
./jsil.native -file $base'.jsil' -silent -events > result.log
rc=$?;
if  [[ $rc != 0 ]] || grep -q "TestHarness: assert error:" result.log; then
    echo -e "\n Test $base failed"
else
    echo -e "\n Test $base passed"
fi


