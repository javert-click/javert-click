
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getData()" method returns the content of the  
   processing instruction.  It starts at the first non
   white character following the target and ends at the
   character immediately preceding the "?>".
   
   Retrieve the ProcessingInstruction node located  
   immediately after the prolog.  Create a nodelist of the 
   child nodes of this document.  Invoke the "getData()"
   method on the first child in the list. This should
   return the content of the ProcessingInstruction.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-837822393
*/

     /*
     * @id processinginstructiongetdata
     */
     (function processinginstructiongetdata() {
   var success; 
    var doc;
      var childNodes;
      var piNode;
      var data;
      
	   
	   
	doc = docs["staff.xml"]
           childNodes = doc.childNodes;

      piNode = childNodes.item(0);
      data = piNode.data;

      jsUnitCore.assertEquals("processinginstructionGetTargetAssert","PIDATA",data);
       
})()

