
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Setting the nodeValue should change the value returned by
    nodeValue and ProcessingInstruction.getData.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1004215813
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-837822393
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=181
*/

     /*
     * @id nodeprocessinginstructionsetnodevalue
     */
     (function nodeprocessinginstructionsetnodevalue() {
   var success; 
    var doc;
      var testList;
      var piNode;
      var piValue;
      
	   
	   
	doc = docs["staff.xml"]
           testList = doc.childNodes;

      piNode = testList.item(0);
      piNode.nodeValue = "Something different";

      piValue = piNode.nodeValue;

      jsUnitCore.assertEquals("nodeValue","Something different",piValue);
       piValue = piNode.data;

      jsUnitCore.assertEquals("data","Something different",piValue);
       
})()

