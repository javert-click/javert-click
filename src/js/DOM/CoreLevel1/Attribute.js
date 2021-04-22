var Node         = require('./Node'); 
var Text         = require('./Text');

const Attribute  = require('../Common/BaseAttribute');
Attribute.initAttribute(Node, Text);

exports.Attribute = Attribute;