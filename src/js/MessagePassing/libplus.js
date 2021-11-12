
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

/**
 * @id LiveNodeList
 */
var LiveNodeList = function (f, lazy){
	this.__compute  = f; 
	this.__computed = null; 
	this.__lazy     = (lazy === true); 
	LiveNodeList.counter = (LiveNodeList.counter || 0) + 1;   
	this.id = LiveNodeList.counter; 
};

LiveNodeList.prototype.computedLiveNodeLists = [];

/**
 * The contents of the live node list depend of the parameter function. 
 * When necessary, the list is updated (by run the function again) and the result
 * is returned. This is useful, for instance, for the getElementsByTagName function.
 */
Object.defineProperty(LiveNodeList.prototype, "contents", {
	/*
	* @id LiveNodeListContentsGet
	*/
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
}); 

Object.defineProperty(LiveNodeList.prototype, "length", {
	/*
	* @id LiveNodeListLength
	*/
	get:	function () { return this.contents.length;  }
}); 


/**
* @id LiveNodeListItem
*/
LiveNodeList.prototype.item = function (index){
	var child = this.contents[index];
	var item;
	if(child){
		item = child;
	}else{
		item = null;
	}
	return item;
};

/**
 * @id LiveNodeListObserve
 */
LiveNodeList.prototype.observe = function () { 
	this.__computed = null; 
	this.computedLiveNodeLists[this.id] = null;
}

/*
* @id LiveNodeListRecompute
*/
LiveNodeList.prototype.recompute = function () { 
	for (var i = 0; i < this.computedLiveNodeLists.length ; i++) { 
		this.computedLiveNodeLists[i] = undefined; 
	}
};


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

Object.defineProperty(EventTarget.prototype, 'onload', {
   set: function(f){
       this.addEventListener('load', f);
       var target = this;
       var event = new scopeEvents.Event('load');
       /* @id triggerLoad */
       function triggerLoadEvent(){
         target.dispatchEvent(event);
       }
       console.log('triggering load event!');
       __ES__schedule(triggerLoadEvent);
   }
});

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
    event.cancelBubble = false;
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
    this.__observers          = []; 
    this.attributes           = null;
    this.namespaceURI         = null;
    this._value               = null;
    this.prefix               = null;
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

Object.defineProperty(Node.prototype, 'nodeValue', {
        /**
        * @id nodeValueGet
        */
        get: function(){return this._value;},

        /**
        * @id nodeValueSet
        */
        set: function (value){
                if(this._value !== null){
                    this._value = value;
                }
        }
});    

/**
* The first child is the first element of the childNodes array
*/
Object.defineProperty(Node.prototype, 'firstChild', {
        /**
        * @id firstChildGet
        */
        get: function(){
            return this.__childNodes.length > 0 ? this.__childNodes[0] : null;
        }
});  

/**
* Analogous to firstChild
*/
Object.defineProperty(Node.prototype, 'lastChild', {
        /**
        * @id lastChildGet
        */
        get: function(){
            return this.__childNodes.length > 0 ? this.__childNodes[this.__childNodes.length - 1] : null;
        }
}); 

/**
* This is the next child in the childNodes array. When not present, returns null.
*/
Object.defineProperty(Node.prototype, 'nextSibling', {
        /**
        * @id nextSiblingGet
        */
        get: function(){
            if(this.parentNode){
                var i = this.searchNode(this, this.parentNode.__childNodes);
                return this.parentNode.__childNodes[i+1] || null;
            }else{
                return null;
            }
        }
});  

/**
* This is the previous child in the childNodes array. When not present, returns null.
*/
Object.defineProperty(Node.prototype, 'previousSibling', {
    /**
    * @id previousSiblingGet
    */
    get: function(){
        if(this.parentNode){
            var i = this.searchNode(this, this.parentNode.__childNodes);
            return this.parentNode.__childNodes[i-1] || null;
        }else{
            return null;
        }
    }
});  

/**
* childNodes returns a live node list of the node children. If necessary, the list is re-computed.
*/
Object.defineProperty(Node.prototype, 'childNodes', {
    /**
     * @id childNodesGet
     */
    get: function(){
        var elem = this; 
        /*
        * @id compute
        */
        var compute = function () { 
            return elem.__childNodes; 
        }
        var nl           = new LiveNodeList.LiveNodeList(compute); 
        this.addObserver(nl); 
        return nl; 
    }
});

/*
* Children is similar to childNodes, but returns only element nodes. Should also be live, but cash tests expect it to be simple array.
*/
Object.defineProperty(Node.prototype, 'children', {
    get: function(){
        return this.__childNodes.filter(function(c){
            return c.nodeType === ELEMENT_NODE;
        }) 
    }
});

Object.defineProperty(Node.prototype, 'firstElementChild', {
    /*
    * @id firstElementChildGet
    */
    get: function(){
        //Returns the last node which is both a child of this ParentNode and is an Element, or null if there is none.
        var children = this.__childNodes.filter( 
            /*
            * @id NodeFindElementNode
            */
            function(c){return c.nodeType === ELEMENT_NODE});
        if(children.length === 0){
            return null;
        }
        return children[children.length -1];
    }
});  

/**
* @id addObserver
*/
Node.prototype.addObserver = function (o) { 
    this.__observers.push(o); 
}

/**
* @id notify
*/
Node.prototype.notify = function () {  
    for (var i = 0; i<this.__observers.length; i++) { 
        this.__observers[i].observe(); 
    }
}


/**
* @id insertBefore
*/
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
};

/**
* @id appendChild
*/
Node.prototype.appendChild = function(newChild){
    return this.insertBefore(newChild, null);
};

/**
* @id replaceChild
*/
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
};

/**
* @id removeChild
*/
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
};

/**
* @id searchNode
*/
Node.prototype.searchNode = function(node, nodeList){
    for(var i = 0; i < nodeList.length; i++){
        if(nodeList[i].id === node.id){
            return i;
        }
    }
    return -1;
};

/**
* @id hasChildNodes
*/
Node.prototype.hasChildNodes = function(){
    return this.__childNodes.length > 0;
};

/**
* @id cloneNode
*/
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
};

/**
* @id is_readonly
*/
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
};

/**
* @id normalize
*/
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
};


/**
 * @id NodeRemove
 */
Node.prototype.remove = function(){
    var parent = this.parentNode; 
    parent.removeChild(this); 
};

//AUXILIARY FUNCTIONS

/*
* @id insertChild
*/
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
};

/*
* @id validHierarchy
*/
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
}

/*
* @id checkChildValidity
*/
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
}

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

 // STRING UTILS

 var smallAZ = {
    a: 97,
    b: 98,
    c: 99,
    d: 100,
    e: 101,
    f: 102,
    g: 103,
    h: 104,
    i: 105,
    j: 106,
    k: 107,
    l: 108,
    m: 109,
    n: 110,
    o: 111,
    p: 112,
    q: 113,
    r: 114,
    s: 115,
    t: 116,
    u: 117,
    v: 118,
    w: 119,
    x: 120,
    y: 121,
    z: 122
  }

  var largeAZ = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90
  }
  
  /*
  * @id StringUtilsToUpperCaseChar
  */
  function toUpperCaseChar(c){
    if(largeAZ.hasOwnProperty(c)) return c;
    if(smallAZ.hasOwnProperty(c)){
      var currCode = smallAZ[c];
      var toUpperCaseCode = currCode - 32;
      for(var uC in largeAZ){
        if(largeAZ[uC] === toUpperCaseCode){
          return uC;
        }
      }
    }
    return c;
  }

  /*
  * @id StringUtilsToUpperCase
  */
  function toUpperCase(str){
      var res = "";
      for(var i = 0; i < str.length; i++){
          res = res + toUpperCaseChar(str.charAt(i));
      }
      return res;
  }

const StringUtils = {toUpperCase: toUpperCase};

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
      return __MP__wrapper__terminate(confId);
    else 
      return __MP__wrapper__terminate();
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
    this.document = null;
    this.timeStamp = (new Date()).getTime();
    this.event = undefined;
    this.__onerror = null;
    this.window = this;
    this.parent = parent;
    this.opener = null;

    this.outerHeight = 820;
    this.iframes = this;
    this.__iframes_array = [];

    this.__onmessage = null;
    this.__onmessageerror = null;
    //console.log('Adding window of id '+this.__id+' to prototype ');
    Window.prototype.windows.push(this);
};

Window.prototype = Object.create(EventTarget.prototype);

Window.prototype.windows = [];

Object.defineProperty(Window.prototype, "DOMException", {
    get: function(){
        return DOMException.DOMException;
    }
});

Object.defineProperty(Window.prototype, 'onmessage', {
    /*
    * @id WindowOnMessage
    */
    set: function(f){
        if(this.__onmessage) this.removeEventListener('message', this.__onmessage);
        this.addEventListener('message', f);
        this.__onmessage = f;
    }
});

Object.defineProperty(Window.prototype, 'onerror', {
    /*
    * @id WindowOnErrorSet
    */
    set: function(f){
        this.addEventListener("error", f);
        this.__onerror = f;
    },

    /*
    * @id WindowOnErrorGet
    */
    get: function(){
        return this.__onerror;
    }
});

Object.defineProperty(Window.prototype, 'onmessageerror', {
    set: function(f){
       this.__onmessageerror = f;
       this.addEventListener('messageerror', f);
    },
    get: function(){
        return this.__onmessageerror;
    }
})

/*
* @id WindowGetComputedStyle
*/
Window.prototype.getComputedStyle = function(elem){
    return elem.style;
};

Object.defineProperty(Window.prototype, 'outer-height', {
    get: function(){
        return this.outerHeight;
    }
});

Window.prototype.setTimeout = function (callback, timeout) {
    return callback ();
}

Window.prototype.clone = function () {
    var copy = new Window();
    copy.document = this.document;
    copy.timeStamp = this.timeStamp;
    copy.__onerror = this.__onerror;
    copy.paent = this.parent;
    copy.opener = this.opener;
    copy.outerHeight = this.outerHeight;
    return copy;
}

/*Window.prototype.getTheParent = function(){
    return this.parent;
}*/

/*
* @id WindowCreateCommunicationPoint
*/
Window.prototype.createCommunicationPoint = function(MessagePort, url, MPSem){
    var outsidePort = new MessagePort();
    outsidePort.__Enabled = true;
    windowInstance.__port = outsidePort;
    this.__port = outsidePort;
    //this.__port.targetWindow = this;
    this.src = url;
    //console.log('createCommunicationPoint, parentId: '+this.parent.__id+', this.id: '+this.__id);
    if(url) MPSem.create(url, "__setupIFrameContext", [outsidePort.__id, this.parent.__id, this.__id]);
}

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
* @id WindowSetInstance
*/
function setInstance(id){
    var w = Window.prototype.windows.find((w) => { return w.__id === id });
    if(w !== undefined) windowInstance = w;
}

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

const WindowInfo = { Window: Window, getInstance: getInstance, setInstance: setInstance, getParent: getParent };

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
    this._defaultPrevented = false;
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

Event.prototype.getIsTrusted = function(){
    return this._isTrusted;
}

/*
* @id EventStopPropagation
*/
Event.prototype.stopPropagation = function (){
    //The stopPropagation() method, when invoked, must set the context object’s stop propagation flag.
    this._stopPropagation = true;
};

/*
* @id EventStopImmediatePropagation
*/
Event.prototype.stopImmediatePropagation = function (){
    //The stopImmediatePropagation() method, when invoked, must set the context object’s stop propagation flag and the context object’s stop immediate propagation flag.  
    this._stopImmediatePropagation = true;
    this._stopPropagation = true;
};

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

Object.defineProperty(Event.prototype, 'cancelBubble', {
    //CancelBubble is outdated, returns value of stopPropagation
    /*
    * @id cancelBubbleGet
    */
    get: function(){
        return this._stopPropagation;
    },
    /*
    * @id cancelBubbleSet
    */
    set: function(value){
        if(!this._stopPropagation){
            this._stopPropagation = value;
        }
    }
});

Object.defineProperty(Event.prototype, 'defaultPrevented', {
    //The defaultPrevented attribute’s getter, when invoked, must return true if the context object’s canceled flag is set, and false otherwise.
    /*
    * @id defaultPreventedGet
    */
    get: function(){
        return this.canceled;
    },
    /*
    * @id defaultPreventedSet
    */
    set: function(value){
        this.canceled = value;
    }
});

Object.defineProperty(Event.prototype, 'returnValue', {
    //The returnValue attribute’s getter, when invoked, must return false if context object’s canceled flag is set, and true otherwise.
    /*
    * @id returnValueGet
    */
    get: function(){
        return !this.canceled;
    },
    //The returnValue attribute’s setter, when invoked, must set the canceled flag with the context object if the given value is false, and do nothing otherwise.
    /*
    * @id returnValueSet
    */
    set: function(value){
        if(!value){
            this.canceled = true;
        }
    }
});

Object.defineProperty(Event.prototype, 'srcElement', {
    //The srcElement attribute’s getter, when invoked, must return the context object’s target.
    /*
    * @id srcElementGet
    */
    get: function(){
        return this.target;
    }
});

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

MessageEvent.prototype.initMessageEvent = function(type, bubbles, cancelable, data, origin, lastEventId, source, ports){
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
}

Object.defineProperty(WindowInfo.Window.prototype, 'MessageEvent', {
    get: function(){
        return MessageEvent;
    }
}); 

// URL
function parse(targetOrigin){
    //console.log('Going to call URL_construct with '+targetOrigin);
    var res = URL_construct(targetOrigin);
    if(res === "SyntaxError") throw new DOMException.DOMException(DOMException.SYNTAX_ERR);
    return res;
}

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

/*
* @id ShadowRootGetElementById
*/
ShadowRoot.prototype.getElementById = function(id){
	return this.ownerDocument.elementById(this, id);
};

/*
* @id ShadowRootGetTheParent
*/
ShadowRoot.prototype.getTheParent = function(event){
	if(!event.composed){
		return null;
	}else{
		return this.host;
	}
}

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

Object.defineProperty(WindowInfo.Window.prototype, 'UIEvent', {
    /*
    * @id UIEventGet
    */
    get: function(){
        return UIEvent;
    }
});


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
    this.screenX       = (eventInitDict && eventInitDict.screenX) ? eventInitDict.screenX : 0;
    this.screenY       = (eventInitDict && eventInitDict.screenY) ? eventInitDict.screenY : 0;
    this.clientX       = (eventInitDict && eventInitDict.clientX) ? eventInitDict.clientX : 0;
    this.clientY       = (eventInitDict && eventInitDict.clientY) ? eventInitDict.clientY : 0;
    this.relatedTarget = (eventInitDict && eventInitDict.relatedTarget) ? eventInitDict.relatedTarget : null;
    this.button        = (eventInitDict && eventInitDict.button) ? eventInitDict.button : 0;
    this.buttons       = (eventInitDict && eventInitDict.buttons) ? eventInitDict.buttons : 0;
    this.ctrlKey       = (eventInitDict && eventInitDict.ctrlKey) ? eventInitDict.ctrlKey : false;
    this.shiftKey      = (eventInitDict && eventInitDict.shiftKey) ? eventInitDict.shiftKey : false;
    this.altKey        = (eventInitDict && eventInitDict.altKey) ? eventInitDict.altKey : false;
    this.metaKey       = (eventInitDict && eventInitDict.metaKey) ? eventInitDict.metaKey : false;
};

MouseEvent.prototype = Object.create(UIEvent.UIEvent.prototype);

Object.defineProperty(WindowInfo.Window.prototype, 'MouseEvent', {
    /*
    * @id MouseEventGet
    */
    get: function(){
        return MouseEvent;
    }
});

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

	/**
	* @id CharacterDataSubstringData
	*/
	CharacterData.prototype.substringData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		return this._data.substring(offset, offset+count);
	};

	/**
	* @id CharacterDataAppendData
	*/
	CharacterData.prototype.appendData = function(arg){
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this._data = this._data + arg;
	};

	/**
	* @id CharacterDataInsertData
	*/
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
	};

	/**
	* @id CharacterDataDeleteData
	*/
	CharacterData.prototype.deleteData = function(offset, count){
		if(offset < 0 || offset > this.data.length || count < 0){
			throw new DOMException.DOMException(1);
		}
		if(this.is_readonly()){
			throw new DOMException.DOMException(7);
		}
		this.replaceData(offset, count, "");
	};

	/**
	* @id CharacterDataReplaceData
	*/
	CharacterData.prototype.replaceData = function(offset, count, arg){
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
	};

	Object.defineProperty(CharacterData.prototype, 'data', {
		/**
		* @id CharacterDataDataGet
		*/
	    get: function(){
	    	return this._data;
		},
		
		/**
		* @id CharacterDataDataSet
		*/
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
	});

	Object.defineProperty(CharacterData.prototype, 'nodeValue', {
		/**
		* @id CharacterDataNodeValueGet
		*/
	    get: function(){
	    	return this.data;
		},
		
		/**
		* @id CharacterDataNodeValueSet
		*/
	    set: function(value){
	    	this.data = value; 
	    }
	});

	Object.defineProperty(CharacterData.prototype, 'length', {
		/**
		* @id CharacterDataLengthGet
		*/
	    get: function(){
	    	return this._data.length;
	    }
	});

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

	/**
	 * @id TextSplitText
	 */
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
	};

	/*
	* @id TextClone
	*/
	Text.prototype.clone = function(){
		var newText = new Text(this.data, null);
		return newText;
	};

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

        Object.defineProperty(this, 'value', {
            /**
            * @id attributeValueGet 
            */
            get: function(){return this.nodeValue;},
            
            /**
            * @id attributeValueSet
            */
            set: function(value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.nodeValue = value;
            }
        });

        Object.defineProperty(this, 'nodeValue', {
            /**
            * @id attributeNodeValueGet
            */
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
            /**
            * @id attributeNodeValueSet
            */
            set: function (value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.setValue = true;
                this._value = value;
                var text = new Text(value, this.ownerDocument);
                this.appendChild(text);
        }
        });

    };
    Attribute.prototype = Object.create(Node.Node.prototype);    

    /*
    * @id AttributeClone
    */
    Attribute.prototype.clone = function(){
        var newNode = new Attribute(this.name, null);
        newNode.nodeValue = this.nodeValue;
        return newNode;
    };

    return {'Attribute': Attribute};
}

