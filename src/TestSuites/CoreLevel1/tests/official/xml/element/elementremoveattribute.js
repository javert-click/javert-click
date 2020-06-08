
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttribute(name)" removes an attribute by name.
   If the attribute has a default value, it is immediately
   replaced.
   
   Retrieve the attribute named "street" from the last child
   of the fourth employee, then remove the "street" 
   attribute by invoking the "removeAttribute(name)" method.
   The "street" attribute has a default value defined in the
   DTD file, that value should immediately replace the old
   value.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id elementremoveattribute
     */
     (function elementremoveattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(3);
      testEmployee.removeAttribute("street");
      attrValue = testEmployee.getAttribute("street");
      jsUnitCore.assertEquals("streetYes","Yes",attrValue);
       
})()

