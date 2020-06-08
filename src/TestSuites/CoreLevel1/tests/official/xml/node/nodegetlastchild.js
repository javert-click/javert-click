
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLastChild()" method returns the last child
    of this node. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-61AD09FB
*/

     /*
     * @id nodegetlastchild
     */
     (function nodegetlastchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var lchildNode;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      lchildNode = employeeNode.lastChild;

      childName = lchildNode.nodeName;

      
	if(
	("#text" == childName)
	) {
	lchildNode = lchildNode.previousSibling;

      childName = lchildNode.nodeName;

      
	}
	jsUnitCore.assertEquals("nodeName","address",childName);
       
})()

