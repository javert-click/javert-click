
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    DocumentFragment Node is "#document-frament".

    Retrieve the DOM document and invoke the
    "createDocumentFragment()" method and check the string      
    returned by the "getNodeName()" method.   It should be 
    equal to "#document-fragment".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A3
*/

     /*
     * @id nodedocumentfragmentnodename
     */
     (function nodedocumentfragmentnodename() {
   var success; 
    var doc;
      var docFragment;
      var documentFragmentName;
      
	   
	   
	doc = docs["staff.xml"]
           docFragment = doc.createDocumentFragment();
      documentFragmentName = docFragment.nodeName;

      jsUnitCore.assertEquals("nodeDocumentFragmentNodeNameAssert1","#document-fragment",documentFragmentName);
       
})()

