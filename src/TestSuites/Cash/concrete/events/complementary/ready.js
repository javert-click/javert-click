var DOM         = initDOM();
var HTMLFiles   = initHTMLFiles();
var docload     = initDocumentLoading(DOM, HTMLFiles);

var mocha       = initMocha();
var describe    = mocha.describe;
var it          = mocha.it;

var jsUnitCore  = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore); 
var document    = docload.loadDocument("cash_events.html"); 
var window      = new DOM.Window.Window();
var $           = initCash(document, window);


/* 
 * Triggering obscure corner cased of the cash event semantics
 * by creating a manual focus event object 
 *
 * @id mochaFocus
 */
describe ( '$.fn.on', function () {
    it ( 'ready', 
    /* @id ready */
    function () {

        var count = 0;

        /* @id  */
        function testReady () { 
          count++;
          return undefined;
        }

        document.readyState = "loading";
        $(testReady);
        document.readyState = "complete";
        $(testReady);

        var triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        jsUnitCore.assertEquals("triggeredEvents should be 0", 0,triggeredEvents);
        jsUnitCore.assertEquals("count should be 1", 1,count);
    });
});