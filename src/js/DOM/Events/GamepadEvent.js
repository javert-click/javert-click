/***************************/
/* INTERFACE GAMEPAD EVENT */
/***************************/

//const Event     = require('./Event');
//const Window    = require('./Window');

/*
* @id initGamepadEvent
*/
var initGamepadEvent = function(Event, Window){

	/*
	* @id GamepadEvent
	*/
	var GamepadEvent = function(type, gamepad){
	    Event.Event.call(this, type);
	    this.gamepad = gamepad;
	};

	GamepadEvent.prototype = Object.create(Event.Event.prototype);

	Object.defineProperty(Window.Window.prototype, 'GamepadEvent', {
		/*
		* @id WindowGamepadEventGet
		*/
	    get: function(){
	        return GamepadEvent;
	    }
	});

	return {'GamepadEvent': GamepadEvent};
};


module.exports = initGamepadEvent;