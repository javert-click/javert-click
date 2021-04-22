/***************************/
/* INTERFACE CharacterData  */
/***************************/

const DOMException = require ('./DOMException');

function initCharacterData(Node){
	
	/**
	 * @id CharacterData
	 */
	var CharacterData = function (data){
	    Node.Node.call(this);
	    this._data = data;
	};

	CharacterData.prototype = Object.create(Node.Node.prototype);

	/**
	* @id CharacterDataSubstringData
	*/
	CharacterData.prototype.substringData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		return this._data.substring(offset, offset+count);
	};

	/**
	* @id CharacterDataAppendData
	*/
	CharacterData.prototype.appendData = function(arg){
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this._data = this._data + arg;
	};

	/**
	* @id CharacterDataInsertData
	*/
	CharacterData.prototype.insertData = function(offset, data){
		if(offset < 0 || offset > this.data.length){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		var fstPart = this._data.substring(0, offset);
		var sndPart = this._data.substring(fstPart.length, this.data.length);
		this._data = fstPart + data + sndPart;
	};

	/**
	* @id CharacterDataDeleteData
	*/
	CharacterData.prototype.deleteData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this.replaceData(offset, count, "");
	};

	/**
	* @id CharacterDataReplaceData
	*/
	CharacterData.prototype.replaceData = function(offset, count, arg){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		if(offset + count > this.data.length){
			this._data = this.substringData(0, offset) + arg;
		}else{
			this._data = this.substringData(0, offset) + arg + this.substringData(offset+count, this._data.length-1);
		}
	};

	Object.defineProperty(CharacterData.prototype, 'data', {
		/**
		* @id CharacterDataDataGet
		*/
	    get: function(){
	    	return this._data;
		},
		
		/**
		* @id CharacterDataDataSet
		*/
	    set: function(value){
	    	if(this.is_readonly()){
	        	throw new DOMException.DOMException(7);
			}
		//	if(value === null){
		//		this._data = "";
		//	}else{
				this._data = String(value);
		//	}
	    }
	});

	Object.defineProperty(CharacterData.prototype, 'nodeValue', {
		/**
		* @id CharacterDataNodeValueGet
		*/
	    get: function(){
	    	return this.data;
		},
		
		/**
		* @id CharacterDataNodeValueSet
		*/
	    set: function(value){
	    	this.data = value; 
	    }
	});

	Object.defineProperty(CharacterData.prototype, 'length', {
		/**
		* @id CharacterDataLengthGet
		*/
	    get: function(){
	    	return this._data.length;
	    }
	});

	return {'CharacterData': CharacterData};
};

exports.initCharacterData = initCharacterData