
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
This test calls setAttributeNode to replace an attribute with itself.  
Since the node is not an attribute of another Element, it would
be inappropriate to throw an INUSE_ATTRIBUTE_ERR.

This test was derived from elementinuserattributeerr which
inadvertanly made this test.

* @author Curt Arnold
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
*/

     /*
     * @id elementreplaceattributewithself
     */
     (function elementreplaceattributewithself() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var streetAttr;
      var replacedAttr;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      streetAttr = testEmployee.getAttributeNode("street");
      replacedAttr = testEmployee.setAttributeNode(streetAttr);
      DOMTestCase.assertSame("replacedAttr",streetAttr,replacedAttr);

})()

