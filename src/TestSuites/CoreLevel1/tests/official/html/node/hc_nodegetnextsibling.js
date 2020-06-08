
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNextSibling()" method returns the node immediately
    following this node. 
    
    Retrieve the first child of the second employee and
    invoke the "getNextSibling()" method.   It should return
    a node with the NodeName of "#text".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6AC54C2F
*/

     /*
     * @id hc_nodegetnextsibling
     */
     (function hc_nodegetnextsibling() {
   var success; 
    var doc;
      var elementList;
      var emNode;
      var nsNode;
      var nsName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("em");
      emNode = elementList.item(1);
      nsNode = emNode.nextSibling;

      nsName = nsNode.nodeName;

      jsUnitCore.assertEquals("whitespace","#text",nsName);
       
})()

