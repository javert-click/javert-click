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

describe ( '$.fn.on', 
/*
* @id triggersSingleEvent
*/
function () {

    it ( 'triggers event with selector not matching target', function () {
      var ele = $('.event');
      var parent = $('.parent');
      var count = 0;

      /*
      * @id triggersSingleEventHandler
      */
      function handler () {
        count++;
      }

      // Attach handlers via object 
      ele.on('click','.parent', handler);

      ele.trigger('click');

      jsUnitCore.assertEquals('onSelectorNotMatchingSameTarget', 0,count);

    });
});