
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An processing instruction is created, setNodeValue is called with a non-null argument, but getNodeValue
should still return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1004215813
*/

     /*
     * @id nodevalue09
     */
     (function nodevalue09() {
   var success; 
    var doc;
      var newNode;
      var newValue;
      
	   
	   
	doc = docs["staff.xml"]
           newNode = doc.createProcessingInstruction("TARGET","DATA");
      newValue = newNode.nodeValue;

      jsUnitCore.assertEquals("initial","DATA",newValue);
       newNode.nodeValue = "This should have an effect";

      newValue = newNode.nodeValue;

      jsUnitCore.assertEquals("after","This should have an effect",newValue);
       
})()

