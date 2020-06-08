
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNamedItem(name)" method returns a node of any 
   type specified by name. 
   
   Retrieve the second employee and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getNamedItem(name)"
   method is done with name="street".  This should result
   in the method returning an Attr node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1112119403
*/

     /*
     * @id namednodemapreturnattrnode
     */
     (function namednodemapreturnattrnode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var streetAttr;
      var attrName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      streetAttr = attributes.getNamedItem("street");
      DOMTestCase.assertInstanceOf("typeAssert","Attr",streetAttr);
attrName = streetAttr.nodeName;

      jsUnitCore.assertEquals("nodeName","street",attrName);
       attrName = streetAttr.name;

      jsUnitCore.assertEquals("attrName","street",attrName);
       
})()