// ATTRIBUTE
const Attribute = initAttribute(Node, Text);


// NAMED NODE MAP
/*
* @id NamedNodeMap
*/
var NamedNodeMap = function(document, ownerElement){
	this.contents = [];
	this.ownerDocument = document;
	this.ownerElement = ownerElement;
};

Object.defineProperty(NamedNodeMap.prototype, "length", {
	/*
	* @id getLengthNamedNodeMap
	*/
	get:	function () { return this.contents.length;  }
}); 

/*
* @id NamedNodeMapGetNamedItem
*/
NamedNodeMap.prototype.getNamedItem = function(name){
	var i = 0;
	var node = null;
	while(i < this.length && node === null){
		if(this.contents[i].nodeName === name){
			node = this.contents[i];
		}
		i++;
	}
	return node;
};

/*
* @id NamedNodeMapSetNamedItem
*/
NamedNodeMap.prototype.setNamedItem = function(arg){
	if(this.ownerDocument && arg.ownerDocument && !(this.ownerDocument.isSameDocument(arg.ownerDocument))){
		throw new DOMException.DOMException(4);
	}
	if(arg && arg.ownerElement && arg.ownerElement.id !== this.ownerElement.id){
		throw new DOMException.DOMException(10);
	}
	var i = 0;
	var node = null;
	while(i < this.length && node === null){
		if(this.contents[i].nodeName === arg.nodeName){
			node = this.contents[i];
			this.contents[i] = arg;
		}
		i++;
	}
	if(node === null){
		this.contents.push(arg);
		return null;
	}else{
		return node;
	}
};

/*
* @id NamedNodeMapRemoveNamedItem
*/
NamedNodeMap.prototype.removeNamedItem = function(name){
	var i = 0;
	var node = null;
	var def = false;
	while(i < this.length && node === null){
		if(this.contents[i].nodeName === name){
			var defAttr = ArrayUtils.find(this.ownerElement.defaultAttrs, 
				/*
				* @id NamedNodeMapRemoveNamedItemDef
				*/
				function(def){
					return def.name === name
				});
			node = this.contents[i];
			if(!this.ownerElement || !defAttr){
				this.contents.splice(i, 1);
			}else if(defAttr){
				def = true;
				var attr = new Attribute.Attribute(); 
				attr.value = node.value;
				attr.nodeName = node.nodeName;
				node.value = defAttr.value;
				attr.specified = false;
				node.specified = false;
				//node.value = attr.value;
			}
		}
		i++;
	}
	if(node === null){
		throw new DOMException.DOMException(8);
	}
	return def ? attr : node;
};

/*
* @id NamedNodeMapSearchItemById
*/
NamedNodeMap.prototype.searchItemById = function(attr){
	for(var i = 0; i < this.contents.length; i++){
		if(attr.id === this.contents[i].id){
			return true;
		}
	}
	return false;
};

/*
* @id NamedNodeMapItem
*/
NamedNodeMap.prototype.item = function(index){
	if(this.contents[index]){
		return this.contents[index];
	}else{
		return null;
	}
	
};

// CSSStyleDeclaration
/*
* @id CSSStyleDeclaration
*/
function CSSStyleDeclaration(node){
    this.__node = node;
    this.__transitions_map = {};
    this.__animations_map = {}; 
};

Object.defineProperty(CSSStyleDeclaration.prototype, "marginTop", {
    get: function(){
        return computeMargin(this);
    }
});

Object.defineProperty(CSSStyleDeclaration.prototype, "marginBottom", {
    get: function(){
        return computeMargin(this);
    }
});

Object.defineProperty(CSSStyleDeclaration.prototype, "marginLeft", {
    get: function(){
        return computeMargin(this);
    }
});

Object.defineProperty(CSSStyleDeclaration.prototype, "marginRight", {
    get: function(){
        return computeMargin(this);
    }
});

Object.defineProperty(CSSStyleDeclaration.prototype, "transition", {
    get: function () {
        return this.__transition_str;
    },
    set: function(str){
        var arr = str.split(" ");
        var transitions_map = this.__transitions_map;
        var stl, time;
        for (var i=0; i<arr.length; i+=2) {
            stl = arr[i];
            time = arr[i+1];
            transitions_map[stl] = time;
        }
        this.__transition_str = str; 
        return str;
    }
});


Object.defineProperty(CSSStyleDeclaration.prototype, "animation", {
    get: function () {
        return this.__animation_str;
    },
    set: function(str){
        var arr = str.split(" ");
        var animations_map = this.__animations_map;
        var atype, adur, nr;
        for (var i=0; i<arr.length; i+=3) {
            atype = arr[i];
            adur = arr[i+1];
            nr = arr[i+2];
            animations_map[atype] =  { type: atype, dur: adur, nr: nr };
        }
        this.__animation_str = str; 
        return str;
    }
});


Object.defineProperty(CSSStyleDeclaration.prototype, "opacity", {
    get: function(){
        return this.__opacity;
    },
    set : function (op) {
        this.__opacity = op;
        if (this.__transitions_map && this.__transitions_map["opacity"]){
            this.__node.dispatchEvent(new Event('transitionrun'));
            this.__node.dispatchEvent(new Event('transitionstart'));
            this.__node.dispatchEvent(new Event('transitionend'));
        }
        return op;
    }
});

CSSStyleDeclaration.prototype.animate = function () { 
    this.__node.dispatchEvent(new Event('animationstart'));
    this.__node.dispatchEvent(new Event('animationiteration'));
    this.__node.dispatchEvent(new Event('animationend'));
}; 

Object.defineProperty(CSSStyleDeclaration.prototype, "display", {
    get: function(){
        return this.__display;
    },
    set : function (disp) {
        this.__display = disp;
        if (disp === "none"){
            this.__node.dispatchEvent(new Event('transitioncancel'));
            this.__node.dispatchEvent(new Event('animationcancel'));
        }
        return disp;
    }
}); 

CSSStyleDeclaration.prototype.getPropertyValue = function(property){
    return this[property] || "";
};

CSSStyleDeclaration.prototype.setProperty = function(property, value){
    this[property] = String(value);
}

function computeMargin(style){
    return style.margin ? style.margin.substring(0, style.margin.length -2) : 0;
}

// DOM RECT
    
/*
* @id DOMRect
*/
function DOMRect(){
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;
}

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

/**
* @id ElementGetElementsByTagName
*/
Element.prototype.getElementsByTagName = function (name){
    var elem = this; 
    var result = [];  
    for(var k = 0; k < elem.childNodes.length; k++){
        var listRes = elementsByTagName(elem.childNodes.item(k), name, []);
        for(var j = 0; j < listRes.length; j++){
            result.push(listRes[j]);
        }
    }
    return result; 
};

/**
* @id ElementGetAttribute
*/
Element.prototype.getAttribute = function (name){
    if(this.attributes){
        for(var i = 0; i < this.attributes.length; i++){
            if(this.attributes.item(i).name === name){
                return this.attributes.item(i).value;
            } 
        }
    }
    return null;
};

/**
* @id ElementGetAttributeNode
*/
Element.prototype.getAttributeNode = function (name){
    if(this.attributes){
        for(var i = 0; i < this.attributes.length; i++){
            if(this.attributes.item(i).name === name){
                return this.attributes.item(i);
            } 
        } 
    }
    return null;
};

/**
* @id ElementHasAttribute
*/
Element.prototype.hasAttribute = function (name){
    for(var i = 0; i < this.attributes.length; i++){
        if(this.attributes.item(i).name === name){
            return true;
        } 
    }
    return false;
};

/**
* @id ElementSetAttribute
*/
Element.prototype.setAttribute = function (name, value){
    if(this.is_readonly()){
            throw new DOMException.DOMException(7);
    }
    /*if(!name || !name.length || name.match(attrRegExp)){
        throw new DOMException.DOMException(5);
    }*/
    if(!this.attributes){
        this.attributes = new NamedNodeMap.NamedNodeMap(this.ownerDocument, this);
    }
    var attribute = this.getAttributeNode(name);
    if(name === "class" && this.classList){
        if(value){
            this.classList.add(value);
        }else{
            this.classList.removeAll();
        }
    }
    if(name === "style"){
        this.style = computeStyle(value, this);
    }
    if(name === "checked" && this.checked !== undefined){
        this.checked = true;
    }
    if(attribute != null){
        attribute.nodeValue = value;
    }else{
        attribute = this.ownerDocument.createAttribute(name);
        var text = this.ownerDocument.createTextNode(value);
        attribute.appendChild(text);
        //attribute.value = value;
        if(name === "id"){
            attribute.isId = true;
        }
        this.attributes.setNamedItem(attribute);
        attribute.ownerElement = this;
    }
    attribute.specified = true;
};

/**
* @id ElementSetAttributeNode
*/
Element.prototype.setAttributeNode = function(newAttr){
    if(this.is_readonly()){
        throw new DOMException.DOMException(7);
    }
    if(!this.attributes){
        this.attributes = new NamedNodeMap.NamedNodeMap(this.ownerDocument, this);
    }
    var existing = this.getAttributeNode(newAttr.name);
    this.attributes.setNamedItem(newAttr);
    newAttr.ownerElement = this;
    return existing;
};

/**
* @id ElementRemoveAttribute
*/
Element.prototype.removeAttribute = function(name){
    if(this.is_readonly()){
        throw new DOMException.DOMException(7);
    }
    if(this.attributes) this.attributes.removeNamedItem(name);
};

/**
* @id ElementRemoveAttributeNode
*/
Element.prototype.removeAttributeNode = function(oldAttr){
    if(this.is_readonly()){
        throw new DOMException.DOMException(7);
    }
    if(!this.attributes.searchItemById(oldAttr)){
        throw new DOMException.DOMException(8);
    }
    var attr = this.attributes.removeNamedItem(oldAttr.nodeName);
    return attr;
};

/**
* @id ElementNormalize
*/
Element.prototype.normalize = function(){
    if(this.attributes){
        for(var j = 0; j < this.attributes.length; j++){
            this.attributes.item(j).normalize();
        }
    }
    Node.Node.prototype.normalize.call(this);
};

/**
* @id ElementSetDefaultAttributes
*/
Element.prototype.setDefaultAttributes = function(defaultAttributes){
    for(var i = 0; i < defaultAttributes.length; i++){
        if(defaultAttributes[i].elem === this.nodeName){
                this.defaultAttrs.push(defaultAttributes[i]);
                var DOMattr = this.ownerDocument.createAttribute(defaultAttributes[i].name);
                DOMattr.value = defaultAttributes[i].value;
                DOMattr.specified = false;
                this.setAttributeNode(DOMattr);   
        }
    }
}

/*
* @id ElementClone
*/
Element.prototype.clone = function(){
    return new Element(this.tagName, null);
};

/*
* @id ElementAttachShadow
*/
Element.prototype.attachShadow = function(init){
    //The attachShadow(init) method, when invoked, must run these steps:
    //If context object’s namespace is not the HTML namespace, then throw a "NotSupportedError" DOMException.
    throw new DOMException.DOMException(9);
};


/*
* @id ElementFocus
*/
Element.prototype.focus = function(options){
    //The relatedTarget should be initialized to the element losing focus (in the case of a focus or focusin event) or the element gaining focus (in the case of a blur or focusout event).
    var focusEvent = new Event("focus");
    focusEvent.bubbles = true;
    focusEvent.relatedTarget = this.ownerDocument.activeElement;
    this.ownerDocument.activeElement = this;
    this.dispatchEvent(focusEvent);
};

/*
* @id ElementBlur
*/
Element.prototype.blur = function(options){
    var blurEvent = new Event("blur");
    blurEvent.bubbles = true;
    this.ownerDocument.activeElement = this;
    this.dispatchEvent(blurEvent);
};

Element.prototype.getBoundingClientRect = function(){
    var rect = new DOMRect();
    rect.height = Number(this.style.height.substring(0, this.style.height.length -2));
    rect.width = Number(this.style.width.substring(0, this.style.width.length -2));
    return rect;
};

    
Object.defineProperty(Element.prototype, "ontransitionstart", {
    set: function(hdlr){
        this.addEventListener('transitionstart', hdlr)
    }
}); 


Object.defineProperty(Element.prototype, "ontransitioncancel", {
    set: function(hdlr){
        this.addEventListener('transitioncancel', hdlr)
    }
}); 


/**
* @id elementsByTagName
*/
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
};

function computeStyle(cssPropValue, node){
    var style = new CSSStyleDeclaration.CSSStyleDeclaration(node);
    if(cssPropValue){
        var propsValues = StringUtils.split(cssPropValue, ";");
        for(var i = 0; i < propsValues.length; i++){
            if(propsValues[i]){
                var propVal = StringUtils.split(propsValues[i], ":");
                var prop = StringUtils.removeWhiteSpaces(propVal[0]);
                var val = StringUtils.removeWhiteSpaces(propVal[1]);
                style[prop] = val;
            }
        }
    }
    return style;
}

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

