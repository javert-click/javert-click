/*******************/
/* INTERFACE Text  */
/*******************/

const DOMException  = require('./DOMException');

function initText(Node, CharacterData){

	/**
	 * @id Text
	 */
	function Text(data, document){
		CharacterData.CharacterData.call(this, data);
		this.nodeName = '#text';
		this.nodeType = Node.TEXT_NODE;
		this.ownerDocument = document;
	};

	Text.prototype = Object.create(CharacterData.CharacterData.prototype);

	/**
	 * @id TextSplitText
	 */
	Text.prototype.splitText = function(offset){
		if(offset < 0 || offset > this.data.length){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		var fstPart = this.data.substring(0, offset);
		var newTxt = this.ownerDocument.createTextNode(this.data.substring(fstPart.length, this.data.length));
		this._data = fstPart;
		this.parentNode.appendChild(newTxt);
		return newTxt;
	};

	/*
	* @id TextClone
	*/
	Text.prototype.clone = function(){
		var newText = new Text(this.data, null);
		return newText;
	};

	return {'Text': Text};
}

exports.initText = initText;