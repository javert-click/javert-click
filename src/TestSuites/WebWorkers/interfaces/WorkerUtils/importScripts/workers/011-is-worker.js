// prevent recursion

import { got } from './null-is';

if ('beenThere' in self) {
    throw 'null stringified to the empty string';
}
var beenThere = true;
try {
  //var got = importScripts(null);
  console.log('got: '+got);
  postMessage(got);
} catch(ex) {
  postMessage(String(ex));
}