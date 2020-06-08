
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeName()" method for a 

    Processing Instruction Node is the target.

    

    Retrieve the Processing Instruction Node in the XML file 

    and check the string returned by the "getNodeName()" 

    method.   It should be equal to "XML-STYLE". 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodeprocessinginstructionnodename
     */
     (function nodeprocessinginstructionnodename() {
   var success; 
    var doc;
      var testList;
      var piNode;
      var piName;
      
	   
	   
	doc = docs["staff.xml"]
           testList = doc.childNodes;

      piNode = testList.item(0);
      piName = piNode.nodeName;

      jsUnitCore.assertEquals("nodeProcessingInstructionNodeNameAssert1","TEST-STYLE",piName);
       
})()

