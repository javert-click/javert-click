
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
To respecify the attribute to its default value from
the DTD, the attribute must be deleted.  This will then
make a new attribute available with the "getSpecified()"
method value set to false.
Retrieve the attribute named "street" from the last
child of of the THIRD employee and delete it.  This
should then create a new attribute with its default
value and also cause the "getSpecified()" method to
return false.
This test uses the "removeAttribute(name)" method
from the Element interface and the "getNamedItem(name)"
method from the NamedNodeMap interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id attrspecifiedvalueremove
     */
     (function attrspecifiedvalueremove() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(2);
      testNode.removeAttribute("street");
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("street");
      jsUnitCore.assertNotNull("streetAttrNotNull",streetAttr);
state = streetAttr.specified;

      jsUnitCore.assertFalse("attrSpecifiedValueRemoveAssert",state);

})()

