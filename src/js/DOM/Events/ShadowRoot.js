/**************************/
/* INTERFACE SHADOW ROOT  */
/**************************/

//const DocumentFragment = require('./DocumentFragment.js');

/*
* @id initShadowRoot
*/
var initShadowRoot = function(DocumentFragment){

	const ShadowRootMode = {
	    OPEN: 'open',
	    CLOSED: 'closed'
	};

	/*
	* @id ShadowRoot
	*/
	var ShadowRoot = function(mode, host){
		DocumentFragment.DocumentFragment.call(this);
	    this.mode = mode;
	    this.host = host;
	}

	ShadowRoot.prototype = Object.create(DocumentFragment.DocumentFragment.prototype);

    /*
    * @id ShadowRootGetElementById
    */
	ShadowRoot.prototype.getElementById = function(id){
		return this.ownerDocument.elementById(this, id);
	};

	/*
	* @id ShadowRootGetTheParent
	*/
	ShadowRoot.prototype.getTheParent = function(event){
		if(!event.composed){
			return null;
		}else{
			return this.host;
		}
	}

	return {'ShadowRoot': ShadowRoot, 'ShadowRootMode': ShadowRootMode};
};

module.exports = initShadowRoot;