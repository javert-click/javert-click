
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Elements may have attributes associated with them.
   
   Retrieve the first attribute from the last child of
   the first employee and invoke the "getSpecified()" 
   method.  This test is only intended to show that   
   Elements can actually have attributes.  This test uses  
   the "getNamedItem(name)" method from the NamedNodeMap
   interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id elementassociatedattribute
     */
     (function elementassociatedattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var domesticAttr;
      var specified;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(0);
      attributes = testEmployee.attributes;

      domesticAttr = attributes.getNamedItem("domestic");
      specified = domesticAttr.specified;

      jsUnitCore.assertTrue("domesticSpecified",specified);

})()

