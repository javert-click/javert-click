//Title: navigating 2
import { async_test, assert_less_than, assert_equals} from '../../../../js/DOM/Events/Testharness';

const Window = require('../../../../js/DOM/Events/Window');

var date;
var newDate;
var window = Window.getInstance();

var t = async_test();
//var iframe = document.querySelector('iframe');
var iframe = document.createElement('iframe');
window.onload = t.step_func(function() {
  iframe.src = "001-1.js"//.html?" + Math.random();
});
var start_test = t.step_func(function() {
  window[0].document.links[0].click();
});
var after_load = t.step_func(function(event) {
  newDate = new Date();
  setTimeout(this.step_func(function() {
    assert_less_than(Number(date), Number(newDate));
    assert_equals(event.data.title, 'foo');
    window.removeEventListener("message", after_load);
    this.done();
  }), 500);
});
window.addEventListener("message", after_load);