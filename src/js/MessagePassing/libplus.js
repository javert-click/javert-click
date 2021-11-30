
//Title: postMessage() DataCloneError: cloning source port

//IMPORTS

//TEST HARNESS
/*global self*/
/*jshint latedef: nofunc*/
/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

/* Documentation: https://web-platform-tests.org/writing-tests/testharness-api.html
 * (../docs/_writing-tests/testharness-api.md) */

 // DOM EXCEPTION

 /**************************/
/* INTERFACE DOMException */
/**************************/

const INDEX_SIZE_ERR               = 1;
const DOMSTRING_SIZE_ERR           = 2; 
const HIERARCHY_REQUEST_ERR        = 3; 
const WRONG_DOCUMENT_ERR           = 4;
const INVALID_CHARACTER_ERR        = 5;
const NO_DATA_ALLOWED_ERR          = 6; 
const NO_MODIFICATION_ALLOWED_ERR  = 7;
const NOT_FOUND_ERR                = 8;
const NOT_SUPPORTED_ERR            = 9; 
const INUSE_ATTRIBUTE_ERR          = 10;  
const INVALID_STATE_ERR            = 11; 
const SYNTAX_ERR                   = 12;
const DATA_CLONE_ERR               = 25;

/*
* @id DOMException
*/
function DOMException(code){
  this.code = code;   
  this.INDEX_SIZE_ERR = INDEX_SIZE_ERR;
  this.DOMSTRING_SIZE_ERR = DOMSTRING_SIZE_ERR;
  this.HIERARCHY_REQUEST_ERR = HIERARCHY_REQUEST_ERR;
  this.WRONG_DOCUMENT_ERR = WRONG_DOCUMENT_ERR;
  this.INVALID_CHARACTER_ERR = INVALID_CHARACTER_ERR;
  this.NO_DATA_ALLOWED_ERR = NO_DATA_ALLOWED_ERR;
  this.NO_MODIFICATION_ALLOWED_ERR = NO_MODIFICATION_ALLOWED_ERR;
  this.NOT_FOUND_ERR = NOT_FOUND_ERR;
  this.NOT_SUPPORTED_ERR = NOT_SUPPORTED_ERR;
  this.INUSE_ATTRIBUTE_ERR = INUSE_ATTRIBUTE_ERR;
  this.INVALID_STATE_ERR = INVALID_STATE_ERR;
  this.SYNTAX_ERR = SYNTAX_ERR;
  this.DATA_CLONE_ERR = DATA_CLONE_ERR; 
};

 // NODE

/******************/
/* INTERFACE NODE */
/******************/

// LIVE NODE LIST

/***********************/
/* INTERFACE NODE LIST */
/***********************/

/*
var LiveNodeList = function (f, lazy){
	this.__compute  = f; 
	this.__computed = null; 
	this.__lazy     = (lazy === true); 
	LiveNodeList.counter = (LiveNodeList.counter || 0) + 1;   
	this.id = LiveNodeList.counter; 
};*/

//LiveNodeList.prototype.computedLiveNodeLists = [];

/**
 * The contents of the live node list depend of the parameter function. 
 * When necessary, the list is updated (by run the function again) and the result
 * is returned. This is useful, for instance, for the getElementsByTagName function.
 */
/*
Object.defineProperty(LiveNodeList.prototype, "contents", {
	
	get:function () {
		if (!this.__lazy && (this.__computed)) {
			return this.__computed;  
		} else {  
			if(!this.computedLiveNodeLists[this.id]){
				var ret = this.__compute();
				this.__computed = ret; 
				this.computedLiveNodeLists[this.id] = ret;
				return ret; 
			} else {
				return this.computedLiveNodeLists[this.id];
			}
		}	
	}
});*/ 

/*
Object.defineProperty(LiveNodeList.prototype, "length", {
	
	get:	function () { return this.contents.length;  }
}); */


/*
LiveNodeList.prototype.item = function (index){
	var child = this.contents[index];
	var item;
	if(child){
		item = child;
	}else{
		item = null;
	}
	return item;
};*/

/*
LiveNodeList.prototype.observe = function () { 
	this.__computed = null; 
	this.computedLiveNodeLists[this.id] = null;
}*/

/*
LiveNodeList.prototype.recompute = function () { 
	for (var i = 0; i < this.computedLiveNodeLists.length ; i++) { 
		this.computedLiveNodeLists[i] = undefined; 
	}
};*/


// EVENT TARGET
/**************************/
/* INTERFACE EVENT TARGET */
/**************************/

// EVENTS SEMANTICS
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



/*
* @id find
*/
function find(array, f){
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			return array[i];
		}
	}
	return null;
}

/*
* @id index
*/
function index(array, f){
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			return i;
		}
	}
	return -1;
}

/*
* @id filter
*/
function arr_filter(array, f){
	var res = [];
	for(var i = 0; i < array.length; i++){
		if(f(array[i])){
			res.push(array[i]);
		}
	}
	return res;
}

/*
* @id map
*/
function arr_map(array, f){
	var res = [];
	for(var i = 0; i < array.length; i++){
		res.push(f(array[i]));
	}
	return res;
}

 /**
   * Auxiliary iteration functions:
   *  1) ArrayIterator: constructor, ArrayIterator.prototype.next
   *  2) Array.prototype.getIterator
   */

  /* @id p_aux__ArrayIterator */
  function ArrayIterator (arr) {
    this.__arr = arr;
    this.__index = 0
    return this
  }

  /* @id p_aux__proto_next */
  ArrayIterator.prototype.next = function () {
    var index = this.__index;
    var arr = this.__arr;
    if (index < arr.length) {
      this.__index++;
      return { value: arr[index], done: false }
    } else {
      return { done: true }
    }
  }

const ArrayUtils      = {};
ArrayUtils.find = find;
ArrayUtils.filter = arr_filter;
ArrayUtils.map = arr_map;
ArrayUtils.index = index;
ArrayUtils.ArrayIterator = ArrayIterator;



// EVENT LISTENER
/****************************/
/* INTERFACE EVENT LISTENER */
/****************************/

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

/*
* @id EventTarget
*/
var EventTarget = function (){
  this.__platform = true;
};

var scopeEvents = {};

/*
* This function aims to avoid circular dependencies. Adding any of the dependencies below as a 'require' 
* in this file would cause a circular dependency.
*/
function initEventTarget(Node, ShadowRoot, ShadowRootMode, DocumentFragment, MouseEvent, Element, Text, Window, Event, ErrorEvent){
    scopeEvents.Node             = Node;
    scopeEvents.ShadowRoot       = ShadowRoot;
    scopeEvents.ShadowRootMode   = ShadowRootMode;
    scopeEvents.DocumentFragment = DocumentFragment;
    scopeEvents.MouseEvent       = MouseEvent;
    scopeEvents.Element          = Element;
    scopeEvents.Text             = Text;
    scopeEvents.window           = getInstance();
    scopeEvents.Window           = Window;
    scopeEvents.Event            = Event;
    scopeEvents.ErrorEvent       = ErrorEvent;
}

/*
* @JSIL
* @id dispatch
*/
function dispatch(scopeEvents, event, target, flags){
    var legacyTargetOverrideFlag;
    if(flags && flags.legacyTargetOverrideFlag){
        legacyTargetOverrideFlag = flags.legacyTargetOverrideFlag;
    }
    //1. set event's dispatch flag
    event.dispatch = true;
    //2. let targetOverride be target, if legacy flag is not given, and target's associated document otherwise
    var targetOverride = !legacyTargetOverrideFlag ? target : target.ownerDocument;
    //3. let activationTarget be null
    //4. let relatedTarget = retargeting event's relatedTarget against target
    var relatedTarget = scopeEvents.retarget(event.relatedTarget, target);
    //5. if target is not related target or target is event's related target, then:
    if(!(target === relatedTarget) || target === event.relatedTarget){
        //5.1 and 5.2, setting touch targets
        var touchTargets = scopeEvents.getTouchTargets(event, target);
        //5.4 Let isActivationEvent be true, if event is a MouseEvent object and event's type attribute is "click", and false otherwise
        var isActivationEvent = false;
        if(scopeEvents.activationEvent(event)){
            isActivationEvent = true;
        }
        //5.5 If isActivationEvent is true and target has activation behaviour, then set activationTarget to target
        var actTarget = scopeEvents.getActivationTarget(event, target, isActivationEvent);
        //5.6 let slotable be target, if target is a slotable and is assigned, and null otherwise
        var slotable = scopeEvents.is_slotable(target) && target.slot ? target : null;
        //5.9 Updates propagation path
        actTarget = scopeEvents.updatePropagationPath(target, slotable, relatedTarget, event, touchTargets, actTarget, targetOverride, isActivationEvent);
        //5.10 Let clearTargetsStruct be the last struct in event’s path whose target is non-null
        var clearTargetsStruct = event.getTheLastInPath ? event.getTheLastInPath() : event.path[0];
        //5.11 Let clearTargets be true if clearTargetsStruct’s target, clearTargetsStruct’s relatedTarget, or an EventTarget object in clearTargetsStruct’s touch target list is a node and its root is a shadow root, and false otherwise.
        var clearTargetsEnabled = scopeEvents.clearTargets(clearTargetsStruct);
        //5.12 If activationTarget is non-null and activationTarget has legacy-pre-activation behavior, then run activationTarget’s legacy-pre-activation behavior.
        if(actTarget !== null && actTarget.legacyPreActivationBehaviour !== undefined){
            actTarget.legacyPreActivationBehaviour();
        }
        scopeEvents.captureAndTarget(event, flags);
        scopeEvents.bubble(event, flags);
        scopeEvents.clear(event, clearTargetsEnabled);
        if(actTarget !== null && !event.canceled) actTarget.activationBehaviour(event);
    }
    return !event.canceled;
}

function getActivationTarget(event, target, isActivationEvent){
    var activationTarget = null;
    //5.5 If isActivationEvent is true and target has activation behaviour, then set activationTarget to target
    if(isActivationEvent && target.activationBehaviour)
        activationTarget = target;
    return activationTarget;
}
console.log('Going to create ESEm!');
var eventsSemantics = new EventsSemantics(dispatch);
console.log('ESem created!');
EventTarget.prototype.dispatch = false;

/*Object.defineProperty(EventTarget.prototype, 'onload', {
   set: function(f){
       this.addEventListener('load', f);
       var target = this;
       var event = new scopeEvents.Event('load');
       function triggerLoadEvent(){
         target.dispatchEvent(event);
       }
       console.log('triggering load event!');
       __ES__schedule(triggerLoadEvent);
   }
});*/

/*
* @id dispatchEvent
*/
EventTarget.prototype.dispatchEvent = function (event, flags, isTrusted){
    //1. If event’s dispatch flag is set, or if its initialized flag is not set, then throw an "InvalidStateError" DOMException.
    if(event.dispatch || !event.initialized){
        throw new DOMException.DOMException(DOMException.INVALID_STATE_ERR)
    }
    //2. Initialize event’s isTrusted attribute to false.
    event.isTrusted = isTrusted !== undefined ? isTrusted : false;
    //3. Return the result of dispatching event to the context object.
    var event_str = jsilEvent(event.type);
    event.target = this;
    eventsSemantics.syncDispatch("General", event_str, event, this, flags);
    return !event.canceled;
};

/*
* @id addEventListener
*/
EventTarget.prototype.addEventListener = function (type, callback, options){
    //If listener’s callback is null, then return.
    // *** THIS BEHAVIOUR IS NOT CONSISTENT WITH THE OFFICIAL TEST SUITE ***
    //if(callback === null){
    //    return;
    //}
    if(typeof options === "boolean"){
        options = {capture: options};
    }else if(!options || typeof options !== "object"){
        options = {capture: Boolean(options)};
    }else if(typeof options === "object" && typeof options.capture !== "boolean"){
        options.capture = Boolean(options.capture);
    }
    if(!this.listeners){
        this.listeners = [];
    }
    if(ArrayUtils.find(this.listeners, function(l){
        return l.type === type && l.callback === callback && l.capture === options.capture;
    }) === null){
        var event_str = jsilEvent(type);
        eventsSemantics.addHandler("General", event_str, "dispatch");
        var listener = new EventListener(type, options, callback);
        this.listeners.push(listener);
    }
};

/*
* @id removeEventListener
*/
EventTarget.prototype.removeEventListener = function (type, callback, options){
    var capture = this.flatten(options);
    var found = -1;
    if(this.listeners){
        found = ArrayUtils.index(this.listeners, function(l){
            return (l.type === type && l.callback === callback && l.capture === (capture || false));
        });
    }
    if(found !== -1){
        this.listeners.splice(found,1);
    }
};

/*
* @id flatten
*/
EventTarget.prototype.flatten = function (options){
    var capture;
    if(typeof options === "boolean"){
        capture = options;
    }else if(!options || typeof options !== "object"){
        capture = Boolean(options);
    }else if(typeof options === "object" && typeof options.capture !== "boolean"){
        capture = Boolean(options.capture);
    }else{
        capture = options.capture;
    }
    return capture;
};

/*
* @id getTheParent
*/
EventTarget.prototype.getTheParent = function (event){
    //A node’s get the parent algorithm, given an event, returns the node’s assigned slot, if node is assigned, and node’s parent otherwise.
    return this.parentNode;
};

/*
* @id activationEvent
*/
function activationEvent(event){
    // TODO
    return (event instanceof scopeEvents.MouseEvent && event.type === 'click')
}

EventTarget.prototype.triggeredEvents = 0;

/*
* @id updatePropagationPath
*/
function updatePropagationPath(target, slotable, relatedTarget, event, touchTargets, activationTarget, targetOverride, isActivationEvent){
    //5.3 Append to an event path with event, target, targetOverride, relatedTarget, touchTargets and false
    scopeEvents.appendToAnEventPath(event, target, targetOverride, relatedTarget, touchTargets, false);
    //5.8 let parent be the result of invoking target's get the parent with event
    var parent = target.getTheParent(event);
    var slotInClosedTree = false;
    //5.9 while parent is non-null
    while(parent != null){
        //5.9.1 if slotable is non-null
        if(slotable != null){
            //5.9.1.1 assert: parent is a slot
            //5.9.1.2 set slotable to null
            slotable = null;
            //5.9.1.3 if parent's root is a shadow root, whose mode is "closed", then set slot-in-closed-tree to true
            if(parent instanceof scopeEvents.ShadowRoot && parent.mode === scopeEvents.ShadowRootMode.CLOSED){
                slotInClosedTree = true;
            }
        }
        //5.9.2 if parent is a slotable and is assigned, then set slotable to parent
        if(parent && is_slotable(parent)){
            slotable = parent;
        }
        //5.9.3 let relatedTarget be the result of retargeting event’s relatedTarget against parent
        relatedTarget = retarget(event.relatedTarget, parent);
        //5.9.4 let touchTargets be a new list
        touchTargets = [];
        //5.9.5 for each touchTarget of event’s touch target list, append the result of retargeting touchTarget against parent to touchTargets.
        for(var i = 0; i < event.touchTargets.length; i++){
            var resRetarget = retarget(event.touchTargets[i], parent);
            touchTargets.push(resRetarget);
        }
        //5.9.6 if parent is a Window object, or parent is a node and target’s root is a shadow-including inclusive ancestor of parent, then:
        if(parent instanceof scopeEvents.Window || (parent instanceof scopeEvents.Node.Node && shadowIncludingInclusiveAncestor(root(target), parent))){
            //5.9.6.1 If isActivationEvent is true, event’s bubbles attribute is true, activationTarget is null, and parent has activation behavior, then set activationTarget to parent.
            if((isActivationEvent === true) && (event.bubbles === true) && (activationTarget === null) && (parent.activationBehaviour !== undefined)){
                activationTarget = parent;
            }
            //5.9.6.2 Append to an event path with event, parent, null, relatedTarget, touchTargets, and slot-in-closed-tree.
            appendToAnEventPath(event, parent, null, relatedTarget, touchTargets, slotInClosedTree);
        //5.9.7 Otherwise, if parent is relatedTarget, then set parent to null.
        }else if(parent === relatedTarget){
            parent = null;
        //5.9.8 Otherwise, set target to parent and then
        }else{
            target = parent;
            //5.9.8.1 If isActivationEvent is true, activationTarget is null, and target has activation behavior, then set activationTarget to target
            if(isActivationEvent && activationTarget === null && target.activationBehaviour){
                activationTarget = target;
            }
            //5.9.8.2 Append to an event path with event, parent, target, relatedTarget, touchTargets, and slot-in-closed-tree
            appendToAnEventPath(event, parent, target, relatedTarget, touchTargets, slotInClosedTree);
        }
        //5.9.9 If parent is non-null, then set parent to the result of invoking parent’s get the parent with event.
        if(parent !== null){
            parent = parent.getTheParent(event);
        }
        //5.9.10 Set slot-in-closed-tree to false
        slotInClosedTree = false;
    }
    return activationTarget;
}

/*
* @id clear
*/
function clear(event, clearTargets){
    //6. Set event’s eventPhase attribute to NONE
    event.eventPhase = NONE;
    //7. Set event’s currentTarget attribute to null
    var desc = Object.getOwnPropertyDescriptor(event, 'currentTarget');
    if(desc && desc.writable){
        event.currentTarget = null;
    }
    //8. Set event’s path to the empty list
    event.path = [];
    //9. Unset event’s dispatch flag, stop propagation flag, and stop immediate propagation flag
    event.dispatch = false;
    event._stopPropagation = false;
    event._stopImmediatePropagation = false;
    //event.canceled = false;
    //event.cancelBubble = false;
    //10. If clearTargets, then:
    if(clearTargets){
        //10.1 Set event’s target to null
        event.target = null;
        //10.2 Set event’s relatedTarget to null
        event.relatedTarget = null;
        //10.3 Set event’s touch target list to the empty list
        event.touchTargetList = [];
    }
    scopeEvents.window.event = undefined;
}

