/********************/
/* INTERFACE EVENT  */
/********************/

//const Node = require('./Node');
//const Window = require('./Window');

/*
 * @id initEvent 
 */
var initEvent = function(Node, Window, window){
    /*
    * @id Event
    */
    var Event = function(type, eventInit){
        this.type = type.toString();
        this.timeStamp = (new Date()).getTime() - window.timeStamp;
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

        Object.defineProperty(this, "isTrusted", {
            get: Event.prototype.getIsTrusted,
            set: function(isTrusted){
                this._isTrusted = isTrusted;
            }
        });
        this.dispatch = false;
        this._defaultPrevented = false;
        this.touchTargets = [];

    };

    Event.prototype.NONE = 0;
    Event.prototype.CAPTURING_PHASE = 1;
    Event.prototype.AT_TARGET = 2;
    Event.prototype.BUBBLING_PHASE = 3;

    Object.defineProperty(Window.Window.prototype, 'Event', {
        get: function(){
            return Event;
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

    return {
        'Event': Event,
        'NONE': Event.prototype.NONE,
        'CAPTURING_PHASE': Event.prototype.CAPTURING_PHASE,
        'AT_TARGET': Event.prototype.AT_TARGET,
        'BUBBLING_PHASE': Event.prototype.BUBBLING_PHASE,
        'prototype': Event.prototype
    };
};

module.exports = initEvent;

