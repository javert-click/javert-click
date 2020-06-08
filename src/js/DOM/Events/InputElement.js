/***************************/
/* INTERFACE InputElementt */
/***************************/

//const HTMLElement = require ('./HTMLElement');
//const MouseEvent  = require ('./MouseEvent');

/**
* @id initInputElement
*/
var initInputElement = function(HTMLElement, MouseEvent, Event, Node){
	/**
	 * @id InputElement
	 */   
	var InputElement = function (tagName, document){
		HTMLElement.HTMLElement.call(this, tagName, document);
		this.checked = false;
		this.addEventListener("click", function(){});
	};


	InputElement.prototype = Object.create(HTMLElement.HTMLElement.prototype);

	/*
	* @id InputElementClick
	*/
	InputElement.prototype.click = function(){
		//1. If this element is a form control that is disabled, then return.
		if(this.is_disabled()){
			return;
		}
		//there is a lot more to do here
		var clickEvent = new MouseEvent.MouseEvent("click", {bubbles: true, cancelable: true, composed: true});
		this.dispatchEvent(clickEvent);
	};

	/*
	* @id InputElementActivationBehaviour
	*/
	InputElement.prototype.activationBehaviour = function(){
		this.checked = !this.checked;
	};

	InputElement.prototype.legacyPreActivationBehaviour = function(){
		if(this.type === "checkbox") this.checked = !this.checked;
		else if(this.type === "radio") this.checked = true;
		var parent = this.parentNode || this.host;
			while(parent){
				if(parent.nodeType === Node.DOCUMENT_NODE){
					var inputEvent = new Event.Event('input');
					var changeEvent = new Event.Event('change');
					inputEvent.legacyPreActBeh = true;
					changeEvent.legacyPreActBeh = true;
					this.dispatchEvent(inputEvent);
					this.dispatchEvent(changeEvent);
				}
				parent = parent.parentNode || parent.host;
			}
	}

	InputElement.prototype.legacyCanceledActivationBehaviour = function(){
		
	}

	return {'InputElement': InputElement};
};


module.exports = initInputElement;

