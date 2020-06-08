
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "setNamedItem(arg)" method replaces an already 
   existing node with the same name then the already 
   existing node is returned.
   
   Retrieve the third employee and create a NamedNodeMap 
   object from the attributes of the last child by
   invoking the "getAttributes()" method.  Once the
   list is created an invocation of the "setNamedItem(arg)"
   method is done with arg=newAttr, where newAttr is a
   new Attr Node previously created and whose node name
   already exists in the map.  The "setNamedItem(arg)"
   method should replace the already existing node with
   the new one and return the existing node.   
   This test uses the "createAttribute(name)" method from
   the document interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id hc_namednodemapsetnameditemreturnvalue
     */
     (function hc_namednodemapsetnameditemreturnvalue() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var newNode;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddress = elementList.item(2);
      newAttribute = doc.createAttribute("class");
      attributes = testAddress.attributes;

      newNode = attributes.setNamedItem(newAttribute);
      jsUnitCore.assertNotNull("previousAttrNotNull",newNode);
attrValue = newNode.nodeValue;

      jsUnitCore.assertEquals("previousAttrValue","No",attrValue);
       
})()

