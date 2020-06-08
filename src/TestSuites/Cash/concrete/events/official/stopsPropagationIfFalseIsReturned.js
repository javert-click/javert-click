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
  it ( 'stops propagation if false is returned', 
  /*
  * @id stopsPropagationIfFalseIsReturned
  */
  function () {

    var ele = $('.event');
    var parent = $('.parent');
    var count = 0;

    /*
    * @id stopsPropagationIfFalseIsReturnedHandler
    */
    function handler () {
      count++;
      return false;
    }

    parent.on ( 'foo', handler );
    parent.on ( 'foo', handler );
    ele.on ( 'foo', handler );
    ele.on ( 'foo', handler ); // We are not using `stopImmediatePropagation`
    ele.trigger ( 'foo' );

    jsUnitCore.assertEquals("supportsPropagationIfFalseIsReturned - 1",2,count);

  });

});

