const DOMException = require('../../DOM/Common/DOMException');

function parse(targetOrigin){
    //console.log('Going to call URL_construct with '+targetOrigin);
    var res = URL_construct(targetOrigin);
    if(res === "SyntaxError") throw new DOMException.DOMException(DOMException.SYNTAX_ERR);
    return res;
}

exports.parse = parse;