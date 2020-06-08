
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getNodeType()" method for a Processing Instruction 

    node returns the constant value 7.

    

    Retrieve a NodeList of child elements from the document.

    Retrieve the first child and invoke the "getNodeType()"   

    method.   The method should return 7. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodeprocessinginstructionnodetype
     */
     (function nodeprocessinginstructionnodetype() {
   var success; 
    var doc;
      var testList;
      var piNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           testList = doc.childNodes;

      piNode = testList.item(0);
      nodeType = piNode.nodeType;

      jsUnitCore.assertEquals("nodeProcessingInstructionNodeTypeAssert1",7,nodeType);
       
})()

