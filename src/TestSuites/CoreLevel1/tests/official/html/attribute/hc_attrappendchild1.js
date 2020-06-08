
var DOM = initDOM();
var HTMLFiles = initHTMLFiles();
var parser = initDocumentLoading(DOM, HTMLFiles);
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Appends a text node to an attribute and checks if the value of
the attribute is changed.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild1
     */
     (function hc_attrappendchild1() {
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
      
	   
	   
  //doc = docs["hc_staff.html"]
      doc = parser.loadDocument("hc_staff.html");
      acronymList = doc.getElementsByTagName("acronym");
      testNode = acronymList.item(3);
      attributes = testNode.attributes;

      titleAttr = attributes.getNamedItem("title");
      textNode = doc.createTextNode("terday");
      retval = titleAttr.appendChild(textNode);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","Yesterday",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","terday",value);
       lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","terday",value);
       
})()

