. dominfo.sh

declare testfile=$1

#Compiling DOM JS Implementation to JSIL
for filename in {$commondir,$corelevel1dir,$assertdir}/*.js; do
    echo "Compiling $filename"
    ./js2jsil.native -file "$filename"
done

#Copying JSIL files to environment folder
for filename in {$commondir,$corelevel1dir,$assertdir}/*.jsil; do
    cp -R $filename .
done

echo "Compiling $testfile"
./js2jsil.native -file "$testfile" -dom_level1 
declare name=$(basename $testfile)
declare base=${name%%.*}
declare dir=$(dirname $testfile)
echo "copying $dir/$base.jsil"
cp -R "$dir/$base.jsil" .
echo -e "\nRunning $base"
./jsil.native -file $base".jsil" -silent 
rc=$?; 
if [[ $rc != 0 ]]; then
    echo "Test $base failed" 
else 
    echo "Test $base passed"
fi

