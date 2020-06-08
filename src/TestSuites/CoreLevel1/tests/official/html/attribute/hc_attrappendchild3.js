
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a document fragment to an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild3
     */
     (function hc_attrappendchild3() {
   var success; 
    var doc;
      var acronymList;
      var testNode;
      var attributes;
      var titleAttr;
      var value;
      var terNode;
      var dayNode;
      var retval;
      var lastChild;
      var docFrag;
      
	   
	   
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
      retval = titleAttr.appendChild(docFrag);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","Yesterday",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       value = retval.nodeValue;

      jsUnitCore.assertNull("retvalValue",value);
    lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","day",value);
       
})()

