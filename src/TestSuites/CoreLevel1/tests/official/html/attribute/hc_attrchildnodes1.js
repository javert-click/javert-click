
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Checks that Node.childNodes for an attribute node contains
the expected text node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
*/

     /*
     * @id hc_attrchildnodes1
     */
     (function hc_attrchildnodes1() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var childNodes;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      childNodes = titleAttr.childNodes;

      DOMTestCase.assertSize("childNodesSize",1,childNodes);
textNode = childNodes.item(0);
      value = textNode.nodeValue;

      jsUnitCore.assertEquals("child1IsYes","Yes",value);
       textNode = childNodes.item(1);
      jsUnitCore.assertNull("secondItemIsNull",textNode);
    
})()