/*
* @id captureAndTarget
*/
function captureAndTarget(event, flags){
    //5.13 For each struct in event’s path, in reverse order:
    var reversePath = event.path.slice().reverse();
    var legacyOutputDidListenersThrowFlag = (!flags || !flags.legacyOutputDidListenersThrowFlag) ? undefined : flags.legacyOutputDidListenersThrowFlag;
    for(var i = 0; i < reversePath.length; i++){
        var struct = reversePath[i];
        //5.13.1 If struct’s target is non-null, then set event’s eventPhase attribute to AT_TARGET
        if(struct.target !== null){
            event.eventPhase = AT_TARGET;
        //5.13.2 Otherwise, set event’s eventPhase attribute to CAPTURING_PHASE
        }else{
            event.eventPhase = CAPTURING_PHASE;
        }
        //5.13.3 Invoke with struct, event, "capturing", and legacyOutputDidListenersThrowFlag if given
        invoke(struct, event, CAPTURING_PHASE, legacyOutputDidListenersThrowFlag, true);
    }
}

/*
* @id bubble
*/
function bubble(event, flags){
    //5.14 If event’s bubbles attribute is true, then for each struct in event’s path:
    var path = event.path.slice();
    var legacyOutputDidListenersThrowFlag = (!flags || !flags.legacyOutputDidListenersThrowFlag) ? undefined : flags.legacyOutputDidListenersThrowFlag;
    if(event.bubbles){
        for(var i = 0; i < path.length; i++){
            //5.14.1 If struct’s target is non-null, then set event’s eventPhase attribute to AT_TARGET
            var struct = path[i];
            if(struct.target !== null){
                event.eventPhase = AT_TARGET;
            //5.14.2 Otherwise, set event’s eventPhase attribute to BUBBLING_PHASE.
            }else{
                event.eventPhase = BUBBLING_PHASE;
            }
            //5.14.3 Invoke with struct, event, "bubbling", and legacyOutputDidListenersThrowFlag if given
            invoke(struct, event, BUBBLING_PHASE, legacyOutputDidListenersThrowFlag, true);
        }
    }else{
        event.eventPhase = AT_TARGET;
        invoke(path[0], event, BUBBLING_PHASE, legacyOutputDidListenersThrowFlag, true)
    }
}

/*
* @id invoke
*/
function invoke(struct, event, phase, legacyOutputDidListenersThrowFlag){
    //1. Set event’s target to the target of the last struct in event’s path, that is either struct or preceding struct, whose target is non-null
    event.target = event.getLastInPath ? event.getTheLastInPath().target : event.path[0];
    //2. Set event’s relatedTarget to struct’s relatedTarget
    event.relatedTarget = struct.relatedTarget;
    //3. Set event's touch target list to struct's touch target list
    event.touchTargetList = struct.touchTargetList;
    //4. If event's stop propagation flag is set, then return
    if(event._stopPropagation){
        return;
    }
    //5. Initialize event's currentTarget attribute to struct's item
    var desc = Object.getOwnPropertyDescriptor(event, 'currentTarget');
    if(desc && desc.writable){
        event.currentTarget = struct.item;
    }

    if(struct.item.listeners){
        //6. Let listeners be a clone of event's currentTarget attribute value's event listener list
        var listeners = struct.item.listeners.slice();
        //7. Let found be the result of running inner invoke with event, listeners, phase and legacyOutputDidListenersThrowFlag if given
        var found = innerInvoke(event, listeners, phase, legacyOutputDidListenersThrowFlag);
        //8. If found is false and event's isTrusted attribute is true, then:
        //if(!found && event.isTrusted){
            //8.1 Let originalEventType be event's type attribute value
            //var originalEventType = event.type;
            //8.2 If event’s type attribute value is a match for any of the strings in the first column in the following table, set event’s type
            //attribute value to the string in the second column on the same row as the matching string, and return otherwise.
            //updateEventType(event);
            //8.3 Inner invoke with event, listeners, phase, and legacyOutputDidListenersThrowFlag if given
            //execListeners(event, listeners, event.currentTarget, null);
            //innerInvoke(struct, event, listeners, phase, legacyOutputDidListenersThrowFlag);
            //8.4 Set event's type attribute value to originalEventType
            //event.type = originalEventType;
        // }
    }
}

/*
* @id innerInvoke
*/
function innerInvoke(event, listeners, phase, legacyOutputDidListenersThrowFlag){
    // 1. Let found be false.
    var found = false;
    // 2. For each listener in listeners, whose removed is false:
    for(var i = 0; i < listeners.length; i++){
        var listener = listeners[i];
        if(listener.remove) continue;
        // 2.1 If event's type attribute value is not listener's type, then continue.
        if(event.type !== listener.type) continue;
        // 2.2 Set found to true;
        found = true;
        // 2.3 If phase is "capturing" and listener's capture is false, then continue.
        if((phase === CAPTURING_PHASE) && (listener.capture === false)) continue;
        // 2.4 If phase is "bubbling" and listeners' capture is true, then continue.
        if((phase === BUBBLING_PHASE) && (listener.capture === true)) continue;
        // 2.5 If listener's once is true, then remove listener from event's currentTarget attribute value's event listener list
        if(listener.once === true) event.currentTarget.removeEventListener(event.type, listener.callback, {capture: listener.capture, once: listener.once});
        // 2.6 Let global be listener callback's associated Realm's global object (ES FEATURES NOT SUPPORTED)
        // 2.7 let curentEvent be undefined
        var currentEvent = undefined;
        // 2.8 If global is a Window object, then: (ES FEATURES NOT SUPPORTED)
        // 2.9 If listener's passive is true, then set event's in passive listener flag
        if(listener.passive){
            event.inPassiveListener = true;
        }
        // 2.10 Call a user object's operation with listener's callback, "handleEvent", event, and event's currentTarget attribute value.
        //console.log('Going to call execCallBack with '+listener.callback);
        execCallBack(listener.callback, "handleEvent", event, event.currentTarget);
        // 2.11 Unset event's in passive listener flag.
        event.inPassiveListener = false;
        // 2.12 If global is a Window object, then set global's current event to currentEvent (ES FEATURES NOT SUPPORTED)
        // 2.13 If event's stop immediate propagation flag is set, then return found.
        if(event._stopImmediatePropagation) return found;
    }
    // 3. Return found.
    return found;
}

/*
* @id execCallBack
*/
function execCallBack(callback, opName, event, currentTarget){
    // Register DOM event triggering
    EventTarget.prototype.triggeredEvents++;
    if(event.legacyPreActBeh === true) event.eventPhase === NONE;
    var window = scopeEvents.window;
    if(!isInShadowTree(event)) window.event = event;
    try{
        if(event.type === "error"){
                //console.log('Error event, window.onerror: '+window.onerror);
                if(window.onerror){
                    console.log('Going to call window error callback');
                    callback.apply(currentTarget,[event.error.message, event.error.fileName, event.error.lineNumber, event.error.columnNumber]);
                }else{
                    console.log('Going to call error callback');
                    callback.apply(currentTarget, [event]);
                }
        }else{
            if(typeof callback == 'function'){
                callback.apply(currentTarget,[event]);
            }
            else
                callback['handleEvent'].apply(callback, [event]);
        }
    }catch(e){
        console.log('got error from event');
        // exceptions in handlers are not propagated. Here we deal with Window error events
        if (window.listeners && ArrayUtils.filter(window.listeners,
            /*
            * @id execListenersFindListener
            */
            function execListenersFindListener(l){
                return l.type === "error"
            })){
            var errorEvent = new scopeEvents.Event("error");//window.document.createEvent("error");
            errorEvent.initEvent("error", true, true);
            errorEvent.error = e;
            window.dispatchEvent(errorEvent);
        } else {
            if(self['__onerrorhandler']){
                console.log('got error handler');
                const res = self.__onerrorhandler.apply(self, [e.message || "", location.href, -1, -1, e]);
                if(!res){
                    var event = new scopeEvents.ErrorEvent();
                    event.error = e;
                    event.message = e.message;
                    console.log('error.message: '+e.message);
                    console.log('e.toString(): '+e.toString());
                    console.log('sending error back to main');
                    console.log('event.cancelable?'+event.cancelable);
                    var error_msg = {'ERROR_MSG':event};
                    postMessage(error_msg)
                }
            }else{
                console.log('I am in the right case!');
                var event = new scopeEvents.ErrorEvent();
                event.error = e;
                self.dispatchEvent(event, undefined, true);
            }
        }
    }
}

/*
* @id getTouchTargets
*/
function getTouchTargets(event, target){
    //5.1 let touchTargets be a new list
    var touchTargets = [];
    //5.2 for each touchTarget of event's touch target list, append the result of retargeting touchTarget against target to touchTargets
    for(var i = 0; i < event.touchTargets.length; i++){
        var touchTarget = event.touchTargets[i];
        var retTouchTarget = retarget(touchTarget, target);
        touchTargets.push(retTouchTarget);
    }
    return touchTargets;
}

/*
* @id is_slotable
*/
function is_slotable(node){
    return (node instanceof scopeEvents.Element || node instanceof scopeEvents.Text);
}

/*
* @id clearTargets
*/
function clearTargets(clearTargetsStruct){
    // Let clearTargets be true if clearTargetsStruct’s shadow-adjusted target, clearTargetsStruct’s relatedTarget, or an EventTarget object in clearTargetsStruct’s touch target list is a node and its root is a shadow root, and false otherwise.
    if(nodeAndRootIsShadowRoot(clearTargetsStruct.target) || nodeAndRootIsShadowRoot(clearTargetsStruct.relatedTarget)) return true;
    for(var i = 0; i < clearTargetsStruct.touchTargetList.length; i++){
        var touchTarget = clearTargetsStruct.touchTargetList[i];
        if(touchTarget instanceof EventTarget && nodeAndRootIsShadowRoot(touchTarget)) return true;
    }
    return false;
}

/*
* @id nodeAndRootIsShadowRoot
*/
function nodeAndRootIsShadowRoot(node){
    return (node instanceof scopeEvents.Node.Node) && (root(node) instanceof scopeEvents.ShadowRoot);
}

/*
* @id retarget
*/
function retarget(A, B){
    if(!(A instanceof scopeEvents.Node.Node) || !(root(A) instanceof scopeEvents.ShadowRoot) || (B instanceof scopeEvents.Node.Node && shadowIncludingInclusiveAncestor(root(A), B))){
        return A;
    }else{
        return retarget(root(A).host, B);
    }
}

function root(node){
    //The root of an object is itself, if its parent is null, or else it is the root of its parent.
    if(!node.parentNode){
        return node;
    }else{
        return root(node.parentNode);
    }
}

/*
* @id shadowIncludingInclusiveAncestor
*/
function shadowIncludingInclusiveAncestor(A, B){
    //A is in B's shadow-inclusing ancestors
    //This only holds if and only if B is a shadow-including descendant of A
    //Case 1: B is a descendant of A
    //Case 2: B's root is a shadowRoot and B's root's host is a shadow-including-inclusive descendant of A.
    var descendant = isDescendant(B,A);
    var rootIsShadowRoot = (root(B) instanceof scopeEvents.ShadowRoot) && shadowIncludingInclusiveDescendant(root(B).host, A);
    return (descendant || rootIsShadowRoot);
}

/*
* @id shadowIncludingInclusiveDescendant
*/
function shadowIncludingInclusiveDescendant(A, B){
    var isShadowIncludingInclusiveDescendant = (isDescendant(A, B) || (root(A) instanceof scopeEvents.ShadowRoot && shadowIncludingInclusiveDescendant(root(A).host, B)));
    return isShadowIncludingInclusiveDescendant;
}

function isDescendant(A, B){
    if(A === null){
        return false;
    }else if(A === B){
        return true;
    }else{
        return isDescendant(A.parentNode, B);
    }
}

/*
* @id appendToAnEventPath
*/
function appendToAnEventPath(event, target, shadowAdjustedTarget, relatedTarget, touchTargets, slotInClosedTree){
    //1. let item-in-shadow-tree be false
    var itemInShadowTree = false;
    //2. if target is a node and its root is a shadow root, then set item-in-shadow-tree to true
    if(target instanceof scopeEvents.Node.Node && target.parentNode instanceof scopeEvents.ShadowRoot){
        itemInShadowTree = true;
    }
    //3. let root-of-closed-tree be false
    var rootOfClosedTree = false;
    //4. if target is a shadow root whose mode is closed, then set root-of-closed-tree to true
    if(target instanceof scopeEvents.ShadowRoot && target.mode === scopeEvents.ShadowRootMode.CLOSED){
        rootOfClosedTree = true;
    }
    //5. append a new struct to event's path
    var struct = {
        'item': target,
        'item-in-shadow-tree': itemInShadowTree,
        'target': shadowAdjustedTarget,
        'relatedTarget': relatedTarget,
        'touchTargetList': touchTargets,
        'root-of-closed-tree': rootOfClosedTree,
        'slot-in-closed-tree': slotInClosedTree
    };
    event.path.push(struct);
}

/*
* @id jsilEvent
*/
function jsilEvent (type){
    return type;
}

function isInShadowTree(event){ 
    var parent = event.currentTarget;
    while(parent){
        if(parent instanceof scopeEvents.ShadowRoot) return true;
        parent = parent.getTheParent(event);
    }
    return false;
}

scopeEvents.retarget                = retarget;
scopeEvents.captureAndTarget        = captureAndTarget;
scopeEvents.bubble                  = bubble;
scopeEvents.getTouchTargets         = getTouchTargets;
scopeEvents.getActivationTarget     = getActivationTarget;
scopeEvents.appendToAnEventPath     = appendToAnEventPath;
scopeEvents.is_slotable             = is_slotable;
scopeEvents.updatePropagationPath   = updatePropagationPath;
scopeEvents.clearTargets            = clearTargets;
scopeEvents.clear                   = clear;
scopeEvents.activationEvent         = activationEvent;

eventsSemantics.xsc = scopeEvents;




/*
* @id Node
*/
var Node = function () {
    EventTarget.call(this);
    Node.counter = (Node.counter || 0) + 1;  
    this.id = Node.counter; 
    this.nodeType             = 0;
    this.__nodeName           = null;
    this.localName            = null;
    this.ownerDocument        = null;
    this.parentNode           = null;
    this.__childNodes         = [];
    //this.__observers          = []; 
    this.attributes           = null;
    //this.namespaceURI         = null;
    this._value               = null;
    //this.prefix               = null;
    this.slot                 = null;
};

Node.prototype = Object.create(EventTarget.prototype);

//NodeType/
const ELEMENT_NODE                = 1;
const ATTRIBUTE_NODE              = 2;
const TEXT_NODE                   = 3;
const CDATA_SECTION_NODE          = 4;
const ENTITY_REFERENCE_NODE       = 5;
const ENTITY_NODE                 = 6;
const PROCESSING_INSTRUCTION_NODE = 7;
const COMMENT_NODE                = 8;
const DOCUMENT_NODE               = 9;
const DOCUMENT_TYPE_NODE          = 10;
const DOCUMENT_FRAGMENT_NODE      = 11;
const NOTATION_NODE               = 12;

/*Object.defineProperty(Node.prototype, 'nodeValue', {
        get: function(){return this._value;},

        set: function (value){
                if(this._value !== null){
                    this._value = value;
                }
        }
});*/    

/**
* The first child is the first element of the childNodes array
*/
/*Object.defineProperty(Node.prototype, 'firstChild', {
        get: function(){
            return this.__childNodes.length > 0 ? this.__childNodes[0] : null;
        }
}); */ 

/**
* Analogous to firstChild
*/
/*Object.defineProperty(Node.prototype, 'lastChild', {
        get: function(){
            return this.__childNodes.length > 0 ? this.__childNodes[this.__childNodes.length - 1] : null;
        }
});*/ 

/**
* This is the next child in the childNodes array. When not present, returns null.
*/
/*Object.defineProperty(Node.prototype, 'nextSibling', {
        get: function(){
            if(this.parentNode){
                var i = this.searchNode(this, this.parentNode.__childNodes);
                return this.parentNode.__childNodes[i+1] || null;
            }else{
                return null;
            }
        }
});  */

/**
* This is the previous child in the childNodes array. When not present, returns null.
*/
/*Object.defineProperty(Node.prototype, 'previousSibling', {
    get: function(){
        if(this.parentNode){
            var i = this.searchNode(this, this.parentNode.__childNodes);
            return this.parentNode.__childNodes[i-1] || null;
        }else{
            return null;
        }
    }
});  */

/**
* childNodes returns a live node list of the node children. If necessary, the list is re-computed.
*/
/*Object.defineProperty(Node.prototype, 'childNodes', {
    get: function(){
        var elem = this; 
        var compute = function () { 
            return elem.__childNodes; 
        }
        var nl           = new LiveNodeList.LiveNodeList(compute); 
        this.addObserver(nl); 
        return nl; 
    }
});*/

/*
* Children is similar to childNodes, but returns only element nodes. Should also be live, but cash tests expect it to be simple array.
*/
/*Object.defineProperty(Node.prototype, 'children', {
    get: function(){
        return this.__childNodes.filter(function(c){
            return c.nodeType === ELEMENT_NODE;
        }) 
    }
});*/

/*
Object.defineProperty(Node.prototype, 'firstElementChild', {
    get: function(){
        //Returns the last node which is both a child of this ParentNode and is an Element, or null if there is none.
        var children = this.__childNodes.filter( 
            function(c){return c.nodeType === ELEMENT_NODE});
        if(children.length === 0){
            return null;
        }
        return children[children.length -1];
    }
}); */ 

/*
Node.prototype.addObserver = function (o) { 
    this.__observers.push(o); 
}*/

/*
Node.prototype.notify = function () {  
    for (var i = 0; i<this.__observers.length; i++) { 
        this.__observers[i].observe(); 
    }
}*/


