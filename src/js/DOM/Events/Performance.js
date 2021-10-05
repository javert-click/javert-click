/*************************/
/* INTERFACE Performance */
/*************************/

const EventTarget  = require ('./EventTarget');
const Window       = require('./Window');

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
	var windowTime = Window.getInstance().timeStamp;
	var currTime = (new Date()).getTime()
	console.log('Performance, now: '+currTime+', window.timestamp: '+windowTime);
	return currTime;
};

exports.Performance = Performance;

