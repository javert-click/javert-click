var DOM         = initDOM();
var HTMLFiles   = initHTMLFiles();
var docload    = initDocumentLoading(DOM, HTMLFiles);

var mocha       = initMocha();
var describe    = mocha.describe;
var it          = mocha.it;

var jsUnitCore  = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore); 
var document    = docload.loadDocument("cash_events.html"); 
var window      = new DOM.Window.Window();
var $           = initCash(document, window);

describe ( '$.fn.on', function () {
  it ( 'attaches to single event', 
  /*
  * @id attachesToSingleEvent
  */
  function () {
    var ele = $('.event');
    var count = 0;
    var that;
  
    /*
    * @id attachesToSingleEventHandler
    */
    function handler () {
      count++;
      that = this;
    }
    ele.on ( 'click', handler );
    ele.trigger ( 'click' ).trigger ( 'click' );
  
    jsUnitCore.assertEquals("attachesToSingleEvent - 1",2,count);
    jsUnitCore.assertEquals("attachesToSingleEvent - 2",that,ele[0]);
  
   });

});