/*
Node.prototype.insertBefore = function (newChild, refChild) {
    this.notify(); 
    newChild.notify();
    LiveNodeList.LiveNodeList.prototype.recompute();	
    checkChildValidity(this, newChild); 
    if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
        for(var i = 0; i < newChild.__childNodes.length; i++){
            insertChild(this, newChild.__childNodes[i], refChild);
        }
        return newChild;
    }else{
        return insertChild(this, newChild, refChild);
    }
};*/

/*
Node.prototype.appendChild = function(newChild){
    return this.insertBefore(newChild, null);
};*/

/*
Node.prototype.replaceChild = function(newChild, oldChild){
    this.notify(); 
    newChild.notify(); 
    checkChildValidity(this, newChild);
    LiveNodeList.LiveNodeList.prototype.recompute();
    var indexNew = this.searchNode(newChild, this.__childNodes);
    if(indexNew > -1){
        //newChild already exists in the tree. It is first removed
        this.__childNodes.splice(indexNew, 1);
    }
    var indexOld = this.searchNode(oldChild, this.__childNodes);
    if(indexOld === -1){
        //node to be replaced is not found. Throws NOT_FOUND_ERR
        throw new DOMException.DOMException(8);
    }
    if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
        //when the node is a document fragment, we replace the oldChild witht the children of the doc frag node.
        this.__childNodes.splice(indexOld, 1, newChild.__childNodes[0]);
        for(var i = 1; i < newChild.__childNodes.length; i++){
            this.__childNodes.splice(indexOld+1, 0, newChild.__childNodes[i]);
        }
    }else{
        //replacing oldChild with newChild.
        this.__childNodes.splice(indexOld, 1, newChild);
    }
    return oldChild;
};*/

/*
Node.prototype.removeChild = function (oldChild){
    this.notify(); 
    LiveNodeList.LiveNodeList.prototype.recompute();
    if(this.is_readonly()){
        throw new DOMException.DOMException(7);
    }
    var i = this.searchNode(oldChild, this.__childNodes);
    if(i === -1){
        //oldChild does not exist.
        throw new DOMException.DOMException(8);
    }else{
        this.__childNodes.splice(i,1);
        oldChild.parentNode = null;
        if(this.nodeType === DOCUMENT_NODE){
            this.documentElement = null;
        }
        return oldChild;
    }
};*/

/*
Node.prototype.searchNode = function(node, nodeList){
    for(var i = 0; i < nodeList.length; i++){
        if(nodeList[i].id === node.id){
            return i;
        }
    }
    return -1;
};*/

/*
Node.prototype.hasChildNodes = function(){
    return this.__childNodes.length > 0;
};*/

/*
Node.prototype.cloneNode = function(deep){
    var newNode = this.clone();
    newNode.nodeType = this.nodeType;
    newNode.__nodeName = this.__nodeName;
    newNode.localName = this.localName;
    if(deep){
        for(var i = 0; i < this.__childNodes.length; i++){
            var clone = this.__childNodes[i].cloneNode(deep);
            newNode.appendChild(clone);
        }
    }
    if(this.nodeType === ELEMENT_NODE && this.attributes){
        for(var i = 0; i < this.attributes.length; i++){
            var clone = this.attributes.item(i).cloneNode(deep);
            newNode.setAttributeNode(clone);
        }
    } 
    //newNode.attributes = this.attributes;
    newNode.namespaceURI = this.namespaceURI;
    newNode.prefix = this.prefix;
    return newNode;
};*/

/*
Node.prototype.is_readonly = function(){
    if(this.nodeType === ENTITY_REFERENCE_NODE){
        return true;
    }
    if(this.parentNode === null){
        if(this.nodeType === ATTRIBUTE_NODE){
            //for the attribute we need to check if the element containing it is readonly.
            return this.ownerElement && this.ownerElement.is_readonly();
        }else{
            return false;
        }
    }else{
        if(this.parentNode.nodeType === ENTITY_NODE || this.parentNode.nodeType === ENTITY_REFERENCE_NODE){
            return true;
        }else{
            return this.parentNode.is_readonly();
        }
    }
};*/

/*
Node.prototype.normalize = function(){
    for (var i = 0; i<this.__childNodes.length;i++) {
        if (i>0) {
        var child = this.__childNodes[i];
        var prevChild = this.__childNodes[i-1];

        if (child.nodeType === TEXT_NODE &&
            prevChild.nodeType === TEXT_NODE){
            // remove the child and decrement i
            prevChild.appendData(child._data);

            this.removeChild(child);
            i--;
        }
        }
        this.__childNodes[i].normalize();
    }
};*/


/*
Node.prototype.remove = function(){
    var parent = this.parentNode; 
    parent.removeChild(this); 
};*/

//AUXILIARY FUNCTIONS

/*
function insertChild(parent, newChild, refChild){
    if(parent.nodeType === DOCUMENT_NODE && newChild.nodeType === ELEMENT_NODE){
        parent.documentElement = newChild;
        if(parent.doctype){
            parent.doctype.name = newChild.tagName;
        }
    }
    newChild.parentNode = parent;
    if(parent.searchNode(newChild, parent.__childNodes) > -1){
        parent.removeChild(newChild);
    }
    if(refChild === null){
        //this.childNodes = []
        //if(this.childNodes.length === 0){
        //    this.firstChild = newChild;
        //}
        if(parent.__childNodes.length > 0){
            //newChild.previousSibling = parent.__childNodes[parent.__childNodes.length -1 ];
            //newChild.previousSibling.nextSibling = newChild;
        }
        parent.__childNodes.push(newChild); 
        //this.lastChild = newChild;
        return newChild;
    }else{
        var i = parent.searchNode(refChild, parent.__childNodes);
        if(i === -1){
            throw new DOMException.DOMException(8);     
        }else{
            //parent.previousSibling = refChild;
            //refChild.nextSibling = newChild;
            //this.lastChild = newChild;
            parent.__childNodes.splice(i, 0, newChild);
            return newChild;
        }
    }
};*/

/*
function validHierarchy(node, newChild){
    var childType = newChild.nodeType;
    var allowed = [ELEMENT_NODE, PROCESSING_INSTRUCTION_NODE, COMMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, ENTITY_REFERENCE_NODE, DOCUMENT_FRAGMENT_NODE];
    var result = false;
    switch(node.nodeType){
        case ELEMENT_NODE: case DOCUMENT_FRAGMENT_NODE: case ENTITY_REFERENCE_NODE: case ENTITY_NODE:
            result = (allowed.indexOf(childType) >= 0);
            break;
        case ATTRIBUTE_NODE:
            result = (childType === TEXT_NODE || childType === ENTITY_REFERENCE_NODE || childType === DOCUMENT_FRAGMENT_NODE);
            break;
        case DOCUMENT_NODE:
            if(childType === ELEMENT_NODE){
                result = (node.documentElement === null);
            }else{
                result = (childType === PROCESSING_INSTRUCTION_NODE || childType === COMMENT_NODE || childType === DOCUMENT_TYPE_NODE || childType === DOCUMENT_FRAGMENT_NODE);
            }
            break;
        default:
            result = false;
    }
    return result;
}*/

/*
function checkChildValidity(node, newChild){
    if(!validHierarchy(node, newChild) || nodeAncestor(node, newChild)){
        throw new DOMException.DOMException(3);
    }
    if(node.is_readonly()){
        throw new DOMException.DOMException(7);
    }
    if(node.ownerDocument && newChild.ownerDocument && !node.ownerDocument.isSameDocument(newChild.ownerDocument)){
        throw new DOMException.DOMException(4);
    }
}*/

/*
* @id searchNodeByType
*/
var searchNodeByType = function(nodeList, type){
    var result = [];
    var notNull = nodeList != null;
    if(notNull){
        for(var i = 0; i < nodeList.length; i++){
            var elem = nodeList[i];
            if(elem.nodeType === type){
                result.push(elem);
            }
        }
    }
    return result;
};

/*
* @id nodeAncestor
*/
var nodeAncestor = function(node, ancestor){
    if(node === null || node === undefined){
        return false;
    }else{
        return ((node.id === ancestor.id) || nodeAncestor(node.parentNode, ancestor));
    }
};

/*
* @id checkEffects
*/
var checkEffects = function(node, newChild){
    if(node.nodeType === ATTRIBUTE_NODE){
        node._value = newChild._data;
    }
};



Node = {Node: Node}
 
'use strict';

/**
 * Auxiliary iteration functions:
 *  1) ArrayIterator: constructor, ArrayIterator.prototype.next
 *  2) Array.prototype.getIterator
 */


/* @id p_aux_proto_getIterator */
function getIterator (iterable) {
  if (iterable instanceof Array) return new ArrayIterator(iterable)
}

/* @id p_aux__IsNotObject */
function IsNotObject (x) {
  var t = typeof x;
  return (x === null || (t !== "object" && t !== "function"));
}

/* @id p_aux__IsCallable */
function IsCallable(f) {
  return typeof f === 'function'
}

/* @id p_aux__Get */
function Get(o, p) {
  return o[p]
}

/* @id p_aux__SpeciesConstructor */
function SpeciesConstructor(O, defaultConstructor) {
  var C = Get(O, "constructor")
  return (C) ? C : defaultConstructor
}

/** 25.4.3.1 Promise ( executor )
 *  depends on: CreateResolvingFunctions
 *
 * @id p__Promise
*/
function Promise (executor) {
  if (this === undefined)
    throw new TypeError ();
  /*if (this.__newTarget === undefined)
    throw new TypeError ();*/
  if (!IsCallable(executor))
    throw new TypeError ();
  var promise = this;
  promise.PromiseState = "pending";
  promise.PromiseFulfillReactions = { length : 0 };
  promise.PromiseRejectReactions = { length : 0 };
  var resolvingFunctions = CreateResolvingFunctions (this);
  try {
      executor(resolvingFunctions.resolve, resolvingFunctions.reject)
  } catch (e) {
      return resolvingFunctions.reject(e);
  }
}
Object.defineProperty(Promise, "prototype", { value: Promise.prototype, writable: false, enumerable: false, configurable: false });

/** 25.4.1.3 CreateResolvingFunctions ( promise )
 * depends on: getResolveFunction, getRejectFunction
 *
 * @id p__CreateResolvingFunctions
*/
function CreateResolvingFunctions(promise) {
  var alreadyResolved = { value: false };
  var resolve = getResolveFunction();
  resolve.promise = promise;
  resolve.alreadyResolved = alreadyResolved;
  var reject = getRejectFunction();
  reject.promise = promise;
  reject.alreadyResolved = alreadyResolved;
  return { resolve, reject }
}

/** 25.4.1.3.1 Promise Reject Functions
 *  depends on: RejectPromise
 *
 * @id p__getRejectFunction
*/
function getRejectFunction() {
  /* @id __aux_getRejectFunction */
  var f = (reason) => {
    var promise = f.promise;
    var alreadyResolved = f.alreadyResolved;
    if (alreadyResolved.value)
      return undefined;
    f.alreadyResolved.value = true;
    return RejectPromise (promise, reason)
  };
  return f;
}

/** 25.4.1.3.2 Promise Resolve Functions
 *  depends on: RejectPromise, FulfillPromise, EnqueueJob, PromiseResolveThenableJob
 *
 *  @id p__getResolveFunction
*/
function getResolveFunction () {
  /* @id __aux_getResolveFunction */
  var f = (resolution) => {
    var promise = f.promise;
    var alreadyResolved = f.alreadyResolved;
    var then;

    if (alreadyResolved.value)
      return undefined;
    f.alreadyResolved.value = true;
    if (resolution === promise) {
      var selfResolution = new TypeError();
      return RejectPromise(promise, selfResolution)
    }
    if (IsNotObject(resolution)) {
        return FulfillPromise(promise, resolution);
    }
    try {
        then = Get(resolution, "then");
    } catch (e) {
        return RejectPromise (promise, e)
    }
    if (!IsCallable(then)) {
        return FulfillPromise(promise, resolution);
    }

    var thenableJob = PromiseResolveThenableJob(promise, resolution, then);
    //console.log('going to call schedule(thenablejob)')
    __ES__schedule(thenableJob);

    return undefined
  }
  return f;
}

/** 25.4.2.2 PromiseResolveThenableJob ( promiseToResolve, thenable, then)
 *
 * @id p__ResolveThenableJob
*/
function PromiseResolveThenableJob (promiseToResolve, thenable, then) {
  /* @id __aux_ResolveThenableJob */
  return function () {
    var resolvingFunctions = CreateResolvingFunctions (promiseToResolve);
    var callResult;
    try {
      callResult = then.call(thenable, resolvingFunctions.resolve, resolvingFunctions.reject)
    } catch (e) {
      return resolvingFunctions.reject(e)
    }
    return callResult
  }
}

/** 25.4.1.4 FulfillPromise ( promise, value)
 *  depends on: TriggerPromiseReactions
 *
 * @id p__FulfillPromise
*/
function FulfillPromise(promise, value) {
  var reactions = promise.PromiseFulfillReactions;
  promise.PromiseResult = value;
  promise.PromiseFulfillReactions = undefined;
  promise.PromiseRejectReactions = undefined;
  promise.PromiseState = "fulfilled";
  return TriggerPromiseReactions (reactions, value);
}

/**  25.4.1.7 RejectPromise ( promise, reason)
 *
 * @id p__RejectPromise
*/
function RejectPromise (promise, reason) {
  var reactions = promise.PromiseRejectReactions;
  promise.PromiseResult = reason;
  promise.PromiseFulfillReactions = undefined;
  promise.PromiseRejectReactions = undefined;
  promise.PromiseState = "rejected";
  return TriggerPromiseReactions(reactions, reason);
}


/** 25.4.1.8 TriggerPromiseReactions ( reactions, argument )
 * depends on: Promise Reaction Job
 *
 * @id p__TriggerPromiseReactions
*/
function TriggerPromiseReactions (reactions, argument) {
  for (var i = 0; i < reactions.length; i++) {
    var reactionJob = PromiseReactionJob (reactions[i], argument);
    //console.log('going to call schedule(reactionjob)')
    __ES__schedule(reactionJob);
  }
  return undefined;
}

/** 25.4.2.1 PromiseReactionJob ( reaction, argument )
 *
 * @id p__ReactionJob
*/
function PromiseReactionJob (reaction, argument) {
  /* @id __aux_ReactionJob */
  return function () {
    var promiseCapability = reaction.Capability;
    var handler = reaction.Handler;
    var handlerResult;
    var throws = false;
    var result;

    if (handler === "Identity") {
      handlerResult = argument
    } else if (handler === "Thrower") {
      throws = true;
      handlerResult = argument
    } else {
      try {
        handlerResult = handler(argument)
      } catch (e) {
        throws = true;
        handlerResult = e
      }
    }

    if (throws) {
      result = (promiseCapability.Reject).call(undefined, handlerResult)
    } else {
      result = (promiseCapability.Resolve).call(undefined, handlerResult)
    }
    return result;
  }
}

/** 25.4.4.4 Promise.reject ( r )
  * depends on: NewPromiseCapability
  *
  * @id p__reject
  */
var p__reject = function (r) {
  var C = this;
  if (IsNotObject(C))
    throw new TypeError();
  var promiseCapability = NewPromiseCapability(C);
  (promiseCapability.Reject).call(undefined, r);
  return promiseCapability.Promise
}
Object.defineProperty(Promise, "reject", { value: p__reject, writable: true, configurable: true});
Object.defineProperty(Promise.reject, "name", { value: "reject", configurable: true});


/* @id PromiseResolve */
function PromiseResolve(C, x) {
  if (IsPromise(x)) {
    var xConstructor = Get(x, "constructor");
    if (xConstructor === C)
      return x
  }
  var promiseCapability = NewPromiseCapability(C);
  (promiseCapability.Resolve).call(undefined, x);
  return promiseCapability.Promise
}

/** 25.4.4.5 Promise.resolve ( x )
  * depends on: NewPromiseCapability, IsPromise
  *
  * @id p__resolve
  */
  var p__resolve = function (x) {
  var C = this;
  if (IsNotObject(C))
    throw new TypeError ();
  return PromiseResolve(C, x)
}
Object.defineProperty(Promise, "resolve", { value: p__resolve, writable: true, configurable: true});
Object.defineProperty(Promise.resolve, "name", { value: "resolve", configurable: true});

/** 25.4.1.5 NewPromiseCapability (C)
 * depends on: GetCapabilitiesExecutor
 *
 * @id p__NewPromiseCapability
*/
function NewPromiseCapability (C) {
  if (typeof C !== "function")
    throw new TypeError ();
  var promiseCapability = { Promise: undefined, Resolve: undefined, Reject: undefined };
  var executor = GetCapabilitiesExecutor ();
  executor.Capability = promiseCapability;
  var promise = new C(executor);
  if (!IsCallable(promiseCapability.Resolve))
    throw new TypeError();
  if (!IsCallable(promiseCapability.Reject))
    throw new TypeError();
  promiseCapability.Promise = promise;
  return promiseCapability
}

/** 25.4.1.5.1 GetCapabilitiesExecutor
 *
 * @id p__GetCapabilitiesExecutor
*/
function GetCapabilitiesExecutor () {
  /* @id __aux_GetCapabilitiesExecutor */
  var f = (resolve, reject) => {
    var promiseCapability = f.Capability;
    if (promiseCapability.Resolve !== undefined)
      throw new TypeError ();
    if (promiseCapability.Reject !== undefined)
      throw new TypeError ();
    promiseCapability.Resolve = resolve;
    promiseCapability.Reject = reject;
    return undefined;
  };
  return f;
}

/** 25.4.1.6 IsPromise ( x )
 *
 * @id p__IsPromise
*/
function IsPromise (x) {
  if (IsNotObject(x))
    return false;
  if (! (x.hasOwnProperty("PromiseState")))
    return false;
  return true;
}

