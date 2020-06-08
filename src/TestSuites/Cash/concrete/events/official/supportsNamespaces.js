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
    it ( 'supports namespaces', 
    /*
    * @id supportsNamespaces
    */
    function () {

        var ele = $('.event');
        var count = 0;

        /*
        * @id supportsNamespacesHandler
        */
        function handler () {
            count++;
        }

        ele.on ( 'foo bar.ns1', handler );
        ele.on ( 'foo.ns1.ns2', handler );
        ele.trigger ( 'foo.ns1.ns2' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' );

        jsUnitCore.assertEquals("supportsNamespaces - 1",3,count);

    });
});