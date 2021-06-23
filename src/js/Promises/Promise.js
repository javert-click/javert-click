'use strict';

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

exports.Promise = Promise;