/** 25.4.5.1 Promise.prototype.catch ( onRejected )
 * depends on: Promise.prototype.then
 *
 * @id p__proto__catch
*/
var p__p_catch = function ( onRejected ) {
  var promise = this;
  return promise.then(undefined, onRejected)
}
Object.defineProperty(Promise.prototype, "catch", { value: p__p_catch, writable: true, configurable: true});
Object.defineProperty(Promise.prototype.catch, "name", { value: "catch", configurable: true});


/** 25.4.5.2 Promise.prototype.constructor */
Promise.prototype.constructor = Promise;

/** 25.4.5.3 Promise.prototype.then ( onFulfilled , onRejected )
 * depends on: PerformPromiseThen
 *
 * @id p__proto__then
 */
var p__p_then = function (onFulfilled, onRejected) {
  var promise = this;
  if (!IsPromise(promise))
    throw new TypeError();
  var C = promise.constructor;
  var resultCapability = NewPromiseCapability(C);
  return PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)
}
Object.defineProperty(Promise.prototype, "then", { value: p__p_then, writable: true, configurable: true});
Object.defineProperty(Promise.prototype.then, "name", { value: "then", configurable: true});

/** Auxiliary functions for the Finally */

/** 25.4.5.3.1: Then Finally functions
 * depends on: PromiseResolve, promise.then
 *
 * @id p__createThenFinally
*/
function createThenFinally(C, onFinally) {
  /* @id __aux_createThenFinally */
  var f = (value) => {
    var result = onFinally.call(undefined);
    var promise = PromiseResolve(C, result);
    /* @id __aux_value_fun */
    return promise.then(() => { return value })
  };
  return f;
}

/** 25.4.5.3.1: Catch Finally functions
 * depends on: PromiseResolve, promise.then
 *
 * @id p__createCatchFinally
*/
function createCatchFinally(C, onFinally) {
  /* @id __aux_createCatchFinally */
  var f = (reason) => {
    var result = onFinally.call(undefined);
    var promise = PromiseResolve(C, result);
    /* @id __aux_reason_fun */
    return (promise.then).call(promise, () => { throw reason });
  };
  return f;
}

/** 25.4.5.3 Promise.prototype.finally ( onFinally )
 * depends on: IsNotObject, IsCallable, SpeciesConstructor, createThenFinally, createCatchFinally
 *
 * @id p__proto_finally
*/
var p__p_finally = function ( onFinally ) {
  var promise = this;
  if (IsNotObject(promise))
    throw new TypeError();
  var C = SpeciesConstructor(promise, Promise);
  if (!IsCallable(onFinally)) {
    var thenFinally = onFinally;
    var catchFinally = onFinally;
  } else {
    var thenFinally = createThenFinally(C, onFinally);
    var catchFinally = createCatchFinally(C, onFinally);
  }

  return promise.then(thenFinally, catchFinally);
}
Object.defineProperty(Promise.prototype, "finally", { value: p__p_finally, writable: true, configurable: true});
Object.defineProperty(Promise.prototype.finally, "name", { value: "finally", configurable: true});

/** 25.4.5.3.1 PerformPromiseThen ( promise, onFulfilled, onRejected, resultCapability )
 * depends on: EnqueueJob, PromiseReactionJob
 *
 * @id p__PerformPromiseThen
 */
function PerformPromiseThen (promise, onFulfilled, onRejected, resultCapability) {
  var result;

  if (!IsCallable(onFulfilled))
    onFulfilled = "Identity";
  if (!IsCallable(onRejected))
    onRejected = "Thrower";
  var fulfillReaction = { Capability: resultCapability, Handler: onFulfilled };
  var rejectReaction = { Capability: resultCapability, Handler: onRejected };
  if (promise.PromiseState === "pending") {
    Array.prototype.push.call(promise.PromiseFulfillReactions, fulfillReaction);
    Array.prototype.push.call(promise.PromiseRejectReactions, rejectReaction);
  } else if (promise.PromiseState === "fulfilled") {
    var value = promise.PromiseResult;
    var reactionJob = PromiseReactionJob (fulfillReaction, value)
    __ES__schedule(reactionJob);
  } else if (promise.PromiseState === "rejected") {
    var reason = promise.PromiseResult;
    var reactionJob = PromiseReactionJob (rejectReaction, reason)
    __ES__schedule(reactionJob);
  }

  if (resultCapability === undefined)
    result = undefined;
  else
    result = resultCapability.Promise;
  return result;
}

/** 25.4.4.1 Promise.all ( iterable )
 *  depends on: NewPromiseCapability, PerformPromiseAll
 *
 * @id p__all
 */
var p__all = function (iterable) {
  var C = this;
  if (IsNotObject(C))
    throw new TypeError();
  var promiseCapability = NewPromiseCapability(C);
  try {
    var iteratorRecord = getIterator(iterable)
  } catch (e) {
    promiseCapability.Reject(undefined, e);
    return promiseCapability.Promise
  };
  try {
    return PerformPromiseAll(iteratorRecord, C, promiseCapability)
  } catch (e) {
    (promiseCapability.Reject).call(undefined, e);
    return promiseCapability.Promise
  };
}
Object.defineProperty(Promise, "all", { value: p__all, writable: true, configurable: true});
Object.defineProperty(Promise.all, "name", { value: "all", configurable: true});

/**
 * 25.4.4.1.1 PerformPromiseAll( iteratorRecord, constructor, resultCapability)
 * depends on: Promise.prototype.then, Promise.resolve, PromiseAllResolveElement
 *
 * @id p__PerformPromiseAll
 */
function PerformPromiseAll (iterator, constructor, resultCapability) {
  var values = [];
  var remainingElementsCount = { value: 1 };
  var index = 0;

  var promiseResolve = Get(constructor, "resolve");
  if (!IsCallable(promiseResolve)) throw new TypeError ();

  while (true) {
    try { var next = iterator.next() } catch (e) { return e };
    if (next.done) {
      remainingElementsCount.value--;
      if (remainingElementsCount.value === 0) {
        (resultCapability.Resolve).call(undefined, values);
      }
      return resultCapability.Promise
    }
    try { var nextValue = next.value } catch (e) { return e };
    Object.setPrototypeOf(values, null);
    Array.prototype.push.call(values, undefined);
    Object.setPrototypeOf(values, Array.prototype);
    var nextPromise = promiseResolve.call(constructor, nextValue);
    var resolveElement = PromiseAllResolveElement();
    resolveElement.AlreadyCalled = { value: false };
    resolveElement.Index = index;
    resolveElement.Values = values;
    resolveElement.Capability = resultCapability;
    resolveElement.RemainingElements = remainingElementsCount;
    remainingElementsCount.value++;
    (nextPromise.then).call(nextPromise, resolveElement, resultCapability.Reject)
    index++
  }
}

/**  25.4.4.1.2 Promise.all Resolve Element Functions
 *
 * @id p__PromiseAllResolveElement
*/
function PromiseAllResolveElement () {
  /* @id __aux_PromiseAllResolveElement */
  var f = (x) => {
    var alreadyCalled = f.AlreadyCalled.value;
    if (alreadyCalled)
      return undefined;
    f.AlreadyCalled.value = true;
    var index = f.Index;
    var values = f.Values;
    var promiseCapability = f.Capability;
    var remainingElementsCount = f.RemainingElements;
    values[index] = x;
    remainingElementsCount.value--;
    if (remainingElementsCount.value === 0) {
      return (promiseCapability.Resolve).call(undefined, values)
    }
    return undefined
  };
  return f;
}

/** 25.4.4.3 Promise.race ( iterable )
 * depends on: NewPromiseCapability, PerformPromiseRace
 *
 * @id p__race
*/
var p__race = function (iterable) {
  var C = this;
  if (IsNotObject(C))
    throw new TypeError();
  var promiseCapability = NewPromiseCapability(C);
  try {
    var iteratorRecord = getIterator(iterable)
  } catch (e) {
    (promiseCapability.Reject).call(undefined, e);
    return promiseCapability.Promise
  };
  try {
    return PerformPromiseRace(iteratorRecord, C, promiseCapability)
  } catch (e) {
    (promiseCapability.Reject).call(undefined, e);
    return promiseCapability.Promise
  };
}
Object.defineProperty(Promise, "race", { value: p__race, writable: true, configurable: true});
Object.defineProperty(Promise.race, "name", { value: "race", configurable: true});

/** 25.4.4.3.1 Runtime Semantics: PerformPromiseRace ( iteratorRecord, promiseCapability, C )
 * depends on:
 *
 * @id p__PerformPromiseRace
*/
function PerformPromiseRace(iterator, constructor, resultCapability) {
  var promiseResolve = Get(constructor, "resolve");
  if (typeof promiseResolve !== "function") throw new TypeError ();
  var p;
  while (true) {
    var next = iterator.next();
    if (next.done) {
      return resultCapability.Promise
    }
    try { var nextValue = next.value } catch (e) { return e };
    var nextPromise = promiseResolve.call(constructor, nextValue);
    nextPromise.then(resultCapability.Resolve, resultCapability.Reject);
  }
}

/** BONUS: .allSettled
 *
 * @id p__allSettled
*/
var p__allSettled = function (iterable) {
  var C = this;
  if (IsNotObject(C))
    throw new TypeError();
  var promiseCapability = NewPromiseCapability(C);
  try {
    var iteratorRecord = getIterator(iterable)
  } catch (e) {
    (promiseCapability.Reject).call(undefined, e);
    return promiseCapability.Promise
  };
  try {
    return PerformPromiseAllSettled(iteratorRecord, C, promiseCapability)
  } catch (result) {
    (promiseCapability.Reject).call(undefined, result);
    return promiseCapability.Promise
  }
}
Object.defineProperty(Promise, "allSettled", { value: p__allSettled, writable: true, configurable: true});
Object.defineProperty(Promise.allSettled, "name", { value: "allSettled", configurable: true});

/**
 * 25.4.4.1.1 PerformPromiseAllSettled( iteratorRecord, constructor, resultCapability)
 * depends on: Promise.prototype.then, Promise.resolve, PromiseAllResolveElement
 *
 * @id p__PerformPromiseAllSettled
 */
function PerformPromiseAllSettled (iterator, constructor, resultCapability) {
  var values = [];
  var remainingElementsCount = {value: 1};
  var index = 0;

  var promiseResolve = Get(constructor, "resolve");
  if (!IsCallable(promiseResolve))
    throw new TypeError ();

  while (true) {
    var next = iterator.next();
    if (next.done) {
      remainingElementsCount.value--;
      if (remainingElementsCount.value === 0) {
        (resultCapability.Resolve).call(undefined, values);
      }
      return resultCapability.Promise
    }
    try { var nextValue = next.value } catch (e) { return e }
    Object.setPrototypeOf(values, null);
    Array.prototype.push.call(values, undefined);
    Object.setPrototypeOf(values, Array.prototype);
    var nextPromise = promiseResolve.call(constructor, nextValue);
    var alreadyCalled = { value : false }

    var resolveElement = PromiseAllSettledResolveElement();
    resolveElement.AlreadyCalled = alreadyCalled;
    resolveElement.Index = index;
    resolveElement.Values = values;
    resolveElement.Capability = resultCapability;
    resolveElement.RemainingElements = remainingElementsCount;

    var rejectElement = PromiseAllSettledRejectElement();
    rejectElement.AlreadyCalled = alreadyCalled;
    rejectElement.Index = index;
    rejectElement.Values = values;
    rejectElement.Capability = resultCapability;
    rejectElement.RemainingElements = remainingElementsCount;

    remainingElementsCount.value++;
    (nextPromise.then).call(nextPromise, resolveElement, rejectElement)
    index++
  }
}

/** BONUS: Promise.allSettled Resolve Element Function
 *
 * @id p__PromiseAllSettledResolveElement
*/
function PromiseAllSettledResolveElement () {
  /* @id __aux_PromiseAllSettledResolveElement */
  var f = (x) => {
    if (f.AlreadyCalled.value)
      return undefined;
    f.AlreadyCalled.value = true;
    var index = f.Index;
    var values = f.Values;
    var promiseCapability = f.Capability;
    var remainingElementsCount = f.RemainingElements;
    values[index] = { status: "fulfilled", value: x };
    remainingElementsCount.value--;
    if (remainingElementsCount.value === 0) {
      return (promiseCapability.Resolve).call(undefined, values)
    }
    return undefined
  };
  return f;
}

/** BONUS: Promise.allSettled Reject Element Function
 *
 * @id p__PromiseAllSettledRejectElement
*/
function PromiseAllSettledRejectElement () {
  /* @id __aux_PromiseAllSettledRejectElement */
  var f = (x) => {
    if (f.AlreadyCalled.value)
      return undefined;
    f.AlreadyCalled.value = true;
    var index = f.Index;
    var values = f.Values;
    var promiseCapability = f.Capability;
    var remainingElementsCount = f.RemainingElements;
    values[index] = { status: "rejected", reason: x };
    remainingElementsCount.value--;
    if (remainingElementsCount.value === 0) {
      return (promiseCapability.Resolve).call(undefined, values)
    }
    return undefined
  };
  return f;
}

Object.defineProperty(Promise, "name", { value: "Promise", configurable: true});

/*
* @id p_aux_awaitResolve
*/
function awaitResolve (p) {

if (p && (! (p instanceof Promise)) && (p.hasOwnProperty("then"))) {
  if ((typeof p.then) === "function") {
    return (new Promise(p.then)).then(
      /* @id p_aux_cruxThen1 */
      function (v) { return v; }
    ).then(
      /* @id p_aux_cruxThen2 */
      function (v) { return v; }
    );
  }
}

return Promise.resolve(p);
}


/* @id p_aux_promisePredicate */
Promise.predicate = function(p) {
var new_p = awaitResolve(p);
/* @id p_aux_predCond */
var f = function () {
  var state = new_p.PromiseState;
  return state === "fulfilled" || state === "rejected";
};

f.promise = new_p;
return f;
}

// JS2JSILList

/*
* @id JS2JSILList
*/
function JS2JSILList(arr){
    // JSIL Call!
    var jsilList = JSILList_create();
    for(var i = 0; i < arr.length; i++){
        // JSIL Call!
        jsilList = JSILList_add(jsilList, arr[i]);
    }
    return jsilList;
}

function JSILListToArray(arr){
    //JSIL Call!
    return JSILList_to_Array(arr);
}


// MP SEMANTICS
JS2JSILList = {JS2JSILList: JS2JSILList, JSILListToArray: JSILListToArray};

/*
* @id MPSemantics
*/
function MPSemantics(){
    this.ESem = new EventsSemantics();
    this.ESem.addHandler("Message", "ProcessMessage", "processMessageSteps");
}

var __MPSem;

function getMPSemanticsInstance(){
    if(!__MPSem){
        __MPSem = new MPSemantics();
    }
    return __MPSem;
}

/*
* @id MPSemanticsNewPort
*/
MPSemantics.prototype.newPort = function(){
    return __MP__wrapper__newPort();
}

/*
* @id MPSemanticsSend
*/
MPSemantics.prototype.send = function(message, plist, orig_port, dest_port, event){
    //console.log('MPSem: send');
    var mplist = JS2JSILList.JS2JSILList(message); 
    var plistJSIL = JS2JSILList.JS2JSILList(plist);
    __MP__wrapper__send(mplist, plistJSIL, orig_port, dest_port, event);
}

MPSemantics.prototype.notifyAll = function(message, orig_port, fid){
    __MP__wrapper__notify_all(message, orig_port, fid);
}

/*
* @id MPSemanticsCreate
*/
MPSemantics.prototype.create = function(url, setup_fid, xargs){
    //console.log('MPSem: create, outsideportid: '+outsidePortId);
    var main_fid = "main"+url.substring(0, url.length - 3);
    xargs.push(main_fid);
    var argslist = JS2JSILList.JS2JSILList(xargs); 
    return __MP__wrapper__create(url, setup_fid, argslist);
}

/*
* @id MPSemanticsCreateWithId
*/
MPSemantics.prototype.create_with_id = function(name, url, setup_fid, xargs){
    console.log('MPSemantics.create_with_id: '+name);
    var main_fid = "main"+url.substring(0, url.length - 3);
    xargs.push(main_fid);
    var argslist = JS2JSILList.JS2JSILList(xargs); 
    return __MP__wrapper__create_with_id(name, url, setup_fid, argslist);
}

MPSemantics.prototype.conf_exists = function(id){
    return __MP__wrapper__confExists(id);
}

/*
* @id MPSemanticsPairPorts
*/
MPSemantics.prototype.pairPorts = function(port1Id, port2Id){
    /*this.unpairPort(port1Id);
    this.unpairPort(port2Id);*/
    //console.log('MPSem: pairing '+port1Id+' and '+port2Id);
    __MP__wrapper__pairPorts(port1Id, port2Id);
}

/*
* @id MPSemanticsUnpairPorts
*/
MPSemantics.prototype.unpairPort = function(portId){
    //console.log('MPSem: unpair');
    __MP__wrapper__unpairPort(portId);
}

/*
* @id MPSemanticsGetPairedPort
*/
MPSemantics.prototype.getPairedPort = function(portId){
    //console.log('MPSem: getPaired');
    var paired_ports = __MP__wrapper__getPaired(portId);
    paired_ports = JS2JSILList.JSILListToArray(paired_ports);
    //console.log('MPSem returned '+paired_port+' as getPaired of '+portId);
    return paired_ports && paired_ports.length > 0 ? paired_ports[0] : null;
}

/*
* @id MPSemanticsGetAllPairedPorts
*/
MPSemantics.prototype.getAllPairedPorts = function(portId){
    var paired_ports = __MP__wrapper__getPaired(portId);
    paired_ports = JS2JSILList.JSILListToArray(paired_ports);
    return paired_ports;
}

