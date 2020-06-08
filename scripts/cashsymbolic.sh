. dominfo.sh
. promisesinfo.sh

#declare cashTestsDir="TestSuites/Cash/symbolic"
declare testfile=$1

# Moving InnerHTML JSIL file
cp "$domdir/InnerHTML.jsil" .
cp "$domdir/HTMLParsing/HTMLParser.js" .

# Compiling DOM Implementation (except SymbolicDOM because we are running only concrete examples here)
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.js; do
  echo "Compiling $filename"
  ./js2jsil.native -file "$filename" -events -cosette
done

# Copying files from dom implementation to environment
for filename in {$commondir,$eventsdir,$assertdir,$mochadir,$promisesdir}/*.jsil; do
	cp -R $filename .
done

# Compiling and copying Cash
echo "Compiling $cash"
./js2jsil.native -file "$cash" -cosette
cp $cashjsil .

echo "Compiling $testfile"
./js2jsil.native -file "$testfile" -dom -cosette
name=${testfile##*/}
base=${name%%.*}
declare dir=$(dirname $testfile)
cp "$dir/$base.jsil" .
echo "Running $base.jsil"
time ./cosette.native -file $base'.jsil' -js -events -stats -branch 128 -pbn -silent