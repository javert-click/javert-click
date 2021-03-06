
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getElementsByTagName(name)" method returns a list
of all descendant Elements with the given tag name.

Create a NodeList of all the descendant elements
using the string "employee" as the tagName.
The method should return a NodeList whose length is
"5".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
*/

     /*
     * @id hc_elementgetelementsbytagnamenomatch
     */
     (function hc_elementgetelementsbytagnamenomatch() {
   var success; 
    var doc;
      var elementList;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("noMatch");
      DOMTestCase.assertSize("elementGetElementsByTagNameNoMatchNoMatchAssert",0,elementList);

})()

