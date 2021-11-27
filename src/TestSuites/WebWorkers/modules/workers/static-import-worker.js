import { importedModules } from './export-on-load-script.js';
//const mod = require('./export-on-load-script.js');
//TODOMP: webpack not working here for some reason...
console.log('Have I imported? '+importedModules);
//const importedModules = mod.importedModules;

if ('DedicatedWorkerGlobalScope' in self &&
    self instanceof DedicatedWorkerGlobalScope) {
  self.onmessage = e => {
    console.log('Going to send module.importedModules');
    console.log('Do I have module.importedModules? '+importedModules);
    e.target.postMessage(importedModules);
  };
} else if (
    'SharedWorkerGlobalScope' in self &&
    self instanceof SharedWorkerGlobalScope) {
  self.onconnect = e => {
    e.ports[0].postMessage(importedmodules);
  };
    } /*else if (
    'ServiceWorkerGlobalScope' in self &&
    self instanceof ServiceWorkerGlobalScope) {
  self.onmessage = e => {
    e.source.postMessage(module.importedModules);
  };
}*/