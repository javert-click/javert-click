
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "normalize()" method puts all the nodes in the full
   depth of the sub-tree underneath this element into a 
   "normal" form. 
   
   Retrieve the third employee and access its second child.
   This child contains a block of text that is spread 
   across multiple lines.  The content of the "name" child
   should be parsed and treated as a single Text node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-162CF083
*/

     /*
     * @id elementnormalize
     */
     (function elementnormalize() {
   var success; 
    var doc;
      var root;
      var elementList;
      var testName;
      var firstChild;
      var childValue;
      
	   
	   
	doc = docs["staff.xml"]
           root = doc.documentElement;

      root.normalize();
      elementList = root.getElementsByTagName("name");
      testName = elementList.item(2);
      firstChild = testName.firstChild;

      childValue = firstChild.nodeValue;

      jsUnitCore.assertEquals("elementNormalizeAssert","Roger\n Jones",childValue);
       
})()

