
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

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_namednodemapsetnameditemwithnewvalue
     */
     (function hc_namednodemapsetnameditemwithnewvalue() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var newNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddress = elementList.item(2);
      newAttribute = doc.createAttribute("lang");
      attributes = testAddress.attributes;

      newNode = attributes.setNamedItem(newAttribute);
      jsUnitCore.assertNull("prevValueNull",newNode);
    
})()

