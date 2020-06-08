
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the second "p" element and create a NamedNodeMap 
   object from the attributes of the last child by
   invoking the "getAttributes()" method.  Once the
   list is created an invocation of the "setNamedItem(arg)"
   method is done with arg=newAttr, where newAttr is a
   new Attr Node previously created.  The "setNamedItem(arg)"
   method should add then new node to the NamedNodeItem 
   object by using its "nodeName" attribute("lang').
   This node is then retrieved using the "getNamedItem(name)"
   method.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_namednodemapsetnameditem
     */
     (function hc_namednodemapsetnameditem() {
   var success; 
    var doc;
      var elementList;
      var newAttribute;
      var testAddress;
      var attributes;
      var districtNode;
      var attrName;
      var setNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddress = elementList.item(1);
      newAttribute = doc.createAttribute("lang");
      attributes = testAddress.attributes;

      setNode = attributes.setNamedItem(newAttribute);
      districtNode = attributes.getNamedItem("lang");
      attrName = districtNode.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","lang",attrName);
       
})()

