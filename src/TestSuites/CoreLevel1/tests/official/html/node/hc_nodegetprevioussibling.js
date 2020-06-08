
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getPreviousSibling()" method returns the node
    immediately preceding this node. 
    
    Retrieve the second child of the second employee and    
    invoke the "getPreviousSibling()" method.   It should
    return a node with a NodeName of "#text".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-640FB3C8
*/

     /*
     * @id hc_nodegetprevioussibling
     */
     (function hc_nodegetprevioussibling() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var psNode;
      var psName;
      
	   
	   
	    doc = docs["hc_staff.html"]
      elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(1);
      psNode = nameNode.previousSibling;

      psName = psNode.nodeName;

      jsUnitCore.assertEquals("whitespace","#text",psName);
       
})()

