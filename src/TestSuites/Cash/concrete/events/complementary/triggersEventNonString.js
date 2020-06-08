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

describe ( '$.fn.trigger', 
/*
* @id triggersSingleEvent
*/
function () {

    it ( 'triggers single event', function () {

      var ele = $('.event');
      var count = 0;

      /*
      * @id triggersSingleEventHandler
      */
      function handler () {
        count++;
      }

      // Manually create a focus event object
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('focusin', true, true);
      evt.namespace = '';

      evt['focus'] = handler;

      ele.trigger(evt);

      jsUnitCore.assertEquals("triggersSingleEvent - 1", 0,count);

    });
});