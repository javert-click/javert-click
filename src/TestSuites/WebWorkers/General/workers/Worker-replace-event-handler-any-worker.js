import { test, assert_unreached } from '../../../../js/DOM/Events/Testharness';
// META: global=worker
// This is a regression test for a crash bug in Chrome: http://crbug.com/239669

function update() {
  onmessage = undefined;
}
  
test(() => {
  try{
    for (var i = 0; i < 8; ++i) {
      update();
    }
    console.log('Test passed');
  } catch (e){
    //I added this assert_unreached to make sure the calls to update would not throw
    assert_unreached('update should not throw');
  }
}, "Tests that repeatedly setting 'onmessage' within a worker doesn't crash.");