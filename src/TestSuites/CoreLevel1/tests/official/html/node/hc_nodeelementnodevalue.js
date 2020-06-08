
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for an 
    Element Node is null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id hc_nodeelementnodevalue
     */
     (function hc_nodeelementnodevalue() {
   var success; 
    var doc;
      var elementNode;
      var elementValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementNode = doc.documentElement;

      elementValue = elementNode.nodeValue;

      jsUnitCore.assertNull("elementNodeValue",elementValue);
    
})()

