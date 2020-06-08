
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributeNode(name)" method retrieves an
   attribute node by name.  It should return null if the
   "strong" attribute does not exist.
   
   Retrieve the last child of the first employee and attempt
   to retrieve a non-existing attribute.  The method should
   return "null".  The non-existing attribute to be used
   is "invalidAttribute".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-217A91B8
*/

     /*
     * @id hc_elementgetattributenodenull
     */
     (function hc_elementgetattributenodenull() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var domesticAttr;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(0);
      domesticAttr = testEmployee.getAttributeNode("invalidAttribute");
      jsUnitCore.assertNull("elementGetAttributeNodeNullAssert",domesticAttr);
    
})()

