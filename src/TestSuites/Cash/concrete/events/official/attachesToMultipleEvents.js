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
   it ( 'attaches to multiple events', 
   /*
    * @id attachesToMultipleEvents
    */
   function () {

    var ele = $('.event');
    var count = 0;

    /*
    * @id attachesToMultipleEventsHandler
    */
    function handler () {
      count++;
    }

    ele.on ( 'foo bar', handler );
    ele.trigger ( 'foo' ).trigger ( 'bar' );

    jsUnitCore.assertEquals("attachesToMultipleEvents - 1", 2,count);

  });
});

