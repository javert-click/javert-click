/********************/
/* INTERFACE ENTITY */
/********************/

//const Node = require ('./Node');

/**
* @id initEntity
*/
var initEntity = function(Node){
	
	/**
	 * @id Entity
	 */
	var Entity = function(name, document){
		Node.Node.call(this);
		this.nodeName = name;
		//there might be a link to a notation file
		this.notationName = name;
		this.nodeType = Node.ENTITY_NODE;
		//the entity is either public or local
		this.publicId = null;
		this.systemId = null;
		this.ownerDocument = document;
	};

	Entity.prototype = Object.create(Node.Node.prototype);

	/*
	* @id EntityClone
	*/
	Entity.prototype.clone = function(){
		var clone = new Entity(this.nodeName, null);
		clone.publicId = this.publicId;
		clone.systemId = this.systemId;
		return clone;
	};

	return {'Entity': Entity};
};

module.exports = initEntity;