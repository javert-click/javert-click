const convert = require('xml-js');
const fs      = require('fs');

var jsonxml = parseDocumentStr(process.argv[2]);
fs.writeFile('htmlfile.json', jsonxml, () => {});

function parseDocumentStr(str) {          
    var jsonxml = convert.xml2json(str, {compact: false, spaces: 0});
    var strjson = "(" + jsonxml + ")";
    return strjson.replace(/\"/g,"\'");
}