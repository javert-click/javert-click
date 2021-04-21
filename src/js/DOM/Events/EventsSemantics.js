/**************************/
/* EVENTS SEMANTICS IN JS */
/**************************/

//const EventTarget = require('./EventTarget');

var __EventTarget;

/*
* @id EventsSemantics
*/
var EventsSemantics = function(EventTarget){
  this.eh = [];
  this.hq = [];
  __EventTarget = EventTarget;
  this.xsc = null;
}; 

/*
* @id EventsSemanticsSyncDispatch
*/
EventsSemantics.prototype.syncDispatch = function(event_str, event, target, flags){
  __ES__wrapper__syncDispatch(event_str, this.xsc, event, target, flags);
};

/*
* @id EventsSemanticsAsyncDispatch
*/
EventsSemantics.prototype.asyncDispatch = function(p, event, target, flags){
  __ES__wrapper__asyncDispatch(p, event.type, this.xsc, event, target, flags);
};

/*
* @id EventsSemanticsAddHandler
*/
EventsSemantics.prototype.addHandler = function(event_str, fid){
  __ES__wrapper__addHandler(event_str, fid);
};

/*
* @id EventsSemanticsRemoveHandler
*/
EventsSemantics.prototype.removeHandler = function(event_str, fid){
  __ES__wrapper__removeHandler(event_str, fid);
};

/*
* @id EventsSemanticsSchedule
*/
EventsSemantics.prototype.schedule = function(f){
  schedule(f);
};

EventsSemantics.prototype.triggeredEvents = 0;

exports.EventsSemantics = EventsSemantics;