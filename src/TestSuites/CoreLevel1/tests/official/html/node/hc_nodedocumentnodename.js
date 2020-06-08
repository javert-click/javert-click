
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    Document Node is "#document".

    Retrieve the DOM document and check the string returned
    by the "getNodeName()" method.   It should be equal to 
    "#document".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id hc_nodedocumentnodename
     */
     (function hc_nodedocumentnodename() {
   var success; 
    var doc;
      var documentName;
      
	   
	   
	doc = docs["hc_staff.html"]
           documentName = doc.nodeName;

      jsUnitCore.assertEquals("documentNodeName","#document",documentName);
       
})()

