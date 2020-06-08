
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createProcessingInstruction(target,data)" method 
   creates a new ProcessingInstruction node with the
   specified name and data string.
   
   Retrieve the entire DOM document and invoke its 
   "createProcessingInstruction(target,data)" method.  
   It should create a new PI node with the specified target 
   and data.  The target, data and type are retrieved and
   output.

* @author NIST
* @author Mary Brady
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2001Apr/0020.html
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-135944439
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id documentcreateprocessinginstruction
     */
     (function documentcreateprocessinginstruction() {
   var success; 
    var doc;
      var newPINode;
      var piValue;
      var piName;
      var piType;
      
	   
	   
	doc = docs["staff.xml"]
           newPINode = doc.createProcessingInstruction("TESTPI","This is a new PI node");
      jsUnitCore.assertNotNull("createdPINotNull",newPINode);
piName = newPINode.nodeName;

      jsUnitCore.assertEquals("name","TESTPI",piName);
       piValue = newPINode.nodeValue;

      jsUnitCore.assertEquals("value","This is a new PI node",piValue);
       piType = newPINode.nodeType;

      jsUnitCore.assertEquals("type",7,piType);
       
})()

