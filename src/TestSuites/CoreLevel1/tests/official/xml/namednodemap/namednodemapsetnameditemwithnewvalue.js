
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "setNamedItem(arg)" method does not replace an 
   existing node with the same name then it returns null. 
   
   Retrieve the third employee and create a NamedNodeMap 
   object from the attributes of the last child.
   Once the list is created the "setNamedItem(arg)" method
   is invoked with arg=newAttr, where newAttr is a
   newly created Attr Node and whose node name
   already exists in the map.  The "setNamedItem(arg)"
   method should add the new node and return null.
   This test uses the "createAttribute(name)" method from
   the document interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapsetnameditemwithnewvalue
     */
     (function namednodemapsetnameditemwithnewvalue() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var newNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(2);
      newAttribute = doc.createAttribute("district");
      attributes = testAddress.attributes;

      newNode = attributes.setNamedItem(newAttribute);
      jsUnitCore.assertNull("returnedNodeNull",newNode);
    
})()

