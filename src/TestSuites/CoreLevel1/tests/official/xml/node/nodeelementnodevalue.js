
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for an 
    Element Node is null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodeelementnodevalue
     */
     (function nodeelementnodevalue() {
   var success; 
    var doc;
      var elementNode;
      var elementValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementNode = doc.documentElement;

      elementValue = elementNode.nodeValue;

      jsUnitCore.assertNull("elementNodeValueNull",elementValue);
    
})()

