
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The tagName parameter in the "createElement(tagName)"
   method is case-sensitive for XML documents.
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method twice.  Once for tagName
   equal to "address" and once for tagName equal to "ADDRESS"
   Each call should create a distinct Element node.  The
   newly created Elements are then assigned attributes 
   that are retrieved.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
*/

     /*
     * @id documentcreateelementcasesensitive
     */
     (function documentcreateelementcasesensitive() {
   var success; 
    var doc;
      var newElement1;
      var newElement2;
      var attribute1;
      var attribute2;
      
	   
	   
	doc = docs["staff.xml"]
           newElement1 = doc.createElement("ADDRESS");
      newElement2 = doc.createElement("address");
      newElement1.setAttribute("district","Fort Worth");
      newElement2.setAttribute("county","Dallas");
      attribute1 = newElement1.getAttribute("district");
      attribute2 = newElement2.getAttribute("county");
      jsUnitCore.assertEquals("attrib1","Fort Worth",attribute1);
       jsUnitCore.assertEquals("attrib2","Dallas",attribute2);
       
})()

