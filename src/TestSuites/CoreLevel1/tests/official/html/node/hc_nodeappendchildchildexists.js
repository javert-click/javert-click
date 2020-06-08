
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is already in the tree, it is first
    removed before the new one is appended.
    
    Retrieve the "em" second employee and   
    append the first child to the end of the list.   After
    the "appendChild(newChild)" method is invoked the first 
    child should be the one that was second and the last
    child should be the one that was first.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodeappendchildchildexists
     */
     (function hc_nodeappendchildchildexists() {
   var success; 
    var doc;
      var elementList;
      var childList;
      var childNode;
      var newChild;
      var memberNode;
      var memberName;
      var refreshedActual = new Array();

      var actual = new Array();

      var nodeType;
      var expected = new Array();
      expected[0] = "strong";
      expected[1] = "code";
      expected[2] = "sup";
      expected[3] = "var";
      expected[4] = "acronym";
      expected[5] = "em";

      var appendedChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      childNode = elementList.item(1);
      childList = childNode.getElementsByTagName("*");
      newChild = childList.item(0);
      appendedChild = childNode.appendChild(newChild);
      for(var indexN65669 = 0;indexN65669 < childList.length; indexN65669++) {
      memberNode = childList.item(indexN65669);
      memberName = memberNode.nodeName;

      actual[actual.length] = memberName;

	}
   DOMTestCase.assertEqualsListAutoCase("element", "liveByTagName",expected,actual);
       childList = childNode.childNodes;

      for(var indexN65692 = 0;indexN65692 < childList.length; indexN65692++) {
      memberNode = childList.item(indexN65692);
      nodeType = memberNode.nodeType;

      
	if(
	(1 == nodeType)
	) {
	memberName = memberNode.nodeName;

      refreshedActual[refreshedActual.length] = memberName;

	}
	
	}
   DOMTestCase.assertEqualsListAutoCase("element", "refreshedChildNodes",expected,refreshedActual);
       
})()

