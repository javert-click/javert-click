
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributeNode(name)" method retrieves an
   attribute node by name.
   
   Retrieve the attribute "domestic" from the last child
   of the first employee.  Since the method returns an
   Attr object, the "name" can be examined to ensure the
   proper attribute was retrieved.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-217A91B8
*/

     /*
     * @id elementgetattributenode
     */
     (function elementgetattributenode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var domesticAttr;
      var name;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(0);
      domesticAttr = testEmployee.getAttributeNode("domestic");
      name = domesticAttr.nodeName;

      jsUnitCore.assertEquals("elementGetAttributeNodeAssert","domestic",name);
       
})()

