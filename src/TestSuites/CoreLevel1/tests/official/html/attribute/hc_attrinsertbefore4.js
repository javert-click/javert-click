
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Prepends a document fragment to an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
*/

     /*
     * @id hc_attrinsertbefore4
     */
     (function hc_attrinsertbefore4() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var terNode;
      var dayNode;
      var docFrag;
      var retval;
      var firstChild;
      var lastChild;
      var refChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      terNode = doc.createTextNode("ter");
      dayNode = doc.createTextNode("day");
      docFrag = doc.createDocumentFragment();
      retval = docFrag.appendChild(terNode);
      retval = docFrag.appendChild(dayNode);
      refChild = titleAttr.firstChild;

      retval = titleAttr.insertBefore(docFrag,refChild);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","terdayYes",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","terdayYes",value);
       value = retval.nodeValue;

      jsUnitCore.assertNull("retvalValue",value);
    firstChild = titleAttr.firstChild;

      value = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChildValue","ter",value);
       lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","Yes",value);
       
})()

