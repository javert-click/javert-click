
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the second salary and
    the "cloneNode(deep)" method with deep=true.   The
    duplicate node returned by the method should copy
    any text data contained in this node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id nodeclonetruecopytext
     */
     (function nodeclonetruecopytext() {
   var success; 
    var doc;
      var elementList;
      var childList;
      var childNode;
      var clonedNode;
      var lastChildNode;
      var childValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("salary");
      childNode = elementList.item(1);
      clonedNode = childNode.cloneNode(true);
      lastChildNode = clonedNode.lastChild;

      childValue = lastChildNode.nodeValue;

      jsUnitCore.assertEquals("nodeCloneTrueCopyTextAssert1","35,000",childValue);
       
})()

