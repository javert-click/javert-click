
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Create and populate a new DocumentFragment object and
    append it to the second employee.   After the 
    "appendChild(newChild)" method is invoked retrieve the
    new nodes at the end of the list, they should be the
    two Element nodes from the DocumentFragment.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodeappendchilddocfragment
     */
     (function nodeappendchilddocfragment() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var newdocFragment;
      var newChild1;
      var newChild2;
      var child;
      var childName;
      var result = new Array();

      var nodeType;
      var appendedChild;
      var expected = new Array();
      expected[0] = "employeeId";
      expected[1] = "name";
      expected[2] = "position";
      expected[3] = "salary";
      expected[4] = "gender";
      expected[5] = "address";
      expected[6] = "newChild1";
      expected[7] = "newChild2";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      newdocFragment = doc.createDocumentFragment();
      newChild1 = doc.createElement("newChild1");
      newChild2 = doc.createElement("newChild2");
      appendedChild = newdocFragment.appendChild(newChild1);
      appendedChild = newdocFragment.appendChild(newChild2);
      appendedChild = employeeNode.appendChild(newdocFragment);
      for(var indexN65695 = 0;indexN65695 < childList.length; indexN65695++) {
      child = childList.item(indexN65695);
      nodeType = child.nodeType;

      
	if(
	(1 == nodeType)
	) {
	childName = child.nodeName;

      result[result.length] = childName;

	}
	
	}
   DOMTestCase.assertEqualsList("elementNames",expected,result);
       
})()

