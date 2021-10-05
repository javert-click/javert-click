// prevent recursion
import { got } from './1';

if ('beenThere' in self) {
    throw '1 stringified to the empty string';
}
var beenThere = true;
try {
  //importScripts(1);
  postMessage(got);
} catch(ex) {
  postMessage(String(ex));
}