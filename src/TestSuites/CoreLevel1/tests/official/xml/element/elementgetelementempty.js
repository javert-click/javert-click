
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttribute(name)" method returns an empty 
   string if no value was assigned to an attribute and 
   no default value was given in the DTD file.
   
   Retrieve the last child of the last employee, then
   invoke "getAttribute(name)" method, where "name" is an
   attribute without a specified or DTD default value. 
   The "getAttribute(name)" method should return the empty
   string.  This method makes use of the
   "createAttribute(newAttr)" method from the Document
   interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-666EE0F9
*/

     /*
     * @id elementgetelementempty
     */
     (function elementgetelementempty() {
   var success; 
    var doc;
      var newAttribute;
      var elementList;
      var testEmployee;
      var domesticAttr;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           newAttribute = doc.createAttribute("district");
      elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(3);
      domesticAttr = testEmployee.setAttributeNode(newAttribute);
      attrValue = testEmployee.getAttribute("district");
      jsUnitCore.assertEquals("elementGetElementEmptyAssert","",attrValue);
       
})()