/*
* @id MPSemanticsTerminate
*/
MPSemantics.prototype.terminate = function(confId){
    console.log('Going to call MPWrapperTerminate, confId: '+confId);
    if(confId)
      return __MP__wrapper__terminate(true, confId);
    else 
      return __MP__wrapper__terminate(true);
}

/*
* @id MPSemanticsClose
*/
MPSemantics.prototype.close = function(confId){
    console.log('Going to call MPWrapperTerminate, confId: '+confId);
    if(confId)
      return __MP__wrapper__terminate(false, confId);
    else 
      return __MP__wrapper__terminate(false);
}

/*
* @id MPSemanticsBeginAtomic
*/
MPSemantics.prototype.beginAtomic = function(){
    return __MP__wrapper__beginAtomic();
}  

/*
* @id MPSemanticsEndAtomic
*/
MPSemantics.prototype.endAtomic = function(){
    return __MP__wrapper__endAtomic();
} 

/********************/
/* INTERFACE EVENT  */
/********************/

//WINDOW
/********************/
/* INTERFACE WINDOW */
/********************/


/*
* @id Window
*/
var Window = function(id, parent){
    EventTarget.call(this);
    if (id !== undefined) {
      this.__id = id;
    }else{
      this.__id = Math.random();
    }
    //this.document = null;
    //this.timeStamp = (new Date()).getTime();
    this.event = undefined;
    //this.__onerror = null;
    this.window = this;
    this.parent = parent;
    //this.opener = null;

    //this.outerHeight = 820;
    //this.iframes = this;
    //this.__iframes_array = [];

    //this.__onmessage = null;
    //this.__onmessageerror = null;
    //console.log('Adding window of id '+this.__id+' to prototype ');
    Window.prototype.windows.push(this);
};

Window.prototype = Object.create(EventTarget.prototype);

Window.prototype.windows = [];

/*Object.defineProperty(Window.prototype, "DOMException", {
    get: function(){
        return DOMException.DOMException;
    }
});*/

/*Object.defineProperty(Window.prototype, 'onmessage', {
    set: function(f){
        if(this.__onmessage) this.removeEventListener('message', this.__onmessage);
        this.addEventListener('message', f);
        this.__onmessage = f;
    }
});*/

/*Object.defineProperty(Window.prototype, 'onerror', {
    
    set: function(f){
        this.addEventListener("error", f);
        this.__onerror = f;
    },

    
    get: function(){
        return this.__onerror;
    }
});*/

/*Object.defineProperty(Window.prototype, 'onmessageerror', {
    set: function(f){
       this.__onmessageerror = f;
       this.addEventListener('messageerror', f);
    },
    get: function(){
        return this.__onmessageerror;
    }
})*/

/*
Window.prototype.getComputedStyle = function(elem){
    return elem.style;
};*/

/*Object.defineProperty(Window.prototype, 'outer-height', {
    get: function(){
        return this.outerHeight;
    }
});*/

/*Window.prototype.setTimeout = function (callback, timeout) {
    return callback ();
}*/

/*Window.prototype.clone = function () {
    var copy = new Window();
    copy.document = this.document;
    copy.timeStamp = this.timeStamp;
    copy.__onerror = this.__onerror;
    copy.paent = this.parent;
    copy.opener = this.opener;
    copy.outerHeight = this.outerHeight;
    return copy;
}*/

/*Window.prototype.getTheParent = function(){
    return this.parent;
}*/

/*
Window.prototype.createCommunicationPoint = function(MessagePort, url, MPSem){
    var outsidePort = new MessagePort();
    outsidePort.__Enabled = true;
    windowInstance.__port = outsidePort;
    this.__port = outsidePort;
    //this.__port.targetWindow = this;
    this.src = url;
    //console.log('createCommunicationPoint, parentId: '+this.parent.__id+', this.id: '+this.__id);
    if(url) MPSem.create(url, "__setupIFrameContext", [outsidePort.__id, this.parent.__id, this.__id]);
}*/

var windowInstance;

/*
* @id WindowGetInstance
*/
function getInstance(id){
    if(id){
        var instance = Window.prototype.windows.find((w) => {return w.__id === id});
        if(!instance){
          instance = new Window(id);
        }
        return instance;
    } else {
        if (!windowInstance){
          windowInstance = new Window(id);
        }
        return windowInstance;
    }
}

/*
function setInstance(id){
    var w = Window.prototype.windows.find((w) => { return w.__id === id });
    if(w !== undefined) windowInstance = w;
}*/

/* 
* @id WindowGetParent
*/
function getParent(id, parentId){
    var curr = getInstance(id);
    if(curr.parent){
        return curr.parent;
    }else{
       var parent = new Window(parentId);
       curr.parent = parent;
       return parent;
    }
}

const WindowInfo = { Window: Window, getInstance: getInstance, getParent: getParent };

/*
* @id Event
*/
function Event(type, eventInit){
    this.type = type.toString();
    this.timeStamp = (new Date()).getTime();
    //console.log('creating event with timestamp '+timeStamp);
    this.bubbles = false;
    this.cancelable = false;
    this.composed = false;
    this.path = [];
    this.target = null;
    this.relatedTarget = null;
    this.currentTarget = null;
    this.eventPhase = 0;
    if(eventInit){
        var bubbles = eventInit.bubbles;
        if(bubbles)
            this.bubbles = bubbles;
        var cancelable = eventInit.cancelable;
        if(cancelable)
            this.cancelable = cancelable;
        var composed = eventInit.composed;
        if(composed)
            this.composed = composed;
    }
    this.initialized = true;
    this._stopPropagation = false;
    this._stopImmediatePropagation = false;
    this._canceled = false;
    this.inPassiveListener = false;
    this._isTrusted = false;
    this.legacyPreActBeh = false;
    this.dispatch = false;
    //this._defaultPrevented = false;
    this.touchTargets = [];

};

const NONE = 0;
const CAPTURING_PHASE = 1;
const AT_TARGET = 2;
const BUBBLING_PHASE = 3;

Object.defineProperty(WindowInfo.Window.prototype, 'Event', {
    get: function(){
        return Event;
    }
});

Object.defineProperty(Event.prototype, 'isTrusted', {
    get: function(){
        return this._isTrusted;
    },
    set: function(trusted){
        this._isTrusted = trusted;
    }
});

/*Event.prototype.getIsTrusted = function(){
    return this._isTrusted;
}*/

/*
* @id EventStopPropagation
*/
Event.prototype.stopPropagation = function (){
    //The stopPropagation() method, when invoked, must set the context object’s stop propagation flag.
    this._stopPropagation = true;
};

/*
Event.prototype.stopImmediatePropagation = function (){
    //The stopImmediatePropagation() method, when invoked, must set the context object’s stop propagation flag and the context object’s stop immediate propagation flag.  
    this._stopImmediatePropagation = true;
    this._stopPropagation = true;
};*/

Object.defineProperty(Event.prototype, 'canceled', {
    //The returnValue attribute’s getter, when invoked, must return false if context object’s canceled flag is set, and true otherwise.

    /*
    * @id canceledGet
    */
    get: function(){
        return this._canceled;
    },
    //The returnValue attribute’s setter, when invoked, must set the canceled flag with the context object if the given value is false, and do nothing otherwise.
    /*
    * @id canceledSet
    */
    set: function(value){
        if(this.cancelable && !this.inPassiveListener){
            this._canceled = value;
        }
    }
});

/*Object.defineProperty(Event.prototype, 'cancelBubble', {
    //CancelBubble is outdated, returns value of stopPropagation
    
    get: function(){
        return this._stopPropagation;
    },
    set: function(value){
        if(!this._stopPropagation){
            this._stopPropagation = value;
        }
    }
});*/

/*Object.defineProperty(Event.prototype, 'defaultPrevented', {
    //The defaultPrevented attribute’s getter, when invoked, must return true if the context object’s canceled flag is set, and false otherwise.
   
    get: function(){
        return this.canceled;
    },
   
    set: function(value){
        this.canceled = value;
    }
});*/

/*Object.defineProperty(Event.prototype, 'returnValue', {
    //The returnValue attribute’s getter, when invoked, must return false if context object’s canceled flag is set, and true otherwise.
    
    get: function(){
        return !this.canceled;
    },
    //The returnValue attribute’s setter, when invoked, must set the canceled flag with the context object if the given value is false, and do nothing otherwise.
    
    set: function(value){
        if(!value){
            this.canceled = true;
        }
    }
});*/

/*Object.defineProperty(Event.prototype, 'srcElement', {
    //The srcElement attribute’s getter, when invoked, must return the context object’s target.
    
    get: function(){
        return this.target;
    }
});*/

/*
* @id EventInitEvent
*/
Event.prototype.initEvent = function(type, bubbles, cancelable){
    //1. If the context object’s dispatch flag is set, then return.
    if(this.dispatch){
        return;
    }
    //2. Initialize the context object with type, bubbles, and cancelable.
    this.type = type.toString();
    this.bubbles = bubbles || false;
    this.cancelable = cancelable || false;
    this.defaultPrevented = false;
    this.initialized = true;
    this._stopPropagation = false;
    this._stopImmediatePropagation = false;
};

/*
* @id EventGetTheLastInPath
*/
Event.prototype.getTheLastInPath = function(){
    return this.path[0];
};

/*
* @id EventPreventDefault
*/
Event.prototype.preventDefault = function(){
    this.canceled = true;
};


/*
* @id MessageEvent
*/
function MessageEvent(type){
    var type = type !== undefined ? type : "message";
    Event.call(this, type);
    this.data        = "";
    this.ports       = [];
    this.origin      = "";
    this.lastEventId = "";
    this.source      = null;
    MessageEvent_construct(this);
};

MessageEvent.prototype = Object.create(Event.prototype);

/*MessageEvent.prototype.initMessageEvent = function(type, bubbles, cancelable, data, origin, lastEventId, source, ports){
    var args = arguments;
    if(args.length === 0) throw new TypeError("Failed to execute 'initMessageEvent' on 'MessageEvent': 1 argument required, but 0 provided");
    this.type = type;
    this.bubbles = bubbles || false;
    this.cancelable = cancelable || false;
    this.data = data || null;
    this.origin = origin || "";
    this.lastEventId = lastEventId || "";
    this.source = source || null;
    this.ports = ports || [];
}*/

/*Object.defineProperty(WindowInfo.Window.prototype, 'MessageEvent', {
    get: function(){
        return MessageEvent;
    }
});*/

// URL
/*function parse(targetOrigin){
    //console.log('Going to call URL_construct with '+targetOrigin);
    var res = URL_construct(targetOrigin);
    if(res === "SyntaxError") throw new DOMException.DOMException(DOMException.SYNTAX_ERR);
    return res;
}*/

// LOCATION TODO

// DOCUMENT FRAGMENT
/*******************************/
/* INTERFACE DocumentFragment  */
/*******************************/
	
/*
* @id DocumentFragment
*/
var DocumentFragment = function(){
	Node.Node.call(this);
	this.nodeName = '#document-fragment';
	this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
};

DocumentFragment.prototype = Object.create(Node.Node.prototype);

//SHADOW ROOT
/**************************/
/* INTERFACE SHADOW ROOT  */
/**************************/

const ShadowRootMode = {
	OPEN: 'open',
	CLOSED: 'closed'
};

/*
* @id ShadowRoot
*/
var ShadowRoot = function(mode, host){
	DocumentFragment.call(this);
	this.mode = mode;
	this.host = host;
}

ShadowRoot.prototype = Object.create(DocumentFragment.prototype);

// UI EVENT
/**********************/
/* INTERFACE UI EVENT */
/**********************/

/*
* @id UIEvent
*/
var UIEvent = function(type, eventInitDict){
    if(eventInitDict && eventInitDict.view && !(eventInitDict.view instanceof WindowInfo.Window)){
        throw new TypeError();
    }
    Event.call(this, type, eventInitDict);
    this.view = null;
    this.detail = 0;
    if(eventInitDict && eventInitDict.view){
        this.view = eventInitDict.view;
    }
    if(eventInitDict && eventInitDict.detail){
        this.detail = eventInitDict.detail;
    }
};

UIEvent.prototype = Object.create(Event.prototype);

/*Object.defineProperty(WindowInfo.Window.prototype, 'UIEvent', {
    get: function(){
        return UIEvent;
    }
});*/


// MOUSE EVENT
/*************************/
/* INTERFACE MOUSE EVENT */
/*************************/

UIEvent     = { UIEvent: UIEvent };

/*
* @id MouseEvent
*/
var MouseEvent = function(type, eventInitDict){
    UIEvent.UIEvent.call(this, type, eventInitDict);
};

MouseEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

/*Object.defineProperty(WindowInfo.Window.prototype, 'MouseEvent', {
    
    get: function(){
        return MouseEvent;
    }
});*/

// BASE CHARACTER DATA
function initCharacterData(Node){
	
	/**
	 * @id CharacterData
	 */
	var CharacterData = function (data){
	    Node.Node.call(this);
	    this._data = data;
	};

	CharacterData.prototype = Object.create(Node.Node.prototype);

	/*
	CharacterData.prototype.substringData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		return this._data.substring(offset, offset+count);
	};*/

	/*
	CharacterData.prototype.appendData = function(arg){
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this._data = this._data + arg;
	};*/

	/*
	CharacterData.prototype.insertData = function(offset, data){
		if(offset < 0 || offset > this.data.length){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		var fstPart = this._data.substring(0, offset);
		var sndPart = this._data.substring(fstPart.length, this.data.length);
		this._data = fstPart + data + sndPart;
	};*/

	/*
	CharacterData.prototype.deleteData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this.replaceData(offset, count, "");
	};*/

	/*CharacterData.prototype.replaceData = function(offset, count, arg){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		if(offset + count > this.data.length){
			this._data = this.substringData(0, offset) + arg;
		}else{
			this._data = this.substringData(0, offset) + arg + this.substringData(offset+count, this._data.length-1);
		}
	};*/

	/*Object.defineProperty(CharacterData.prototype, 'data', {
	    get: function(){
	    	return this._data;
		},
		
	    set: function(value){
	    	if(this.is_readonly()){
	        	throw new DOMException.DOMException(7);
			}
		//	if(value === null){
		//		this._data = "";
		//	}else{
				this._data = String(value);
		//	}
	    }
	});*/

	/*Object.defineProperty(CharacterData.prototype, 'nodeValue', {
	    get: function(){
	    	return this.data;
		},
	    set: function(value){
	    	this.data = value; 
	    }
	});*/

	/*Object.defineProperty(CharacterData.prototype, 'length', {
	    get: function(){
	    	return this._data.length;
	    }
	});*/

	return {'CharacterData': CharacterData};
};

// BASE TEXT
function initText(Node, CharacterData){

	/**
	 * @id Text
	 */
	function Text(data, document){
		CharacterData.CharacterData.call(this, data);
		this.nodeName = '#text';
		this.nodeType = Node.TEXT_NODE;
		this.ownerDocument = document;
	};

	Text.prototype = Object.create(CharacterData.CharacterData.prototype);

	/*
	Text.prototype.splitText = function(offset){
		if(offset < 0 || offset > this.data.length){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		var fstPart = this.data.substring(0, offset);
		var newTxt = this.ownerDocument.createTextNode(this.data.substring(fstPart.length, this.data.length));
		this._data = fstPart;
		this.parentNode.appendChild(newTxt);
		return newTxt;
	};*/

	return Text;
}

// TEXT
const CharacterData = initCharacterData(Node);
const Text          = initText(Node, CharacterData);

// BASE ATTRIBUTE
/*
* This API works with multiple versions of Node and Text (Core Level 1 and 3)
* @id initAttribute
*/
function initAttribute(Node, Text){

    /**
     * @id Attribute
     */
    var Attribute = function (name, document){
        Node.Node.call(this);
        this.nodeName = name;
        this.name = name;
        this.nodeType = Node.ATTRIBUTE_NODE;
        this._value = "";
        this.ownerDocument = document;
        this.setValue = false;

        this.ownerElement = null;
        this.schemaTypeInfo = null;
        this.isId = false;
        this.specified = true;

        /*Object.defineProperty(this, 'value', {
            get: function(){return this.nodeValue;},
            
            set: function(value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.nodeValue = value;
            }
        });*/

        /*Object.defineProperty(this, 'nodeValue', {
            get: function(){
                if(this.setValue){
                    return this._value;
                }else{
                    var value = "";
                    for(var i = 0; i < this.childNodes.length; i++){
                        var child = this.childNodes.item(i);
                        if(child.nodeType === Node.ENTITY_REFERENCE_NODE){
                            for(var j = 0; j < child.entity.childNodes.length; j++){
                                value += child.entity.childNodes.item(j).nodeValue;
                            }
                        }else{
                            value += child.data;
                        }
                }
                return value;
                }
            },
            set: function (value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.setValue = true;
                this._value = value;
                var text = new Text(value, this.ownerDocument);
                this.appendChild(text);
        }
        });*/

    };
    Attribute.prototype = Object.create(Node.Node.prototype);    

    return {'Attribute': Attribute};
}

// ATTRIBUTE
const Attribute = initAttribute(Node, Text);


// ELEMENT
/**********************/
/* INTERFACE Element  */
/**********************/

/**
 * @id Element
 */
var Element = function (tagName, document){
    Node.call(this);
    this.tagName = tagName;
    this.nodeName = tagName;
    this.nodeType = Node.ELEMENT_NODE;
    this.ownerDocument = document;
    this.defaultAttrs = [];
    this.attributes = null
    this.schemaTypeInfo = null;
    //this.shadowRoot = null;
};

Element.prototype = Object.create(Node.Node.prototype);

/*
function elementsByTagName (node, name, acc){
    var childNodes = node.childNodes;
    if(node.tagName === name || (name === "*" && node.nodeType === Node.ELEMENT_NODE)){
        acc.push(node);
    }
    if(childNodes !== null){
        for(var i = 0; i < childNodes.length; i++){
            elementsByTagName(childNodes.item(i), name, acc);
        }
    }
    return acc;
};*/

