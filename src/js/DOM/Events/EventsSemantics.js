/**************************/
/* EVENTS SEMANTICS IN JS */
/**************************/

//const EventTarget = require('./EventTarget');


/*
* @id EventsSemantics
*/
function EventsSemantics(){
  this.eh = [];
  this.hq = [];
  this.xsc = null;
}; 

/*
* @id EventsSemanticsSyncDispatch
*/
EventsSemantics.prototype.syncDispatch = function(event_type, event_str, event, target, flags){
  __ES__wrapper__syncDispatch(event_type, event_str, this.xsc, event, target, flags);
};

/*
* @id EventsSemanticsAsyncDispatch
*/
EventsSemantics.prototype.asyncDispatch = function(event_type, event, target, flags){
  __ES__wrapper__asyncDispatch(event_type, event.type, this.xsc, event, target, flags);
};

/*
* @id EventsSemanticsAddHandler
*/
EventsSemantics.prototype.addHandler = function(event_type, event_str, fid){
  __ES__wrapper__addHandler(event_type, event_str, fid);
};

/*
* @id EventsSemanticsRemoveHandler
*/
EventsSemantics.prototype.removeHandler = function(event_type, event_str, fid){
  __ES__wrapper__removeHandler(event_type, event_str, fid);
};

/*
* @id EventsSemanticsSchedule
*/
EventsSemantics.prototype.schedule = function(f){
  schedule(f);
};

EventsSemantics.prototype.triggeredEvents = 0;

exports.EventsSemantics = EventsSemantics;