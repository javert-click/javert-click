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

describe ( '$.fn.one', function () {

    it ( 'removes the handler after the first call', function ( t ) {

      var ele = $('.event');
      var count = 0;

      var handler = function () {
        count++;
      };

      ele.one ( 'click', handler );
      ele.trigger ( 'click' ).trigger ( 'click' );

      jsUnitCore.assertEquals("removesTheHanndlerAfterFirstCall - 1", 1,count);

      ele.one ( 'click', handler ).off ( 'click', handler ).trigger ( 'click' );

      jsUnitCore.assertEquals("removesTheHanndlerAfterFirstCall - 2", 1,count);

    });

  });