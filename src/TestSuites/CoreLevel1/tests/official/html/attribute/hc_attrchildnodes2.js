
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Checks Node.childNodes for an attribute with multiple child nodes.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
*/

     /*
     * @id hc_attrchildnodes2
     */
     (function hc_attrchildnodes2() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var childNodes;
      var retval;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      childNodes = titleAttr.childNodes;

      textNode = doc.createTextNode("terday");
      retval = titleAttr.appendChild(textNode);
      DOMTestCase.assertSize("childNodesSize",2,childNodes);
textNode = childNodes.item(0);
      value = textNode.nodeValue;

      jsUnitCore.assertEquals("child1IsYes","Yes",value);
       textNode = childNodes.item(1);
      value = textNode.nodeValue;

      jsUnitCore.assertEquals("child2IsTerday","terday",value);
       textNode = childNodes.item(2);
      jsUnitCore.assertNull("thirdItemIsNull",textNode);
    
})()

