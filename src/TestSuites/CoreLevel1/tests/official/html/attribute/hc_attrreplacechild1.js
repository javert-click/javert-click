
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Replaces a text node of an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id hc_attrreplacechild1
     */
     (function hc_attrreplacechild1() {
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
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      firstChild = titleAttr.firstChild;

      jsUnitCore.assertNotNull("attrChildNotNull",firstChild);
retval = titleAttr.replaceChild(textNode,firstChild);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","terday",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","terday",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","Yes",value);
       firstChild = titleAttr.firstChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","terday",value);
       
})()

