
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getAttributes()" method invoked on an Attribute
Node returns null.

Retrieve the first attribute from the last child of the
first employee and invoke the "getAttributes()" method
on the Attribute Node.  It should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
*/

     /*
     * @id nodeattributenodeattribute
     */
     (function nodeattributenodeattribute() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrNode;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      addrAttr = testAddr.attributes;

      attrNode = addrAttr.item(0);
      attrList = attrNode.attributes;

      jsUnitCore.assertNull("nodeAttributeNodeAttributeAssert1",attrList);
    
})()

