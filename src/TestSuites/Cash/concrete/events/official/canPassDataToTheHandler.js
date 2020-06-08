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
* @id canPassDataToTheHandler
*/
function () {

    it ( 'can pass data to the handler', function () {

        var ele = $('.event');
        var count;
        var eventData;
        var data;
  
        /*
        * @id canPassDataToTheHandlerHandler
        */
        function handler ( event, d ) {
          count ++;
          eventData = event.data;
          data = d;
        }
  
        var values = [123, 'string', { obj: true }];
  
        values.forEach ( function ( value ) {
  
          count = 0;
  
          ele.on ( 'custom', handler );
          ele.trigger ( 'custom', value );
          ele.off ( 'custom', handler );
  
          jsUnitCore.assertEquals("canPassDataToTheHandler - 1", 1,count);
          jsUnitCore.assertEquals("canPassDataToTheHandler - 2", eventData,value);
          jsUnitCore.assertEquals("canPassDataToTheHandler - 3", data,value);

        });
  
      });
});