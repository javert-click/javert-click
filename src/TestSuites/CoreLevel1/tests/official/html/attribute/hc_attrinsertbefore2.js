
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Prepends a text node to an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id hc_attrinsertbefore2
     */
     (function hc_attrinsertbefore2() {
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
      var firstChild;
      var refChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      refChild = titleAttr.firstChild;

      retval = titleAttr.insertBefore(textNode,refChild);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","terdayYes",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","terdayYes",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","terday",value);
       firstChild = titleAttr.firstChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","terday",value);
       lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","Yes",value);
       
})()

