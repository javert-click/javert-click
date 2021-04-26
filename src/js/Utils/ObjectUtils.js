/*
* @id ObjectUtilsToStr
*/
function toStr(obj){
    var str = '{ ';
    for(var prop in obj){
        str += prop+': ';
        var val = obj[prop];
        if(typeof val !== 'object'){
            str += val+'; ';
        }else{
            str += toStr(val)+'; ';
        }
    }
    return str+'}';
}

/*
* @id ObjectUtilsPrint
*/
function print(obj){
    var strObj = toStr(obj);
    console.log(strObj);
    return strObj;
}

exports.print = print;