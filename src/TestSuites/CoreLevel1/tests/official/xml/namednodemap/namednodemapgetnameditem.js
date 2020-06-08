
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNamedItem(name)" method retrieves a node 
   specified by name. 
   
   Retrieve the second employee and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getNamedItem(name)"
   method is done with name="domestic".  This should result
   in the domestic Attr node being returned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
*/

     /*
     * @id namednodemapgetnameditem
     */
     (function namednodemapgetnameditem() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var domesticAttr;
      var attrName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      domesticAttr = attributes.getNamedItem("domestic");
      attrName = domesticAttr.nodeName;

      jsUnitCore.assertEquals("namednodemapGetNamedItemAssert","domestic",attrName);
       
})()

