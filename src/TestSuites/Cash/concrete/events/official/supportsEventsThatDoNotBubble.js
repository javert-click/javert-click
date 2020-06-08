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
    it ( 'supports events that do not bubble', 
    /*
    * @id supportsEventsThatDoNotBubble
    */
    function () { // If the document isn't focused the element won't get the focus either

        var events = ['focus', 'blur', 'mouseenter', 'mouseleave'],
            eventsTrigger = ['focus', 'blur', 'mouseover', 'mouseout'];

        events.forEach ( function ( event, index ) {

            var ele = $('.event-focus');
            var parent = $('.parent');
            var count = 0;
            var eventTrigger = eventsTrigger[index];

            /*
            * @id supportsEventsThatDoNotBubbleHandler
            */
            function handler () {
                count++;
            }

            parent.on ( event, handler );
            ele.on ( event, handler );
            ele.trigger ( eventTrigger );

            parent.off ( event );
            ele.off ( event );
            ele.trigger ( eventTrigger );

            jsUnitCore.assertEquals("supportsEventsThatDoNotBubble - 1",2,count);

        });

        });
    });