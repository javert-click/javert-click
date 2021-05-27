function TinyEmitter() {
  Object.defineProperty(this, '__listeners', {
    value: {},
    enumerable: false,
    writable: false
  });
}

TinyEmitter.prototype.emit = function(eventName, xargs) {
  if(!this.__listeners[eventName])
    return this;

  for(const handler of this.__listeners[eventName]) {
    //TODOMP: be careful here. Spread operator was in use
    handler(xargs);
  }

  return this;
}

TinyEmitter.prototype.once = function(eventName, handler) {
  const once = (xargs) => {
    this.off(eventName, once);
    handler(xargs);
  };

  return this.on(eventName, once);
}

TinyEmitter.prototype.on = function(eventName, handler) {
  if(!this.__listeners[eventName])
    this.__listeners[eventName] = [];

  this.__listeners[eventName].push(handler);

  return this;
}

TinyEmitter.prototype.off = function(eventName, handler) {
  if(handler)
    this.__listeners[eventName] = this.__listeners[eventName].filter(h => h !== handler);
  else
    this.__listeners[eventName] = [];

  return this;
}

exports.TinyEmitter = TinyEmitter;
