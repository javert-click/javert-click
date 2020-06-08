const convert               = require('xml-js');
var fs = require('fs');
base_examples_dir = "../InputFiles/";
filename = process.argv[2];

var xml_str = fs.readFileSync(base_examples_dir+filename).toString('utf-8');
var str = xml_str.replace(/&/g,"&amp;");    
var jsonxml = convert.xml2json(str, {compact: false, spaces: 0}); 
fs.writeFile('result.json', jsonxml, () => {});

/*const parser = require('./parser/xml2dom');

var fs = require('fs');
var files = fs.readdirSync('./examples/ui_events/');
var str = "var initUIEventsFiles = function(){\n\n var files = {} \n\n";
for(var i = 0; i < files.length; i++){
	var docname = files[i];
	var jsonxml = parser.parseDocumentStr(docname);
	var str = str + "\nfiles["+"\""+docname+"\"] = \n" + jsonxml;
	console.log(files[i]);
}
str = str + "\n}"
//var jsonxml = parser.parseDocumentStr(process.argv[2]);
fs.writeFile('HTMLUIEventsFiles.js', str, () => {});*/