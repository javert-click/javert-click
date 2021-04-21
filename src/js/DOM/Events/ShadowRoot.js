/**************************/
/* INTERFACE SHADOW ROOT  */
/**************************/

const DocumentFragment = require('./DocumentFragment.js');

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

exports.ShadowRoot = ShadowRoot;
exports.ShadowRootMode = ShadowRootMode;