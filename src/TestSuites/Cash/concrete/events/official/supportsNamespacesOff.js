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

describe ( '$.fn.off', function () {
    it ( 'supports namespaces', function () {

        var ele = $('.event');
        var count = 0;
  
        function handler () {
          count++;
        }
  
        ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 1", 0,count);
  
        ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns1' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 2", 0,count);
  
        ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns2' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 3", 0,count);
  
        ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns1.ns2' ).trigger( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 4", 0,count);
  
        ele.on ( 'foo.ns1.ns2 bar.ns1.ns2 baz.ns1.ns2', handler ).off ( '.ns1' ).trigger ( 'foo' ).trigger ( 'bar' ).trigger ( 'baz' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 5", 0,count);
  
        ele.on ( 'foo.ns1.ns2', handler ).off ( 'foo.ns3' ).trigger ( 'foo' ).trigger ( 'foo.ns1' ).trigger ( 'foo.ns2' ).trigger ( 'foo.ns3' );
  
        jsUnitCore.assertEquals("supportsNamespaces - 6", 3,count);
  
      });
});

