/*************************/
/* INTERFACE Performance */
/*************************/

//const EventTarget  = require ('./EventTarget');
//const Window       = require('./Window');

/**
 * @id initPerformance
 */
var initPerformance = function(EventTarget, window){
	/**
	 * @id Performance
	 */   
	var Performance = function (){
	    EventTarget.EventTarget.call(this);
	};


	Performance.prototype = Object.create(EventTarget.EventTarget.prototype);

	/*
	* @id PerformanceNow
	*/
	Performance.prototype.now = function(){
		return (new Date()).getTime() - window.timeStamp;;
	};

	return {'Performance': Performance};
};

module.exports = initPerformance;

