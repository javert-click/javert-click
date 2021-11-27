import {assert_equals} from '../../../../js/DOM/Events/Testharness';

onconnect = (event) => {
  console.log('Running onconnect');
  assert_equals(Object.getPrototypeOf(event), MessageEvent.prototype, 'Message event prototype');
  assert_equals(event.source, event.ports[0], "Event.source attribute");
};