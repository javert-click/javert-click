
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a text node to an attribute, normalizes the attribute
and checks for a single child node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-162CF083
*/

     /*
     * @id hc_attrnormalize
     */
     (function hc_attrnormalize() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var textNode;
      var retval;
      var firstChild;
      var secondChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      retval = titleAttr.appendChild(textNode);
      textNode = doc.createTextNode("");
      retval = titleAttr.appendChild(textNode);
      testNode.normalize();
      value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       firstChild = titleAttr.firstChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","Yesterday",value);
       secondChild = firstChild.nextSibling;

      jsUnitCore.assertNull("secondChildIsNull",secondChild);
    
})()

