
//const t = async_test("Make sure that MessageEvent.source is properly set in connect event.");
onconnect = (event) => {
  //TODOMP: fix this, find way to import testharness 
  console.log('Running onconnect');
  console.log('1st assert: '+(Object.getPrototypeOf(event) === MessageEvent.prototype));
  console.log('2nd assert: '+(event.source === event.ports[0]));
};