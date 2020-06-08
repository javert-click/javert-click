/*******************************/
/* INTERFACE DocumentFragment  */
/*******************************/
//const Node = require ('./Node')

/*
* @id initDocumentFragment
*/
var initDocumentFragment = function(Node){
	
	/*
	* @id DocumentFragment
	*/
	var DocumentFragment = function(){
		Node.Node.call(this);
		this.nodeName = '#document-fragment';
		this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
	};

	DocumentFragment.prototype = Object.create(Node.Node.prototype);

	return {'DocumentFragment': DocumentFragment};
};

module.exports = initDocumentFragment
