
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    Document Node is null.

    Retrieve the DOM Document and check the string returned
    by the "getNodeValue()" method.   It should be equal to 
    null. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodedocumentnodevalue
     */
     (function nodedocumentnodevalue() {
   var success; 
    var doc;
      var documentValue;
      
	   
	   
	doc = docs["staff.xml"]
           documentValue = doc.nodeValue;

      jsUnitCore.assertNull("documentNodeValueNull",documentValue);
    
})()

