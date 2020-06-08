
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "cloneNode(deep)" method does not copy text unless it
    is deep cloned.(Test for deep=true)
    
    Retrieve the eighth child of the second employee and
    the "cloneNode(deep)" method with deep=true.   The
    duplicate node returned by the method should copy
    any text data contained in this node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodeclonetruecopytext
     */
     (function hc_nodeclonetruecopytext() {
   var success; 
    var doc;
      var elementList;
      var childNode;
      var clonedNode;
      var lastChildNode;
      var childValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("sup");
      childNode = elementList.item(1);
      clonedNode = childNode.cloneNode(true);
      lastChildNode = clonedNode.lastChild;

      childValue = lastChildNode.nodeValue;

      jsUnitCore.assertEquals("cloneContainsText","35,000",childValue);
       
})()

