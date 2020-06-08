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

    it ( 'removes multiple events', 
    /*
    * @id removesMultipleEvents
    */
    function () {

        var ele = $('.event');
        var count = 0;
  
        /*
        * @id removesMultipleEventsHandler
        */
        function handler () {
          count++;
        }
  
        ele.on ( 'foo bar baz', handler );
        ele.off ( 'foo bar', handler );
        ele.trigger ( 'foo' ).trigger ( 'bar' ).trigger ( 'baz' );
  
        jsUnitCore.assertEquals("removesMultipleEvents - 1", 1,count);
  
      });
});