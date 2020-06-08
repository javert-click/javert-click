
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "splitText(offset)" method breaks the Text node into
    two Text nodes at the specified offset keeping each node
    as siblings in the tree.
    
    Retrieve the textual data from the second child of the 
    third employee and invoke the "splitText(offset)" method.
    The method splits the Text node into two new sibling
    Text nodes keeping both of them in the tree.   This test
    checks the "nextSibling()" method of the original node
    to ensure that the two nodes are indeed siblings.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
*/

     /*
     * @id textsplittextone
     */
     (function textsplittextone() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var textNode;
      var splitNode;
      var secondPart;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(2);
      textNode = nameNode.firstChild;

      splitNode = textNode.splitText(7);
      secondPart = textNode.nextSibling;

      value = secondPart.nodeValue;

      jsUnitCore.assertEquals("textSplitTextOneAssert","Jones",value);
       
})()

