/**************************/
/* INTERFACE FormElementt */
/**************************/

//const HTMLElement = require ('./HTMLElement');
//const MouseEvent  = require ('./MouseEvent');

/**
* @id initFormElement
*/ 
var initFormElement = function(HTMLElement){
	/**
	 * @id FormElement
	 */   
	var FormElement = function (tagName, document){
	    HTMLElement.HTMLElement.call(this, tagName, document);
	    
	};


	FormElement.prototype = Object.create(HTMLElement.HTMLElement.prototype);

	Object.defineProperty(FormElement.prototype, 'onsubmit', {
		/*
		* @id FormElementOnSubmit
		*/
	    set: function(f){
	    	this.addEventListener("submit", f);
	    }
	});

	/*
	* @id FormElementSubmit
	*/
	FormElement.prototype.submit = function(){
		this.submit();
	};

	return {'FormElement': FormElement};
};

module.exports = initFormElement;

