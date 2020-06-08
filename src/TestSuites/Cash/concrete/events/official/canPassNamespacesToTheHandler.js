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

    it ( 'can pass namespaces to the handler', 
    /*
    * @id canPassNamespacesToTheHandler
    */
    function () {

        var ele = $('.event');
        var namespaces = [];
  
        /*
        * @id canPassNamespacesToTheHandlerHandler
        */
        function handler ( event ) {
          namespaces.push ( event.namespace );
        }
  
        ele.on ( 'foo.ns1.ns2', handler );
        ele.trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns1.ns2' );
        
        var expected = ['', 'ns1', 'ns2', 'ns1.ns2'];
        jsUnitCore.assertEquals("canPassNamespacesToTheHandler - length", expected.length, namespaces.length);
        for(var i = 0; i < namespaces.length; i++){
            jsUnitCore.assertEquals("canPassNamespacesToTheHandler - values", expected[i], namespaces[i]);
        } 
  
      });
});