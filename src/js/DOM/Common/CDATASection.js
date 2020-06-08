
/***************************/
/* INTERFACE CDATASection  */
/***************************/

//const Text = require('./Text')
//const Node = require('./Node')

/**
 * @id initCDATASection
 */
var initCDATASection = function(Text, Node){
	/**
	 * @id CDATASection
	 */
	var CDATASection = function (data, document){
		Text.Text.call(this, data, document);
		this.nodeName = "#cdata-section";
	    this.nodeType = Node.CDATA_SECTION_NODE;
	};

	CDATASection.prototype = Object.create(Text.Text.prototype);

	/*
	* @id CDataSectionClone
	*/
	CDATASection.prototype.clone = function (){
		var newNode = new CDATASection(this.data, null);
		return newNode;
	};

	return {'CDATASection': CDATASection};
};


module.exports = initCDATASection;