
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getAttributes()" method invoked on a Text
Node returns null.

Retrieve the Text node from the last child of the
first employee and invoke the "getAttributes()" method
on the Text Node.  It should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1312295772
*/

     /*
     * @id nodetextnodeattribute
     */
     (function nodetextnodeattribute() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var textNode;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      textNode = testAddr.firstChild;

      attrList = textNode.attributes;

      jsUnitCore.assertNull("nodeTextNodeAttributesAssert1",attrList);
    
})()

