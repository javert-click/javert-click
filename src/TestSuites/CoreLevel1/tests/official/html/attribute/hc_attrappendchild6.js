
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Creates an new attribute node and appends a text node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id hc_attrappendchild6
     */
     (function hc_attrappendchild6() {
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
      
	   
	   
	doc = docs["hc_staff.html"]
           titleAttr = doc.createAttribute("title");
      textNode = doc.createTextNode("Yesterday");
      retval = titleAttr.appendChild(textNode);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","Yesterday",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","Yesterday",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","Yesterday",value);
       lastChild = titleAttr.lastChild;

      value = lastChild.nodeValue;

      jsUnitCore.assertEquals("lastChildValue","Yesterday",value);
       
})()

