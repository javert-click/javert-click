
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getNodeType()" method for a Text Node

    returns the constant value 3.

     

    Retrieve the Text node from the last child of

    the first employee and invoke the "getNodeType()"   

    method.   The method should return 3. 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id nodetextnodetype
     */
     (function nodetextnodetype() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var textNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      textNode = testAddr.firstChild;

      nodeType = textNode.nodeType;

      jsUnitCore.assertEquals("nodeTextNodeTypeAssert1",3,nodeType);
       
})()

