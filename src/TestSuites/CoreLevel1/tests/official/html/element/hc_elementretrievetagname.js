
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getElementsByTagName()" method returns a NodeList 
   of all descendant elements with a given tagName.    
   
   Invoke the "getElementsByTagName()" method and create
   a NodeList of "code" elements.  Retrieve the second 
   "code" element in the list and return the NodeName. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-104682815
*/

     /*
     * @id hc_elementretrievetagname
     */
     (function hc_elementretrievetagname() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var strong;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("code");
      testEmployee = elementList.item(1);
      strong = testEmployee.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodename","code",strong);
       strong = testEmployee.tagName;

      DOMTestCase.assertEqualsAutoCase("element", "tagname","code",strong);
       
})()

