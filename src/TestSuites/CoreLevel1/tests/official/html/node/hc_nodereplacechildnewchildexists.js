
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is already in the tree, it is first
    removed before the new one is added.
   
    Retrieve the second "p" and replace "acronym" with its "em".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodereplacechildnewchildexists
     */
     (function hc_nodereplacechildnewchildexists() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild = null;

      var newChild = null;

      var child;
      var childName;
      var childNode;
      var actual = new Array();

      var expected = new Array();
      expected[0] = "strong";
      expected[1] = "code";
      expected[2] = "sup";
      expected[3] = "var";
      expected[4] = "em";

      var replacedChild;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.getElementsByTagName("*");
      newChild = childList.item(0);
      oldChild = childList.item(5);
      replacedChild = employeeNode.replaceChild(newChild,oldChild);
      DOMTestCase.assertSame("return_value_same",oldChild,replacedChild);
for(var indexN65684 = 0;indexN65684 < childList.length; indexN65684++) {
      childNode = childList.item(indexN65684);
      childName = childNode.nodeName;

      nodeType = childNode.nodeType;

      
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

