
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Removes the child node of an attribute and checks that the value is empty.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
*/

     /*
     * @id hc_attrremovechild1
     */
     (function hc_attrremovechild1() {
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
      textNode = titleAttr.firstChild;

      jsUnitCore.assertNotNull("attrChildNotNull",textNode);
retval = titleAttr.removeChild(textNode);
      value = titleAttr.value;

      jsUnitCore.assertEquals("attrValue","",value);
       value = titleAttr.nodeValue;

      jsUnitCore.assertEquals("attrNodeValue","",value);
       value = retval.nodeValue;

      jsUnitCore.assertEquals("retvalValue","Yes",value);
       firstChild = titleAttr.firstChild;

      jsUnitCore.assertNull("firstChildNull",firstChild);
    
})()

