/********************/
/* INTERFACE Notation */
/********************/

//const Node = require('./Node')

/**
 * @id initNotation 
 */
var initNotation = function(Node){
	
	/**
	 * @id Notation 
	 */
	var Notation = function(name, document){
		Node.Node.call(this);
		this.nodeName = name;
		this.nodeType = Node.NOTATION_NODE;
		this.ownerDocument = document;
		this.publicId = null;
		this.systemId = null;
	};

	Notation.prototype = Object.create(Node.Node.prototype);

	/*
	* @id NotationClone
	*/
	Notation.prototype.clone = function(){
		var clone = new Notation(this.nodeName, this.ownerDocument);
		clone.publicId = this.publicId;
		clone.systemId = this.systemId;
		return clone;
	}

	return {'Notation': Notation};
};

module.exports = initNotation;