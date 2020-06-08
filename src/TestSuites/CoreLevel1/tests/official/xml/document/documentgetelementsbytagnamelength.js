
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getElementsByTagName(tagName)" method returns a 
   NodeList of all the Elements with a given tagName.
   
   Retrieve the entire DOM document and invoke its 
   "getElementsByTagName(tagName)" method with tagName
   equal to "name".  The method should return a NodeList 
   that contains 5 elements.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-A6C9094
*/

     /*
     * @id documentgetelementsbytagnamelength
     */
     (function documentgetelementsbytagnamelength() {
   var success; 
    var doc;
      var nameList;
      
	   
	   
	doc = docs["staff.xml"]
           nameList = doc.getElementsByTagName("name");
      DOMTestCase.assertSize("documentGetElementsByTagNameLengthAssert",5,nameList);

})()

