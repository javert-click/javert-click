const location = require ('./Location');

function parse(targetOrigin){
    return location.protocol + '//' + location.host;
}

exports.parse = parse;