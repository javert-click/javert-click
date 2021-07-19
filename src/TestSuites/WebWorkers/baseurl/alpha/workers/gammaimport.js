import r from "./script-module.js";
console.log('worker: posting message: '+r)
postMessage(r);