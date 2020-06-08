var s = symb_string(s)
var n = symb_number(n)

var o = {}; 
o["foo"] = n; 

JavertAssume(n > 0);
JavertAssume(s = "foo");

var z = o[s];
JavertAssert(z < 0)