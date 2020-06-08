
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getAttributes()" method invoked on a Document
Node returns null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
*/

     /*
     * @id nodedocumentnodeattribute
     */
     (function nodedocumentnodeattribute() {
   var success; 
    var doc;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           attrList = doc.attributes;

      jsUnitCore.assertNull("documentAttributesNull",attrList);
    
})()