const URL          = {parse: parse};
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
            var parsedURL = URL.parse(targetOrigin);
            // 5.2 If parsedURL is failure, then throw a "SyntaxError" DOMException.
            // 5.3 Set targetOrigin to parsedURL's origin.
            targetOrigin = parsedURL;
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

    Object.defineProperty(global, 'importScripts', {
        get: function(){
            return function(){}
        }
    });
    Object.defineProperty(global, 'navigator', {});
    Object.defineProperty(global, 'btoa', {
        get: function(){
            return function(){};
        }
    });
    Object.defineProperty(global, 'atob', {
        get: function(){
            return function(){};
        }
    });
    //Object.defineProperty(global, 'location', {});
    Object.defineProperty(global, 'location', {
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
    });
    Object.defineProperty(global, 'close', {
        get: function(){
            console.log('Close called, mpsem? '+global.MPSemantics);
            return function(){
                __ES__schedule(global.MPSemantics.getMPSemanticsInstance().terminate);
            }
        }
    });
    Object.defineProperty(global, 'XMLHttpRequest', {});
    Object.defineProperty(global, 'WebSocket', {});
    Object.defineProperty(global, 'EventSource', {});

    Object.defineProperty(this, 'WorkerNavigator', {});
    Object.defineProperty(this, 'WorkerLocation', {});
    Object.defineProperty(this, 'ImageData', {});
    Object.defineProperty(this, 'ImageBitmap', {});
    Object.defineProperty(this, 'CanvasGradient', {});
    Object.defineProperty(this, 'CanvasPattern', {});
    Object.defineProperty(this, 'CanvasPath', {});
    Object.defineProperty(this, 'TextMetrics', {});
    Object.defineProperty(this, 'Path2D', {});
    Object.defineProperty(this, 'PromiseRejectionEvent', {});
    Object.defineProperty(this, 'CloseEvent', {});
    Object.defineProperty(this, 'BroadcastChannel', {});
    Object.defineProperty(this, 'ArrayBuffer', {});
    Object.defineProperty(this, 'Int8Array', {});
    Object.defineProperty(this, 'Uint8Array', {});
    Object.defineProperty(this, 'Uint8ClampedArray', {});
    Object.defineProperty(this, 'Int16Array', {});
    Object.defineProperty(this, 'Uint16Array', {});
    Object.defineProperty(this, 'Int32Array', {});
    Object.defineProperty(this, 'Uint32Array', {});
    Object.defineProperty(this, 'Float32Array', {});
    Object.defineProperty(this, 'Float64Array', {});
    Object.defineProperty(this, 'DataView', {});
    Object.defineProperty(this, 'XMLHttpRequestEventTarget', {});
    Object.defineProperty(this, 'XMLHttpRequestUpload', {});
    Object.defineProperty(this, 'ProgressEvent', {});
    Object.defineProperty(this, 'FormData', {});
    Object.defineProperty(this, 'URL', {});
    Object.defineProperty(this, 'URLSearchParams', {});
    Object.defineProperty(this, 'File', {});
    Object.defineProperty(this, 'Blob', {});
    Object.defineProperty(this, 'FileList', {});
    Object.defineProperty(this, 'FileReader', {});
    Object.defineProperty(this, 'FileReaderSync', {});
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
    Object.defineProperty(this, 'ReadableStream', {});
    Object.defineProperty(this, 'WritableStream', {});
    Object.defineProperty(this, 'ByteLengthQueuingStrategy', {});
    Object.defineProperty(this, 'CountQueuingStrategy', {});
    Object.defineProperty(this, 'IDBRequest', {});
    Object.defineProperty(this, 'IDBOpenDBRequest', {});
    Object.defineProperty(this, 'IDBVersionChangeEvent', {});
    Object.defineProperty(this, 'IDBFactory', {});
    Object.defineProperty(this, 'IDBDatabase', {});
    Object.defineProperty(this, 'IDBObjectStore', {});
    Object.defineProperty(this, 'IDBIndex', {});
    Object.defineProperty(this, 'IDBKeyRange', {});
    Object.defineProperty(this, 'IDBCursor', {});
    Object.defineProperty(this, 'IDBCursorWithValue', {});
    Object.defineProperty(this, 'IDBTransaction', {});

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
    replicatePropInScope(this, 'SharedWorker');
    replicatePropInScope(this, 'WorkerGlobalScope');
    replicatePropInScope(this, 'importScripts');
    replicatePropInScope(this, 'navigator');
    replicatePropInScope(this, 'btoa');
    replicatePropInScope(this, 'atob');
    replicatePropInScope(this, 'location');
    replicatePropInScope(this, 'close');
    replicatePropInScope(this, 'XMLHttpRequest');
    replicatePropInScope(this, 'WebSocket');
    replicatePropInScope(this, 'EventSource');
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
    Object.defineProperty(global, 'onoffline', {
        /*
        * @id DedicatedWorkerGlobalScopeOnOffline
        */
        set: function(f){
            scope.__port.addEventListener('offline', f);
        }
    });
    Object.defineProperty(global, 'ononline', {
        /*
        * @id DedicatedWorkerGlobalScopeOnOnline
        */
        set: function(f){
            scope.__port.addEventListener('online', f);
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

// SHARED WORKER GLOBAL SCOPE
/*
* @id SharedWorkerGlobalScope
*/
function SharedWorkerGlobalScope(global, options){
    WorkerGlobalScope.call(this, options, global);

    var scope = this;

    Object.defineProperty(global, 'onconnect', {
        /*
        * @id SharedWorkerGlobalScopeOnConnect
        */
        set: function(f){
            if(typeof f !== 'function' && typeof f !== 'object'){
                scope.__onconnecthandler = null;
            }else{
                if(scope.__onconnecthandler){
                    scope.removeEventListener('connect', scope.__onconnecthandler);
                }
                scope.__onconnecthandler = f;
                scope.addEventListener('connect', f);
            }
        },
        get: function(){
            return scope.__onconnecthandler;
        }
    });

    Object.defineProperty(scope, 'onconnect', {
        get: function(){
            return global.onconnect;
        },
        set: function(f){
            global.onconnect = f;
        }
    });

    Object.defineProperty(global, 'self', {
        /*
        * @id SharedWorkerGlobalScopeGetSelf
        */
        get: function(){
            return scope;
        }
    });

    Object.defineProperty(global, 'addEventListener', {
        /*
        * @id SharedWorkerGlobalScopeAddEventListener
        */
        get: function(){
          return scope.addEventListener.bind(scope);
        }
    });
    
    Object.defineProperty(global, 'removeEventListener', {
        /*
        * @id SharedWorkerGlobalScopeRemoveEventListener
        */
        get: function(f){
            return scope.removeEventListener.bind(scope);
        }
    });

    Object.defineProperty(global, 'dispatchEvent', {
        /*
        * @id SharedWorkerGlobalScopeDispatchEvent
        */
        get: function(f){
            return scope.dispatchEvent;
        }
    });

    Object.defineProperty(global, 'onerror', {
        /*
        * @id SharedWorkerGlobalScopeOnError
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

    Object.defineProperty(global, 'ApplicationCache', {});

    function replicatePropInScope(xsc, prop){
        Object.defineProperty(xsc, prop, {
            get: function(){
                return global[prop];
            }
        });
    }

    replicatePropInScope(scope, 'ApplicationCache');
    replicatePropInScope(scope, 'onerror');
    replicatePropInScope(scope, 'SharedWorkerGlobalScope');
    
    return scope;
}

SharedWorkerGlobalScope.prototype = Object.create(WorkerGlobalScope.prototype);

SharedWorkerGlobalScope.close = function(){
    // TODO: implement
}

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
    var isShared = worker instanceof SharedWorker;
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

/*
* @id SharedWorker
*/
function SharedWorker(scriptURL, options){
    if(arguments.length === 0) throw new TypeError("TypeError in SharedWorker. 1 argument required, 0 provided.");
    EventTarget.call(this);
    if(options && (options.type === '' ||  options.type === 'unknown')) throw new TypeError("Invalid type for worker");
    //1. (NOT SUPPORTED) Optionally, throw a "SecurityError" DOMException if the request violates a policy decision 
     //(e.g. if the user agent is configured to not allow the page to start shared workers).
    //2. If options is a DOMString, set options to a new WorkerOptions dictionary whose name member is set to the value of options and whose other members are set to their default values.
    if(!options || typeof(options) !== 'object'){
        var name = options === undefined ? "Standard" : options;
        options = { name: String(name) };
    } 
    if(options === undefined) options = {};
    var datacloneerr = new DOMException(DATA_CLONE_ERR);
    //3. (NOT SUPPORTED) Let outside settings be the current settings object.
    //4. (NOT SUPPORTED) Parse scriptURL relative to outside settings.
    //5. (NOT SUPPORTED) If this fails, throw a "SyntaxError" DOMException.
    //6. Otherwise, let urlRecord be the resulting URL record.
    var urlRecord = String(scriptURL);
    options.url = urlRecord;
    var lastescape = urlRecord.lastIndexOf('/');
    if(lastescape !== -1){
        urlRecord = urlRecord.substring(lastescape+1, urlRecord.length);
    }
    if(urlRecord.length >= 6 && urlRecord.substring(0, 7) === 'http://'){
        //in this case we try to parse URL
        console.log('Going to parse URL '+urlRecord);
        urlRecord = URL.parse(urlRecord);
    }
    var hash = "";
    var hashindex = urlRecord.lastIndexOf("#");
    if(hashindex !== -1){
        hash = urlRecord.substring(hashindex, urlRecord.length);
        urlRecord = urlRecord.substring(0, hashindex);
        console.log('SharedWorker, found hash: '+hash);
    }
    if(urlRecord.length < 3 || urlRecord.substring(urlRecord.length - 3, urlRecord.length) !== ".js"){
        urlRecord = urlRecord + ".js";
    }
    options.hash = hash;
    var optionsSerialized = StructuredSerializeInternal(options, false, datacloneerr);
    //7. Let worker be a new SharedWorker object.
    var worker = this;
    //8. Let outside port be a new MessagePort in outside settings's Realm.
    var outsidePort = new PublicMessagePort();
    //9. Assign outside port to the port attribute of worker.
    worker.__port = outsidePort;
    //10. (NOT SUPPORTED) Let callerIsSecureContext be true if outside settings is a secure context; otherwise, false.
    //11. Enqueue the following steps to the shared worker manager:
    if (scriptURL.length > 3){
        if(options.name !== undefined){ 
            var MPSem = getMPSemanticsInstance();
            var conf_exists = MPSem.conf_exists(options.name);
            //console.log('Conf exists? '+conf_exists);
            if(conf_exists)
              worker.__id = MPSem.create_with_id(options.name, urlRecord, "__rerunConf", [urlRecord, outsidePort.__id, true, optionsSerialized]);
            else
              worker.__id = MPSem.create_with_id(options.name, urlRecord, "__setupConf", [urlRecord, outsidePort.__id, true, optionsSerialized]);
        } else {
            worker.__id = MPSem.create(urlRecord, "__setupConf", [urlRecord, outsidePort.__id, true, optionsSerialized])
        }
    }
    //12. Return worker.
    return worker;
}

SharedWorker.prototype = Object.create(EventTarget.prototype);

SharedWorker.prototype.ids = {};

Object.defineProperty(SharedWorker.prototype, 'onmessage', {
    /*
    * @id SharedWorkerOnMessage
    */
    set: function(f){
        this.__port.__Enabled = true;
        if(this.__port.__onmessagehandler) this.__port.removeEventListener('message', this.__port.__onmessagehandler);
        this.__port.__onmessagehandler = f;
        this.__port.addEventListener('message', f);
    }
});

Object.defineProperty(SharedWorker.prototype, 'onmessageerror', {
    /*
    * @id SharedWorkerOnMessageError
    */
    set: function(f){
        this.__port.addEventListener('messageerror', f);
    }
});

Object.defineProperty(SharedWorker.prototype, 'port', {
    /*
    * @id SharedWorkerPort
    */
    set: function(f){
        //throw new Error('SharedWorker port is readonly')
        console.log('SharedWorker port is readonly');
    },
    get: function(){
        return this.__port;
    }
});
 
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

//TODOMP: check if this solution can work!
var global_scope = executeJSILProc("JSILGetGlobal");
var __self = global_scope;

var debug = false;
// default timeout is 10 seconds, test can override if needed
var settings = {
    output:true,
    harness_timeout:{
        "normal":10000,
        "long":60000
    },
    test_timeout:null,
    message_events: ["start", "test_state", "result", "completion"]
};

var xhtml_ns = "http://www.w3.org/1999/xhtml";

/*
* TestEnvironment is an abstraction for the environment in which the test
* harness is used. Each implementation of a test environment has to provide
* the following interface:
*
* interface TestEnvironment {
*   // Invoked after the global 'tests' object has been created and it's
*   // safe to call add_*_callback() to register event handlers.
*   void on_tests_ready();
*
*   // Invoked after setup() has been called to notify the test environment
*   // of changes to the test harness properties.
*   void on_new_harness_properties(object properties);
*
*   // Should return a new unique default test name.
*   DOMString next_default_test_name();
*
*   // Should return the test harness timeout duration in milliseconds.
*   float test_timeout();
* };
*/

/*
* A test environment with a DOM. The global object is 'window'. By default
* test results are displayed in a table. Any parent windows receive
* callbacks or messages via postMessage() when test events occur. See
* apisample11.html and apisample12.html.
*/
function WindowTestEnvironment() {
    this.name_counter = 0;
    this.window_cache = null;
    this.output_handler = null;
    this.all_loaded = false;
    var this_obj = this;
    this.message_events = [];
    this.dispatched_messages = [];

    this.message_functions = {
        start: [add_start_callback, remove_start_callback,
                function (properties) {
                    this_obj._dispatch("start_callback", [properties],
                                    {type: "start", properties: properties});
                }],

        test_state: [add_test_state_callback, remove_test_state_callback,
                    function(test) {
                        this_obj._dispatch("test_state_callback", [test],
                                            {type: "test_state",
                                            test: test.structured_clone()});
                    }],
        result: [add_result_callback, remove_result_callback,
                function (test) {
                    this_obj.output_handler.show_status();
                    this_obj._dispatch("result_callback", [test],
                                        {type: "result",
                                        test: test.structured_clone()});
                }],
        completion: [add_completion_callback, remove_completion_callback,
                    function (tests, harness_status) {
                        var cloned_tests = map(tests, function(test) {
                            return test.structured_clone();
                        });
                        this_obj._dispatch("completion_callback", [tests, harness_status],
                                            {type: "complete",
                                            tests: cloned_tests,
                                            status: harness_status.structured_clone()});
                    }]
    }

    on_event(window, 'load', function() {
        this_obj.all_loaded = true;
    });

    on_event(window, 'message', function(event) {
        if (event.data && event.data.type === "getmessages" && event.source) {
            // A window can post "getmessages" to receive a duplicate of every
            // message posted by this environment so far. This allows subscribers
            // from fetch_tests_from_window to 'catch up' to the current state of
            // this environment.
            for (var i = 0; i < this_obj.dispatched_messages.length; ++i)
            {
                event.source.postMessage(this_obj.dispatched_messages[i], "*");
            }
        }
    });
}

/*
* @id WindowTestEnvironmentDispatch
*/
WindowTestEnvironment.prototype._dispatch = function(selector, callback_args, message_arg) {
    this.dispatched_messages.push(message_arg);
    this._forEach_windows(
            /*
            * @id WindowTestEnvironmentThisForEachWindows
            */
            function(w, same_origin) {
                if (same_origin) {
                    try {
                        var has_selector = selector in w;
                    } catch(e) {
                        // If document.domain was set at some point same_origin can be
                        // wrong and the above will fail.
                        has_selector = false;
                    }
                    if (has_selector) {
                        try {
                            w[selector].apply(undefined, callback_args);
                        } catch (e) {
                            if (debug) {
                                throw e;
                            }
                        }
                    }
                }
                if (supports_post_message(w) && w !== self) {
                    w.postMessage(message_arg, "*");
                }
            });
};

/*
* @id WindowTestEnvironmentForEachWindows
*/
WindowTestEnvironment.prototype._forEach_windows = function(callback) {
    // Iterate over the windows [self ... top, opener]. The callback is passed
    // two objects, the first one is the window object itself, the second one
    // is a boolean indicating whether or not it's on the same origin as the
    // current window.
    var cache = this.window_cache;
    if (!cache) {
        cache = [[__self, true]];
        var w = __self;
        var i = 0;
        var so;
        /*while (w != w.parent) {
            w = w.parent;
            so = is_same_origin(w);
            cache.push([w, so]);
            i++;
        }*/
        w = window.opener;
        if (w) {
            cache.push([w, is_same_origin(w)]);
        }
        this.window_cache = cache;
    }

    forEach(cache,
            function(a) {
                callback.apply(null, a);
            });
};

WindowTestEnvironment.prototype.on_tests_ready = function() {
    var output = new Output();
    this.output_handler = output;

    var this_obj = this;

    add_start_callback(function (properties) {
        this_obj.output_handler.init(properties);
    });

    add_test_state_callback(function(test) {
        this_obj.output_handler.show_status();
    });

    add_result_callback(function (test) {
        this_obj.output_handler.show_status();
    });

    add_completion_callback(function (tests, harness_status) {
        this_obj.output_handler.show_results(tests, harness_status);
    });
    this.setup_messages(settings.message_events);
};

WindowTestEnvironment.prototype.setup_messages = function(new_events) {
    var this_obj = this;
    forEach(settings.message_events, function(x) {
        var current_dispatch = this_obj.message_events.indexOf(x) !== -1;
        var new_dispatch = new_events.indexOf(x) !== -1;
        if (!current_dispatch && new_dispatch) {
            this_obj.message_functions[x][0](this_obj.message_functions[x][2]);
        } else if (current_dispatch && !new_dispatch) {
            this_obj.message_functions[x][1](this_obj.message_functions[x][2]);
        }
    });
    this.message_events = new_events;
}

WindowTestEnvironment.prototype.next_default_test_name = function() {
    var suffix = this.name_counter > 0 ? " " + this.name_counter : "";
    this.name_counter++;
    return get_title() + suffix;
};

WindowTestEnvironment.prototype.on_new_harness_properties = function(properties) {
    this.output_handler.setup(properties);
    if (properties.hasOwnProperty("message_events")) {
        this.setup_messages(properties.message_events);
    }
};

WindowTestEnvironment.prototype.add_on_loaded_callback = function(callback) {
    on_event(window, 'load', callback);
};

WindowTestEnvironment.prototype.test_timeout = function() {
    var metas = document.getElementsByTagName("meta");
    for (var i = 0; i < metas.length; i++) {
        if (metas[i].name == "timeout") {
            if (metas[i].content == "long") {
                return settings.harness_timeout.long;
            }
            break;
        }
    }
    return settings.harness_timeout.normal;
};

/*
* Base TestEnvironment implementation for a generic web worker.
*
* Workers accumulate test results. One or more clients can connect and
* retrieve results from a worker at any time.
*
* WorkerTestEnvironment supports communicating with a client via a
* MessagePort.  The mechanism for determining the appropriate MessagePort
* for communicating with a client depends on the type of worker and is
* implemented by the various specializations of WorkerTestEnvironment
* below.
*
* A client document using testharness can use fetch_tests_from_worker() to
* retrieve results from a worker. See apisample16.html.
*/
function WorkerTestEnvironment() {
    this.name_counter = 0;
    this.all_loaded = true;
    this.message_list = [];
    this.message_ports = [];
}

WorkerTestEnvironment.prototype._dispatch = function(message) {
    this.message_list.push(message);
    for (var i = 0; i < this.message_ports.length; ++i)
    {
        this.message_ports[i].postMessage(message);
    }
};

// The only requirement is that port has a postMessage() method. It doesn't
// have to be an instance of a MessagePort, and often isn't.
WorkerTestEnvironment.prototype._add_message_port = function(port) {
    this.message_ports.push(port);
    for (var i = 0; i < this.message_list.length; ++i)
    {
        port.postMessage(this.message_list[i]);
    }
};

WorkerTestEnvironment.prototype.next_default_test_name = function() {
    var suffix = this.name_counter > 0 ? " " + this.name_counter : "";
    this.name_counter++;
    return get_title() + suffix;
};

WorkerTestEnvironment.prototype.on_new_harness_properties = function() {};

WorkerTestEnvironment.prototype.on_tests_ready = function() {
    var this_obj = this;
    add_start_callback(
            function(properties) {
                this_obj._dispatch({
                    type: "start",
                    properties: properties,
                });
            });
    add_test_state_callback(
            function(test) {
                this_obj._dispatch({
                    type: "test_state",
                    test: test.structured_clone()
                });
            });
    add_result_callback(
            function(test) {
                this_obj._dispatch({
                    type: "result",
                    test: test.structured_clone()
                });
            });
    add_completion_callback(
            function(tests, harness_status) {
                this_obj._dispatch({
                    type: "complete",
                    tests: map(tests,
                        function(test) {
                            return test.structured_clone();
                        }),
                    status: harness_status.structured_clone()
                });
            });
};

WorkerTestEnvironment.prototype.add_on_loaded_callback = function() {};

WorkerTestEnvironment.prototype.test_timeout = function() {
    // Tests running in a worker don't have a default timeout. I.e. all
    // worker tests behave as if settings.explicit_timeout is true.
    return null;
};

/*
* @id DedicatedWorkerTestEnvironment
*/
function DedicatedWorkerTestEnvironment() {
    WorkerTestEnvironment.call(this);
    // self is an instance of DedicatedWorkerGlobalScope which exposes
    // a postMessage() method for communicating via the message channel
    // established when the worker is created.
    this._add_message_port(__self);
}
DedicatedWorkerTestEnvironment.prototype = Object.create(WorkerTestEnvironment.prototype);

DedicatedWorkerTestEnvironment.prototype.on_tests_ready = function() {
    WorkerTestEnvironment.prototype.on_tests_ready.call(this);
    // In the absence of an onload notification, we a require dedicated
    // workers to explicitly signal when the tests are done.
    tests.wait_for_finish = true;
};

/*
* @id SharedWorkerTestEnvironment
*/
function SharedWorkerTestEnvironment() {
    WorkerTestEnvironment.call(this);
    var this_obj = this;
    // Shared workers receive message ports via the 'onconnect' event for
    // each connection.
    __self.addEventListener("connect",
            function(message_event) {
                this_obj._add_message_port(message_event.source);
            }, false);
}
SharedWorkerTestEnvironment.prototype = Object.create(WorkerTestEnvironment.prototype);

SharedWorkerTestEnvironment.prototype.on_tests_ready = function() {
    WorkerTestEnvironment.prototype.on_tests_ready.call(this);
    // In the absence of an onload notification, we a require shared
    // workers to explicitly signal when the tests are done.
    tests.wait_for_finish = true;
};

/*
* @id ServiceWorkerTestEnvironment
*/
function ServiceWorkerTestEnvironment() {
    WorkerTestEnvironment.call(this);
    this.all_loaded = false;
    this.on_loaded_callback = null;
    var this_obj = this;
    __self.addEventListener("message",
            function(event) {
                if (event.data && event.data.type && event.data.type === "connect") {
                    if (event.ports && event.ports[0]) {
                        // If a MessageChannel was passed, then use it to
                        // send results back to the main window.  This
                        // allows the tests to work even if the browser
                        // does not fully support MessageEvent.source in
                        // ServiceWorkers yet.
                        this_obj._add_message_port(event.ports[0]);
                        event.ports[0].start();
                    } else {
                        // If there is no MessageChannel, then attempt to
                        // use the MessageEvent.source to send results
                        // back to the main window.
                        this_obj._add_message_port(event.source);
                    }
                }
            }, false);

    // The oninstall event is received after the service worker script and
    // all imported scripts have been fetched and executed. It's the
    // equivalent of an onload event for a document. All tests should have
    // been added by the time this event is received, thus it's not
    // necessary to wait until the onactivate event. However, tests for
    // installed service workers need another event which is equivalent to
    // the onload event because oninstall is fired only on installation. The
    // onmessage event is used for that purpose since tests using
    // testharness.js should ask the result to its service worker by
    // PostMessage. If the onmessage event is triggered on the service
    // worker's context, that means the worker's script has been evaluated.
    on_event(__self, "install", on_all_loaded);
    on_event(__self, "message", on_all_loaded);
    function on_all_loaded() {
        if (this_obj.all_loaded)
            return;
        this_obj.all_loaded = true;
        if (this_obj.on_loaded_callback) {
        this_obj.on_loaded_callback();
        }
    }
}

ServiceWorkerTestEnvironment.prototype = Object.create(WorkerTestEnvironment.prototype);

ServiceWorkerTestEnvironment.prototype.add_on_loaded_callback = function(callback) {
    if (this.all_loaded) {
        callback();
    } else {
        this.on_loaded_callback = callback;
    }
};

/*
* JavaScript shells.
*
* This class is used as the test_environment when testharness is running
* inside a JavaScript shell.
*/
function ShellTestEnvironment() {
    this.name_counter = 0;
    this.all_loaded = false;
    this.on_loaded_callback = null;
    Promise.resolve().then(function() {
        this.all_loaded = true
        if (this.on_loaded_callback) {
            this.on_loaded_callback();
        }
    }.bind(this));
    this.message_list = [];
    this.message_ports = [];
}

ShellTestEnvironment.prototype.next_default_test_name = function() {
    var suffix = this.name_counter > 0 ? " " + this.name_counter : "";
    this.name_counter++;
    return "Untitled" + suffix;
};

ShellTestEnvironment.prototype.on_new_harness_properties = function() {};

ShellTestEnvironment.prototype.on_tests_ready = function() {};

ShellTestEnvironment.prototype.add_on_loaded_callback = function(callback) {
    if (this.all_loaded) {
        callback();
    } else {
        this.on_loaded_callback = callback;
    }
};

ShellTestEnvironment.prototype.test_timeout = function() {
    // Tests running in a shell don't have a default timeout, so behave as
    // if settings.explicit_timeout is true.
    return null;
};

function create_test_environment() {
    //TODOMP: check how to initialise DedicatedWorkerTestEnvironment, etc...
    /*if ('document' in global_scope) {
        return new WindowTestEnvironment();
    }
    if ('DedicatedWorkerGlobalScope' in global_scope &&
        global_scope instanceof DedicatedWorkerGlobalScope) {
        return new DedicatedWorkerTestEnvironment();
    }
    if ('SharedWorkerGlobalScope' in global_scope &&
        global_scope instanceof SharedWorkerGlobalScope) {
        return new SharedWorkerTestEnvironment();
    }
    if ('ServiceWorkerGlobalScope' in global_scope &&
        global_scope instanceof ServiceWorkerGlobalScope) {
        return new ServiceWorkerTestEnvironment();
    }
    if ('WorkerGlobalScope' in global_scope &&
        global_scope instanceof WorkerGlobalScope) {
        return new DedicatedWorkerTestEnvironment();
    }

    if (!('location' in global_scope)) {
        return new ShellTestEnvironment();
    }

    throw new Error("Unsupported test environment");*/
    return new ShellTestEnvironment();
}

var test_environment = create_test_environment();

function is_shared_worker(worker) {
    //return 'SharedWorker' in global_scope && 
    return worker instanceof SharedWorker;
}

function is_service_worker(worker) {
    // The worker object may be from another execution context,
    // so do not use instanceof here.
    return 'ServiceWorker' in global_scope &&
        Object.prototype.toString.call(worker) == '[object ServiceWorker]';
}

/*
* @id TestharnessTest
*/
function test(func, name, properties)
{
    var test_name = name ? name : test_environment.next_default_test_name();
    properties = properties ? properties : {};
    var test_obj = new Test(test_name, properties);
    var value = test_obj.step(func, test_obj, test_obj);

    if (value !== undefined) {
        var msg = "test named" + test_name +
            " inappropriately returned a value";

        try {
            if (value && value.hasOwnProperty("then")) {
                msg += ", consider using `promise_test` instead";
            }
        } catch (err) {}

        tests.status.status = tests.status.ERROR;
        tests.status.message = msg;
    }

    if (test_obj.phase === test_obj.phases.STARTED) {
        test_obj.done();
    }
}

function async_test(func, name, properties)
{
    if (typeof func !== "function") {
        properties = name;
        name = func;
        func = null;
    }
    var test_name = name ? name : test_environment.next_default_test_name();
    properties = properties ? properties : {};
    var test_obj = new Test(test_name, properties);
    if (func) {
        test_obj.step(func, test_obj, test_obj);
    }
    return test_obj;
}

/* @id TestHarnessPromiseTest */
function promise_test(func, name, properties) {
    var test = async_test(name, properties);
    test._is_promise_test = true;

    // If there is no promise tests queue make one.
    if (!tests.promise_tests) {
        tests.promise_tests = Promise.resolve();
    }
    tests.promise_tests = tests.promise_tests.then(function() {
        return new Promise(function(resolve) {
            var promise = test.step(func, test, test);
            test.step(function() {
                assert(!!promise, "promise_test", null,
                    "test body must return a 'thenable' object (received ${value})",
                    {value:promise});
                assert(typeof promise.then === "function", "promise_test", null,
                    "test body must return a 'thenable' object (received an object with no `then` method)",
                    null);
            });
            // Test authors may use the `step` method within a
            // `promise_test` even though this reflects a mixture of
            // asynchronous control flow paradigms. The "done" callback
            // should be registered prior to the resolution of the
            // user-provided Promise to avoid timeouts in cases where the
            // Promise does not settle but a `step` function has thrown an
            // error.
            add_test_done_callback(test, resolve);
            Promise.resolve(promise)
                .catch(test.step_func(
                    function(value) {
                        if (value instanceof AssertionError) {
                            throw value;
                        }
                        assert(false, "promise_test", null,
                            ("Unhandled rejection:\n\t Name: " + name + "\n\tValue: ${value}"), {value:value});
                    }))
                .then(function() {
                    test.done();
                });
            });
    });
}

function promise_rejects(test, expected, promise, description) {
    return promise.then(test.unreached_func("Should have rejected: " + description)).catch(function(e) {
        assert_throws(expected, function() { throw e }, description);
    });
}

/**
 * This constructor helper allows DOM events to be handled using Promises,
 * which can make it a lot easier to test a very specific series of events,
 * including ensuring that unexpected events are not fired at any point.
 */
function EventWatcher(test, watchedNode, eventTypes, timeoutPromise)
{
    if (typeof eventTypes == 'string') {
        eventTypes = [eventTypes];
    }

    var waitingFor = null;

    // This is null unless we are recording all events, in which case it
    // will be an Array object.
    var recordedEvents = null;

    var eventHandler = test.step_func(function(evt) {
        assert_true(!!waitingFor,
                    'Not expecting event, but got ' + evt.type + ' event');
        assert_equals(evt.type, waitingFor.types[0],
                    'Expected ' + waitingFor.types[0] + ' event, but got ' +
                    evt.type + ' event instead');

        if (Array.isArray(recordedEvents)) {
            recordedEvents.push(evt);
        }

        if (waitingFor.types.length > 1) {
            // Pop first event from array
            waitingFor.types.shift();
            return;
        }
        // We need to null out waitingFor before calling the resolve function
        // since the Promise's resolve handlers may call wait_for() which will
        // need to set waitingFor.
        var resolveFunc = waitingFor.resolve;
        waitingFor = null;
        // Likewise, we should reset the state of recordedEvents.
        var result = recordedEvents || evt;
        recordedEvents = null;
        resolveFunc(result);
    });

    for (var i = 0; i < eventTypes.length; i++) {
        watchedNode.addEventListener(eventTypes[i], eventHandler, false);
    }

    /**
     * Returns a Promise that will resolve after the specified event or
     * series of events has occurred.
     *
     * @param options An optional options object. If the 'record' property
     *                on this object has the value 'all', when the Promise
     *                returned by this function is resolved,  *all* Event
     *                objects that were waited for will be returned as an
     *                array.
     *
     * For example,
     *
     * ```js
     * const watcher = new EventWatcher(t, div, [ 'animationstart',
     *                                            'animationiteration',
     *                                            'animationend' ]);
     * return watcher.wait_for([ 'animationstart', 'animationend' ],
     *                         { record: 'all' }).then(evts => {
     *   assert_equals(evts[0].elapsedTime, 0.0);
     *   assert_equals(evts[1].elapsedTime, 2.0);
     * });
     * ```
     */
    this.wait_for = function(xtypes, options) {
        if (waitingFor) {
            return Promise.reject('Already waiting for an event or events');
        }
        if (typeof xtypes == 'string') {
            xtypes = [xtypes];
        }
        if (options && options.record && options.record === 'all') {
            recordedEvents = [];
        }
        return new Promise(function(resolve, reject) {
            var timeout = test.step_func(function() {
                // If the timeout fires after the events have been received
                // or during a subsequent call to wait_for, ignore it.
                if (!waitingFor || waitingFor.resolve !== resolve)
                    return;

                // This should always fail, otherwise we should have
                // resolved the promise.
                assert_true(waitingFor.types.length == 0,
                            'Timed out waiting for ' + waitingFor.types.join(', '));
                var result = recordedEvents;
                recordedEvents = null;
                var resolveFunc = waitingFor.resolve;
                waitingFor = null;
                resolveFunc(result);
            });

            if (timeoutPromise) {
                timeoutPromise().then(timeout);
            }

            waitingFor = {
                types: types,
                resolve: resolve,
                reject: reject
            };
        });
    };

    function stop_watching() {
        for (var i = 0; i < eventTypes.length; i++) {
            watchedNode.removeEventListener(eventTypes[i], eventHandler, false);
        }
    };

    test._add_cleanup(stop_watching);

    return this;
}
//expose(EventWatcher, 'EventWatcher');

function setup(func_or_properties, maybe_properties)
{
    var func = null;
    var properties = {};
    if (arguments.length === 2) {
        func = func_or_properties;
        properties = maybe_properties;
    } else if (func_or_properties instanceof Function) {
        func = func_or_properties;
    } else {
        properties = func_or_properties;
    }
    tests.setup(func, properties);
    test_environment.on_new_harness_properties(properties);
}

function promise_setup(func, maybe_properties)
{
    if (typeof func !== "function") {
        tests.set_status(tests.status.ERROR,
                            "promise_test invoked without a function");
        tests.complete();
        return;
    }
    tests.promise_setup_called = true;

    if (!tests.promise_tests) {
        tests.promise_tests = Promise.resolve();
    }

    tests.promise_tests = tests.promise_tests
        .then(function()
                {
                    var properties = maybe_properties || {};
                    var result;

                    tests.setup(null, properties);
                    result = func();
                    test_environment.on_new_harness_properties(properties);

                    if (!result || typeof result.then !== "function") {
                        throw "Non-thenable returned by function passed to `promise_setup`";
                    }
                    return result;
                })
        .catch(function(e)
                {
                    tests.set_status(tests.status.ERROR,
                                    String(e),
                                    e && e.stack);
                    tests.complete();
                });
}

function done() {
    if (tests.tests.length === 0) {
        tests.set_file_is_test();
    }
    if (tests.file_is_test) {
        // file is test files never have asynchronous cleanup logic,
        // meaning the fully-synchronous `done` function can be used here.
        tests.tests[0].done();
    }
    tests.end_wait();
}

function generate_tests(func, xargs, properties) {
    forEach(xargs, function(x, i)
            {
                var name = x[0];
                test(function()
                    {
                        func.apply(this, x.slice(1));
                    },
                    name,
                    Array.isArray(properties) ? properties[i] : properties);
            });
}

function on_event(object, event, callback)
{
    object.addEventListener(event, callback, false);
}

function step_timeout(f, t) {
    var outer_this = this;
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function() {
        f.apply(outer_this, args);
    }, t * tests.timeout_multiplier);
}

//expose(test, 'test');
//expose(async_test, 'async_test');
//expose(promise_test, 'promise_test');
//expose(promise_rejects, 'promise_rejects');
//expose(generate_tests, 'generate_tests');
//expose(setup, 'setup');
//expose(done, 'done');
//expose(on_event, 'on_event');
//expose(step_timeout, 'step_timeout');

/*
* Return a string truncated to the given length, with ... added at the end
* if it was longer.
*/
function truncate(s, len)
{
    if (s.length > len) {
        return s.substring(0, len - 3) + "...";
    }
    return s;
}

/*
* Return true if object is probably a Node object.
*/
function is_node(object)
{
    // I use duck-typing instead of instanceof, because
    // instanceof doesn't work if the node is from another window (like an
    // iframe's contentWindow):
    // http://www.w3.org/Bugs/Public/show_bug.cgi?id=12295
    try {
        var has_node_properties = ("nodeType" in object &&
                                "nodeName" in object &&
                                "nodeValue" in object &&
                                "childNodes" in object);
    } catch (e) {
        // We're probably cross-origin, which means we aren't a node
        return false;
    }

    if (has_node_properties) {
        try {
            object.nodeType;
        } catch (e) {
            // The object is probably Node.prototype or another prototype
            // object that inherits from it, and not a Node instance.
            return false;
        }
        return true;
    }
    return false;
}

var replacements = {
    "0": "0",
    "1": "x01",
    "2": "x02",
    "3": "x03",
    "4": "x04",
    "5": "x05",
    "6": "x06",
    "7": "x07",
    "8": "b",
    "9": "t",
    "10": "n",
    "11": "v",
    "12": "f",
    "13": "r",
    "14": "x0e",
    "15": "x0f",
    "16": "x10",
    "17": "x11",
    "18": "x12",
    "19": "x13",
    "20": "x14",
    "21": "x15",
    "22": "x16",
    "23": "x17",
    "24": "x18",
    "25": "x19",
    "26": "x1a",
    "27": "x1b",
    "28": "x1c",
    "29": "x1d",
    "30": "x1e",
    "31": "x1f",
    "0xfffd": "ufffd",
    "0xfffe": "ufffe",
    "0xffff": "uffff",
};

/*
* Convert a value to a nice, human-readable string
*/
function format_value(val, seen)
{
    if (!seen) {
        seen = [];
    }
    if (typeof val === "object" && val !== null) {
        if (seen.indexOf(val) >= 0) {
            return "[...]";
        }
        seen.push(val);
    }
    if (Array.isArray(val)) {
        return "[" + val.join(", ") + "]";
    }

    switch (typeof val) {
    case "string":
        return val;
    case "boolean":
    case "undefined":
        return String(val);
    case "number":
        // In JavaScript, -0 === 0 and String(-0) == "0", so we have to
        // special-case.
        if (val === -0 && 1/val === -Infinity) {
            return "-0";
        }
        return String(val);
    case "object":
        if (val === null) {
            return "null";
        }

        // Special-case Node objects, since those come up a lot in my tests.  I
        // ignore namespaces.
        if (is_node(val)) {
            switch (val.nodeType) {
            case Node.ELEMENT_NODE:
                var ret = "<" + val.localName;
                for (var i = 0; i < val.attributes.length; i++) {
                    ret += " " + val.attributes[i].name + '="' + val.attributes[i].value + '"';
                }
                ret += ">" + val.innerHTML + "</" + val.localName + ">";
                return "Element node " + truncate(ret, 60);
            case Node.TEXT_NODE:
                return 'Text node "' + truncate(val.data, 60) + '"';
            case Node.PROCESSING_INSTRUCTION_NODE:
                return "ProcessingInstruction node with target " + format_value(truncate(val.target, 60)) + " and data " + format_value(truncate(val.data, 60));
            case Node.COMMENT_NODE:
                return "Comment node <!--" + truncate(val.data, 60) + "-->";
            case Node.DOCUMENT_NODE:
                return "Document node with " + val.childNodes.length + (val.childNodes.length == 1 ? " child" : " children");
            case Node.DOCUMENT_TYPE_NODE:
                return "DocumentType node";
            case Node.DOCUMENT_FRAGMENT_NODE:
                return "DocumentFragment node with " + val.childNodes.length + (val.childNodes.length == 1 ? " child" : " children");
            default:
                return "Node object of unknown type";
            }
        }

    /* falls through */
    default:
        try {
            return typeof val + truncate(String(val), 1000);
        } catch(e) {
            return ("[stringifying object threw " + String(e) +
                    " with type " + String(typeof e) + "]");
        }
    }
}
//expose(format_value, "format_value");

/*
* @id TestHarnessAssertTrue
*/
function assert_true(actual, description)
{
    assert(actual === true, "assert_true", description,
                            "expected true got ${actual}", {actual:actual});
}
//expose(assert_true, "assert_true");

/*
* @id TestHarnessAssertFalse
*/
function assert_false(actual, description)
{
    assert(actual === false, "assert_false", description,
                            "expected false got ${actual}", {actual:actual});
}
//expose(assert_false, "assert_false");

function same_value(x, y) {
    if (y !== y) {
        //NaN case
        return x !== x;
    }
    if (x === 0 && y === 0) {
        //Distinguish +0 and -0
        return 1/x === 1/y;
    }
    return x === y;
}

/*
* @id TestHarnessAssertEquals
*/
function assert_equals(actual, expected, description)
{
    /*
    * Test if two primitives are equal or two objects
    * are the same object
    */
    if (typeof actual != typeof expected) {
        assert(false, "assert_equals", description,
                    "expected (" + typeof expected + ") ${expected} but got (" + typeof actual + ") ${actual}",
                    {expected:expected, actual:actual});
        return;
    }
    assert(same_value(actual, expected), "assert_equals", description,
                                        "expected ${expected} but got ${actual}",
                                        {expected:expected, actual:actual});
}
//expose(assert_equals, "assert_equals");

/*
* @id TestHarnessAssertNotEquals
*/
function assert_not_equals(actual, expected, description)
{
    /*
    * Test if two primitives are unequal or two objects
    * are different objects
    */
    assert(!same_value(actual, expected), "assert_not_equals", description,
                                        "got disallowed value ${actual}",
                                        {actual:actual});
}
//expose(assert_not_equals, "assert_not_equals");

function assert_in_array(actual, expected, description)
{
    assert(expected.indexOf(actual) != -1, "assert_in_array", description,
                                        "value ${actual} not in array ${expected}",
                                        {actual:actual, expected:expected});
}
//expose(assert_in_array, "assert_in_array");

/*
* @id TestHarnessAssertObjectEquals
*/
function assert_object_equals(actual, expected, description)
{
    assert(typeof actual === "object" && actual !== null, "assert_object_equals", description,
                                                        "value is ${actual}, expected object",
                                                        {actual: actual});
    //This needs to be improved a great deal
    function check_equal(actual, expected, stack)
    {
        stack.push(actual);

        var p;
        for (p in actual) {
            assert(expected.hasOwnProperty(p), "assert_object_equals", description,
                                                "unexpected property ${p}", {p:p});

            if (typeof actual[p] === "object" && actual[p] !== null) {
                if (stack.indexOf(actual[p]) === -1) {
                    check_equal(actual[p], expected[p], stack);
                }
            } else {
                assert(same_value(actual[p], expected[p]), "assert_object_equals", description,
                                                "property ${p} expected ${expected} got ${actual}",
                                                {p:p, expected:expected, actual:actual});
            }
        }
        for (p in expected) {
            assert(actual.hasOwnProperty(p),
                    "assert_object_equals", description,
                    "expected property ${p} missing", {p:p});
        }
        stack.pop();
    }
    check_equal(actual, expected, []);
}
//expose(assert_object_equals, "assert_object_equals");

/*
* @id TestHarnessAssertArrayEquals
*/
function assert_array_equals(actual, expected, description)
{
    assert(typeof actual === "object" && actual !== null && "length" in actual,
        "assert_array_equals", description,
        "value is ${actual}, expected array",
        {actual:actual});
    assert(actual.length === expected.length,
        "assert_array_equals", description,
        "lengths differ, expected ${expected} got ${actual}",
        {expected:expected.length, actual:actual.length});

    for (var i = 0; i < actual.length; i++) {
        assert(actual.hasOwnProperty(i) === expected.hasOwnProperty(i),
            "assert_array_equals", description,
            "property ${i}, property expected to be ${expected} but was ${actual}",
            {i:i, expected:expected.hasOwnProperty(i) ? "present" : "missing",
            actual:actual.hasOwnProperty(i) ? "present" : "missing"});
        assert(same_value(expected[i], actual[i]),
            "assert_array_equals", description,
            "property ${i}, expected ${expected} but got ${actual}",
            {i:i, expected:expected[i], actual:actual[i]});
    }
}
//expose(assert_array_equals, "assert_array_equals");

function assert_array_approx_equals(actual, expected, epsilon, description)
{
    /*
    * Test if two primitive arrays are equal within +/- epsilon
    */
    assert(actual.length === expected.length,
        "assert_array_approx_equals", description,
        "lengths differ, expected ${expected} got ${actual}",
        {expected:expected.length, actual:actual.length});

    for (var i = 0; i < actual.length; i++) {
        assert(actual.hasOwnProperty(i) === expected.hasOwnProperty(i),
            "assert_array_approx_equals", description,
            "property ${i}, property expected to be ${expected} but was ${actual}",
            {i:i, expected:expected.hasOwnProperty(i) ? "present" : "missing",
            actual:actual.hasOwnProperty(i) ? "present" : "missing"});
        assert(typeof actual[i] === "number",
            "assert_array_approx_equals", description,
            "property ${i}, expected a number but got a ${type_actual}",
            {i:i, type_actual:typeof actual[i]});
        assert(Math.abs(actual[i] - expected[i]) <= epsilon,
            "assert_array_approx_equals", description,
            "property ${i}, expected ${expected} +/- ${epsilon}, expected ${expected} but got ${actual}",
            {i:i, expected:expected[i], actual:actual[i], epsilon:epsilon});
    }
}
////expose(assert_array_approx_equals, "assert_array_approx_equals");

function assert_approx_equals(actual, expected, epsilon, description)
{
    /*
    * Test if two primitive numbers are equal within +/- epsilon
    */
    assert(typeof actual === "number",
        "assert_approx_equals", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(Math.abs(actual - expected) <= epsilon,
        "assert_approx_equals", description,
        "expected ${expected} +/- ${epsilon} but got ${actual}",
        {expected:expected, actual:actual, epsilon:epsilon});
}
//expose(assert_approx_equals, "assert_approx_equals");

/*
* @id TestHarnessAssertLessThan
*/
function assert_less_than(actual, expected, description)
{
    /*
    * Test if a primitive number is less than another
    */
    assert(typeof actual === "number",
        "assert_less_than", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual < expected,
        "assert_less_than", description,
        "expected a number less than ${expected} but got ${actual}",
        {expected:expected, actual:actual});
}
//expose(assert_less_than, "assert_less_than");

/*
* @id TestHarnessAssertGreaterThan
*/
function assert_greater_than(actual, expected, description)
{
    /*
    * Test if a primitive number is greater than another
    */
    assert(typeof actual === "number",
        "assert_greater_than", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual > expected,
        "assert_greater_than", description,
        "expected a number greater than ${expected} but got ${actual}",
        {expected:expected, actual:actual});
}
//expose(assert_greater_than, "assert_greater_than");

function assert_between_exclusive(actual, lower, upper, description)
{
    /*
    * Test if a primitive number is between two others
    */
    assert(typeof actual === "number",
        "assert_between_exclusive", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual > lower && actual < upper,
        "assert_between_exclusive", description,
        "expected a number greater than ${lower} " +
        "and less than ${upper} but got ${actual}",
        {lower:lower, upper:upper, actual:actual});
}
//expose(assert_between_exclusive, "assert_between_exclusive");

/*
* @id TestHarnessAssertLessThanEqual
*/
function assert_less_than_equal(actual, expected, description)
{
    /*
    * Test if a primitive number is less than or equal to another
    */
    assert(typeof actual === "number",
        "assert_less_than_equal", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual <= expected,
        "assert_less_than_equal", description,
        "expected a number less than or equal to ${expected} but got ${actual}",
        {expected:expected, actual:actual});
}
//expose(assert_less_than_equal, "assert_less_than_equal");

/*
* @id TestHarnessAssertGreaterThanEqual
*/
function assert_greater_than_equal(actual, expected, description)
{
    /*
    * Test if a primitive number is greater than or equal to another
    */
    assert(typeof actual === "number",
        "assert_greater_than_equal", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual >= expected,
        "assert_greater_than_equal", description,
        "expected a number greater than or equal to ${expected} but got ${actual}",
        {expected:expected, actual:actual});
}
//expose(assert_greater_than_equal, "assert_greater_than_equal");

function assert_between_inclusive(actual, lower, upper, description)
{
    /*
    * Test if a primitive number is between to two others or equal to either of them
    */
    assert(typeof actual === "number",
        "assert_between_inclusive", description,
        "expected a number but got a ${type_actual}",
        {type_actual:typeof actual});

    assert(actual >= lower && actual <= upper,
        "assert_between_inclusive", description,
        "expected a number greater than or equal to ${lower} " +
        "and less than or equal to ${upper} but got ${actual}",
        {lower:lower, upper:upper, actual:actual});
}
//expose(assert_between_inclusive, "assert_between_inclusive");

function assert_regexp_match(actual, expected, description) {
    /*
    * Test if a string (actual) matches a regexp (expected)
    */
    assert(expected.test(actual),
        "assert_regexp_match", description,
        "expected ${expected} but got ${actual}",
        {expected:expected, actual:actual});
}
//expose(assert_regexp_match, "assert_regexp_match");

/*
* @id TestHarnessAssertClassString
*/
function assert_class_string(object, class_string, description) {
    assert_equals({}.toString.call(object), "[object " + class_string + "]",
                description);
}
//expose(assert_class_string, "assert_class_string");

/*
* @id TestHarnessAssertOwnProperty
*/
function assert_own_property(object, property_name, description) {
    assert(object.hasOwnProperty(property_name),
        "assert_own_property", description,
        "expected property ${p} missing", {p:property_name});
}
//expose(assert_own_property, "assert_own_property");

function assert_not_own_property(object, property_name, description) {
    assert(!object.hasOwnProperty(property_name),
        "assert_not_own_property", description,
        "unexpected property ${p} is found on object", {p:property_name});
}
//expose(assert_not_own_property, "assert_not_own_property");

function assert_inherits(name) {
    return function (object, property_name, description)
    {
        assert(typeof object === "object" || typeof object === "function",
            name, description,
            "provided value is not an object");

        assert("hasOwnProperty" in object,
            name, description,
            "provided value is an object but has no hasOwnProperty method");

        assert(!object.hasOwnProperty(property_name),
            name, description,
            "property ${p} found on object expected in prototype chain",
            {p:property_name});

        assert(property_name in object,
            name, description,
            "property ${p} not found in prototype chain",
            {p:property_name});
    };
}
//expose(assert_inherits("assert_inherits"), "assert_inherits");
//expose(assert_inherits("assert_idl_attribute"), "assert_idl_attribute");

function assert_readonly(object, property_name, description)
{
    var initial_value = object[property_name];
    try {
        //Note that this can have side effects in the case where
        //the property has PutForwards
        object[property_name] = initial_value + "a"; //XXX use some other value here?
        assert(same_value(object[property_name], initial_value),
                "assert_readonly", description,
                "changing property ${p} succeeded",
                {p:property_name});
    } finally {
        object[property_name] = initial_value;
    }
}
//expose(assert_readonly, "assert_readonly");

/**
 * @id TestHarnessAssertThrows
 */
function assert_throws(code, func, description)
{
    try {
        func.call(this);
        assert(false, "assert_throws", description,
            "${func} did not throw", {func:func});
    } catch (e) {
        if (e instanceof AssertionError) {
            throw e;
        }

        assert(typeof e === "object",
            "assert_throws", description,
            "${func} threw ${e} with type ${type}, not an object",
            {func:func, e:e, type:typeof e});

        assert(e !== null,
            "assert_throws", description,
            "${func} threw null, not an object",
            {func:func});

        if (code === null) {
            throw new AssertionError('Test bug: need to pass exception to assert_throws()');
        }
        if (typeof code === "object") {
            assert("name" in e && e.name == code.name,
                "assert_throws", description,
                "${func} threw ${actual} (${actual_name}) expected ${expected} (${expected_name})",
                                {func:func, actual:e, actual_name:e.name,
                                expected:code,
                                expected_name:code.name});
            return;
        }

        var code_name_map = {
            INDEX_SIZE_ERR: 'IndexSizeError',
            HIERARCHY_REQUEST_ERR: 'HierarchyRequestError',
            WRONG_DOCUMENT_ERR: 'WrongDocumentError',
            INVALID_CHARACTER_ERR: 'InvalidCharacterError',
            NO_MODIFICATION_ALLOWED_ERR: 'NoModificationAllowedError',
            NOT_FOUND_ERR: 'NotFoundError',
            NOT_SUPPORTED_ERR: 'NotSupportedError',
            INUSE_ATTRIBUTE_ERR: 'InUseAttributeError',
            INVALID_STATE_ERR: 'InvalidStateError',
            SYNTAX_ERR: 'SyntaxError',
            INVALID_MODIFICATION_ERR: 'InvalidModificationError',
            NAMESPACE_ERR: 'NamespaceError',
            INVALID_ACCESS_ERR: 'InvalidAccessError',
            TYPE_MISMATCH_ERR: 'TypeMismatchError',
            SECURITY_ERR: 'SecurityError',
            NETWORK_ERR: 'NetworkError',
            ABORT_ERR: 'AbortError',
            URL_MISMATCH_ERR: 'URLMismatchError',
            QUOTA_EXCEEDED_ERR: 'QuotaExceededError',
            TIMEOUT_ERR: 'TimeoutError',
            INVALID_NODE_TYPE_ERR: 'InvalidNodeTypeError',
            DATA_CLONE_ERR: 'DataCloneError'
        };

        var name = code in code_name_map ? code_name_map[code] : code;

        var name_code_map = {
            IndexSizeError: 1,
            HierarchyRequestError: 3,
            WrongDocumentError: 4,
            InvalidCharacterError: 5,
            NoModificationAllowedError: 7,
            NotFoundError: 8,
            NotSupportedError: 9,
            InUseAttributeError: 10,
            InvalidStateError: 11,
            SyntaxError: 12,
            InvalidModificationError: 13,
            NamespaceError: 14,
            InvalidAccessError: 15,
            TypeMismatchError: 17,
            SecurityError: 18,
            NetworkError: 19,
            AbortError: 20,
            URLMismatchError: 21,
            QuotaExceededError: 22,
            TimeoutError: 23,
            InvalidNodeTypeError: 24,
            DataCloneError: 25,

            EncodingError: 0,
            NotReadableError: 0,
            UnknownError: 0,
            ConstraintError: 0,
            DataError: 0,
            TransactionInactiveError: 0,
            ReadOnlyError: 0,
            VersionError: 0,
            OperationError: 0,
            NotAllowedError: 0
        };

        if (!(name in name_code_map)) {
            throw new AssertionError('Test bug: unrecognized DOMException code "' + code + '" passed to assert_throws()');
        }

        var required_props = { code: name_code_map[name] };

        if (required_props.code === 0 ||
        ("name" in e &&
            e.name !== e.name.toUpperCase() &&
            e.name !== "DOMException")) {
            // New style exception: also test the name property.
            required_props.name = name;
        }

        //We'd like to test that e instanceof the appropriate interface,
        //but we can't, because we don't know what window it was created
        //in.  It might be an instanceof the appropriate interface on some
        //unknown other window.

        for (var prop in required_props) {
            assert(prop in e && e[prop] == required_props[prop],
                "assert_throws", description,
                "${func} threw ${e} that is not a DOMException " + code + ": property ${prop} is equal to ${actual}, expected ${expected}",
                {func:func, e:e, prop:prop, actual:e[prop], expected:required_props[prop]});
        }
    }
}
//expose(assert_throws, "assert_throws");

    /**
     * @id TestHarnessAssertThrowsExactly
     */
    function assert_throws_exactly(exception, func, description)
    {
        assert_throws_exactly_impl(exception, func, description,
                                   "assert_throws_exactly");
    }
    //expose(assert_throws_exactly, "assert_throws_exactly");

    /**
     * Like assert_throws_exactly but allows specifying the assertion type
     * (assert_throws_exactly or promise_rejects_exactly, in practice).
     */
    function assert_throws_exactly_impl(exception, func, description,
                                        assertion_type)
    {
        try {
            func.call(this);
            assert(false, assertion_type, description,
                   "${func} did not throw", {func:func});
        } catch (e) {
            if (e instanceof AssertionError) {
                throw e;
            }

            assert(same_value(e, exception), assertion_type, description,
                   "${func} threw ${e} but we expected it to throw ${exception}",
                   {func:func, e:e, exception:exception});
        }
    }

    /**
     * @id TestHarnessAssertThrowsJs
     */
    function assert_throws_js(constructor, func, description)
    {
        assert_throws_js_impl(constructor, func, description,
                              "assert_throws_js");
    }
    //expose_assert(assert_throws_js, "assert_throws_js");

    /**
     * Like assert_throws_js but allows specifying the assertion type
     * (assert_throws_js or promise_rejects_js, in practice).
     */
    function assert_throws_js_impl(constructor, func, description,
                                   assertion_type)
    {
        try {
            func.call(this);
            assert(false, assertion_type, description,
                   "${func} did not throw", {func:func});
        } catch (e) {
            if (e instanceof AssertionError) {
                throw e;
            }

            // Basic sanity-checks on the thrown exception.
            assert(typeof e === "object",
                   assertion_type, description,
                   "${func} threw ${e} with type ${type}, not an object",
                   {func:func, e:e, type:typeof e});

            assert(e !== null,
                   assertion_type, description,
                   "${func} threw null, not an object",
                   {func:func});

            // Basic sanity-check on the passed-in constructor
            assert(typeof constructor == "function",
                   assertion_type, description,
                   "${constructor} is not a constructor",
                   {constructor:constructor});
            var obj = constructor;
            while (obj) {
                if (typeof obj === "function" &&
                    obj.name === "Error") {
                    break;
                }
                obj = Object.getPrototypeOf(obj);
            }
            assert(obj != null,
                   assertion_type, description,
                   "${constructor} is not an Error subtype",
                   {constructor:constructor});

            // And checking that our exception is reasonable
            assert(e.constructor === constructor &&
                   e.name === constructor.name,
                   assertion_type, description,
                   "${func} threw ${actual} (${actual_name}) expected instance of ${expected} (${expected_name})",
                   {func:func, actual:e, actual_name:e.name,
                    expected:constructor,
                    expected_name:constructor.name});
        }
    }

    /*
    * @id TestHarnessAssertThrowsDom
    */ 
    function assert_throws_dom(type, funcOrConstructor, descriptionOrFunc, maybeDescription)
    {
        let constructor, func, description;
        if (funcOrConstructor.name === "DOMException") {
            constructor = funcOrConstructor;
            func = descriptionOrFunc;
            description = maybeDescription;
        } else {
            //constructor = self.DOMException;
            constructor = DOMException;
            func = funcOrConstructor;
            description = descriptionOrFunc;
            assert(maybeDescription === undefined,
                   "Too many args pased to no-constructor version of assert_throws_dom");
        }
        assert_throws_dom_impl(type, func, description, "assert_throws_dom", constructor)
    }
    //expose(assert_throws_dom, "assert_throws_dom");

    /**
     * Similar to assert_throws_dom but allows specifying the assertion type
     * (assert_throws_dom or promise_rejects_dom, in practice).  The
     * "constructor" argument must be the DOMException constructor from the
     * global we expect the exception to come from.
     */
    function assert_throws_dom_impl(type, func, description, assertion_type, constructor)
    {
        try {
            func.call(this);
            assert(false, assertion_type, description,
                   "${func} did not throw", {func:func});
        } catch (e) {
            if (e instanceof AssertionError) {
                throw e;
            }

            // Basic sanity-checks on the thrown exception.
            assert(typeof e === "object",
                   assertion_type, description,
                   "${func} threw ${e} with type ${type}, not an object",
                   {func:func, e:e, type:typeof e});

            assert(e !== null,
                   assertion_type, description,
                   "${func} threw null, not an object",
                   {func:func});

            // Sanity-check our type
            assert(typeof type == "number" ||
                   typeof type == "string",
                   assertion_type, description,
                   "${type} is not a number or string",
                   {type:type});

            var codename_name_map = {
                INDEX_SIZE_ERR: 'IndexSizeError',
                HIERARCHY_REQUEST_ERR: 'HierarchyRequestError',
                WRONG_DOCUMENT_ERR: 'WrongDocumentError',
                INVALID_CHARACTER_ERR: 'InvalidCharacterError',
                NO_MODIFICATION_ALLOWED_ERR: 'NoModificationAllowedError',
                NOT_FOUND_ERR: 'NotFoundError',
                NOT_SUPPORTED_ERR: 'NotSupportedError',
                INUSE_ATTRIBUTE_ERR: 'InUseAttributeError',
                INVALID_STATE_ERR: 'InvalidStateError',
                SYNTAX_ERR: 'SyntaxError',
                INVALID_MODIFICATION_ERR: 'InvalidModificationError',
                NAMESPACE_ERR: 'NamespaceError',
                INVALID_ACCESS_ERR: 'InvalidAccessError',
                TYPE_MISMATCH_ERR: 'TypeMismatchError',
                SECURITY_ERR: 'SecurityError',
                NETWORK_ERR: 'NetworkError',
                ABORT_ERR: 'AbortError',
                URL_MISMATCH_ERR: 'URLMismatchError',
                QUOTA_EXCEEDED_ERR: 'QuotaExceededError',
                TIMEOUT_ERR: 'TimeoutError',
                INVALID_NODE_TYPE_ERR: 'InvalidNodeTypeError',
                DATA_CLONE_ERR: 'DataCloneError'
            };

            var name_code_map = {
                IndexSizeError: 1,
                HierarchyRequestError: 3,
                WrongDocumentError: 4,
                InvalidCharacterError: 5,
                NoModificationAllowedError: 7,
                NotFoundError: 8,
                NotSupportedError: 9,
                InUseAttributeError: 10,
                InvalidStateError: 11,
                SyntaxError: 12,
                InvalidModificationError: 13,
                NamespaceError: 14,
                InvalidAccessError: 15,
                TypeMismatchError: 17,
                SecurityError: 18,
                NetworkError: 19,
                AbortError: 20,
                URLMismatchError: 21,
                QuotaExceededError: 22,
                TimeoutError: 23,
                InvalidNodeTypeError: 24,
                DataCloneError: 25,

                EncodingError: 0,
                NotReadableError: 0,
                UnknownError: 0,
                ConstraintError: 0,
                DataError: 0,
                TransactionInactiveError: 0,
                ReadOnlyError: 0,
                VersionError: 0,
                OperationError: 0,
                NotAllowedError: 0
            };

            var code_name_map = {};
            for (var key in name_code_map) {
                if (name_code_map[key] > 0) {
                    code_name_map[name_code_map[key]] = key;
                }
            }

            var required_props = {};
            var name;

            if (typeof type === "number") {
                if (type === 0) {
                    throw new AssertionError('Test bug: ambiguous DOMException code 0 passed to assert_throws_dom()');
                } else if (!(type in code_name_map)) {
                    throw new AssertionError('Test bug: unrecognized DOMException code "' + type + '" passed to assert_throws_dom()');
                }
                name = code_name_map[type];
                required_props.code = type;
            } else if (typeof type === "string") {
                name = type in codename_name_map ? codename_name_map[type] : type;
                if (!(name in name_code_map)) {
                    throw new AssertionError('Test bug: unrecognized DOMException code name or name "' + type + '" passed to assert_throws_dom()');
                }

                required_props.code = name_code_map[name];
            }

            if (required_props.code === 0 ||
               ("name" in e &&
                e.name !== StringUtils.toUpperCase(e.name) &&
                e.name !== "DOMException")) {
                // New style exception: also test the name property.
                required_props.name = name;
            }

            for (var prop in required_props) {
                assert(prop in e && e[prop] == required_props[prop],
                       assertion_type, description,
                       "${func} threw ${e} that is not a DOMException " + type + ": property ${prop} is equal to ${actual}, expected ${expected}",
                       {func:func, e:e, prop:prop, actual:e[prop], expected:required_props[prop]});
            }

            // Check that the exception is from the right global.  This check is last
            // so more specific, and more informative, checks on the properties can
            // happen in case a totally incorrect exception is thrown.
            assert(e.constructor === constructor,
                   assertion_type, description,
                   "${func} threw an exception from the wrong global",
                   {func});

        }
    }

/*
 * @id TestHarnessAssertUnreached
 */
function assert_unreached(description) {
    assert(false, "assert_unreached", description,
            "Reached unreachable code");
}
//expose(assert_unreached, "assert_unreached");

function assert_any(assert_func, actual, expected_array)
{
    var args = [].slice.call(arguments, 3);
    var errors = [];
    var passed = false;
    forEach(expected_array,
            function(expected)
            {
                try {
                    assert_func.apply(this, [actual, expected].concat(args));
                    passed = true;
                } catch (e) {
                    errors.push(e.message);
                }
            });
    if (!passed) {
        throw new AssertionError(errors.join(", "));
    }
}
//expose(assert_any, "assert_any");

/**
 * Assert that a feature is implemented, based on a 'truthy' condition.
 *
 * This function should be used to early-exit from tests in which there is
 * no point continuing without support for a non-optional spec or spec
 * feature. For example:
 *
 *     assert_implements(window.Foo, 'Foo is not supported');
 *
 * @param {object} condition The truthy value to test
 * @param {string} description Error description for the case that the condition is not truthy.
 */
function assert_implements(condition, description) {
    assert(!!condition, "assert_implements", description);
}
//expose_assert(assert_implements, "assert_implements")

/**
 * Assert that an optional feature is implemented, based on a 'truthy' condition.
 *
 * This function should be used to early-exit from tests in which there is
 * no point continuing without support for an explicitly optional spec or
 * spec feature. For example:
 *
 *     assert_implements_optional(video.canPlayType("video/webm"),
 *                                "webm video playback not supported");
 *
 * @param {object} condition The truthy value to test
 * @param {string} description Error description for the case that the condition is not truthy.
 */
function assert_implements_optional(condition, description) {
    if (!condition) {
        throw new OptionalFeatureUnsupportedError(description);
    }
}
//expose_assert(assert_implements_optional, "assert_implements_optional")

/*
* @id TestharnessTestConstructor
*/
function Test(name, properties)
{
    if (tests.file_is_test && tests.tests.length) {
        throw new Error("Tried to create a test with file_is_test");
    }
    this.name = name;

    this.phase = (tests.is_aborted || tests.phase === tests.phases.COMPLETE) ?
        this.phases.COMPLETE : this.phases.INITIAL;

    this.status = this.NOTRUN;
    this.timeout_id = null;
    this.index = null;

    this.properties = properties;
    this.timeout_length = settings.test_timeout;
    if (this.timeout_length !== null) {
        this.timeout_length *= tests.timeout_multiplier;
    }

    this.message = null;
    this.stack = null;

    this.steps = [];
    this._is_promise_test = false;

    this.cleanup_callbacks = [];
    this._user_defined_cleanup_count = 0;
    console.log('going to set _done_callbacks');
    this._done_callbacks = [];
    console.log('_done_callbacks set!');

    // Tests declared following harness completion are likely an indication
    // of a programming error, but they cannot be reported
    // deterministically.
    if (tests.phase === tests.phases.COMPLETE) {
        return;
    }
    tests.push(this);
}

Test.statuses = {
    PASS:0,
    FAIL:1,
    TIMEOUT:2,
    NOTRUN:3
};

Test.prototype = merge({}, Test.statuses);

Test.prototype.phases = {
    INITIAL:0,
    STARTED:1,
    HAS_RESULT:2,
    CLEANING:3,
    COMPLETE:4
};

/*
* @id TestharnessTestStructuredClone
*/
Test.prototype.structured_clone = function()
{
    if (!this._structured_clone) {
        var msg = this.message;
        msg = msg ? String(msg) : msg;
        this._structured_clone = merge({
            name:String(this.name),
            properties:merge({}, this.properties),
            phases:merge({}, this.phases)
        }, Test.statuses);
    }
    this._structured_clone.status = this.status;
    this._structured_clone.message = this.message;
    this._structured_clone.stack = this.stack;
    this._structured_clone.index = this.index;
    this._structured_clone.phase = this.phase;
    return this._structured_clone;
};

/*
* @id TestStep
*/
Test.prototype.step = function(func, this_obj)
{
    if (this.phase > this.phases.STARTED) {
        return;
    }
    this.phase = this.phases.STARTED;
    //If we don't get a result before the harness times out that will be a test timeout
    this.set_status(this.TIMEOUT, "Test timed out");

    tests.started = true;
    tests.notify_test_state(this);

    if (this.timeout_id === null) {
        this.set_timeout();
    }

    this.steps.push(func);

    if (arguments.length === 1) {
        this_obj = this;
    }

    try {
        return func.apply(this_obj, Array.prototype.slice.call(arguments, 2));
    } catch (e) {
        throw new Error(e.message);
        if (this.phase >= this.phases.HAS_RESULT) {
            return;
        }
        var message = String((typeof e === "object" && e !== null) ? e.message : e);
        var stack = e.stack ? e.stack : null;

        this.set_status(this.FAIL, message, stack);
        this.phase = this.phases.HAS_RESULT;
        this.done();
    }
};

/*
* @id TestStepFunc
*/ 
Test.prototype.step_func = function(func, this_obj)
{
    var test_this = this;

    if (arguments.length === 1) {
        this_obj = test_this;
    }

    return function()
    {
        return test_this.step.apply(test_this, [func, this_obj].concat(
            Array.prototype.slice.call(arguments)));
    };
};

/*
* @id TestStepFuncDone
*/ 
Test.prototype.step_func_done = function(func, this_obj)
{
    var test_this = this;

    if (arguments.length === 1) {
        this_obj = test_this;
    }

    /*
    * @id TestStepFuncDoneRet
    */
    return function()
    {
        if (func) {
            test_this.step.apply(test_this, [func, this_obj].concat(
                Array.prototype.slice.call(arguments)));
        }
        test_this.done();
    };
};

/*
* @id TestUnreachedFunc
*/ 
Test.prototype.unreached_func = function(description)
{
    return this.step_func(function() {
        assert_unreached(description);
    });
};

/*
* @id TestStepTimeout
*/ 
Test.prototype.step_timeout = function(f, timeout) {
    var test_this = this;
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(this.step_func(function() {
        return f.apply(test_this, args);
    }), timeout * tests.timeout_multiplier);
}

/*
* Private method for registering cleanup functions. `testharness.js`
* internals should use this method instead of the public `add_cleanup`
* method in order to hide implementation details from the harness status
* message in the case errors.
*/
/*
* @id Test_AddCleanup
*/
Test.prototype._add_cleanup = function(callback) {
    this.cleanup_callbacks.push(callback);
};

/*
* Schedule a function to be run after the test result is known, regardless
* of passing or failing state. The behavior of this function will not
* influence the result of the test, but if an exception is thrown, the
* test harness will report an error.
*/
/*
* @id TestAddCleanup
*/
Test.prototype.add_cleanup = function(callback) {
    this._user_defined_cleanup_count += 1;
    this._add_cleanup(callback);
};

/*
* @id TestSetTimeout
*/
Test.prototype.set_timeout = function()
{
    if (this.timeout_length !== null) {
        var this_obj = this;
        this.timeout_id = setTimeout(function()
                                    {
                                        this_obj.timeout();
                                    }, this.timeout_length);
    }
};

/*
* @id TestSetStatus
*/
Test.prototype.set_status = function(status, message, stack)
{
    this.status = status;
    this.message = message;
    this.stack = stack ? stack : null;
};

/*
* @id TestTimeout
*/
Test.prototype.timeout = function()
{
    this.timeout_id = null;
    this.set_status(this.TIMEOUT, "Test timed out");
    this.phase = this.phases.HAS_RESULT;
    this.done();
};

Test.prototype.force_timeout = Test.prototype.timeout;

/**
 * Update the test status, initiate "cleanup" functions, and signal test
 * completion.
 */
/*
* @id TestDone
*/
Test.prototype.done = function()
{
    if (this.phase >= this.phases.CLEANING) {
        return;
    }

    if (this.phase <= this.phases.STARTED) {
        this.set_status(this.PASS, null);
    }

    if (global_scope.clearTimeout) {
        clearTimeout(this.timeout_id);
    }

    this.cleanup();
};

function add_test_done_callback(test, callback)
{
    if (test.phase === test.phases.COMPLETE) {
        callback();
        return;
    }

    test._done_callbacks.push(callback);
}

/*
* Invoke all specified cleanup functions. If one or more produce an error,
* the context is in an unpredictable state, so all further testing should
* be cancelled.
*/
Test.prototype.cleanup = function() {
    var error_count = 0;
    var bad_value_count = 0;
    function on_error() {
        error_count += 1;
        // Abort tests immediately so that tests declared within subsequent
        // cleanup functions are not run.
        tests.abort();
    }
    var this_obj = this;
    var results = [];

    this.phase = this.phases.CLEANING;

    forEach(this.cleanup_callbacks,
            function(cleanup_callback) {
                var result;

                try {
                    result = cleanup_callback();
                } catch (e) {
                    on_error();
                    return;
                }

                if (!is_valid_cleanup_result(this_obj, result)) {
                    bad_value_count += 1;
                    // Abort tests immediately so that tests declared
                    // within subsequent cleanup functions are not run.
                    tests.abort();
                }

                results.push(result);
            });

    if (!this._is_promise_test) {
        cleanup_done(this_obj, error_count, bad_value_count);
    } else {
        all_async(results,
                function(result, done) {
                    if (result && typeof result.then === "function") {
                        result
                            .then(null, on_error)
                            .then(done);
                    } else {
                        done();
                    }
                },
                function() {
                    cleanup_done(this_obj, error_count, bad_value_count);
                });
    }
};

/**
 * Determine if the return value of a cleanup function is valid for a given
 * test. Any test may return the value `undefined`. Tests created with
 * `promise_test` may alternatively return "thenable" object values.
 */
function is_valid_cleanup_result(test, result) {
    if (result === undefined) {
        return true;
    }

    if (test._is_promise_test) {
        return result && typeof result.then === "function";
    }

    return false;
}

function cleanup_done(test, error_count, bad_value_count) {
    if (error_count || bad_value_count) {
        var total = test._user_defined_cleanup_count;

        tests.status.status = tests.status.ERROR;
        tests.status.message = "Test named '" + test.name +
            "' specified " + total +
            " 'cleanup' function" + (total > 1 ? "s" : "");

        if (error_count) {
            tests.status.message += ", and " + error_count + " failed";
        }

        if (bad_value_count) {
            var type = test._is_promise_test ?
            "non-thenable" : "non-undefined";
            tests.status.message += ", and " + bad_value_count +
                " returned a " + type + " value";
        }

        tests.status.message += ".";

        tests.status.stack = null;
    }
    test.phase = test.phases.COMPLETE;
    tests.result(test);
    forEach(test._done_callbacks,
            function(callback) {
                callback();
            });
    test._done_callbacks.length = 0;
}

/*
* A RemoteTest object mirrors a Test object on a remote worker. The
* associated RemoteWorker updates the RemoteTest object in response to
* received events. In turn, the RemoteTest object replicates these events
* on the local document. This allows listeners (test result reporting
* etc..) to transparently handle local and remote events.
*/
function RemoteTest(clone) {
    var this_obj = this;
    Object.keys(clone).forEach(
            function(key) {
                this_obj[key] = clone[key];
            });
    this.index = null;
    this.phase = this.phases.INITIAL;
    this.update_state_from(clone);
    this._done_callbacks = [];
    tests.push(this);
}

RemoteTest.prototype.structured_clone = function() {
    var clone = {};
    Object.keys(this).forEach(
            (function(key) {
                var value = this[key];
                // `RemoteTest` instances are responsible for managing
                // their own "done" callback functions, so those functions
                // are not relevant in other execution contexts. Because of
                // this (and because Function values cannot be serialized
                // for cross-realm transmittance), the property should not
                // be considered when cloning instances.
                if (key === '_done_callbacks' ) {
                    return;
                }

                if (typeof value === "object" && value !== null) {
                    clone[key] = merge({}, value);
                } else {
                    clone[key] = value;
                }
            }).bind(this));
    clone.phases = merge({}, this.phases);
    return clone;
};

/**
 * `RemoteTest` instances are objects which represent tests running in
 * another realm. They do not define "cleanup" functions (if necessary,
 * such functions are defined on the associated `Test` instance within the
 * external realm). However, `RemoteTests` may have "done" callbacks (e.g.
 * as attached by the `Tests` instance responsible for tracking the overall
 * test status in the parent realm). The `cleanup` method delegates to
 * `done` in order to ensure that such callbacks are invoked following the
 * completion of the `RemoteTest`.
 */
RemoteTest.prototype.cleanup = function() {
    this.done();
};
RemoteTest.prototype.phases = Test.prototype.phases;
RemoteTest.prototype.update_state_from = function(clone) {
    this.status = clone.status;
    this.message = clone.message;
    this.stack = clone.stack;
    if (this.phase === this.phases.INITIAL) {
        this.phase = this.phases.STARTED;
    }
};
RemoteTest.prototype.done = function() {
    this.phase = this.phases.COMPLETE;

    forEach(this._done_callbacks,
            function(callback) {
                callback();
            });
}

/*
* @id RemoteContext
*/
function RemoteContext(remote, message_target, message_filter) {
    this.running = true;
    this.started = false;
    this.tests = new Array();
    this.early_exception = null;

    var this_obj = this;
    // If remote context is cross origin assigning to onerror is not
    // possible, so silently catch those errors.
    try {
    remote.onerror = function(errorobj) { this_obj.remote_error(errorobj); };
    } catch (e) {
    // Ignore.
    }

    // Keeping a reference to the remote object and the message handler until
    // remote_done() is seen prevents the remote object and its message channel
    // from going away before all the messages are dispatched.
    this.remote = remote;
    this.message_target = message_target;
    this.message_handler = function(message) {
        var passesFilter = !message_filter || message_filter(message);
        // The reference to the `running` property in the following
        // condition is unnecessary because that value is only set to
        // `false` after the `message_handler` function has been
        // unsubscribed.
        if (this_obj.running && message.data && passesFilter &&
            (message.data.type in this_obj.message_handlers)) {
            this_obj.message_handlers[message.data.type].call(this_obj, message.data);
        }
    };

    if (__self.Promise) {
        this.done = new Promise(function(resolve) {
            this_obj.doneResolve = resolve;
        });
    }

    this.message_target.addEventListener("message", this.message_handler);
}

RemoteContext.prototype.remote_error = function(errorobj) {
    if (errorobj.preventDefault) {
        errorobj.preventDefault();
    }

    // Defer interpretation of errors until the testing protocol has
    // started and the remote test's `allow_uncaught_exception` property
    // is available.
    if (!this.started) {
        this.early_exception = errorobj;
    } else if (!this.allow_uncaught_exception) {
        this.report_uncaught(errorobj);
    }
};

RemoteContext.prototype.report_uncaught = function(errorobj) {
    var message = errorobj.message || String(errorobj);
    var filename = (errorobj.filename ? " " + errorobj.filename: "");
    // FIXME: Display remote error states separately from main document
    // error state.
    tests.set_status(tests.status.ERROR,
                    "Error in remote" + filename + ": " + message,
                    errorobj.stack);
};

RemoteContext.prototype.start = function(data) {
    this.started = true;
    this.allow_uncaught_exception = data.properties.allow_uncaught_exception;

    if (this.early_exception && !this.allow_uncaught_exception) {
        this.report_uncaught(this.early_exception);
    }
};

RemoteContext.prototype.test_state = function(data) {
    var remote_test = this.tests[data.test.index];
    if (!remote_test) {
        remote_test = new RemoteTest(data.test);
        this.tests[data.test.index] = remote_test;
    }
    remote_test.update_state_from(data.test);
    tests.notify_test_state(remote_test);
};

RemoteContext.prototype.test_done = function(data) {
    var remote_test = this.tests[data.test.index];
    remote_test.update_state_from(data.test);
    remote_test.done();
    tests.result(remote_test);
};

RemoteContext.prototype.remote_done = function(data) {
    if (tests.status.status === null &&
        data.status.status !== data.status.OK) {
        tests.set_status(data.status.status, data.status.message, data.status.sack);
    }

    this.message_target.removeEventListener("message", this.message_handler);
    this.running = false;

    // If remote context is cross origin assigning to onerror is not
    // possible, so silently catch those errors.
    try {
    this.remote.onerror = null;
    } catch (e) {
    // Ignore.
    }

    this.remote = null;
    this.message_target = null;
    if (this.doneResolve) {
        this.doneResolve();
    }

    if (tests.all_done()) {
        tests.complete();
    }
};

RemoteContext.prototype.message_handlers = {
    start: RemoteContext.prototype.start,
    test_state: RemoteContext.prototype.test_state,
    result: RemoteContext.prototype.test_done,
    complete: RemoteContext.prototype.remote_done
};

/*
* Harness
*/

function TestsStatus()
{
    this.status = null;
    this.message = null;
    this.stack = null;
}

TestsStatus.statuses = {
    OK:0,
    ERROR:1,
    TIMEOUT:2
};

TestsStatus.prototype = merge({}, TestsStatus.statuses);

TestsStatus.prototype.structured_clone = function()
{
    if (!this._structured_clone) {
        var msg = this.message;
        msg = msg ? String(msg) : msg;
        this._structured_clone = merge({
            status:this.status,
            message:msg,
            stack:this.stack
        }, TestsStatus.statuses);
    }
    return this._structured_clone;
};

function Tests()
{
    this.tests = [];
    this.num_pending = 0;

    this.phases = {
        INITIAL:0,
        SETUP:1,
        HAVE_TESTS:2,
        HAVE_RESULTS:3,
        COMPLETE:4
    };
    this.phase = this.phases.INITIAL;

    this.properties = {};

    this.wait_for_finish = false;
    this.processing_callbacks = false;

    this.allow_uncaught_exception = false;

    this.file_is_test = false;

    this.timeout_multiplier = 1;
    this.timeout_length = test_environment.test_timeout();
    this.timeout_id = null;

    this.start_callbacks = [];
    this.test_state_callbacks = [];
    this.test_done_callbacks = [];
    this.all_done_callbacks = [];

    this.pending_remotes = [];

    this.status = new TestsStatus();

    var this_obj = this;

    test_environment.add_on_loaded_callback(function() {
        if (this_obj.all_done()) {
            this_obj.complete();
        }
    });

    this.set_timeout();
}

Tests.prototype.setup = function(func, properties)
{
    if (this.phase >= this.phases.HAVE_RESULTS) {
        return;
    }

    if (this.phase < this.phases.SETUP) {
        this.phase = this.phases.SETUP;
    }

    this.properties = properties;

    for (var p in properties) {
        if (properties.hasOwnProperty(p)) {
            var value = properties[p];
            if (p == "allow_uncaught_exception") {
                this.allow_uncaught_exception = value;
            } else if (p == "explicit_done" && value) {
                this.wait_for_finish = true;
            } else if (p == "explicit_timeout" && value) {
                this.timeout_length = null;
                if (this.timeout_id)
                {
                    clearTimeout(this.timeout_id);
                }
            } else if (p == "timeout_multiplier") {
                this.timeout_multiplier = value;
                if (this.timeout_length) {
                    this.timeout_length *= this.timeout_multiplier;
                }
            }
        }
    }

    if (func) {
        try {
            func();
        } catch (e) {
            this.status.status = this.status.ERROR;
            this.status.message = String(e);
            this.status.stack = e.stack ? e.stack : null;
        }
    }
    this.set_timeout();
};

Tests.prototype.set_file_is_test = function() {
    if (this.tests.length > 0) {
        throw new Error("Tried to set file as test after creating a test");
    }
    this.wait_for_finish = true;
    this.file_is_test = true;
    // Create the test, which will add it to the list of tests
    async_test();
};

Tests.prototype.set_status = function(status, message, stack)
{
    this.status.status = status;
    this.status.message = message;
    this.status.stack = stack ? stack : null;
};

Tests.prototype.set_timeout = function() {
    if (global_scope.clearTimeout) {
        var this_obj = this;
        clearTimeout(this.timeout_id);
        if (this.timeout_length !== null) {
            this.timeout_id = setTimeout(function() {
                                            this_obj.timeout();
                                        }, this.timeout_length);
        }
    }
};

Tests.prototype.timeout = function() {
    var test_in_cleanup = null;

    if (this.status.status === null) {
        forEach(this.tests,
                function(test) {
                    // No more than one test is expected to be in the
                    // "CLEANUP" phase at any time
                    if (test.phase === test.phases.CLEANING) {
                        test_in_cleanup = test;
                    }
                    test.phase = test.phases.COMPLETE;
                });

        // Timeouts that occur while a test is in the "cleanup" phase
        // indicate that some global state was not properly reverted. This
        // invalidates the overall test execution, so the timeout should be
        // reported as an error and cancel the execution of any remaining
        // tests.
        if (test_in_cleanup) {
            this.status.status = this.status.ERROR;
            this.status.message = "Timeout while running cleanup for " +
                "test named " + test_in_cleanup.name + ".";
            tests.status.stack = null;
        } else {
            this.status.status = this.status.TIMEOUT;
        }
    }

    this.complete();
};

Tests.prototype.end_wait = function()
{
    this.wait_for_finish = false;
    if (this.all_done()) {
        this.complete();
    }
};

/*
* @id TestharnessTestsPush
*/
Tests.prototype.push = function(test)
{
    if (this.phase < this.phases.HAVE_TESTS) {
        this.start();
    }
    this.num_pending++;
    test.index = this.tests.push(test);
    this.notify_test_state(test);
};

Tests.prototype.notify_test_state = function(test) {
    var this_obj = this;
    forEach(this.test_state_callbacks,
            function(callback) {
                callback(test, this_obj);
            });
};

Tests.prototype.all_done = function() {
    return this.tests.length > 0 && test_environment.all_loaded &&
            (this.num_pending === 0 || this.is_aborted) && !this.wait_for_finish &&
            !this.processing_callbacks &&
            !this.pending_remotes.some(function(w) { return w.running; });
};

Tests.prototype.start = function() {
    this.phase = this.phases.HAVE_TESTS;
    this.notify_start();
};

Tests.prototype.notify_start = function() {
    var this_obj = this;
    forEach (this.start_callbacks,
            function(callback)
            {
                callback(this_obj.properties);
            });
};

Tests.prototype.result = function(test)
{
    // If the harness has already transitioned beyond the `HAVE_RESULTS`
    // phase, subsequent tests should not cause it to revert.
    if (this.phase <= this.phases.HAVE_RESULTS) {
        this.phase = this.phases.HAVE_RESULTS;
    }
    this.num_pending--;
    this.notify_result(test);
};

Tests.prototype.notify_result = function(test) {
    var this_obj = this;
    this.processing_callbacks = true;
    forEach(this.test_done_callbacks,
            function(callback)
            {
                callback(test, this_obj);
            });
    this.processing_callbacks = false;
    if (this_obj.all_done()) {
        this_obj.complete();
    }
};

Tests.prototype.complete = function() {
    if (this.phase === this.phases.COMPLETE) {
        return;
    }
    var this_obj = this;
    var all_complete = function() {
        this_obj.phase = this_obj.phases.COMPLETE;
        this_obj.notify_complete();
    };
    var incomplete = filter(this.tests,
                            function(test) {
                                return test.phase < test.phases.COMPLETE;
                            });

    /**
     * To preserve legacy behavior, overall test completion must be
     * signaled synchronously.
     */
    if (incomplete.length === 0) {
        all_complete();
        return;
    }

    all_async(incomplete,
            function(test, testDone)
            {
                if (test.phase === test.phases.INITIAL) {
                    test.phase = test.phases.COMPLETE;
                    testDone();
                } else {
                    add_test_done_callback(test, testDone);
                    test.cleanup();
                }
            },
            all_complete);
};

/**
 * Update the harness status to reflect an unrecoverable harness error that
 * should cancel all further testing. Update all previously-defined tests
 * which have not yet started to indicate that they will not be executed.
 */
Tests.prototype.abort = function() {
    this.status.status = this.status.ERROR;
    this.is_aborted = true;

    forEach(this.tests,
            function(test) {
                if (test.phase === test.phases.INITIAL) {
                    test.phase = test.phases.COMPLETE;
                }
            });
};

/*
* Determine if any tests share the same `name` property. Return an array
* containing the names of any such duplicates.
*/
Tests.prototype.find_duplicates = function() {
    var names = Object.create(null);
    var duplicates = [];

    forEach (this.tests,
            function(test)
            {
                if (test.name in names && duplicates.indexOf(test.name) === -1) {
                    duplicates.push(test.name);
                }
                names[test.name] = true;
            });

    return duplicates;
};

function code_unit_str(char) {
    return 'U+' + char.charCodeAt(0).toString(16);
}

function sanitize_unpaired_surrogates(str) {
    return str
}

function sanitize_all_unpaired_surrogates(tests) {
    forEach (tests,
            function (test)
            {
                var sanitized = sanitize_unpaired_surrogates(test.name);

                if (test.name !== sanitized) {
                    test.name = sanitized;
                    delete test._structured_clone;
                }
            });
}

Tests.prototype.notify_complete = function() {
    var this_obj = this;
    var duplicates;

    if (this.status.status === null) {
        duplicates = this.find_duplicates();

        // Some transports adhere to UTF-8's restriction on unpaired
        // surrogates. Sanitize the titles so that the results can be
        // consistently sent via all transports.
        sanitize_all_unpaired_surrogates(this.tests);

        // Test names are presumed to be unique within test files--this
        // allows consumers to use them for identification purposes.
        // Duplicated names violate this expectation and should therefore
        // be reported as an error.
        if (duplicates.length) {
            this.status.status = this.status.ERROR;
            this.status.message =
            duplicates.length + ' duplicate test name' +
            (duplicates.length > 1 ? 's' : '') + ': "' +
            duplicates.join('", "') + '"';
        } else {
            this.status.status = this.status.OK;
        }
    }

    forEach (this.all_done_callbacks,
            function(callback)
            {
                callback(this_obj.tests, this_obj.status);
            });
};

/*
* Constructs a RemoteContext that tracks tests from a specific worker.
*/
Tests.prototype.create_remote_worker = function(worker) {
    var message_port;

    /*if (is_service_worker(worker)) {
        if (window.MessageChannel) {
            // The ServiceWorker's implicit MessagePort is currently not
            // reliably accessible from the ServiceWorkerGlobalScope due to
            // Blink setting MessageEvent.source to null for messages sent
            // via ServiceWorker.postMessage(). Until that's resolved,
            // create an explicit MessageChannel and pass one end to the
            // worker.
            var message_channel = new MessageChannel();
            message_port = message_channel.port1;
            message_port.start();
            worker.postMessage({type: "connect"}, [message_channel.port2]);
        } else {
            // If MessageChannel is not available, then try the
            // ServiceWorker.postMessage() approach using MessageEvent.source
            // on the other end.
            message_port = navigator.serviceWorker;
            worker.postMessage({type: "connect"});
        }
    } else */
    if (is_shared_worker(worker)) {
        message_port = worker.port;
        message_port.start();
    } else {
        message_port = worker;
    }

    return new RemoteContext(worker, message_port);
};

/*
* Constructs a RemoteContext that tracks tests from a specific window.
*/
Tests.prototype.create_remote_window = function(remote) {
    remote.postMessage({type: "getmessages"}, "*");
    return new RemoteContext(
        remote,
        window,
        function(msg) {
            return msg.source === remote;
        }
    );
};

Tests.prototype.fetch_tests_from_worker = function(worker) {
    if (this.phase >= this.phases.COMPLETE) {
        return;
    }

    var remoteContext = this.create_remote_worker(worker);
    this.pending_remotes.push(remoteContext);
    return remoteContext.done;
};

function fetch_tests_from_worker(port) {
    return tests.fetch_tests_from_worker(port);
}
//expose(fetch_tests_from_worker, 'fetch_tests_from_worker');

Tests.prototype.fetch_tests_from_window = function(remote) {
    if (this.phase >= this.phases.COMPLETE) {
        return;
    }

    this.pending_remotes.push(this.create_remote_window(remote));
};

function fetch_tests_from_window(window) {
    tests.fetch_tests_from_window(window);
}
//expose(fetch_tests_from_window, 'fetch_tests_from_window');

function timeout() {
    if (tests.timeout_length === null) {
        tests.timeout();
    }
}
//expose(timeout, 'timeout');

function add_start_callback(callback) {
    tests.start_callbacks.push(callback);
}

function add_test_state_callback(callback) {
    tests.test_state_callbacks.push(callback);
}

function add_result_callback(callback) {
    tests.test_done_callbacks.push(callback);
}

function add_completion_callback(callback) {
    tests.all_done_callbacks.push(callback);
}

//expose(add_start_callback, 'add_start_callback');
//expose(add_test_state_callback, 'add_test_state_callback');
//expose(add_result_callback, 'add_result_callback');
//expose(add_completion_callback, 'add_completion_callback');

function remove(array, item) {
    var index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function remove_start_callback(callback) {
    remove(tests.start_callbacks, callback);
}

function remove_test_state_callback(callback) {
    remove(tests.test_state_callbacks, callback);
}

function remove_result_callback(callback) {
    remove(tests.test_done_callbacks, callback);
}

function remove_completion_callback(callback) {
remove(tests.all_done_callbacks, callback);
}

/*
* @id TestharnessOutputConstructor
*/

function Output() {
    this.output_document = document;
    this.output_node = null;
    this.enabled = settings.output;
    this.phase = this.INITIAL;
}

Output.prototype.INITIAL = 0;
Output.prototype.STARTED = 1;
Output.prototype.HAVE_RESULTS = 2;
Output.prototype.COMPLETE = 3;

Output.prototype.setup = function(properties) {
    if (this.phase > this.INITIAL) {
        return;
    }

    //If output is disabled in testharnessreport.js the test shouldn't be
    //able to override that
    this.enabled = this.enabled && (properties.hasOwnProperty("output") ?
                                    properties.output : settings.output);
};

Output.prototype.init = function(properties) {
    if (this.phase >= this.STARTED) {
        return;
    }
    if (properties.output_document) {
        this.output_document = properties.output_document;
    } else {
        this.output_document = document;
    }
    this.phase = this.STARTED;
};

Output.prototype.resolve_log = function() {
    var output_document;
    if (this.output_node) {
        return;
    }
    if (typeof this.output_document === "function") {
        output_document = this.output_document.apply(undefined);
    } else {
        output_document = this.output_document;
    }
    if (!output_document) {
        return;
    }
    var node = output_document.getElementById("log");
    if (!node) {
        if (output_document.readyState === "loading") {
            return;
        }
        node = output_document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        node.id = "log";
        if (output_document.body) {
            output_document.body.appendChild(node);
        } else {
            var root = output_document.documentElement;
            var is_html = (root &&
                        root.namespaceURI == "http://www.w3.org/1999/xhtml" &&
                        root.localName == "html");
            var is_svg = (output_document.defaultView &&
                        "SVGSVGElement" in output_document.defaultView &&
                        root instanceof output_document.defaultView.SVGSVGElement);
            if (is_svg) {
                var foreignObject = output_document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
                foreignObject.setAttribute("width", "100%");
                foreignObject.setAttribute("height", "100%");
                root.appendChild(foreignObject);
                foreignObject.appendChild(node);
            } else if (is_html) {
                root.appendChild(output_document.createElementNS("http://www.w3.org/1999/xhtml", "body"))
                    .appendChild(node);
            } else {
                root.appendChild(node);
            }
        }
    }
    this.output_document = output_document;
    this.output_node = node;
};

Output.prototype.show_status = function() {
    if (this.phase < this.STARTED) {
        this.init();
    }
    if (!this.enabled || this.phase === this.COMPLETE) {
        return;
    }
    this.resolve_log();
    if (this.phase < this.HAVE_RESULTS) {
        this.phase = this.HAVE_RESULTS;
    }
    var done_count = tests.tests.length - tests.num_pending;
    if (this.output_node) {
        if (done_count < 100 ||
            (done_count < 1000 && done_count % 100 === 0) ||
            done_count % 1000 === 0) {
            this.output_node.textContent = "Running, " +
                done_count + " complete, " +
                tests.num_pending + " remain";
        }
    }
};

Output.prototype.show_results = function (tests, harness_status) {
    if (this.phase >= this.COMPLETE) {
        return;
    }
    if (!this.enabled) {
        return;
    }
    if (!this.output_node) {
        this.resolve_log();
    }
    this.phase = this.COMPLETE;

    var log = this.output_node;
    if (!log) {
        return;
    }
    var output_document = this.output_document;

    while (log.lastChild) {
        log.removeChild(log.lastChild);
    }

    var stylesheet = output_document.createElementNS(xhtml_ns, "style");
    stylesheet.textContent = stylesheetContent;
    var heads = output_document.getElementsByTagName("head");
    if (heads.length) {
        heads[0].appendChild(stylesheet);
    }

    var status_text_harness = {};
    status_text_harness[harness_status.OK] = "OK";
    status_text_harness[harness_status.ERROR] = "Error";
    status_text_harness[harness_status.TIMEOUT] = "Timeout";

    var status_text = {};
    status_text[Test.prototype.PASS] = "Pass";
    status_text[Test.prototype.FAIL] = "Fail";
    status_text[Test.prototype.TIMEOUT] = "Timeout";
    status_text[Test.prototype.NOTRUN] = "Not Run";

    var status_number = {};
    forEach(tests,
            function(test) {
                var status = status_text[test.status];
                if (status_number.hasOwnProperty(status)) {
                    status_number[status] += 1;
                } else {
                    status_number[status] = 1;
                }
            });

    function status_class(status)
    {
        return status
    }

    var summary_template = ["section", {"id":"summary"},
                            ["h2", {}, "Summary"],
                            function()
                            {

                                var status = status_text_harness[harness_status.status];
                                var rv = [["section", {},
                                        ["p", {},
                                            "Harness status: ",
                                            ["span", {"class":status_class(status)},
                                            status
                                            ],
                                        ]
                                        ]];

                                if (harness_status.status === harness_status.ERROR) {
                                    rv[0].push(["pre", {}, harness_status.message]);
                                    if (harness_status.stack) {
                                        rv[0].push(["pre", {}, harness_status.stack]);
                                    }
                                }
                                return rv;
                            },
                            ["p", {}, "Found ${num_tests} tests"],
                            function() {
                                var rv = [["div", {}]];
                                var i = 0;
                                while (status_text.hasOwnProperty(i)) {
                                    if (status_number.hasOwnProperty(status_text[i])) {
                                        var status = status_text[i];
                                        rv[0].push(["div", {"class":status_class(status)},
                                                    ["label", {},
                                                    ["input", {type:"checkbox", checked:"checked"}],
                                                    status_number[status] + " " + status]]);
                                    }
                                    i++;
                                }
                                return rv;
                            },
                        ];

    log.appendChild(render(summary_template, {num_tests:tests.length}, output_document));

    forEach(output_document.querySelectorAll("section#summary label"),
            function(element)
            {
                on_event(element, "click",
                        function(e)
                        {
                            if (output_document.getElementById("results") === null) {
                                e.preventDefault();
                                return;
                            }
                            var result_class = element.parentNode.getAttribute("class");
                            var style_element = output_document.querySelector("style#hide-" + result_class);
                            var input_element = element.querySelector("input");
                            if (!style_element && !input_element.checked) {
                                style_element = output_document.createElementNS(xhtml_ns, "style");
                                style_element.id = "hide-" + result_class;
                                style_element.textContent = "table#results > tbody > tr."+result_class+"{display:none}";
                                output_document.body.appendChild(style_element);
                            } else if (style_element && input_element.checked) {
                                style_element.parentNode.removeChild(style_element);
                            }
                        });
            });

    // This use of innerHTML plus manual escaping is not recommended in
    // general, but is necessary here for performance.  Using textContent
    // on each individual <td> adds tens of seconds of execution time for
    // large test suites (tens of thousands of tests).
    function escape_html(s)
    {
        return s
    }

    function has_assertions()
    {
        for (var i = 0; i < tests.length; i++) {
            if (tests[i].properties.hasOwnProperty("assert")) {
                return true;
            }
        }
        return false;
    }

    function get_assertion(test)
    {
        if (test.properties.hasOwnProperty("assert")) {
            if (Array.isArray(test.properties.assert)) {
                return test.properties.assert.join(' ');
            }
            return test.properties.assert;
        }
        return '';
    }

    log.appendChild(document.createElementNS(xhtml_ns, "section"));
    var assertions = has_assertions();
    var html = "<h2>Details</h2><table id='results' " + (assertions ? "class='assertions'" : "" ) + ">" +
        "<thead><tr><th>Result</th><th>Test Name</th>" +
        (assertions ? "<th>Assertion</th>" : "") +
        "<th>Message</th></tr></thead>" +
        "<tbody>";
    for (var i = 0; i < tests.length; i++) {
        html += '<tr class="' +
            escape_html(status_class(status_text[tests[i].status])) +
            '"><td>' +
            escape_html(status_text[tests[i].status]) +
            "</td><td>" +
            escape_html(tests[i].name) +
            "</td><td>" +
            (assertions ? escape_html(get_assertion(tests[i])) + "</td><td>" : "") +
            escape_html(tests[i].message ? tests[i].message : " ") +
            (tests[i].stack ? "<pre>" +
            escape_html(tests[i].stack) +
            "</pre>": "") +
            "</td></tr>";
    }
    html += "</tbody></table>";
    try {
        log.lastChild.innerHTML = html;
    } catch (e) {
        log.appendChild(document.createElementNS(xhtml_ns, "p"))
        .textContent = "Setting innerHTML for the log threw an exception.";
        log.appendChild(document.createElementNS(xhtml_ns, "pre"))
        .textContent = html;
    }
};

/*
* Template code
*
* A template is just a JavaScript structure. An element is represented as:
*
* [tag_name, {attr_name:attr_value}, child1, child2]
*
* the children can either be strings (which act like text nodes), other templates or
* functions (see below)
*
* A text node is represented as
*
* ["{text}", value]
*
* String values have a simple substitution syntax; ${foo} represents a variable foo.
*
* It is possible to embed logic in templates by using a function in a place where a
* node would usually go. The function must either return part of a template or null.
*
* In cases where a set of nodes are required as output rather than a single node
* with children it is possible to just use a list
* [node1, node2, node3]
*
* Usage:
*
* render(template, substitutions) - take a template and an object mapping
* variable names to parameters and return either a DOM node or a list of DOM nodes
*
* substitute(template, substitutions) - take a template and variable mapping object,
* make the variable substitutions and return the substituted template
*
*/

function is_single_node(template)
{
    return typeof template[0] === "string";
}

function substitute(template, substitutions)
{
    if (typeof template === "function") {
        var replacement = template(substitutions);
        if (!replacement) {
            return null;
        }

        return substitute(replacement, substitutions);
    }

    if (is_single_node(template)) {
        return substitute_single(template, substitutions);
    }

    return filter(map(template, function(x) {
                        return substitute(x, substitutions);
                    }), function(x) {return x !== null;});
}

function substitute_single(template, substitutions)
{
//var substitution_re = /\$\{([^ }]*)\}/g;

function splitSubstitutionRe(input){
    var dolar = input.indexOf("$");
    var open = input.indexOf("{");
    var close = input.indexOf("}");
    if(input.length < 3 || dolar === -1 || open === -1 || close === -1){
        return [input];
    }
    if(open === dolar+1){
        var prev = input.substring(0, dolar);
        var innerText = input.substring(open+1, close);
        return [prev, innerText].concat(splitSubstitutionRe(input.substring(close+1), input.length));
    }
}

function do_substitution(input) {
    //var components = input.split(substitution_re);
    var components = splitSubstitutionRe(input);
    var rv = [];
    for (var i = 0; i < components.length; i += 2) {
        rv.push(components[i]);
        if (components[i + 1]) {
            rv.push(String(substitutions[components[i + 1]]));
        }
    }
    return rv;
}

    function substitute_attrs(attrs, rv)
    {
        rv[1] = {};
        for (var name in template[1]) {
            if (attrs.hasOwnProperty(name)) {
                var new_name = do_substitution(name).join("");
                var new_value = do_substitution(attrs[name]).join("");
                rv[1][new_name] = new_value;
            }
        }
    }

    function substitute_children(children, rv)
    {
        for (var i = 0; i < children.length; i++) {
            if (children[i] instanceof Object) {
                var replacement = substitute(children[i], substitutions);
                if (replacement !== null) {
                    if (is_single_node(replacement)) {
                        rv.push(replacement);
                    } else {
                        extend(rv, replacement);
                    }
                }
            } else {
                extend(rv, do_substitution(String(children[i])));
            }
        }
        return rv;
    }

    var rv = [];
    rv.push(do_substitution(String(template[0])).join(""));

    if (template[0] === "{text}") {
        substitute_children(template.slice(1), rv);
    } else {
        substitute_attrs(template[1], rv);
        substitute_children(template.slice(2), rv);
    }

    return rv;
}

function make_dom_single(template, doc)
{
    var output_document = doc || document;
    var element;
    if (template[0] === "{text}") {
        element = output_document.createTextNode("");
        for (var i = 1; i < template.length; i++) {
            element.data += template[i];
        }
    } else {
        element = output_document.createElementNS(xhtml_ns, template[0]);
        for (var name in template[1]) {
            if (template[1].hasOwnProperty(name)) {
                element.setAttribute(name, template[1][name]);
            }
        }
        for (var i = 2; i < template.length; i++) {
            if (template[i] instanceof Object) {
                var sub_element = make_dom(template[i]);
                element.appendChild(sub_element);
            } else {
                var text_node = output_document.createTextNode(template[i]);
                element.appendChild(text_node);
            }
        }
    }

    return element;
}

function make_dom(template, substitutions, output_document)
{
    if (is_single_node(template)) {
        return make_dom_single(template, output_document);
    }

    return map(template, function(x) {
                return make_dom_single(x, output_document);
            });
}

function render(template, substitutions, output_document)
{
    return make_dom(substitute(template, substitutions), output_document);
}

/*
* @id TestHarnessAssert
*/
function assert(expected_true, function_name, description, errorobj, substitutions)
{
    if (tests.tests.length === 0) {
        tests.set_file_is_test();
    }
    if (expected_true !== true) {
        var msg = make_message(function_name, description,
        errorobj, substitutions);
        console.log("TestHarness: assert error: " + msg);
        throw new AssertionError(msg);
    }
}

function AssertionError(message)
{
    this.message = message;
    this.stack = this.get_stack();
}
//expose(AssertionError, "AssertionError");

AssertionError.prototype = Object.create(Error.prototype);

AssertionError.prototype.get_stack = function() {
    var stack = new Error().stack;
    // IE11 does not initialize 'Error.stack' until the object is thrown.
    if (!stack) {
        try {
            throw new Error();
        } catch (e) {
            stack = e.stack;
        }
    }

    // 'Error.stack' is not supported in all browsers/versions
    if (!stack) {
        return "(Stack trace unavailable)";
    }
    return [];
}

function OptionalFeatureUnsupportedError(message)
{
    AssertionError.call(this, message);
}
OptionalFeatureUnsupportedError.prototype = Object.create(AssertionError.prototype);
//expose(OptionalFeatureUnsupportedError, "OptionalFeatureUnsupportedError");

function make_message(function_name, description, errorobj, substitutions)
{
    for (var p in substitutions) {
        if (substitutions.hasOwnProperty(p)) {
            substitutions[p] = format_value(substitutions[p]);
        }
    }
    var node_form = substitute(["{text}", "${function_name}: ${description}" + errorobj],
                            merge({function_name:function_name,
                                    description:(description?description + " ":"")},
                                    substitutions));
    return node_form.slice(1).join("");
}

function filter(array, callable, thisObj) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
        if (array.hasOwnProperty(i)) {
            var pass = callable.call(thisObj, array[i], i, array);
            if (pass) {
                rv.push(array[i]);
            }
        }
    }
    return rv;
}

function map(array, callable, thisObj)
{
    var rv = [];
    rv.length = array.length;
    for (var i = 0; i < array.length; i++) {
        if (array.hasOwnProperty(i)) {
            rv[i] = callable.call(thisObj, array[i], i, array);
        }
    }
    return rv;
}

function extend(array, items)
{
    Array.prototype.push.apply(array, items);
}

function forEach(array, callback, thisObj)
{
    for (var i = 0; i < array.length; i++) {
        if (array.hasOwnProperty(i)) {
            callback.call(thisObj, array[i], i, array);
        }
    }
}

/**
 * Immediately invoke a "iteratee" function with a series of values in
 * parallel and invoke a final "done" function when all of the "iteratee"
 * invocations have signaled completion.
 *
 * If all callbacks complete synchronously (or if no callbacks are
 * specified), the `done_callback` will be invoked synchronously. It is the
 * responsibility of the caller to ensure asynchronicity in cases where
 * that is desired.
 *
 * @param {array} value Zero or more values to use in the invocation of
 *                      `iter_callback`
 * @param {function} iter_callback A function that will be invoked once for
 *                                 each of the provided `values`. Two
 *                                 arguments will be available in each
 *                                 invocation: the value from `values` and
 *                                 a function that must be invoked to
 *                                 signal completion
 * @param {function} done_callback A function that will be invoked after
 *                                 all operations initiated by the
 *                                 `iter_callback` function have signaled
 *                                 completion
 */
function all_async(values, iter_callback, done_callback)
{
    var remaining = values.length;

    if (remaining === 0) {
        done_callback();
    }

    forEach(values,
            function(element) {
                var invoked = false;
                var elDone = function() {
                    if (invoked) {
                        return;
                    }

                    invoked = true;
                    remaining -= 1;

                    if (remaining === 0) {
                        done_callback();
                    }
                };

                iter_callback(element, elDone);
            });
}

/*
* @id TestharnessMerge
*/
function merge(a,b)
{
    var rv = {};
    var p;
    for (p in a) {
        rv[p] = a[p];
    }
    for (p in b) {
        rv[p] = b[p];
    }
    return rv;
}

/*function expose(object, name)
{
    var components = name.split(".");
    var target = global_scope;
    for (var i = 0; i < components.length - 1; i++) {
        if (!(components[i] in target)) {
            target[components[i]] = {};
        }
        target = target[components[i]];
    }
    target[components[components.length - 1]] = object;
}*/

function is_same_origin(w) {
    try {
        'random_prop' in w;
        return true;
    } catch (e) {
        return false;
    }
}

/** Returns the 'src' URL of the first <script> tag in the page to include the file 'testharness.js'. */
function get_script_url()
{
    if (!('document' in global_scope)) {
        return undefined;
    }

    var scripts = document.getElementsByTagName("script");
    return undefined;
}

/** Returns the <title> or filename or "Untitled" */
function get_title()
{
    if ('document' in global_scope) {
        //Don't use document.title to work around an Opera bug in XHTML documents
        var title = document.getElementsByTagName("title")[0];
        if (title && title.firstChild && title.firstChild.data) {
            return title.firstChild.data;
        }
    }
    if ('META_TITLE' in global_scope && META_TITLE) {
        return META_TITLE;
    }
    if ('location' in global_scope) {
        return location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.indexOf('.'));
    }
    return "Untitled";
}

function supports_post_message(w)
{
    var supports;
    var type;
    // Given IE implements postMessage across nested iframes but not across
    // windows or tabs, you can't infer cross-origin communication from the presence
    // of postMessage on the current window object only.
    //
    // Touching the postMessage prop on a window can throw if the window is
    // not from the same origin AND post message is not supported in that
    // browser. So just doing an existence test here won't do, you also need
    // to wrap it in a try..catch block.
    try {
        type = typeof w.postMessage;
        if (type === "function") {
            supports = true;
        }

        // IE8 supports postMessage, but implements it as a host object which
        // returns "object" as its `typeof`.
        else if (type === "object") {
            supports = true;
        }

        // This is the case where postMessage isn't supported AND accessing a
        // window property across origins does NOT throw (e.g. old Safari browser).
        else {
            supports = false;
        }
    } catch (e) {
        // This is the case where postMessage isn't supported AND accessing a
        // window property across origins throws (e.g. old Firefox browser).
        supports = false;
    }
    return supports;
}

/**
 * Setup globals
 */

var tests = new Tests();

//TODOMP: check how to initialise global_scope var
if (global_scope.addEventListener) {
    var error_handler = function(e) {
        if (tests.tests.length === 0 && !tests.allow_uncaught_exception) {
            tests.set_file_is_test();
        }

        var stack;
        if (e.error && e.error.stack) {
            stack = e.error.stack;
        } else {
            stack = e.filename + ":" + e.lineno + ":" + e.colno;
        }

        if (tests.file_is_test) {
            var test = tests.tests[0];
            if (test.phase >= test.phases.HAS_RESULT) {
                return;
            }
            test.set_status(test.FAIL, e.message, stack);
            test.phase = test.phases.HAS_RESULT;
            test.done();
        } else if (!tests.allow_uncaught_exception) {
            tests.status.status = tests.status.ERROR;
            tests.status.message = e.message;
            tests.status.stack = stack;
        }
        done();
    };

    addEventListener("error", error_handler, false);
    addEventListener("unhandledrejection", function(e){ error_handler(e.reason); }, false);
}

test_environment.on_tests_ready();
 

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
      this.__listeners[eventName] = this.__listeners[eventName].filter(h => h !== handler);
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
  data = (data !== undefined) ? data : null;
  transferable = transferable || [];
  var webworkerpromise = this;
  return new Promise((res, rej) => {
    const messageId = webworkerpromise._messageId++;
    webworkerpromise._messages.set(messageId, [res, rej, onEvent]);
    webworkerpromise._worker.postMessage([messageId, data, operationName], transferable || []);
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







