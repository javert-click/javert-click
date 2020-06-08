
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
If the "setAttributeNode(newAttr)" method replaces an
existing Attr node with the same name, then it should
return the previously existing Attr node.

Retrieve the last child of the third employee and add a
new attribute node.  The new attribute node is "class",
which is already present in this Element.  The method
should return the existing Attr node(old "class" Attr).
This test uses the "createAttribute(name)" method
from the Document interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
*/

     /*
     * @id hc_elementreplaceexistingattributegevalue
     */
     (function hc_elementreplaceexistingattributegevalue() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var streetAttr;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("class");
      streetAttr = testEmployee.setAttributeNode(newAttribute);
      jsUnitCore.assertNotNull("previousAttrNotNull",streetAttr);
value = streetAttr.value;

      jsUnitCore.assertEquals("previousAttrValue","No",value);
       
})()

