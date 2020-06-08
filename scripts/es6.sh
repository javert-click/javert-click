# USAGE: ./promises.sh [directory] [option: -symbolic, default is concrete]
declare testfile=$1

# Obtain promises directories from promisesinfo file
. promisesinfo.sh

for filename in {$promisesdir,$assertdir,$mochadir}/*.js; do
    declare name=$(basename $filename)
    declare base=${name%.*}
    declare dir=$(dirname $filename)
    ./js2jsil.native -file "$filename"
    cp "$dir/$base.jsil" .
done

declare name=$(basename $testfile)
declare base=${name%.*}
declare dir=$(dirname $testfile)
./js2jsil.native -file "$testfile" -promises

rm -f result.log
touch result.log
cp -R "$dir/$base.jsil" .
./jsil.native -file $base".jsil" -promises -silent > result.log

rc=$?;
if [[ $rc != 0 ]] || grep -q "Test262:AsyncTestFailure:" result.log; then
    echo "Test $base failed"
else
    echo "Test $base passed"
fi




