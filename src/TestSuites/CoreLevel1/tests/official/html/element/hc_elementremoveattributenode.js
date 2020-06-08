
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method returns the
   node that was removed. 
   
   Retrieve the last child of the third employee and
   remove its "class" Attr node.  The method should  
   return the old attribute node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
*/

     /*
     * @id hc_elementremoveattributenode
     */
     (function hc_elementremoveattributenode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var streetAttr;
      var removedAttr;
      var removedValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      streetAttr = testEmployee.getAttributeNode("class");
      removedAttr = testEmployee.removeAttributeNode(streetAttr);
      jsUnitCore.assertNotNull("removedAttrNotNull",removedAttr);
removedValue = removedAttr.value;

      jsUnitCore.assertEquals("elementRemoveAttributeNodeAssert","No",removedValue);
       
})()

