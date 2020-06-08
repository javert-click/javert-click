
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the notation named "notation1" and access its 
   name by invoking the "getNodeName()" method inherited
   from the Node interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5431D1B9
*/

     /*
     * @id notationgetnotationname
     */
     (function notationgetnotationname() {
   var success; 
    var doc;
      var docType;
      var notations;
      var notationNode;
      var notationName;
      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);
notationNode = notations.getNamedItem("notation1");
      notationName = notationNode.nodeName;

      jsUnitCore.assertEquals("notationGetNotationNameAssert","notation1",notationName);
       
})()

