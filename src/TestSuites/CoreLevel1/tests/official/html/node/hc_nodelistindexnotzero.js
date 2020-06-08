
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The items in the list are accessible via an integral
   index starting from zero.
   (Index not equal 0)
   
   Create a list of all the children elements of the third
   employee and access its fourth child by using an index
   of 3 and calling getNodeName() which should return
   "strong" (no whitespace)  or "#text" (with whitespace).

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-844377136
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistindexnotzero
     */
     (function hc_nodelistindexnotzero() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var employeeList;
      var child;
      var childName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(2);
      employeeList = employeeNode.childNodes;

      child = employeeList.item(3);
      childName = child.nodeName;

      
	if(
	("#text" == childName)
	) {
	jsUnitCore.assertEquals("childName_space","#text",childName);
       
	}
	
		else {
			DOMTestCase.assertEqualsAutoCase("element", "childName_strong","strong",childName);
       
		}
	
})()

