var Node            = require('./Node');
var Text            = require('./Text');
const BaseAttribute = require('../Common/BaseAttribute');

const Attribute = BaseAttribute.initAttribute(Node, Text);

exports.Attribute = Attribute;

