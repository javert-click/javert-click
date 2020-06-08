/***************************/
/* INTERFACE Comment  */
/***************************/

//const CharacterData = require('./CharacterData')
//const Node          = require('./Node')

/**
 * @id initComment
 */
var initComment = function(CharacterData, Node){
	
	/**
	 * @id Comment
	 */
	var Comment = function (data, document){
		CharacterData.CharacterData.call(this, data);
		this.ownerDocument = document;
	    this.nodeType = Node.COMMENT_NODE;
	    this.nodeName = '#comment';
	};

	Comment.prototype = Object.create(CharacterData.CharacterData.prototype);

	/*
	* @id CommentClone
	*/
	Comment.prototype.clone = function(){
		var comment = new Comment(this.data, this.ownerDocument);
		return comment;
	}

	return {'Comment': Comment};
};

module.exports = initComment