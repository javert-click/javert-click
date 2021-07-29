import { async_test } from '../../../../js/DOM/Events/Testharness';
import { Event } from '../../../../js/DOM/Events/Event';

// META: global=worker
async_test(t => {
    var target = self;
    target.addEventListener('custom-event', function(){ console.log('test passed'); t.step_func_done()});
  
    var event = new Event('custom-event');
    target.dispatchEvent(event);
}, 'Test CustomEvents on workers.');