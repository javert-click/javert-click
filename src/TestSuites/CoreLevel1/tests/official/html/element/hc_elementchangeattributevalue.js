
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttribute(name,value)" method adds a new attribute
   to the Element.  If the "strong" is already present, then
   its value should be changed to the new one that is in
   the "value" parameter. 
   
   Retrieve the last child of the fourth employee, then add 
   an attribute to it by invoking the 
   "setAttribute(name,value)" method.  Since the name of the
   used attribute("class") is already present in this     
   element, then its value should be changed to the new one
   of the "value" parameter.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
*/

     /*
     * @id hc_elementchangeattributevalue
     */
     (function hc_elementchangeattributevalue() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(3);
      testEmployee.setAttribute("class","Neither");
      attrValue = testEmployee.getAttribute("class");
      jsUnitCore.assertEquals("elementChangeAttributeValueAssert","Neither",attrValue);
       
})()

