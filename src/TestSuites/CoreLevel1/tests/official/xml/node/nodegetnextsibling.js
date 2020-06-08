
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNextSibling()" method returns the node immediately
    following this node. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6AC54C2F
*/

     /*
     * @id nodegetnextsibling
     */
     (function nodegetnextsibling() {
   var success; 
    var doc;
      var elementList;
      var employeeIdNode;
      var nsNode;
      var nsName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employeeId");
      employeeIdNode = elementList.item(1);
      nsNode = employeeIdNode.nextSibling;

      nsName = nsNode.nodeName;

      
	if(
	("#text" == nsName)
	) {
	nsNode = nsNode.nextSibling;

      nsName = nsNode.nodeName;

      
	}
	jsUnitCore.assertEquals("nodeName","name",nsName);
       
})()

