
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
   a "name" attribute with an assigned value equal to 
   "value".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
*/

     /*
     * @id elementaddnewattribute
     */
     (function elementaddnewattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(4);
      testEmployee.setAttribute("district","dallas");
      attrValue = testEmployee.getAttribute("district");
      jsUnitCore.assertEquals("elementAddNewAttributeAssert","dallas",attrValue);
       
})()

