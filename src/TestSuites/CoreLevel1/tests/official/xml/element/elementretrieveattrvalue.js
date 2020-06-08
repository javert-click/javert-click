
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttribute(name)" method returns an attribute
   value by name.
   
   Retrieve the second address element, then
   invoke the 'getAttribute("street")' method.  This should
   return the value of the attribute("No").

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-666EE0F9
*/

     /*
     * @id elementretrieveattrvalue
     */
     (function elementretrieveattrvalue() {
   var success; 
    var doc;
      var elementList;
      var testAddress;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddress = elementList.item(2);
      attrValue = testAddress.getAttribute("street");
      jsUnitCore.assertEquals("attrValue","No",attrValue);
       
})()

