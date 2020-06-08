
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of nodes
   in the list.
   
   Create a list of all the children elements of the third
   employee and invoke the "getLength()" method. 
   It should contain the value 13.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistindexgetlength
     */
     (function hc_nodelistindexgetlength() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var length;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      length = employeeList.length;

      
	if(
	(6 == length)
	) {
	jsUnitCore.assertEquals("length_wo_space",6,length);
       
	}
	
		else {
			jsUnitCore.assertEquals("length_w_space",13,length);
       
		}
	
})()

