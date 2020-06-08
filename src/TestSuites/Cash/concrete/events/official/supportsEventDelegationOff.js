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
    it ( 'supports event delegation', 
    /*
    * @id supportsEventDelegationOff
    */
    function () {

        var ele = $('.event');
        var parent = $('.parent');
        var countChild = 0;
        var countDelegate = 0;
  
        function handlerChild () {
          countChild++;
        };
  
        function handlerDelegate () {
          countDelegate++;
        };
  
        ele.on ( 'click', handlerChild );
        parent.on ( 'click', '.event', handlerDelegate );
        parent.off ( 'click', '.event', handlerDelegate );
        ele.trigger ( 'click' );
  

        jsUnitCore.assertEquals("supportsEventDelegationOff - 1",1,countChild);
        jsUnitCore.assertEquals("supportsEventDelegationOff - 1",0,countDelegate);
  
      });
});
