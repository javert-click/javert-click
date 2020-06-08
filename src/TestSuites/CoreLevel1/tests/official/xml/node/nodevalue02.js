
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An comment is created, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1728279322
*/

     /*
     * @id nodevalue02
     */
     (function nodevalue02() {
   var success; 
    var doc;
      var newNode;
      var newValue;
      
	   
	   
	doc = docs["staff.xml"]
           newNode = doc.createComment("This is a new Comment node");
      newValue = newNode.nodeValue;

      jsUnitCore.assertEquals("initial","This is a new Comment node",newValue);
       newNode.nodeValue = "This should have an effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertEquals("afterChange","This should have an effect",newValue);
       
})()

