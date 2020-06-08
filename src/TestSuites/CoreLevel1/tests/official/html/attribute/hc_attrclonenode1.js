
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a text node to an attribute and clones the node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id hc_attrclonenode1
     */
     (function hc_attrclonenode1() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var retval;
      var lastChild;
      var clonedTitle;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      retval = titleAttr.appendChild(textNode);
      clonedTitle = titleAttr.cloneNode(false);
      textNode.nodeValue = "text_node_not_cloned";

      value = clonedTitle.value;

      jsUnitCore.assertEquals("attrValue","Yesterday",value);
       value = clonedTitle.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       lastChild = clonedTitle.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","terday",value);
       
})()

