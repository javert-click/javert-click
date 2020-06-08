
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setNamedItem(arg)" method adds a node using its 
   nodeName attribute. 
   
   Retrieve the second employee and create a NamedNodeMap 
   object from the attributes of the last child by
   invoking the "getAttributes()" method.  Once the
   list is created an invocation of the "setNamedItem(arg)"
   method is done with arg=newAttr, where newAttr is a
   new Attr Node previously created.  The "setNamedItem(arg)"
   method should add then new node to the NamedNodeItem 
   object by using its "nodeName" attribute("district').
   This node is then retrieved using the "getNamedItem(name)"
   method.  This test uses the "createAttribute(name)"
   method from the document interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapsetnameditem
     */
     (function namednodemapsetnameditem() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var districtNode;
      var attrName;
      var setNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(1);
      newAttribute = doc.createAttribute("district");
      attributes = testAddress.attributes;

      setNode = attributes.setNamedItem(newAttribute);
      districtNode = attributes.getNamedItem("district");
      attrName = districtNode.nodeName;

      jsUnitCore.assertEquals("namednodemapSetNamedItemAssert","district",attrName);
       
})()

