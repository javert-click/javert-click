
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getPreviousSibling()" method returns the node
    immediately preceding this node. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-640FB3C8
*/

     /*
     * @id nodegetprevioussibling
     */
     (function nodegetprevioussibling() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var psNode;
      var psName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(1);
      psNode = nameNode.previousSibling;

      psName = psNode.nodeName;

      
	if(
	("#text" == psName)
	) {
	psNode = psNode.previousSibling;

      psName = psNode.nodeName;

      
	}
	jsUnitCore.assertEquals("nodeName","employeeId",psName);
       
})()

