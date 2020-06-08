
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


* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id hc_nodedocumentnodevalue
     */
     (function hc_nodedocumentnodevalue() {
   var success; 
    var doc;
      var documentValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           documentValue = doc.nodeValue;

      jsUnitCore.assertNull("documentNodeValue",documentValue);
    
})()

