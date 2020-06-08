
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getAttributes()" method invoked on a Document
Node returns null.

Retrieve the DOM Document and invoke the
"getAttributes()" method on the Document Node.
It should return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#i-Document
*/

     /*
     * @id hc_nodedocumentnodeattribute
     */
     (function hc_nodedocumentnodeattribute() {
   var success; 
    var doc;
      var attrList;
      
	   
	   
	doc = docs["hc_staff.html"]
           attrList = doc.attributes;

      jsUnitCore.assertNull("doc_attributes_is_null",attrList);
    
})()

