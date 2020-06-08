
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method removes the 
   specified attribute. 
   
   Retrieve the last child of the third employee, add a
   new "district" node to it and then try to remove it. 
   To verify that the node was removed use the
   "getNamedItem(name)" method from the NamedNodeMap
   interface.  It also uses the "getAttributes()" method
   from the Node interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
*/

     /*
     * @id elementremoveattributeaftercreate
     */
     (function elementremoveattributeaftercreate() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var attributes;
      var districtAttr;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("district");
      districtAttr = testEmployee.setAttributeNode(newAttribute);
      districtAttr = testEmployee.removeAttributeNode(newAttribute);
      attributes = testEmployee.attributes;

      districtAttr = attributes.getNamedItem("district");
      jsUnitCore.assertNull("elementRemoveAttributeAfterCreateAssert",districtAttr);
    
})()

