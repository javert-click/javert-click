
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getParentNode()" method for an Attr node should return null.  Retrieve
the attribute named "domestic" from the last child of the first employee
and examine its parentNode attribute.  This test also uses the "getNamedItem(name)"
method from the NamedNodeMap interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1060184317
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
*/

     /*
     * @id attrparentnodenull
     */
     (function attrparentnodenull() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var domesticAttr;
      var s;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(0);
      attributes = testNode.attributes;

      domesticAttr = attributes.getNamedItem("domestic");
      s = domesticAttr.parentNode;

      jsUnitCore.assertNull("attrParentNodeNullAssert",s);
    
})()

