
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNamedItem(name)" method returns null of the 
   specified name did not identify any node in the map. 
   
   Retrieve the second employee and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getNamedItem(name)"
   method is done with name="district".  This name does not 
   match any names in the list therefore the method should
   return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
*/

     /*
     * @id namednodemapreturnnull
     */
     (function namednodemapreturnnull() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var districtNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      districtNode = attributes.getNamedItem("district");
      jsUnitCore.assertNull("namednodemapReturnNullAssert",districtNode);
    
})()

