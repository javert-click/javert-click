
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeNamedItem(name)" method returns the node
   removed from the map.  
   
   Retrieve the third employee and create a NamedNodeMap 
   object of the attributes of the last child.  Once the
   list is created invoke the "removeNamedItem(name)"
   method with name="street".  The "removeNamedItem(name)"
   method should remove the existing "street" attribute
   and return it.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapremovenameditemreturnnodevalue
     */
     (function namednodemapremovenameditemreturnnodevalue() {
   var success; 
    var doc;
      var elementList;
      var testAddress;
      var attributes;
      var removedNode;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(2);
      attributes = testAddress.attributes;

      removedNode = attributes.removeNamedItem("street");
      value = removedNode.nodeValue;

      jsUnitCore.assertEquals("namednodemapRemoveNamedItemReturnNodeValueAssert","No",value);
       
})()

