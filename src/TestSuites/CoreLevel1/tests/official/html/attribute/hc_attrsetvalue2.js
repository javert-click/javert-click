
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Sets Attr.value on an attribute that should contain multiple child nodes.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
*/

     /*
     * @id hc_attrsetvalue2
     */
     (function hc_attrsetvalue2() {
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
      var otherChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      retval = titleAttr.appendChild(textNode);
      firstChild = titleAttr.firstChild;

      jsUnitCore.assertNotNull("attrChildNotNull",firstChild);
titleAttr.value = "Tomorrow";

      firstChild.nodeValue = "impl reused node";

      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","Tomorrow",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Tomorrow",value);
       firstChild = titleAttr.lastChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","Tomorrow",value);
       otherChild = firstChild.nextSibling;

      jsUnitCore.assertNull("nextSiblingIsNull",otherChild);
    
})()