//ERROR EVENT
/*
* @id ErrorEvent
*/
function ErrorEvent(type){
    var type = type !== undefined ? type : "error";
    Event.call(this, type);
    this.message        = "";
    this.linenno        = -1;
    this.colno          = -1;
    this.bubbles        = false;
    this.cancelable     = true;
    this.filename       = location.href;
    this.error          = null;
    this.lineno         = -1;
    this.type           = type;
    this.initialized    = true;

    this.NONE = 0;
    this.CAPTURING_PHASE = 1;
    this.AT_TARGET = 2;
    this.BUBBLING_PHASE = 3;
};

ErrorEvent.prototype = Object.create(Event.prototype);

// MESSAGE SERIALISATION
// TODOMP: I believe these 2 functions below are not necessary. The has been shipped flag seems to be used only for scheduling the messages.
// We are handling this at the level of the MP-Semantics
/*
* @id MessagePortTransferSteps
*/
function TransferSteps(value, dataHolder){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Set dataHolder.[[PortMessageQueue]] to value's port message queue.
    // 3. (MP-Semantics) If value is entangled with another port remotePort, then:
        // 3.1. Set remotePort's has been shipped flag to true. TODO: how can we do this?
        // 3.2. Set dataHolder.[[RemotePort]] to remotePort.
    // 4. Otherwise, set dataHolder.[[RemotePort]] to null.
}

/*
* @id MessagePortTransferReceivingSteps
*/
function TransferReceivingSteps(value){
    // 1. Set value's has been shipped flag to true.
    value.__HasBeenShipped = true;
    // 2. (MP-Semantics) Move all the tasks that are to fire message events in dataHolder.[[PortMessageQueue]] to the port message queue of value, 
        // if any, leaving value's port message queue in its initial disabled state, and, if value's relevant global object is a Window, 
        // associating the moved tasks with value's relevant global object's associated Document.
    // 3. (ALSO NOT NECESSARY) If dataHolder.[[RemotePort]] is not null, then entangle dataHolder.[[RemotePort]] and value. 
        // (This will disentangle dataHolder.[[RemotePort]] from the original port that was transferred.)
}

/*
* @id SerializationStructuredSerialize
*/
function StructuredSerialize(message){
    var datacloneerr = new DOMException(DATA_CLONE_ERR);
    var serialiazed = StructuredSerializeInternal(message, false, datacloneerr);
    return serialiazed;
}

/*
* @id SerializationStructuredSerializeWithTransfer
*/
function StructuredSerializeWithTransfer(message, transfer){
    // 1. Let memory be an empty map *)
    var memory = {};
    // 2. For each transferable of transferList: 
    transfer.map(transferable => {
      // 2.1 (ArrayBuffer NOT SUPPORTED) If transferable has neither an [[ArrayBufferData]] internal slot nor a [[Detached]] internal slot, then throw a "DataCloneError" DOMException.
      if(transferable.__Detached === undefined) throw new DOMException(DATA_CLONE_ERR);
      // 2.2 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ... 
      // 2.3  If memory[transferable] exists, then throw a "DataCloneError" DOMException. 
      if(memory[transferable.__id]) throw new DOMException(DATA_CLONE_ERR);
      // 2.4 Set memory[transferable] to { [[Type]]: an uninitialized value }.
      memory[transferable.__id] = {'Type': undefined};
    });
    // 3. Let serialized be ? StructuredSerializeInternal(value, false, memory).
    var datacloneerr = new DOMException(DATA_CLONE_ERR);
    var serialiazed = StructuredSerializeInternal(message, false, datacloneerr);
    // 4. Let transferDataHolders be a new empty List.
    // 5. For each transferable of transferList:
    transfer.map(transferable => {
        // 5.1 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot and ! IsDetachedBuffer(transferable) is true, then throw a "DataCloneError" DOMException.
        // 5.2 If transferable has a [[Detached]] internal slot and transferable.[[Detached]] is true, then throw a "DataCloneError" DOMException.
        if (transferable.__Detached == true) throw new DOMException(DATA_CLONE_ERR);
        // 5.3 (MP-Semantics) Let dataHolder be memory[transferable].
        // 5.4 (NOT SUPPORTED) If transferable has an [[ArrayBufferData]] internal slot, then:
        // 5.5 Otherwise:
        // Note: steps 5.5.1 - 5.5.4 do not make sense as we handle port transfer in the semantics
        // 5.5.1 Assert: transferable is a platform object that is a transferable object.
        // 5.5.2 Let interfaceName be the identifier of the primary interface of transferable.
        // 5.5.3 Set dataHolder.[[Type]] to interfaceName.
        // 5.5.4 Perform the appropriate transfer steps for the interface identified by interfaceName, given transferable and dataHolder.
        // 5.5.5 Set transferable.[[Detached]] to true.
        transferable.__Detached = true;
    
    });
    // Note: the StructuredSerializeInternal function is a JSIL function, found in ml/JS2JSIL/MP_runtime/Serialization.jsil
    // Note: we skip the steps (4-5) related to transferDataHolders, as we are handling this in the MP semantics.
    return serialiazed;
}

/*
* @id SerializationStructuredDeserializeWithTransfer
*/
function StructuredDeserializeWithTransfer(message, transferIds, MessagePort){
    // 1. Let memory be an empty map.
    // This step is performed during StructuredDeserialize (at the JSIL level)
    // 2. Let transferredValues be a new empty List.
    var transferredValues = [];
    // 3. For each transferDataHolder of serializeWithTransferResult.[[TransferDataHolders]]:
    transferIds.map ((transferId) => {
        // 3.1 Let value be an uninitialized value.
        var value;
        // 3.2 (NOT SUPPORTED) If transferDataHolder.[[Type]] is "ArrayBuffer", then set value to a new ArrayBuffer object in ...
        // 3.3 Otherwise:
           // 3.3.1 (NOT SUPPORTED) Let interfaceName be transferDataHolder.[[Type]].
           // 3.3.2 (NOT SUPPORTED) If the interface identified by interfaceName is not exposed in targetRealm, then throw a "DataCloneError" DOMException.
           // 3.3.3 Set value to a new instance of the interface identified by interfaceName, created in targetRealm.
           value = new MessagePort(transferId);
           // 3.3.4 Perform the appropriate transfer-receiving steps for the interface identified by interfaceName given transferDataHolder and value.
           TransferReceivingSteps(value);
           // 3.4 (NOT SUPPORTED) Set memory[transferDataHolder] to value.
        // 3.5 Append value to transferredValues.
        transferredValues.push(value);
    });
    // 4. Let deserialized be ? StructuredDeserialize(serializeWithTransferResult.[[Serialized]], targetRealm, memory).
    var deserialized = StructuredDeserialize(message);
    // 5. Return { [[Deserialized]]: deserialized, [[TransferredValues]]: transferredValues }.
    return { 'Deserialized': deserialized, 'TransferredValues': transferredValues };
}

// MESSAGE PORT

//const URL          = {parse: parse};
//const location     = {};

var MPSem = getMPSemanticsInstance();

const Serialization     = { StructuredSerializeWithTransfer: StructuredSerializeWithTransfer, StructuredDeserializeWithTransfer: StructuredDeserializeWithTransfer };

initEventTarget(Node, ShadowRoot, ShadowRootMode, DocumentFragment, MouseEvent, Element, Text, Window, Event, ErrorEvent);

/*
* MessagePort constructor should not be accessible
*/
function MessagePort(){
    throw new TypeError("Illegal constructor");
}

/*
* @id MessagePort
*/
function PublicMessagePort(id){
    var MPSem = getMPSemanticsInstance();
    EventTarget.call(this);
    this.__id                = id ? id : MPSem.newPort();
    this.__Enabled           = false;
    this.__Detached          = false;
    this.__PrimaryInterface  = 'MessagePort'; //TODO CHECK
    this.__HasBeenShipped    = false;
    this.__onmessagehandler  = null;
    MessagePort.prototype.ports.push(this);
}

MessagePort.prototype = Object.create(EventTarget.prototype);

MessagePort.prototype.ports = [];

PublicMessagePort.prototype = MessagePort.prototype;

Object.defineProperty(MessagePort.prototype, 'onmessage', {
    /*
    * @id MessagePortOnMessage
    */
    set: function(f){
        if(typeof f === 'function' || typeof f === 'object'){
          this.__Enabled = true;
          if(this.__onmessagehandler) this.removeEventListener('message', this.__onmessagehandler);
          this.addEventListener('message', f);
          this.__onmessagehandler = f;
        }else{
            this.__onmessagehandler = null;
        }
    },
    get: function(){
        return this.__onmessagehandler;
    }
});

Object.defineProperty(MessagePort.prototype, 'onmessageerror', {
    /*
    * @id MessagePortOnMessageError
    */
    set: function(f){
        this.addEventListener('messageerror', f);
    }
});

/*
* @id MessagePortPostMessage
*/
MessagePort.prototype.postMessage = function(message, options){
    if (this.__Detached === true) return;
    if(arguments.length === 0) throw new TypeError("Failed to execute 'postMessage' on 'Messageport': 1 argument required, but only 0 present.")
    var MPSem = getMPSemanticsInstance();
    MPSem.beginAtomic();
    // 1. Let targetPort be the port with which this MessagePort is entangled, if any; otherwise let it be null.
    var targetPort = MPSem.getPairedPort(this.__id);
    //console.log('Sending message from port '+this.__id+' to port '+targetPort);
    // 2. Run the message port post message steps providing targetPort, message and options.
    postMessageSteps(this, targetPort, message, options);
    MPSem.endAtomic();
}  

//TODOMP: think of a better solution for this. 

/*
* @id WindowPostMessageWithOptions
*/
WindowInfo.Window.prototype.postMessage = function(message, options, transfer){
    if(arguments.length === 0) throw new TypeError("Failed to execute 'postMessage' on 'Messageport': 1 argument required, but only 0 present.")
    var MPSem = getMPSemanticsInstance();
    MPSem.beginAtomic();
    // 1. Let targetWindow be this Window object.
    var targetWindow = this;
    options = (options === undefined) ? {} : (typeof options === "string" ? {targetOrigin: options} : options);
    options['targetOrigin'] = (options.targetOrigin === undefined) ? "/" : options.targetOrigin;
    options['transfer'] = options.transfer === undefined ? (transfer === undefined ? [] : transfer) : options.transfer;
    var originWindow = WindowInfo.getInstance();
    console.log('this.port: '+this.port);
    if (this.__port){
        var targetPort = MPSem.getPairedPort(this.__port.__id);
        console.log('Sending message from port '+this.__id+' to port '+targetPort);
        // 2. Run the message port post message steps providing targetPort, message and options.
        windowPostMessageSteps(originWindow, targetWindow, message, options, targetPort);
    } 
    // 2. Run the window post message steps providing targetWindow, message, and options.
    else {
        windowPostMessageSteps(originWindow, targetWindow, message, options);
    } 
    MPSem.endAtomic();
}

/*
* @id MessagePortStart
*/
MessagePort.prototype.start = function(){
    // 1. Enables this MessagePort object's port message queue, if it is not already enabled.
    this.__Enabled = true;
}

/*
* @id MessagePortClose
*/
MessagePort.prototype.close = function(){
    // 1. Set this MessagePort object's [[Detached]] internal slot value to true.
    this.__Detached = true;
    // 2. If this MessagePort object is entangled, disentangle it.
    var MPSem = getMPSemanticsInstance();
    MPSem.unpairPort(this.__id);
}

MessagePort.prototype.toString = function(){
    return "[object MessagePort]";
}

/*
* @id postMessageSteps
*/
function postMessageSteps(origPort, targetPort, message, options){
    // 1. Let transfer be options["transfer"].
    var transfer = options ? ((options instanceof Array) ? options : (options['transfer'] ? options['transfer'] : [])) : [];
    var transferIds = transfer.map(function(p) { return p.__id });
    // 2. If transfer contains this MessagePort, then throw a "DataCloneError" DOMException.
    if(transfer && transferIds.indexOf(origPort.__id) !== -1) throw new DOMException(DATA_CLONE_ERR);
    // 3. Let doomed be false.
    var doomed = false;
    // 4. If targetPort is not null and transfer contains targetPort, then set doomed to true
    // and optionally report to a developer console that the target port was posted to itself, causing the communication channel to be lost.
    if(targetPort !== null && transfer && transferIds.indexOf(targetPort) !== -1){
        doomed = true;
        console.log('Target port was posted to itself which causes the communication channel to be lost.')
    }
    // 5. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = Serialization.StructuredSerializeWithTransfer(message, transfer);
    // 6. If targetPort is null, or if doomed is true, then return.
    if(targetPort === null || doomed === true) return;
    // 7. Add a task that runs the following steps to the port message queue of targetPort:
    // Note: This call to 'send' will enable our MessagePassing semantics, which will then  trigger the processMessageSteps function.
    var includeUserActivation = (options && typeof options === "object") ? options['includeUserActivation'] : undefined;
    var MPSem = getMPSemanticsInstance();
    MPSem.send([serializeWithTransferResult, targetPort, false, undefined, undefined, undefined, includeUserActivation, false],transferIds, origPort.__id, targetPort, "ProcessMessage");
}

var scopeMP = {};

/*
* @JSIL
* @id processMessageSteps
*/
function processMessageSteps(global, message, targetPortId, isWindow, originWindowId, targetOrigin, targetWindowId, includeUserActivation, retry, transferIds){
    // Initial setup
    //debugger;
    var scopeMP = global.__scopeMP;
    transferIds = scopeMP.JS2JSILList.JSILListToArray(transferIds);
    if(isWindow){
        var targetWindow = scopeMP.WindowInfo.Window.prototype.windows.find(w => {return w.__id === targetWindowId});
        scopeMP.origin = global.origin;
        (scopeMP.windowProcessMessageSteps(scopeMP, message, transferIds, originWindowId, targetWindow, targetOrigin, false))();
    } else {
        scopeMP.messagePortProcessMessageSteps(scopeMP, message, targetPortId, transferIds, includeUserActivation, retry);
    }
}

/*
* @id MessagePortProcessMessageSteps
*/
function messagePortProcessMessageSteps(scopeMP, message, targetPortId, transferIds, includeUserActivation, retry){
    // 1. Let finalTargetPort be the MessagePort in whose port message queue the task now finds itself.
    var finalTargetPort = scopeMP.ArrayUtils.find(scopeMP.MessagePort.prototype.ports, function(p){return p.__id === targetPortId});
    // 2. (NOT SUPPORTED) Let targetRealm be finalTargetPort's relevant Realm.
    // As we model the message queue via MP Semantics, we add this step here to make sure the target port is enabled
    //console.log('Found target port: '+finalTargetPort.__Enabled);
    if (finalTargetPort && !finalTargetPort.__Enabled && !retry){
        var origPortId = scopeMP.MPSem.getPairedPort(targetPortId);
        scopeMP.MPSem.send([message, targetPortId, false, undefined, undefined, undefined, includeUserActivation, true],transferIds, origPortId, targetPortId, "ProcessMessage");
    }
    if(!finalTargetPort || !finalTargetPort.__Enabled) return;
    // 3. Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
    var deserializeRecord = scopeMP.Serialization.StructuredDeserializeWithTransfer(message, transferIds, scopeMP.MessagePort);
    // 4. Let messageClone be deserializeRecord.[[Deserialized]].
    var messageClone = deserializeRecord.Deserialized;
    // 5. Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
    var newPorts = Object.freeze(deserializeRecord.TransferredValues);
    newPorts.forEach(np => {
        scopeMP.MessagePort.prototype.ports = scopeMP.MessagePort.prototype.ports.filter(p => {return p.__id !== np.__id});
        scopeMP.MessagePort.prototype.ports.push(np);
    });
    // 6. Fire an event named message at finalTargetPort, using MessageEvent, with the data attribute initialized to messageClone and the ports attribute initialized to newPorts.
    var event = new scopeMP.MessageEvent();
    event.data = messageClone; 
    event.ports = newPorts;
    // Extra step to handle 2 concrete tests from official test suite. TODOMP: check if this is specified in standard
    if(includeUserActivation === true){
        event.userActivation = { isActive: false, hasBeenActive: false };
    } else {
        event.userActivation = null;
    }
    if(typeof messageClone === 'object' && messageClone !== null && messageClone['ERROR_MSG']){
      console.log('GOT Error when processing message!!!');
      //var e = new scopeMP.Event.Event('error');
      console.log('event.type? '+messageClone['ERROR_MSG'].type)
      console.log('Final target port: '+finalTargetPort.__id);
      console.log('listeners? '+finalTargetPort.listeners);
      var ev = messageClone['ERROR_MSG'];
      ev = ErrEvent_construct(ev);
      finalTargetPort.dispatchEvent(ev);
      console.log('error event dispatched!');
    } else {
      finalTargetPort.dispatchEvent(event, undefined, true);
    }
}

