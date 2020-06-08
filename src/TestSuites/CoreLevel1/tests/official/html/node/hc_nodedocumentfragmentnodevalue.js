
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    DocumentFragment Node is null.
    
    Retrieve the DOM document and invoke the
    "createDocumentFragment()" method and check the string      
    returned by the "getNodeValue()" method.   It should be 
    equal to null.

* @author Curt Arnold
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A3
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id hc_nodedocumentfragmentnodevalue
     */
     (function hc_nodedocumentfragmentnodevalue() {
   var success; 
    var doc;
      var docFragment;
      var attrList;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           docFragment = doc.createDocumentFragment();
      attrList = docFragment.attributes;

      jsUnitCore.assertNull("attributesNull",attrList);
    value = docFragment.nodeValue;

      jsUnitCore.assertNull("initiallyNull",value);
    
})()

