
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLastChild()" method returns the last child
    of this node. 
    
    Retrieve the second employee and invoke the
    "getLastChild()" method.   The NodeName returned
    should be "#text".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-61AD09FB
*/

     /*
     * @id hc_nodegetlastchild
     */
     (function hc_nodegetlastchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var lchildNode;
      var childName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      lchildNode = employeeNode.lastChild;

      childName = lchildNode.nodeName;

      jsUnitCore.assertEquals("whitespace","#text",childName);
       
})()

