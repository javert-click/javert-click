
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttribute(name)" removes an attribute by name.
   If the attribute has a default value, it is immediately
   replaced.  However, there is no default values in the HTML
   compatible tests, so its value is "".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D6AC0F9
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id hc_elementremoveattribute
     */
     (function hc_elementremoveattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(3);
      testEmployee.removeAttribute("class");
      attrValue = testEmployee.getAttribute("class");
      jsUnitCore.assertEquals("attrValue","",attrValue);
       
})()

