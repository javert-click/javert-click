
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "item(index)" method returns the indexth item in 
   the map(test for last item). 
   
   Retrieve the second employee and create a NamedNodeMap 
   listing of the attributes of the last child. Since the
   DOM does not specify an order of these nodes the contents
   of the LAST node can contain either "domestic" or "street".
   The test should return "true" if the LAST node is either
   of these values.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapreturnlastitem
     */
     (function namednodemapreturnlastitem() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var child;
      var name;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      child = attributes.item(1);
      name = child.nodeName;

      	jsUnitCore.assertTrue("namednodemapReturnLastItemAssert",
      
	(("domestic" == name) || ("street" == name))
);

})()

