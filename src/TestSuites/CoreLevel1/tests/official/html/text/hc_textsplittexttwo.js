
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    After the "splitText(offset)" method breaks the Text node
    into two Text nodes, the original node contains all the
    content up to the offset point.
    
    Retrieve the textual data from the second child of the 
    third employee and invoke the "splitText(offset)" method.
    The original Text node should contain all the content
    up to the offset point.   The "getNodeValue()" method
    is called to check that the original node now contains
    the first five characters.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
*/

     /*
     * @id hc_textsplittexttwo
     */
     (function hc_textsplittexttwo() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var textNode;
      var splitNode;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(2);
      textNode = nameNode.firstChild;

      splitNode = textNode.splitText(5);
      value = textNode.nodeValue;

      jsUnitCore.assertEquals("textSplitTextTwoAssert","Roger",value);
       
})()

