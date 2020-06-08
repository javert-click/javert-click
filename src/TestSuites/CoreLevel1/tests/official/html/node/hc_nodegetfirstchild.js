
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getFirstChild()" method returns the first child
    of this node. 
    
    Retrieve the second employee and invoke the
    "getFirstChild()" method.   The NodeName returned
    should be "#text" or "EM".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-169727388
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodegetfirstchild
     */
     (function hc_nodegetfirstchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var fchildNode;
      var childName;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      fchildNode = employeeNode.firstChild;

      childName = fchildNode.nodeName;

      
	if(
	("#text" == childName)
	) {
	jsUnitCore.assertEquals("firstChild_w_whitespace","#text",childName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "firstChild_wo_whitespace","em",childName);
       
		}
	
})()

