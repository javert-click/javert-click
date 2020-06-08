
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Add an empty text node to an existing attribute node, normalize the containing element
and check that the attribute node has eliminated the empty text.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-162CF083
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=482
*/

     /*
     * @id hc_elementnormalize2
     */
     (function hc_elementnormalize2() {
   var success; 
    var doc;
      var root;
      var elementList;
      var element;
      var firstChild;
      var secondChild;
      var childValue;
      var emptyText;
      var attrNode;
      var retval;
      
	   
	   
	doc = docs["hc_staff.html"]
           root = doc.documentElement;

      emptyText = doc.createTextNode("");
      elementList = root.getElementsByTagName("acronym");
      element = elementList.item(0);
      attrNode = element.getAttributeNode("title");
      retval = attrNode.appendChild(emptyText);
      element.normalize();
      attrNode = element.getAttributeNode("title");
      firstChild = attrNode.firstChild;

      childValue = firstChild.nodeValue;

      jsUnitCore.assertEquals("firstChild","Yes",childValue);
       secondChild = firstChild.nextSibling;

      jsUnitCore.assertNull("secondChildNull",secondChild);
    
})()

