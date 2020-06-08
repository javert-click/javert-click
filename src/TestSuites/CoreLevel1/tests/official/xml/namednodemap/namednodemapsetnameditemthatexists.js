
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the node to be added by the "setNamedItem(arg)" method 
   already exists in the NamedNodeMap, it is replaced by
   the new one.
   
   Retrieve the second employee and create a NamedNodeMap 
   object from the attributes of the last child by
   invoking the "getAttributes()" method.  Once the
   list is created an invocation of the "setNamedItem(arg)"
   method is done with arg=newAttr, where newAttr is a
   new Attr Node previously created and whose node name
   already exists in the map.  The "setNamedItem(arg)"
   method should replace the already existing node with
   the new one.   
   This node is then retrieved using the "getNamedItem(name)"
   method.  This test uses the "createAttribute(name)"
   method from the document interface

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapsetnameditemthatexists
     */
     (function namednodemapsetnameditemthatexists() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var districtNode;
      var attrValue;
      var setNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(1);
      newAttribute = doc.createAttribute("street");
      attributes = testAddress.attributes;

      setNode = attributes.setNamedItem(newAttribute);
      districtNode = attributes.getNamedItem("street");
      attrValue = districtNode.nodeValue;

      jsUnitCore.assertEquals("streetValue","",attrValue);
       
})()

