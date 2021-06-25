var url_str = process.argv[2];
try{
    var url = new URL(url_str);
    var res = url.protocol + '//' + url.host;
    console.log(res);
} catch (e){
    console.log("SyntaxError");
}