/*
* @id WindowPostMessageSteps
*/ 
function windowPostMessageSteps(originWindow, targetWindow, message, options, targetPort){
    // 1. (NOT SUPPORTED) Let targetRealm be targetWindow's Realm.
    // 2. (NOT SUPPORTED) Let incumbentSettings be the incumbent settings object.
    // 3. Let targetOrigin be options["targetOrigin"].
    var targetOrigin = options['targetOrigin'];
    // 4. If targetOrigin is a single U+002F SOLIDUS character (/), then set targetOrigin to incumbentSettings's origin.
    if(targetOrigin === '/'){
      targetOrigin = location.origin;
    }else{
        // 5. Otherwise, if targetOrigin is not a single U+002A ASTERISK character (*), then:
        if(targetOrigin !== '*' && targetOrigin !== "/"){
            // 5.1 Let parsedURL be the result of running the URL parser on targetOrigin
            //var parsedURL = URL.parse(targetOrigin);
            // 5.2 If parsedURL is failure, then throw a "SyntaxError" DOMException.
            // 5.3 Set targetOrigin to parsedURL's origin.
            //targetOrigin = parsedURL;
          }
    }
    // 6. Let transfer be options["transfer"].
    var transfer = (options['transfer'] !== undefined) ? options['transfer'] : [];
    var transferIds = transfer.map(function(p) {return p.__id});
    // 7. Let serializeWithTransferResult be StructuredSerializeWithTransfer(message, transfer). Rethrow any exceptions.
    var serializeWithTransferResult = Serialization.StructuredSerializeWithTransfer(message, transfer);
    // 8. Queue a global task on the posted message task source given targetWindow to run the following steps:
    // If window has port associated, the message may be sent to another window
    var currWindow = WindowInfo.getInstance();
    if(originWindow.__port && targetPort) {
      var includeUserActivation = (options && typeof options === "object") ? options['includeUserActivation'] : undefined;
      var MPSem = getMPSemanticsInstance();
      MPSem.send([serializeWithTransferResult, targetPort, true, originWindow.__id, targetOrigin, targetWindow.__id, includeUserActivation, false],transferIds, originWindow.__port.__id, targetPort, "ProcessMessage");
    }
    // Otherwise, message is processed locally
    else {
        console.log('processing message locally');
        var pMessageSteps = windowProcessMessageSteps(scopeMP, serializeWithTransferResult, transferIds, currWindow.__id, targetWindow, targetOrigin, true);
        __ES__schedule(pMessageSteps);
    }
}

/*
* @id windowProcessMessageSteps
*/
function windowProcessMessageSteps(scopeMP, serializeWithTransferResult, transferIds, originWindowId, targetWindow, targetOrigin, sameWindow){
    return function(){
        //transferIds = scopeMP.JS2JSILList.JSILListToArray(transferIds);
      // 8.1 If the targetOrigin argument is not a single literal U+002A ASTERISK character (*) and targetWindow's associated Document's origin is not same origin with targetOrigin, then return.
      if((targetOrigin !== "*") && (targetOrigin !== scopeMP.location.origin)) return; 
      // 8.2 Let origin be the serialization of incumbentSettings's origin.
      var origin = scopeMP.location.origin;
      // 8.3 Let source be the WindowProxy object corresponding to incumbentSettings's global object (a Window object).
      var source = scopeMP.WindowInfo.Window.prototype.windows.find(w => { return w.__id === originWindowId })
      //if (!source) source = new scopeMP.WindowInfo.Window(originWindowId);
      // TODOMP: insert window created
      // 8.4 Let deserializeRecord be StructuredDeserializeWithTransfer(serializeWithTransferResult, targetRealm).
      var deserializeRecord = scopeMP.Serialization.StructuredDeserializeWithTransfer(serializeWithTransferResult, transferIds, scopeMP.MessagePort);
      // 8.5 Let messageClone be deserializeRecord.[[Deserialized]].
      var messageClone = deserializeRecord.Deserialized;
      //console.log('windowProcessMessageSteps, Obtained message '+messageClone);
      // 8.6 Let newPorts be a new frozen array consisting of all MessagePort objects in deserializeRecord.[[TransferredValues]], if any, maintaining their relative order.
      var newPorts = deserializeRecord.TransferredValues;
      // 8.7 Fire an event named message at targetWindow, using MessageEvent, 
      // with the origin attribute initialized to origin, the source attribute initialized to source, 
      // the data attribute initialized to messageClone, and the ports attribute initialized to newPorts.
      var event = new scopeMP.MessageEvent();
      event.source = source;
      event.data = messageClone; 
      event.ports = newPorts;
      if (sameWindow === true) event.origin = origin;
      else event.origin = origin;
      if(targetWindow){
        targetWindow.dispatchEvent(event, undefined, true);  
      } else {
          console.log('windowProcessMessageSteps, TARGET WINDOW NOT FOUND')
      //  var finalTargetPort = scopeMP.ArrayUtils.find(scopeMP.MessagePort.prototype.ports, function(p){return p.__id === targetPortId});
      //  console.log('Dispatching event to window of id '+finalTargetPort.targetWindow.__id+', Listeners: '+finalTargetPort.targetWindow.listeners);
      //  if(finalTargetPort) finalTargetPort.targetWindow.dispatchEvent(event, undefined, true);
      }
  }
}

const __location = {};
var dummy_protocol = "https:";
var dummy_host     = "github.com";
var dummy_origin   = "https://github.com";
var dummy_href     = "";
var dummy_hash     = "";
var dummy_pathname = "";
var dummy_port     = "";

Object.defineProperty(__location, "protocol", {
    get: function(){
        return dummy_protocol;
    },
    set: function(){

    }
});

