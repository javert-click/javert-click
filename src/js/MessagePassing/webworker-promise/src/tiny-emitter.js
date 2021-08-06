/*
* @id TinyEmitter
*/ 
function TinyEmitter() {
  Object.defineProperty(this, '__listeners', {
    value: {},
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

exports.TinyEmitter = TinyEmitter;
