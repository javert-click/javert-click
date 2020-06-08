
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttribute(name)" method returns an attribute
   value by name.
   
   Retrieve the second address element, then
   invoke the 'getAttribute("class")' method.  This should
   return the value of the attribute("No").

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-666EE0F9
*/

     /*
     * @id hc_elementretrieveattrvalue
     */
     (function hc_elementretrieveattrvalue() {
   var success; 
    var doc;
      var elementList;
      var testAddress;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddress = elementList.item(2);
      attrValue = testAddress.getAttribute("class");
      jsUnitCore.assertEquals("attrValue","No",attrValue);
       
})()

