
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method removes the 
   specified attribute. 
   
   Retrieve the last child of the third employee, add a
   new "lang" attribute to it and then try to remove it. 
   To verify that the node was removed use the
   "getNamedItem(name)" method from the NamedNodeMap
   interface.  It also uses the "getAttributes()" method
   from the Node interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_elementremoveattributeaftercreate
     */
     (function hc_elementremoveattributeaftercreate() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var attributes;
      var districtAttr;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("lang");
      districtAttr = testEmployee.setAttributeNode(newAttribute);
      districtAttr = testEmployee.removeAttributeNode(newAttribute);
      attributes = testEmployee.attributes;

      districtAttr = attributes.getNamedItem("lang");
      jsUnitCore.assertNull("removed_item_null",districtAttr);
    
})()

