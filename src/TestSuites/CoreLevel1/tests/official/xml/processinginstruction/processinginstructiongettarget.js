
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getTarget()" method returns the target of the  
   processing instruction.  It is the first token following
   the markup that begins the processing instruction.
   
   Retrieve the ProcessingInstruction node located  
   immediately after the prolog.  Create a nodelist of the 
   child nodes of this document.  Invoke the "getTarget()"
   method on the first child in the list. This should
   return the target of the ProcessingInstruction.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1478689192
*/

     /*
     * @id processinginstructiongettarget
     */
     (function processinginstructiongettarget() {
   var success; 
    var doc;
      var childNodes;
      var piNode;
      var target;
      
	   
	   
	doc = docs["staff.xml"]
           childNodes = doc.childNodes;

      piNode = childNodes.item(0);
      target = piNode.target;

      jsUnitCore.assertEquals("processinginstructionGetTargetAssert","TEST-STYLE",target);
       
})()

