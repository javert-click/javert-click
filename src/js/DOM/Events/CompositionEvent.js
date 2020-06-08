/*******************************/
/* INTERFACE COMPOSITION EVENT */
/*******************************/

/*
* @id initCompositionEvent
*/
var initCompositionEvent = function(UIEvent, Window){

	/*
	* @id CompositionEvent
	*/
	var CompositionEvent = function(type, eventInitDict){
	    UIEvent.UIEvent.call(this, type, eventInitDict);
	    this.data = eventInitDict && eventInitDict.data ? eventInitDict.data : "";
	};

	CompositionEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

	Object.defineProperty(Window.Window.prototype, 'CompositionEvent', {
		/*
		* @id CompositionEventGet
		*/
	    get: function(){
	        return CompositionEvent;
	    }
	});

	return {'CompositionEvent': CompositionEvent};
}

module.exports = initCompositionEvent;