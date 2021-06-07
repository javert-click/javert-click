/**************************/
/* INTERFACE EVENT TARGET */
/**************************/

const EventsSemantics = require('./EventsSemantics');
const ArrayUtils      = require('../../Utils/ArrayUtils');
const DOMException    = require('../Common/DOMException');
const EventListener   = require('./EventListener');

/*
* @id EventTarget
*/
var EventTarget = function (){

};

var scopeEvents = {};

/*
* This function aims to avoid circular dependencies. Adding any of the dependencies below as a 'require' 
* in this file would cause a circular dependency.
*/
function initEventTarget(Node, ShadowRoot, DocumentFragment, MouseEvent, Element, Text, Window){
    scopeEvents.Node             = Node;
    scopeEvents.ShadowRoot       = ShadowRoot;
    scopeEvents.DocumentFragment = DocumentFragment;
    scopeEvents.MouseEvent       = MouseEvent;
    scopeEvents.Element          = Element;
    scopeEvents.Text             = Text;
    scopeEvents.window           = Window.getInstance();
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
        var clearTargetsStruct = event.getTheLastInPath();
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

var eventsSemantics = new EventsSemantics.EventsSemantics(dispatch);

EventTarget.prototype.dispatch = false;

/*
* @id dispatchEvent
*/
EventTarget.prototype.dispatchEvent = function (event, flags){
    //1. If event’s dispatch flag is set, or if its initialized flag is not set, then throw an "InvalidStateError" DOMException.
    if(event.dispatch || !event.initialized){
        throw new DOMException.DOMException(DOMException.INVALID_STATE_ERR)
    }
    //2. Initialize event’s isTrusted attribute to false.
    event.isTrusted = false;
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
        var listener = new EventListener.EventListener(type, options, callback);
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
    return (event instanceof scopeEvents.MouseEvent.MouseEvent && event.type === 'click')
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
            if(parent instanceof scopeEvents.ShadowRoot.ShadowRoot && parent.mode === scopeEvents.ShadowRoot.ShadowRootMode.CLOSED){
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
        if(parent instanceof scopeEvents.Window.Window || (parent instanceof scopeEvents.Node.Node && shadowIncludingInclusiveAncestor(root(target), parent))){
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
    event.eventPhase = event.NONE;
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
            event.eventPhase = event.AT_TARGET;
        //5.13.2 Otherwise, set event’s eventPhase attribute to CAPTURING_PHASE
        }else{
            event.eventPhase = event.CAPTURING_PHASE;
        }
        //5.13.3 Invoke with struct, event, "capturing", and legacyOutputDidListenersThrowFlag if given
        invoke(struct, event, event.CAPTURING_PHASE, legacyOutputDidListenersThrowFlag, true);
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
                event.eventPhase = event.AT_TARGET;
            //5.14.2 Otherwise, set event’s eventPhase attribute to BUBBLING_PHASE.
            }else{
                event.eventPhase = event.BUBBLING_PHASE;
            }
            //5.14.3 Invoke with struct, event, "bubbling", and legacyOutputDidListenersThrowFlag if given
            invoke(struct, event, event.BUBBLING_PHASE, legacyOutputDidListenersThrowFlag, true);
        }
    }else{
        event.eventPhase = event.AT_TARGET;
        invoke(path[0], event, event.BUBBLING_PHASE, legacyOutputDidListenersThrowFlag, true)
    }
}

/*
* @id invoke
*/
function invoke(struct, event, phase, legacyOutputDidListenersThrowFlag){
    //1. Set event’s target to the target of the last struct in event’s path, that is either struct or preceding struct, whose target is non-null
    event.target = event.getTheLastInPath().target;
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
        if((phase === event.CAPTURING_PHASE) && (listener.capture === false)) continue;
        // 2.4 If phase is "bubbling" and listeners' capture is true, then continue.
        if((phase === event.BUBBLING_PHASE) && (listener.capture === true)) continue;

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
    if(event.legacyPreActBeh === true) event.eventPhase === event.NONE;
    var window = scopeEvents.window;
    if(!isInShadowTree(event)) window.event = event;
    try{
        if(event.type === "error"){
                if(window.onerror){
                    callback.apply(currentTarget,[event.error.message]);
                }else{
                    callback.apply(currentTarget, [event]);
                }
        }else{
            if(typeof callback == 'function'){
                //console.log('Going to call callback '+callback);
                callback.apply(currentTarget,[event]);
            }
            else
                callback['handleEvent'].apply(callback, [event]);
        }
    }catch(e){
        // exceptions in handlers are not propagated. Here we deal with Window error events
        if (window.listeners && ArrayUtils.filter(window.listeners,
            /*
            * @id execListenersFindListener
            */
            function execListenersFindListener(l){
                l.type === "error"
            })){
            var errorEvent = window.document.createEvent("error");
            errorEvent.initEvent("error", true, true);
            errorEvent.error = e;
            window.dispatchEvent(errorEvent);
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
    return (node instanceof scopeEvents.Element.Element || node instanceof scopeEvents.Text.Text);
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
    return (node instanceof scopeEvents.Node.Node) && (root(node) instanceof scopeEvents.ShadowRoot.ShadowRoot);
}

/*
* @id retarget
*/
function retarget(A, B){
    if(!(A instanceof scopeEvents.Node.Node) || !(root(A) instanceof scopeEvents.ShadowRoot.ShadowRoot) || (B instanceof scopeEvents.Node.Node && shadowIncludingInclusiveAncestor(root(A), B))){
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
    var rootIsShadowRoot = (root(B) instanceof scopeEvents.ShadowRoot.ShadowRoot) && shadowIncludingInclusiveDescendant(root(B).host, A);
    return (descendant || rootIsShadowRoot);
}

/*
* @id shadowIncludingInclusiveDescendant
*/
function shadowIncludingInclusiveDescendant(A, B){
    var isShadowIncludingInclusiveDescendant = (isDescendant(A, B) || (root(A) instanceof scopeEvents.ShadowRoot.ShadowRoot && shadowIncludingInclusiveDescendant(root(A).host, B)));
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
    if(target instanceof scopeEvents.Node.Node && target.parentNode instanceof scopeEvents.ShadowRoot.ShadowRoot){
        itemInShadowTree = true;
    }
    //3. let root-of-closed-tree be false
    var rootOfClosedTree = false;
    //4. if target is a shadow root whose mode is closed, then set root-of-closed-tree to true
    if(target instanceof scopeEvents.ShadowRoot.ShadowRoot && target.mode === scopeEvents.ShadowRoot.ShadowRootMode.CLOSED){
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
        if(parent instanceof scopeEvents.ShadowRoot.ShadowRoot) return true;
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


exports.EventTarget = EventTarget;
exports.initEventTarget = initEventTarget;



