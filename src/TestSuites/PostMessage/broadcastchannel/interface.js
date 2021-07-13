import { test, assert_throws_js, assert_equals, assert_throws_dom, assert_unreached, assert_not_equals  } from '../../../js/DOM/Events/Testharness';
const BroadcastChannelInfo = require('../../../js/MessagePassing/PostMessage/BroadcastChannel');
const BroadcastChannel = BroadcastChannelInfo.BroadcastChannel;

test(() => assert_throws_js(TypeError, () => new BroadcastChannel()),
  'Should throw if no name is provided');

test(() => {
    let c = new BroadcastChannel(null);
    assert_equals(c.name, 'null');
  }, 'Null name should not throw');

test(() => {
    let c = new BroadcastChannel(undefined);
    assert_equals(c.name, 'undefined');
  }, 'Undefined name should not throw');

test(() => {
    let c = new BroadcastChannel('fooBar');
    assert_equals(c.name, 'fooBar');
  }, 'Non-empty name should not throw');

test(() => {
    let c = new BroadcastChannel(123);
    assert_equals(c.name, '123');
  }, 'Non-string name should not throw');

test(() => {
    let c = new BroadcastChannel('');
    assert_throws_js(TypeError, () => c.postMessage());
  }, 'postMessage without parameters should throw');

test(() => {
    try{
      let c = new BroadcastChannel('');
      c.postMessage(null);
    } catch (e){
        assert_unreached('postMessage with null should not throw');
    }
  }, 'postMessage with null should not throw');

test(() => {
    try{
      let c = new BroadcastChannel('');
      c.close();
    } catch (e){
        assert_unreached('close should not throw');
    }
  }, 'close should not throw');

test(() => {
    try{
      let c = new BroadcastChannel('');
      c.close();
      c.close();
    } catch (e){
        assert_unreached("close should not throw if called multiple times");
    }
  }, 'close should not throw when called multiple times');

test(() => {
    let c = new BroadcastChannel('');
    c.close();
    assert_throws_dom('InvalidStateError', () => c.postMessage(''));
  }, 'postMessage after close should throw');

test(() => {
    let c = new BroadcastChannel('');
    assert_not_equals(c.onmessage, undefined);
  }, 'BroadcastChannel should have an onmessage event');
/*
test(() => {
    let c = new BroadcastChannel('');
    assert_throws_dom('DataCloneError', () => c.postMessage(Symbol()));
  }, 'postMessage should throw with uncloneable data');

test(() => {
    let c = new BroadcastChannel('');
    c.close();
    assert_throws_dom('InvalidStateError', () => c.postMessage(Symbol()));
  }, 'postMessage should throw InvalidStateError after close, even with uncloneable data');*/