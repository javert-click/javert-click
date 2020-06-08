
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for an Element Node
    returns the constant value 1.
    
    Retrieve the root node and invoke the "getNodeType()"   
    method.   The method should return 1. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodeelementnodetype
     */
     (function nodeelementnodetype() {
   var success; 
    var doc;
      var rootNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           rootNode = doc.documentElement;

      nodeType = rootNode.nodeType;

      jsUnitCore.assertEquals("nodeElementNodeTypeAssert1",1,nodeType);
       
})()

