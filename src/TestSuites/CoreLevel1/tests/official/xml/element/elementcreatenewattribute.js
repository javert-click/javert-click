
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method adds a new 
   attribute to the Element.  
   
   Retrieve first address element and add
   a new attribute node to it by invoking its         
   "setAttributeNode(newAttr)" method.  This test makes use
   of the "createAttribute(name)" method from the Document
   interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
*/

     /*
     * @id elementcreatenewattribute
     */
     (function elementcreatenewattribute() {
   var success; 
    var doc;
      var elementList;
      var testAddress;
      var newAttribute;
      var oldAttr;
      var districtAttr;
      var attrVal;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(0);
      newAttribute = doc.createAttribute("district");
      oldAttr = testAddress.setAttributeNode(newAttribute);
      jsUnitCore.assertNull("old_attr_doesnt_exist",oldAttr);
    districtAttr = testAddress.getAttributeNode("district");
      jsUnitCore.assertNotNull("new_district_accessible",districtAttr);
attrVal = testAddress.getAttribute("district");
      jsUnitCore.assertEquals("attr_value","",attrVal);
       
})()

