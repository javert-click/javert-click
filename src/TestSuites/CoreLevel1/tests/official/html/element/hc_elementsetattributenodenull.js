
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method returns the
   null value if no previously existing Attr node with the
   same name was replaced.
   
   Retrieve the last child of the third employee and add a 
   new attribute to it.  The new attribute node added is 
   "lang", which is not part of this Element.  The   
   method should return the null value.   
   This test uses the "createAttribute(name)"
   method from the Document interface. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_elementsetattributenodenull
     */
     (function hc_elementsetattributenodenull() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var districtAttr;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("lang");
      districtAttr = testEmployee.setAttributeNode(newAttribute);
      jsUnitCore.assertNull("elementSetAttributeNodeNullAssert",districtAttr);
    
})()

