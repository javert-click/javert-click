
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The tagName parameter in the "createElement(tagName)"
   method is case-sensitive for XML documents.
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method twice.  Once for tagName
   equal to "acronym" and once for tagName equal to "ACRONYM"
   Each call should create a distinct Element node.  The
   newly created Elements are then assigned attributes 
   that are retrieved.

   Modified on 27 June 2003 to avoid setting an invalid style
   values and checked the node names to see if they matched expectations.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_documentcreateelementcasesensitive
     */
     (function hc_documentcreateelementcasesensitive() {
   var success; 
    var doc;
      var newElement1;
      var newElement2;
      var attribute1;
      var attribute2;
      var nodeName1;
      var nodeName2;
      
	   
	   
	doc = docs["hc_staff.html"]
           newElement1 = doc.createElement("ACRONYM");
      newElement2 = doc.createElement("acronym");
      newElement1.setAttribute("lang","EN");
      newElement2.setAttribute("title","Dallas");
      attribute1 = newElement1.getAttribute("lang");
      attribute2 = newElement2.getAttribute("title");
      jsUnitCore.assertEquals("attrib1","EN",attribute1);
       jsUnitCore.assertEquals("attrib2","Dallas",attribute2);
       nodeName1 = newElement1.nodeName;

      nodeName2 = newElement2.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodeName1","ACRONYM",nodeName1);
       DOMTestCase.assertEqualsAutoCase("element", "nodeName2","acronym",nodeName2);
       
})()

