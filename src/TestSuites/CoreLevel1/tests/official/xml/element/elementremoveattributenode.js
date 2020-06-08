
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method returns the
   node that was removed. 
   
   Retrieve the last child of the third employee and
   remove its "street" Attr node.  The method should  
   return the old attribute node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
*/

     /*
     * @id elementremoveattributenode
     */
     (function elementremoveattributenode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var streetAttr;
      var removedAttr;
      var removedValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      streetAttr = testEmployee.getAttributeNode("street");
      removedAttr = testEmployee.removeAttributeNode(streetAttr);
      removedValue = removedAttr.value;

      jsUnitCore.assertEquals("elementRemoveAttributeNodeAssert","No",removedValue);
       
})()

