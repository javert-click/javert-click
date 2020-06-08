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
* @id supportsNamespacesTrigger
*/
function () {

    it ( 'supports namespaces', function ( t ) {

        var ele = $('.event');
        var count = 0;
  
        /*
        * @id supportsNamespacesTriggerHandler
        */
        function handler () {
          count++;
        }
  
        ele.on ( 'foo.ns1.ns2', handler ).trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' ).trigger ( 'foo.ns1.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespacesTrigger - 1", 3,count);
  
      });  
});