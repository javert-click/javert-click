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

describe ( '$.fn.trigger', function () {
  it ( 'triggers focus/blur natively', 
  /*
  * @id triggersFocusOrBlurNatively
  */
  function () {

    var events = ['focus', 'blur'];

      events.forEach ( function ( event ) {

        var ele = $('.event-focus');
        var count = 0;

        function handler () {
          count++;
        }

        var nativeHandler = ele[0][event];
        ele[0][event] = function () {
          handler ();
          nativeHandler.apply ( this, arguments );
        };

        ele.on ( event, handler );
        ele.trigger ( event );

        jsUnitCore.assertEquals("triggersFocusOrBlurNatively - 1",2,count);

      });

  });

});