Object.defineProperty(__location, "host", {
    get: function(){
        return dummy_host;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "origin", {
    get: function(){
        return dummy_origin;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "href", {
    get: function(){
        return dummy_href;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "hash", {
    get: function(){
        return dummy_hash;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "pathname", {
    get: function(){
        return dummy_pathname;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "hostname", {
    get: function(){
        return dummy_host;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "port", {
    get: function(){
        return dummy_port;
    },
    set: function(){
        
    }
});

Object.defineProperty(__location, "search", {
    get: function(){
        return "";
    },
    set: function(){
        
    }
});


Object.defineProperty(this, 'location', {
    value: __location,
    writable: true,
    extensible: true,
    configurable: true
  });

scopeMP.MessagePort                    = PublicMessagePort;
scopeMP.Event                          = Event;
scopeMP.MessageEvent                   = MessageEvent;
scopeMP.JS2JSILList                    = JS2JSILList;
scopeMP.ArrayUtils                     = ArrayUtils;
scopeMP.Serialization                  = Serialization;
scopeMP.WindowInfo                     = WindowInfo;
scopeMP.location                       = location
scopeMP.windowProcessMessageSteps      = windowProcessMessageSteps;
scopeMP.messagePortProcessMessageSteps = messagePortProcessMessageSteps;
scopeMP.MPSem                          = MPSem;

JSILSetGlobalObjProp("__scopeMP", scopeMP);

// WORKER GLOBAL SCOPE

/*
* @id WorkerGlobalScope
*/
function WorkerGlobalScope(options, global){
    EventTarget.call(this);
    global.__name = options.name;


    Object.defineProperty(global, 'name', {
        value: global.__name,
        writable: true,
        configurable: true,
        enumerable: true
        /*get: function(){
            return global.__name;
        },
        set: function(newName){
            global.__name = newName;
        }*/
    });

    Object.defineProperty(this, 'name', {
        value: global.__name,
        writable: true,
        configurable: true,
        enumerable: true
        /*get: function(){
            return global.__name;
        },
        set: function(newName){
            global.__name = newName;
        }*/
    });

    /*
    * @id replicatePropInScope
    */
    function replicatePropInScope(xsc, prop){
        function getter(){
            return global[prop];
        }
        function setter(v){
            global[prop] = v;
        }
        var desc = Object.getOwnPropertyDescriptor(global, prop);
        if(desc.get && !desc.set){
            Object.defineProperty(xsc, prop, {
                get: getter
            });
        } else if(desc.get && desc.set){
            Object.defineProperty(xsc, prop, {
                get: getter,
                set: setter
            });
        }
    }

    //Object.defineProperty(global, 'location', {});
    /*Object.defineProperty(global, 'location', {
        get: function(){
            return {
                protocol: __location.protocol,
                host: __location.host,
                origin: __location.origin,
                href: options.href,
                pathname: options.pathname,
                hash: options.hash,
                search: options.search
            };
        }
    });*/
    Object.defineProperty(global, 'close', {
        get: function(){
            console.log('Close called, mpsem? '+global.MPSemantics);
            return function(){
                __ES__schedule(global.MPSemantics.getMPSemanticsInstance().terminate);
            }
        }
    });

    Object.defineProperty(this, 'EventTarget', {
        get: function(){
            return EventTarget;
        }
    });
    Object.defineProperty(this, 'CustomEvent', {});
    Object.defineProperty(this, 'DOMException', {
        get: function(){
            return DOMException;
        }
    });
    /*Object.defineProperty(import.meta, 'url', {
        get: function(){
            return options.url;
        }/*,
        set: function(f){
            global.onconnect = f;
        }*/
    //});

    console.log('Goinng to define MessageChannel in scope!');

    replicatePropInScope(this, 'MessageChannel');
    replicatePropInScope(this, 'Worker');
    //replicatePropInScope(this, 'SharedWorker');
    replicatePropInScope(this, 'WorkerGlobalScope');
    //replicatePropInScope(this, 'importScripts');
    //replicatePropInScope(this, 'navigator');
    //replicatePropInScope(this, 'btoa');
    //replicatePropInScope(this, 'atob');
    //replicatePropInScope(this, 'location');
    replicatePropInScope(this, 'close');
    //replicatePropInScope(this, 'XMLHttpRequest');
    //replicatePropInScope(this, 'WebSocket');
    //replicatePropInScope(this, 'EventSource');
    replicatePropInScope(this, 'MessagePort');
    replicatePropInScope(this, 'MessageEvent');
    replicatePropInScope(this, 'Event');
    replicatePropInScope(this, 'ErrorEvent');
    //replicatePropInScope(this, 'name');


    this.setTimeout = global.setTimeout;
    this.clearTimeout = global.clearTimeout;
    this.setInterval = global.setInterval;
    this.clearInterval = global.clearInterval;

}

// TODO: this interface has a lot more than this.

WorkerGlobalScope.prototype = Object.create(EventTarget.prototype);

// DEDICATED WORKER GLOBAL SCOPE
/*
* @id DedicatedWorkerGlobalScope
*/
function DedicatedWorkerGlobalScope (global, options) {

    WorkerGlobalScope.call(this, options, global);

    var scope = this;

    Object.defineProperty(global, 'self', {
        /*
        * @id DedicatedWorkerGlobalSelf
        */
        get: function(){
            return scope;
        },
        set: function(v){
            console.log('self object readonly');
        }
    });

    Object.defineProperty(scope, 'self', {
        /*
        * @id DedicatedWorkerScopeSelf
        */
        get: function(){
            return global.self;
        }
    });
    Object.defineProperty(global, 'onmessage', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessage
        */
        set: function(f){
            if(typeof f === 'function' || typeof f === 'object') {
              scope.__port.__Enabled = true;
              if(scope.__port.__onmessagehandler) scope.__port.removeEventListener('message', scope.__port.__onmessagehandler);
              scope.__port.__onmessagehandler = f;
              scope.__port.addEventListener('message', f);
              //TODOMP: check what should happen here
              scope.addEventListener('message', f);
            }
        },
        get: function(){
            return scope.__port.__onmessagehandler ? scope.__port.__onmessagehandler : null;
        }
    });
    Object.defineProperty(scope, 'onmessage', {
        /*
        * @id DedicatedWorkerScopeOnMessage
        */
        set: function(f){
            global.onmessage = f;
        },
        get: function(){
            return global.onmessage
        }
    });
    Object.defineProperty(global, 'onerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnError
        */
        set: function(f){
          if(scope.__onerrorhandler){
            scope.removeEventListener('error', scope.__onerrorhandler);
          }
          scope.__onerrorhandler = f;
          scope.addEventListener('error', f);
        },
        get: function(){
          return scope.__onerrorhandler;
        }
    });
    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id DedicatedWorkerGlobalScopeAddEventListener
        */
        get: function(){
          return scope.addEventListener.bind(scope);
        }
    });
    Object.defineProperty(global, 'removeEventListener', {
        /*
        * @id DedicatedWorkerGlobalScopeRemoveEventListener
        */
        get: function(f){
            return scope.removeEventListener.bind(scope);
        }
    });
    Object.defineProperty(global, 'dispatchEvent', {
        /*
        * @id DedicatedWorkerGlobalScopeDispatchEvent
        */
        get: function(f){
            return scope.dispatchEvent;
        }
    });

    Object.defineProperty(global, 'onmessageerror', {
        /*
        * @id DedicatedWorkerGlobalScopeOnMessageError
        */
        set: function(f){
            scope.__port.addEventListener('messageerror', f);
        }
    });

    Object.defineProperty(global, 'postMessage', {
        /*
        * @id DedicatedWorkerGlobalScopePostMessage
        */
        get: function(){
            //console.log('Going to postMessage from worker. Do I have port? '+this.__port);
            if(!scope.__postMessage){
                var port = scope.__port;
                function postMessageInternal(){
                    port.postMessage.apply(port, arguments);
                }
                return postMessageInternal
            } else{
                return scope.__postMessage;
            }
        },
        set: function(f){
            scope.__postMessage = f;
        }
    });

    Object.defineProperty(scope, 'DedicatedWorkerGlobalScope', {
        get: function(){
            return DedicatedWorkerGlobalScope;
        }
    });

    return scope;
}

DedicatedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.prototype);

// WORKER

//var MPSem = getMPSemanticsInstance();

/*
* @id Worker
*/
function Worker(scriptURL, options){
    EventTarget.call(this);
    console.log("Worker constructor")
    var pathname = scriptURL.substring(scriptURL.indexOf('/'), scriptURL.length);
    if(Worker.prototype.creating === true) throw new RangeError("Workers cannot be created recursively");
    Worker.prototype.creating = true;
    if(options && (options.type === '' ||  options.type === 'unknown')) throw new TypeError("Invalid type for worker");
    // 1. The user agent may throw a "SecurityError" DOMException if the request violates a policy decision.
    // 2. Let outside settings be the current settings object.
    var outsideSettings = null;
    // 3. Parse the scriptURL argument relative to outside settings.
    try{
    //    var url = parseURL(scriptURL, outsideSettings);
    // 4. If this fails, throw a "SyntaxError" DOMException.
    }catch(e){
    //    throw SyntaxError();
    }
    // 5. let worker URL be the resulting URL record.
    //var workerURL = url.urlRecord;
    if(!options) options = {};
    var workerURL = String(scriptURL);
    var lastescape = workerURL.lastIndexOf('/');
    if(lastescape !== -1){
        workerURL = workerURL.substring(lastescape+1, workerURL.length);
    }
    if(workerURL.indexOf('.js') === -1){
        //console.log('substr? '+workerURL.substring(workerURL.length - 3, workerURL.length));
        workerURL = workerURL + ".js";
    }
    var hash = "";
    var hashindex = workerURL.lastIndexOf("#");
    if(hashindex !== -1){
        hash = workerURL.substring(hashindex, workerURL.length);
        workerURL = workerURL.substring(0, hashindex);
        console.log('Worker, found hash: '+hash);
    }
    var search = "";
    var searchindex = workerURL.lastIndexOf("?");
    if(searchindex !== -1){
        search = workerURL.substring(searchindex, workerURL.length);
        workerURL = workerURL.substring(0, searchindex);
        console.log('Worker, found search: '+search);
    }
    options.pathname = pathname;
    options.href = pathname;
    options.hash = hash;
    options.search = search !== "?" ? search : "";
    // 6. Let worker be a new Worker object. 
    var worker = Worker_construct(this);
    // 7. Create a new MessagePort object whose owner is outside settings. Let this be the outside port
    var outsidePort = new PublicMessagePort();
    // 8. Associate the outside port with worker
    worker.__port = outsidePort;
    Worker.prototype.creating = false;
    // 9. Run this step in parallel: Run a worker given worker, worker URL, outside settings, outside port, and options.
    runWorker(worker, workerURL, outsideSettings, outsidePort, options);
    // 10. Return worker.
    return worker;
}

Worker.prototype = Object.create(EventTarget.prototype);

Worker.prototype.creating = false;

Object.defineProperty(Worker.prototype, 'onmessage', {
    /*
    * @id WorkerOnMessage
    */
    set: function(f){
        this.__port.__Enabled = true;
        if(this.__port.__onmessagehandler) this.__port.removeEventListener('message', this.__port.__onmessagehandler);
        this.__port.__onmessagehandler = f;
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(Worker.prototype, 'onerror', {
    /*
    * @id WorkerOnError
    */
    set: function(f){
        this.__port.__Enabled = true;
        this.__port.addEventListener('error', f);
    }
});

Object.defineProperty(Worker.prototype, 'onmessageerror', {
    /*
    * @id WorkerOnMessageError
    */
    set: function(f){
        this.__port.addEventListener('messageerror', f);
    }
});

/*
* @id WorkerPostMessage
*/
Worker.prototype.postMessage = function(){
    this.__port.postMessage.apply(this.__port, arguments);
}

Worker.prototype.terminate = function(){
    var MPSem = getMPSemanticsInstance();
    MPSem.terminate(this.__id);
}

Worker.prototype.addEventListener = function(type, f, options){
    this.__port.__Enabled = true;
    this.__port.addEventListener(type, f, options);
}

/*
* @id runWorker
*/
function runWorker(worker, workerURL, outsideSettings, outsidePort, options){
    var datacloneerr = new DOMException(DATA_CLONE_ERR);
    if(options === undefined) options = {};
    var optionsSerialized = StructuredSerializeInternal(options, false, datacloneerr);
    // 1. Let is shared be true if worker is a SharedWorker object, and false otherwise.
    var isShared = false;
    // 2. Let owner be the relevant owner to add given outside settings.
    var owner; // TODO: how do we set/obtain those settings?
    // 3. Let parent worker global scope be null.
    var parentWorkerGlobalScope = null;
    // 4. If owner is a WorkerGlobalScope object (i.e., we are creating a nested dedicated worker), then set parent worker global scope to owner.
    if(owner instanceof WorkerGlobalScope) parentWorkerGlobalScope = owner;
    // 5. Let agent be the result of obtaining a dedicated/shared worker agent given outside settings and is shared. Run the rest of these steps in that agent.
    // 6. Let realm execution context be the result of creating a new JavaScript realm given agent and the following customizations:
    // For the global object, if is shared is true, create a new SharedWorkerGlobalScope object. Otherwise, create a new DedicatedWorkerGlobalScope object.
    //var workerGlobalObj = isShared ? new SharedWorkerGlobalScope.SharedWorkerGlobalScope(workerURL) : new DedicatedWorkerGlobalScope.DedicatedWorkerGlobalScope(workerURL);
    //worker.__id = MPSemantics.create(workerURL, "__setupConf", [workerURL, outsidePort.__id, isShared]);
    var MPSem = getMPSemanticsInstance();
    worker.__id = MPSem.create(workerURL, "__setupConf", [workerURL, outsidePort.__id, isShared, optionsSerialized]);
}

//SHARED WORKER

//var MPSem = getMPSemanticsInstance();

// MESSAGE CHANNEL

//console.log('Going to import MessageChannel');
/*
* @id MessageChannel
*/
function MessageChannel(){
    // 1. Set this's port 1 to a new MessagePort in this's relevant Realm.
    this.__port1 = new PublicMessagePort();
    // 2. Set this's port 2 to a new MessagePort in this's relevant Realm.
    this.__port2 = new PublicMessagePort();
    // 3. Entangle this's port 1 and this's port 2.
    var MPSem = getMPSemanticsInstance();
    MPSem.unpairPort(this.__port1.__id);
    MPSem.unpairPort(this.__port2.__id);
    MPSem.pairPorts(this.__port1.__id, this.__port2.__id);
}

Object.defineProperty(MessageChannel.prototype, 'port1', {
    /*
    * @id MessageChannelGetPort1
    */
    get: function(){
        // The port1 getter steps are to return this's port 1.
        return this.__port1;
    }
});

Object.defineProperty(MessageChannel.prototype, 'port2', {
    /*
    * @id MessageChannelGetPort2
    */
    get: function(){
        // The port2 getter steps are to return this's port 2.
        return this.__port2;
    }
});

var window = WindowInfo.getInstance();

Object.defineProperty(window, "MessageChannel", {
    get: function(){
        return MessageChannel;
    }
});

/*
* webworker-promise
*/

function Map(kvpairs){
    this.kvpairs = kvpairs ? kvpairs : [];
}

Object.defineProperty(Map.prototype, 'size', {
    get: function(){
        return this.kvpairs.length;
    }
});

/*
* @id MapGet
*/
Map.prototype.get = function(key){
    for(var i = 0; i < this.kvpairs.length; i++){
        var kvp = this.kvpairs[i];
        if(kvp[0] === key) return kvp[1];
    }
}

/*
* @id MapSet
*/
Map.prototype.set = function(k, v){
    var found = false;
    var i = 0;
    while(i < this.kvpairs.length && !found){
        var kvp = this.kvpairs[i];
        if(kvp[0] === k){
            this.kvpairs[i][1] = v;
            found = true;
        } 
        i++;
    }
    if(!found) this.kvpairs.push([k, v]);
}

/*
* @id MapValues
*/
Map.prototype.values = function(){
    var values = [];
    for(var i = 0; i < this.kvpairs.length; i++){
        values.push(this.kvpairs[i][1]);
    }
    return new ArrayIterator(values);
}

/*
* @id MapEntries
*/
Map.prototype.entries = function(){
    return new ArrayIterator(this.kvpairs);
}

/*
* @id MapDelete
*/
Map.prototype.delete = function(k){
    var old = this.kvpairs.slice();
    this.kvpairs = this.kvpairs.filter((kvp) => { return kvp[0] !== k });
    return old.length > this.kvpairs.length;
}

const MESSAGE_RESULT = 0;
const MESSAGE_EVENT = 1;

const RESULT_ERROR = 0;
const RESULT_SUCCESS = 1;

/*
* @id TinyEmitter
*/ 
function TinyEmitter() {
    Object.defineProperty(this, '__listeners', {
      value: {},
      //value: Object.create(null),
      enumerable: false,
      writable: false
    });
  }
  
  /*
  * @id TinyEmitterEmit
  */ 
  TinyEmitter.prototype.emit = function(eventName, xargs) {
    if(!this.__listeners[eventName])
      return this;
  
    for(var i = 0; i < this.__listeners[eventName].length; i++) {
      const handler = this.__listeners[eventName][i];
      //TODOMP: be careful here. Spread operator was in use
      handler.apply(null, xargs);
    }
  
    return this;
  }
  
  /*
  * @id TinyEmitterOnce
  */ 
  TinyEmitter.prototype.once = function(eventName, handler) {
    const once = (xargs) => {
      this.off(eventName, once);
      handler(xargs);
    };
  
    return this.on(eventName, once);
  }
  
  /*
  * @id TinyEmitterOn
  */ 
  TinyEmitter.prototype.on = function(eventName, handler) {
    if(!this.__listeners[eventName])
      this.__listeners[eventName] = [];
  
    this.__listeners[eventName].push(handler);
    return this;
  }
  
  /*
  * @id TinyEmitterOff
  */ 
  TinyEmitter.prototype.off = function(eventName, handler) {
    if(handler)
      this.__listeners[eventName] = this.__listeners[eventName].filter(h => {return h !== handler});
    else
      this.__listeners[eventName] = [];
  
    return this;
  }

/**
* @id WebworkerPromise
*/
function WebworkerPromise(worker){
  TinyEmitter.call(this);
  WebworkerPromise.counter = (WebworkerPromise.counter || 0) + 1; 
  this._messageId = 1;
  this._messages = new Map();

  this._worker = worker;
  this._worker.onmessage = this._onMessage(this);
  //this._id = Math.ceil(Math.random() * 10000000);
  this._id = WebworkerPromise.counter;
} 

WebworkerPromise.prototype = Object.create(TinyEmitter.prototype);


WebworkerPromise.prototype.terminate = function() {
  this._worker.terminate();
}

/**
* @id WebworkerPromiseoIsFree
*/
WebworkerPromise.prototype.isFree = function() {
  return this._messages.size === 0;
}

/**
* @id WebworkerPromisejobsLength
*/
WebworkerPromise.prototype.jobsLength = function() {
  return this._messages.size;
}

/**
* @id WebworkerPromiseExec
*/
WebworkerPromise.prototype.exec = function(operationName, data, transferable, onEvent) {
  console.log('WebworkerPromiseExec');
    data = (data !== undefined) ? data : null;
  transferable = transferable || [];
  var vthis = this;
  return new Promise((res, rej) => {
    const messageId = vthis._messageId++;
    vthis._messages.set(messageId, [res, rej, onEvent]);
    console.log('going to send message')
    vthis._worker.postMessage([messageId, data, operationName], transferable || []);
    console.log('message sent')
  });
}

/**
* @id WebworkerPromisePostMessage
*/
WebworkerPromise.prototype.postMessage = function(data, transferable, onEvent) {
  data = (data !== undefined) ? data : null;
  transferable = transferable || [];
  var vthis = this;
  return new Promise((res, rej) => {
    const messageId = vthis._messageId++;
    vthis._messages.set(messageId, [res, rej, onEvent]);
    vthis._worker.postMessage([messageId, data], transferable || []);
  });
}

/**
* @id WebworkerPromiseEmit
*/
WebworkerPromise.prototype.emit = function() {
  var xargs = Array.prototype.slice.call(arguments);
  var eventName = xargs[0];
  var realArgs = xargs.slice(1);
  this._worker.postMessage({eventName: eventName, args: realArgs});
}

/**
* @id WebworkerPromiseOnMessage
*/
WebworkerPromise.prototype._onMessage = function(vthis) {
  /*
  * @id WebWorkerPromiseOnMessageHandler
  */
  return function(e){
    //if we got usual event, just emit it locally
    if(!Array.isArray(e.data) && e.data.eventName) {
      return TinyEmitter.prototype.emit.call(vthis, e.data.eventName, e.data.args);
    }
    //const dataarr = e.data;
    var type = e.data[0];
    var argsv = e.data;
    argsv.shift(); 

    if(type === MESSAGE_EVENT)
      vthis._onEvent(argsv);
    else if(type === MESSAGE_RESULT)
      vthis._onResult(argsv);
    else
      throw new Error(`Wrong message type '${type}'`);
  }
}

/**
* @id WebworkerPromiseOnResult
*/
WebworkerPromise.prototype._onResult = function(argslist) {
  var messageId = argslist[0]; 
  var success = argslist[1]
  var payload = argslist[2];
  const mdata = this._messages.get(messageId);
  const res = mdata[0];
  const rej = mdata[1];
  this._messages.delete(messageId);

  return success === RESULT_SUCCESS ? res(payload) : rej(payload);
}

/**
* @id WebworkerPromiseOnEvent
*/
WebworkerPromise.prototype._onEvent = function(argslist) {
  var messageId = argslist[0]; 
  var eventName = argslist[1]
  var data = argslist[2];
  const mdata = this._messages.get(messageId);
  const onEvent = mdata[2];
  if(onEvent) {
    onEvent(eventName, data);
  }
}

const DEFAULT_HANDLER = 'main';

/*
* @id RegisterPromiseIsPromise
*/
const isPromise = o => typeof o === 'object' && typeof o.then === 'function' && typeof o.catch === 'function';

/*
* @id RegisterPromise
*/
function RegisterPromise(fn) {
  const handlers = {};
  handlers[DEFAULT_HANDLER] = fn;
  const self = executeJSILProc("JSILGetGlobal");
  const sendPostMessage = self.postMessage//.bind(self);

  function WorkerRegister(){
    TinyEmitter.call(this);
  }  

  WorkerRegister.prototype = Object.create(TinyEmitter.prototype);
    
  /*
  * @id WorkerRegisterEmit
  */
  WorkerRegister.prototype.emit = function() {
    var xargs = Array.prototype.slice.call(arguments);
    var eventName = xargs[0];
    xargs = xargs.slice(1);
    if (xargs.length == 1 && xargs[0] instanceof TransferableResponse) {
      sendPostMessage({eventName: eventName, args: xargs}, xargs[0].transferable);
    } else {
      sendPostMessage({eventName: eventName, args: xargs});
    }
    return this;
  }

  /*
  * @id WorkerRegisterEmitLocally
  */
  WorkerRegister.prototype.emitLocally = function(eventName, xargs) {
    TinyEmitter.prototype.emit.call(this, eventName, xargs);
  }

  /*
  * @id WorkerRegisterOperation
  */
  WorkerRegister.prototype.operation = function(name, handler) {
    handlers[name] = handler;
    return this;
  }

  const server = new WorkerRegister();

  /*
  * @id WorkerRegisterRun
  */
  const run = (xargs) => {
    const messageId = xargs[0];
    const payload = xargs[1]; 
    const handlerName = xargs[2];

    /*
    * @id WorkerRegisterOnSucess
    */
    const onSuccess = (result) => {
      if(result && result instanceof TransferableResponse) {
        sendResult(messageId, RESULT_SUCCESS, result.payload, result.transferable);
      }
      else {
        sendResult(messageId, RESULT_SUCCESS, result);
      }
    };

    /*
    * @id WorkerRegisterOnError
    */
    const onError = (e) => {
      sendResult(messageId, RESULT_ERROR, {
        message: e.message,
        stack: e.stack
      });
    };

    try {
      const result = runFn(messageId, payload, handlerName);
      //console.log('RESULT: '+result);
      if(isPromise(result)) {
        result.then(onSuccess).catch(onError);
      } else {
        onSuccess(result);
      }
    } catch (e) {
      onError(e);
    }
  };

  /*
  * @id WorkerRegisterRunFn
  */
  const runFn = (messageId, payload, handlerName) =>  {
    const handler = handlers[handlerName || DEFAULT_HANDLER];
    if(!handler)
      throw new Error(`Not found handler for this request`);

    return handler(payload, sendEvent(messageId))
    //return handler(payload, sendEvent.bind(null, messageId))
  };

  /*
  * @id WorkerRegisterSendResult
  */
  const sendResult = (messageId, success, payload, transferable) => {
    transferable = transferable || [];
    sendPostMessage([MESSAGE_RESULT, messageId, success, payload], transferable);
  };

  /*
  * @id WorkerRegisterSendEvent
  */
  function sendEvent(messageId){
    return (eventName, payload) => {
    if(!eventName)
      throw new Error('eventName is required');

    if(typeof eventName !== 'string')
      throw new Error('eventName should be string');

    sendPostMessage([MESSAGE_EVENT, messageId, eventName, payload]);
  }};

  //TODOMP: addEventListener was being used here, but according to standard seems correct to use onmessage!
  /*
  * @id WorkerRegisterOnMessage
  */
  self.onmessage = (e) => {
    var data = e.data;
    //console.log('self on message data: '+e.data+', isArray: '+Array.isArray(data));
    if(Array.isArray(data)) {
      run(data);
    } else if(data && data.eventName) {
      console.log('Going to emit locally, eventName: '+data.eventName);
      server.emitLocally(data.eventName, data.args);
    }
  };

  return server;
}

function TransferableResponse (payload, transferable){
  this.payload = payload;
  this.transferable = transferable;
}

/*
* @id WorkerPool
*/
function WorkerPool (opts) {
    this._queue = [];
    this._workers = [];
    this._createWorker = opts.create;
    this._maxThreads = opts.maxThreads;
    this._terminateAfterDelay = opts.terminateAfterDelay;
    this._maxConcurrentPerWorker = opts.maxConcurrentPerWorker;
  
    const worker = this._createWebWorker();
    this._workers.push(worker);
  }
  
  /**
   const pool = WorkerPool.create({
    src: 'my-worker.js',
    // or create: () => new Worker()
    maxThreads: 2
    });
    */
  
  /*
  * @id WorkerPoolCreate
  */
  WorkerPool.create = function (opts) {
    if(!opts.create)
      opts.create = () => new Worker(opts.src);
  
    if(!opts.terminateAfterDelay)
      opts.terminateAfterDelay = 5000;
    if(!opts.maxThreads)
      opts.maxThreads = 2;
    if(!opts.maxConcurrentPerWorker) {
      opts.maxConcurrentPerWorker = 1;
    }
  
    return new WorkerPool(opts);
  }
  
  /*
  * @id WorkerPoolExec
  */
  WorkerPool.prototype.exec = function() {
    var xargs = arguments;
    const worker = this.getFreeWorkerOrCreate();
    if(worker)
      return this._exec(worker, 'exec', xargs);
  
    var vthis = this;
    return new Promise(res => vthis._queue.push(['exec', xargs, res]));
  }
  
  /*
  * @id WorkerPoolPostMessage
  */
  WorkerPool.prototype.postMessage = function() {
    var xargs = arguments;
    const worker = this.getFreeWorkerOrCreate();
    if(worker){
      return this._exec(worker, 'postMessage', xargs);
    }
    var vthis = this;
    return new Promise(res => vthis._queue.push(['postMessage', xargs, res] ));
  }
  
  /*
  * @id WorkerPoolInnerExec
  */
  WorkerPool.prototype._exec = function(worker, method, xargs) {
    var vthis = this;
    return new Promise((res, rej) => {
      worker[method].apply(worker, xargs)
        .then((result) => {
          vthis._onWorkDone(worker);
          res(result);
        })
        .catch(e => {
          vthis._onWorkDone(worker);
          rej(e);
        });
    });
  }
  
  // if there is unresolved jobs, run them
  // or remove unused workers
  
  /*
  * @id WorkerPoolOnWorkDone
  */
  WorkerPool.prototype._onWorkDone = function() {
    if(this._queue.length) {
      var worker;
      while(this._queue.length && (worker = this.getFreeWorkerOrCreate())) {
        var elem = this._queue.shift();
        var method = elem[0];
        var xargs = elem[1];
        var cb = elem[2];
        //let [method, xargs, cb] = this._queue.shift();
        cb(this._exec(worker, method, xargs));
      }
    }
  
    const freeWorkers = this.getAllFreeWorkers();
    if(freeWorkers.length) {
      this._waitAndRemoveWorkers(freeWorkers);
    }
  }
  
  // remove workers if its not using after delay
  /*
  * @id WorkerPoolWaitAndRemoveWorkers
  */
  WorkerPool.prototype._waitAndRemoveWorkers = function(workers) {
    var vthis = this;
    console.log('Calling setTimeout with time '+vthis._terminateAfterDelay);
    /*setTimeout(() => {
      // only one worker should be alive always
      workers = workers.filter(w => { return w.isFree() }).slice(0, vthis._workers.length - 1);
      workers.forEach(worker => vthis._removeWorker(worker));
    }, vthis._terminateAfterDelay);*/
  }
  
  /*
  * @id WorkerPoolRemoveWorker
  */
  WorkerPool.prototype._removeWorker = function(worker) {
    //console.log('Removing worker');
    this._workers = this._workers.filter(w => { return w._id !== worker._id });
    console.log('Going to terminate worker');
    worker.terminate();
  }
  
  /*
  * @id WorkerPoolGetAllFreeWorkers
  */
  WorkerPool.prototype.getAllFreeWorkers = function() {
    var _maxConcurrentPerWorker = this._maxConcurrentPerWorker;
    return this._workers.filter(w => { return w.jobsLength() < _maxConcurrentPerWorker });
  }
  
  /*
  * @id WorkerPoolGetFreeWorkersOrCreate
  */
  WorkerPool.prototype.getFreeWorkerOrCreate = function() {
    var _maxConcurrentPerWorker = this._maxConcurrentPerWorker;
    const freeWorker = this._workers.find(w => { return w.jobsLength() < _maxConcurrentPerWorker });
    if(!freeWorker && this._workers.length < this._maxThreads) {
      const worker = this._createWebWorker();
      this._workers.push(worker);
      return worker;
    }
  
    return freeWorker;
  }
  
  /*
  * @id WorkerPoolCreateWebWorker
  */
  WorkerPool.prototype._createWebWorker = function(){
    return new WebworkerPromise(this._createWorker());
  }

  console.log('DONE');
  __MPSem = undefined;







