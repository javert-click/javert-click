/****************************/
/* INTERFACE NAMED NODE MAP */
/****************************/

//const DOMException = require('./DOMException');
//const Attribute    = require('./Attribute');

/*
* @id initNamedNodeMap
*/
var initNamedNodeMap = function(DOMException, Attribute, ArrayUtils){

	/*
	* @id NamedNodeMap
	*/
	var NamedNodeMap = function(document, ownerElement){
		this.contents = [];
		this.ownerDocument = document;
		this.ownerElement = ownerElement;
	};

	Object.defineProperty(NamedNodeMap.prototype, "length", {
		/*
		* @id getLengthNamedNodeMap
		*/
		get:	function () { return this.contents.length;  }
	}); 

	/*
	* @id NamedNodeMapGetNamedItem
	*/
	NamedNodeMap.prototype.getNamedItem = function(name){
		var i = 0;
		var node = null;
		while(i < this.length && node === null){
			if(this.contents[i].nodeName === name){
				node = this.contents[i];
			}
			i++;
		}
		return node;
	};

	/*
	* @id NamedNodeMapSetNamedItem
	*/
	NamedNodeMap.prototype.setNamedItem = function(arg){
	    if(this.ownerDocument && arg.ownerDocument && !(this.ownerDocument.isSameDocument(arg.ownerDocument))){
	    	throw new DOMException.DOMException(4);
	    }
	    if(arg && arg.ownerElement && arg.ownerElement.id !== this.ownerElement.id){
	    	throw new DOMException.DOMException(10);
	    }
		var i = 0;
		var node = null;
		while(i < this.length && node === null){
			if(this.contents[i].nodeName === arg.nodeName){
				node = this.contents[i];
				this.contents[i] = arg;
			}
			i++;
		}
		if(node === null){
			this.contents.push(arg);
			return null;
		}else{
			return node;
		}
	};

	/*
	* @id NamedNodeMapRemoveNamedItem
	*/
	NamedNodeMap.prototype.removeNamedItem = function(name){
		var i = 0;
		var node = null;
		var def = false;
		while(i < this.length && node === null){
			if(this.contents[i].nodeName === name){
				var defAttr = ArrayUtils.find(this.ownerElement.defaultAttrs, 
					/*
					* @id NamedNodeMapRemoveNamedItemDef
					*/
					function(def){
						return def.name === name
					});
				node = this.contents[i];
				if(!this.ownerElement || !defAttr){
					this.contents.splice(i, 1);
				}else if(defAttr){
					def = true;
					var attr = new Attribute.Attribute(); 
					attr.value = node.value;
					attr.nodeName = node.nodeName;
					node.value = defAttr.value;
					attr.specified = false;
					node.specified = false;
					//node.value = attr.value;
				}
			}
			i++;
		}
		if(node === null){
			throw new DOMException.DOMException(8);
		}
		return def ? attr : node;
	};

	/*
	* @id NamedNodeMapSearchItemById
	*/
	NamedNodeMap.prototype.searchItemById = function(attr){
		for(var i = 0; i < this.contents.length; i++){
			if(attr.id === this.contents[i].id){
				return true;
			}
		}
		return false;
	};

	/*
	* @id NamedNodeMapItem
	*/
	NamedNodeMap.prototype.item = function(index){
		if(this.contents[index]){
			return this.contents[index];
		}else{
			return null;
		}
		
	};

	return {'NamedNodeMap': NamedNodeMap};
};

module.exports = initNamedNodeMap;

