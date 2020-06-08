
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the node removed by the "removeNamedItem(name)" method 
   is an Attr node with a default value it is immediately
   replaced. 
   
   Retrieve the third employee and create a NamedNodeMap 
   object of the attributes of the last child.  Once the
   list is created invoke the "removeNamedItem(name)"
   method with name="street".  The "removeNamedItem(name)"
   method should remove the "street" attribute and since
   it has a default value of "Yes", that value should
   immediately be the attributes value.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id namednodemapremovenameditemgetvalue
     */
     (function namednodemapremovenameditemgetvalue() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var streetAttr;
      var value;
      var removedNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      attributes = testEmployee.attributes;

      jsUnitCore.assertNotNull("attributesNotNull",attributes);
removedNode = attributes.removeNamedItem("street");
      streetAttr = attributes.getNamedItem("street");
      jsUnitCore.assertNotNull("streetAttrNotNull",streetAttr);
value = streetAttr.value;

      jsUnitCore.assertEquals("namednodemapRemoveNamedItemGetValueAssert","Yes",value);
       
})()

