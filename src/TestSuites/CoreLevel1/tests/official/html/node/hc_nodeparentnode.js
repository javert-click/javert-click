
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getParentNode()" method returns the parent
    of this node. 
    
    Retrieve the second employee and invoke the 
    "getParentNode()" method on this node.   It should
    be set to "body".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1060184317
*/

     /*
     * @id hc_nodeparentnode
     */
     (function hc_nodeparentnode() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var parentNode;
      var parentName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      parentNode = employeeNode.parentNode;

      parentName = parentNode.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "parentNodeName","body",parentName);
       
})()

