
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    After the "splitText(offset)" method breaks the Text node
    into two Text nodes, the new Text node contains all the
    content at and after the offset point.
    
    Retrieve the textual data from the second child of the 
    third employee and invoke the "splitText(offset)" method.
    The new Text node should contain all the content
    at and after the offset point.   The "getNodeValue()"
    method is called to check that the new node now contains
    the characters at and after position seven.
    (Starting count at 0)

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
*/

     /*
     * @id hc_textsplittextthree
     */
     (function hc_textsplittextthree() {
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

      splitNode = textNode.splitText(6);
      value = splitNode.nodeValue;

      jsUnitCore.assertEquals("textSplitTextThreeAssert"," Jones",value);
       
})()

