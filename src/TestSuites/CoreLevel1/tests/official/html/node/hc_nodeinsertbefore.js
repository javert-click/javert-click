
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method inserts the
    node "newChild" before the node "refChild". 
    
    Insert a newly created Element node before the second
    sup element in the document and check the "newChild"
    and "refChild" after insertion for correct placement.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=261
*/

     /*
     * @id hc_nodeinsertbefore
     */
     (function hc_nodeinsertbefore() {
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
      var actual = new Array();

      var expected = new Array();
      expected[0] = "em";
      expected[1] = "strong";
      expected[2] = "code";
      expected[3] = "br";
      expected[4] = "sup";
      expected[5] = "var";
      expected[6] = "acronym";

      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("sup");
      refChild = elementList.item(2);
      employeeNode = refChild.parentNode;

      childList = employeeNode.childNodes;

      newChild = doc.createElement("br");
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      for(var indexN65681 = 0;indexN65681 < childList.length; indexN65681++) {
      child = childList.item(indexN65681);
      nodeType = child.nodeType;

      
	if(
	(1 == nodeType)
	) {
	childName = child.nodeName;

      actual[actual.length] = childName;

	}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "nodeNames",expected,actual);
       
})()

