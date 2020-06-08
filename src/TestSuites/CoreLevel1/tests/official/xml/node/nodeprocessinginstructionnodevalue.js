
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    Processing Instruction Node is the content of the
    Processing Instruction(exclude the target).
    
    Retrieve the Processing Instruction node in the XML file 
    and check the string returned by the "getNodeValue()" 
    method.   It should be equal to "PIDATA".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodeprocessinginstructionnodevalue
     */
     (function nodeprocessinginstructionnodevalue() {
   var success; 
    var doc;
      var testList;
      var piNode;
      var piValue;
      
	   
	   
	doc = docs["staff.xml"]
           testList = doc.childNodes;

      piNode = testList.item(0);
      piValue = piNode.nodeValue;

      jsUnitCore.assertEquals("value","PIDATA",piValue);
       
})()

