
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Checks that Node.firstChild for an attribute node contains
the expected text node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-169727388
*/

     /*
     * @id hc_attrfirstchild
     */
     (function hc_attrfirstchild() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var otherChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = titleAttr.firstChild;

      jsUnitCore.assertNotNull("textNodeNotNull",textNode);
value = textNode.nodeValue;

      jsUnitCore.assertEquals("child1IsYes","Yes",value);
       otherChild = textNode.nextSibling;

      jsUnitCore.assertNull("nextSiblingIsNull",otherChild);
    otherChild = textNode.previousSibling;

      jsUnitCore.assertNull("previousSiblingIsNull",otherChild);
    
})()

