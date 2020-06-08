
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getFirstChild()" method returns the first child
    of this node. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-169727388
*/

     /*
     * @id nodegetfirstchild
     */
     (function nodegetfirstchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var fchildNode;
      var childName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      fchildNode = employeeNode.firstChild;

      childName = fchildNode.nodeName;

      
	if(
	("#text" == childName)
	) {
	fchildNode = fchildNode.nextSibling;

      childName = fchildNode.nodeName;

      
	}
	jsUnitCore.assertEquals("nodeName","employeeId",childName);
       
})()

