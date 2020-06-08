
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Append a couple of text nodes to the first sup element, normalize the
document element and check that the element has been normalized.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-162CF083
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=546
*/

     /*
     * @id hc_elementnormalize
     */
     (function hc_elementnormalize() {
   var success; 
    var doc;
      var root;
      var elementList;
      var testName;
      var firstChild;
      var childValue;
      var textNode;
      var retNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("sup");
      testName = elementList.item(0);
      textNode = doc.createTextNode("");
      retNode = testName.appendChild(textNode);
      textNode = doc.createTextNode(",000");
      retNode = testName.appendChild(textNode);
      root = doc.documentElement;

      root.normalize();
      elementList = doc.getElementsByTagName("sup");
      testName = elementList.item(0);
      firstChild = testName.firstChild;

      childValue = firstChild.nodeValue;

      jsUnitCore.assertEquals("elementNormalizeAssert","56,000,000",childValue);
       
})()

