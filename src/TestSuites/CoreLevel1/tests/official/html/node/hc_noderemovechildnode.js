
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeChild(oldChild)" method removes the node
    indicated by "oldChild". 
    
    Retrieve the second p element and remove its first child.
    After the removal, the second p element should have 5 element
    children and the first child should now be the child
    that used to be at the second position in the list.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_noderemovechildnode
     */
     (function hc_noderemovechildnode() {
   var success; 
    var doc;
      var elementList;
      var emList;
      var employeeNode;
      var childList;
      var oldChild;
      var child;
      var childName;
      var length;
      var removedChild;
      var removedName;
      var nodeType;
      var expected = new Array();
      expected[0] = "strong";
      expected[1] = "code";
      expected[2] = "sup";
      expected[3] = "var";
      expected[4] = "acronym";

      var actual = new Array();

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      emList = employeeNode.getElementsByTagName("em");
      oldChild = emList.item(0);
      removedChild = employeeNode.removeChild(oldChild);
      removedName = removedChild.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "removedName","em",removedName);
       for(var indexN65688 = 0;indexN65688 < childList.length; indexN65688++) {
      child = childList.item(indexN65688);
      nodeType = child.nodeType;

      childName = child.nodeName;

      
	if(
	(1 == nodeType)
	) {
	actual[actual.length] = childName;

	}
	
		else {
			jsUnitCore.assertEquals("textNodeType",3,nodeType);
       jsUnitCore.assertEquals("textNodeName","#text",childName);
       
		}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "childNames",expected,actual);
       
})()

