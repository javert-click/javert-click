const WebWorkerPromiseInfo = require('./index');
const PromiseInfo = require('../../../Promises/Promise');
const WorkerInfo = require('../../WebWorkers/Worker');

const WebWorkerPromise = WebWorkerPromiseInfo.WebworkerPromise;
const Promise = PromiseInfo.Promise;
const Worker = WorkerInfo.Worker;

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
function create(opts) {
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
WorkerPool.prototype.exec = function(xargs) {
  const worker = this.getFreeWorkerOrCreate();
  if(worker)
    return this._exec(worker, 'exec', xargs);

  return new Promise(res => this._queue.push(['exec', xargs, res]));
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

  return new Promise(res => this._queue.push(['postMessage', args, res]));
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
    let worker;
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
  setTimeout(() => {
    // only one worker should be alive always
    workers = workers.filter(w => { return w.isFree() }).slice(0, vthis._workers.length - 1);
    workers.forEach(worker => vthis._removeWorker(worker));
  }, vthis._terminateAfterDelay);
}

/*
* @id WorkerPoolRemoveWorker
*/
WorkerPool.prototype._removeWorker = function(worker) {
  this._workers = this._workers.filter(w => { return w._id !== worker._id });
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
  return new WebWorkerPromise(this._createWorker());
}

exports.WorkerPool = WorkerPool;
exports.create = create;