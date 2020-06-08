
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for a DocumentFragment Node
    returns the constant value 11.

    Invoke the "createDocumentFragment()" method and    
    examine the NodeType of the document fragment
    returned by the "getNodeType()" method.   The method 
    should return 11. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A3
*/

     /*
     * @id nodedocumentfragmentnodetype
     */
     (function nodedocumentfragmentnodetype() {
   var success; 
    var doc;
      var documentFragmentNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           documentFragmentNode = doc.createDocumentFragment();
      nodeType = documentFragmentNode.nodeType;

      jsUnitCore.assertEquals("nodeDocumentFragmentNodeTypeAssert1",11,nodeType);
       
})()

