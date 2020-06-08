
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getAttributes()" method invoked on a Processing 

    Instruction Node returns null.

    

    Retrieve the Processing Instruction node and invoke 

    the "getAttributes()" method.   It should return null. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodeprocessinginstructionnodeattributes
     */
     (function nodeprocessinginstructionnodeattributes() {
   var success; 
    var doc;
      var testList;
      var piNode;
      var attrList;
      
	   
	   
	doc = docs["staff.xml"]
           testList = doc.childNodes;

      piNode = testList.item(0);
      attrList = piNode.attributes;

      jsUnitCore.assertNull("nodeProcessingInstructionNodeAttrAssert1",attrList);
    
})()

