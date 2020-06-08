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

describe ( '$.fn.off', function () {
    it ( 'removes all events', 
    /*
    * @id removesAllEvents
    */
    function () {

        var ele = $('.event');
        var count = 0;
  
        /*
        * @id removesAllEventsHandler
        */
        function handler () {
          count++;
        }
  
        ele.on ( 'foo bar', handler );
        ele.off ();
        ele.trigger ( 'foo' ).trigger ( 'bar' );
  
        jsUnitCore.assertEquals("removesAllEvents - 1", 0,count);
  
      });  
});

