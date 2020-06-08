
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a text node to an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id hc_attrinsertbefore1
     */
     (function hc_attrinsertbefore1() {
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
      var lastChild;
      var refChild = null;

      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      retval = titleAttr.insertBefore(textNode,refChild);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","Yesterday",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","terday",value);
       firstChild = titleAttr.firstChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","Yes",value);
       lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","terday",value);
       
})()

