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
    it ( 'overwrites event.currentTarget when using event delegation', 
    /*
    * @id overwritesEventCurrentTarget
    */
    function () {

        var ele = $('.event');
        var parent = $('.parent');
        var html = $('html');
        var count = 0;
        var currentTargets = [];
  
        function handler ( event ) {
          count++;
          event.bubbles; // Ensuring the event object hasn't been corrupted
          currentTargets.push ( event.currentTarget );
        };
  
        ele.on ( 'click', handler );
        parent.on ( 'click', '.event', handler );
        html.on ( 'click', handler );
        ele.trigger ( 'click' );
  
        jsUnitCore.assertEquals("overwritesEventCurrentTarget - 1",3,count);
        jsUnitCore.assertEquals("overwritesEventCurrentTarget - 2",ele[0],currentTargets[0]);
        jsUnitCore.assertEquals("overwritesEventCurrentTarget - 3",ele[0],currentTargets[1]);
        jsUnitCore.assertEquals("overwritesEventCurrentTarget - 2",html[0],currentTargets[2]);
      });
});
