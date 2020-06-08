
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is already in the tree, the
    "insertBefore(newChild,refChild)" method must first
    remove it before the insertion takes place.
    
    Insert a node Element ("em") that is already
    present in the tree.   The existing node should be 
    removed first and the new one inserted.   The node is
    inserted at a different position in the tree to assure
    that it was indeed inserted.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodeinsertbeforenewchildexists
     */
     (function hc_nodeinsertbeforenewchildexists() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newChild;
      var child;
      var childName;
      var insertedNode;
      var expected = new Array();
      expected[0] = "strong";
      expected[1] = "code";
      expected[2] = "sup";
      expected[3] = "var";
      expected[4] = "em";
      expected[5] = "acronym";

      var result = new Array();

      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.getElementsByTagName("*");
      refChild = childList.item(5);
      newChild = childList.item(0);
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      for(var indexN65676 = 0;indexN65676 < childList.length; indexN65676++) {
      child = childList.item(indexN65676);
      nodeType = child.nodeType;

      
	if(
	(1 == nodeType)
	) {
	childName = child.nodeName;

      result[result.length] = childName;

	}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "childNames",expected,result);
       
})()

