
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Checks that Node.hasChildNodes() is true for an attribute with content.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-810594187
*/

     /*
     * @id hc_attrhaschildnodes
     */
     (function hc_attrhaschildnodes() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var hasChildNodes;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      hasChildNodes = titleAttr.hasChildNodes();
      jsUnitCore.assertTrue("hasChildrenIsTrue",hasChildNodes);

})()

