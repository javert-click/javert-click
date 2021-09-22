//Title: Base URL in classic shared workers: importScripts</title>
const SharedWorkerInfo = require('../../../../js/MessagePassing/WebWorkers/SharedWorker');
const SharedWorker = SharedWorkerInfo.SharedWorker;

//fetch_tests_from_worker(
var worker = new SharedWorker("gammaimportscripts.js");