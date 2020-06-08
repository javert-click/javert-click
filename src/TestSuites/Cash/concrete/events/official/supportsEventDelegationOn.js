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
    it ( 'supports event delegation', 
    /*
    * @id supportsEventDelegation
    */
    function () {

        var ele = $('.event');
        var parent = $('.parent');
        var count = 0;

        /*
        * @id supportsEventDelegationHandler
        */
        function handler () {
            count++;
        };

        parent.on ( 'click', '.event', handler );
        ele.trigger ( 'click' );

        jsUnitCore.assertEquals("supportsEventDelegation - 1",1,count);

        parent.off ( 'click', handler );
        ele.trigger ( 'click' );

        jsUnitCore.assertEquals("supportsEventDelegation - 2",1,count);
    });
});
