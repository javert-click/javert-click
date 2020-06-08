
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttribute(name,value)" method adds a new attribute
   to the Element.  If the "name" is already present, then
   its value should be changed to the new one that is in
   the "value" parameter. 
   
   Retrieve the last child of the fourth employee, then add 
   an attribute to it by invoking the 
   "setAttribute(name,value)" method.  Since the name of the
   used attribute("street") is already present in this     
   element, then its value should be changed to the new one
   of the "value" parameter.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
*/

     /*
     * @id elementchangeattributevalue
     */
     (function elementchangeattributevalue() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(3);
      testEmployee.setAttribute("street","Neither");
      attrValue = testEmployee.getAttribute("street");
      jsUnitCore.assertEquals("elementChangeAttributeValueAssert","Neither",attrValue);
       
})()

