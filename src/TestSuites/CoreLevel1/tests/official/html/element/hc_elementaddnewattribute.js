
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttribute(name,value)" method adds a new attribute
   to the Element 
   
   Retrieve the last child of the last employee, then 
   add an attribute to it by invoking the             
   "setAttribute(name,value)" method.  It should create
   a "strong" attribute with an assigned value equal to 
   "value".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_elementaddnewattribute
     */
     (function hc_elementaddnewattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(4);
      testEmployee.setAttribute("lang","EN-us");
      attrValue = testEmployee.getAttribute("lang");
      jsUnitCore.assertEquals("attrValue","EN-us",attrValue);
       
})()

