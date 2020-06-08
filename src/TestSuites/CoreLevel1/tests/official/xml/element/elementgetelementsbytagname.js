
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getElementsByTagName(name)" method returns a list
of all descendant Elements with the given tag name.
Test for an empty list.

Create a NodeList of all the descendant elements
using the string "noMatch" as the tagName.
The method should return a NodeList whose length is
"0" since there are not any descendant elements
that match the given tag name.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
*/

     /*
     * @id elementgetelementsbytagname
     */
     (function elementgetelementsbytagname() {
   var success; 
    var doc;
      var elementList;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      DOMTestCase.assertSize("elementGetElementsByTagNameAssert",5,elementList);

})()

