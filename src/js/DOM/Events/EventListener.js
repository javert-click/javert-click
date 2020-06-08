/****************************/
/* INTERFACE EVENT LISTENER */
/****************************/

/*
* @id initEventListener
*/
var initEventListener = function(){

	/*
	* @id EventListener
	*/
	var EventListener = function (type, options, callback){
	    this.type = type;
	    this.capture = options.capture || false;
	    this.callback = callback;
	    this.passive = options.passive || false;
	    this.once = options.once || false;
	    this.removed = false;
	};

	return {'EventListener': EventListener};
};

module.exports = initEventListener;