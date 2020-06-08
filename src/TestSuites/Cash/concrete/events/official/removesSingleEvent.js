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

    it ( 'removes single event', function () {

      var ele = $('.event');
      var count = 0;

      function handler () {
        count++;
      }

      ele.on ( 'click', handler );
      ele.trigger ( 'click' );
      ele.off ( 'click' );
      ele.trigger ( 'click' );

      jsUnitCore.assertEquals("removesSingleEvent - 1", 1,count);

    });
});