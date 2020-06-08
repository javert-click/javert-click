
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeNamedItem(name)" method removes a node 
   specified by name. 
   
   Retrieve the third employee and create a NamedNodeMap 
   object of the attributes of the last child.  Once the
   list is created invoke the "removeNamedItem(name)"
   method with name="street".  This should result
   in the removal of the specified attribute and
   the "getSpecified()" method should return false.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id namednodemapremovenameditem
     */
     (function namednodemapremovenameditem() {
   var success; 
    var doc;
      var elementList;
      var testAddress;
      var attributes;
      var streetAttr;
      var specified;
      var removedNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(2);
      attributes = testAddress.attributes;

      jsUnitCore.assertNotNull("attributesNotNull",attributes);
removedNode = attributes.removeNamedItem("street");
      streetAttr = attributes.getNamedItem("street");
      jsUnitCore.assertNotNull("streetAttrNotNull",streetAttr);
specified = streetAttr.specified;

      jsUnitCore.assertFalse("attrNotSpecified",specified);

})()

