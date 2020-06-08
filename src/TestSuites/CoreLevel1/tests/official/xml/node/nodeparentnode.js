
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getParentNode()" method returns the parent
    of this node. 
    
    Retrieve the second employee and invoke the 
    "getParentNode()" method on this node.   It should
    be set to "staff".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1060184317
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=251
*/

     /*
     * @id nodeparentnode
     */
     (function nodeparentnode() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var parentNode;
      var parentName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      parentNode = employeeNode.parentNode;

      parentName = parentNode.nodeName;

      
	if(
	
	(doc.doctype.content == "image/svg+xml")

	) {
	jsUnitCore.assertEquals("svgTagName","svg",parentName);
       
	}
	
		else {
			jsUnitCore.assertEquals("nodeParentNodeAssert1","staff",parentName);
       
		}
	
})()

