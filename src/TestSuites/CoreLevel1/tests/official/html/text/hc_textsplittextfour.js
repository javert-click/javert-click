
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "splitText(offset)" method returns the new Text node.
    
    Retrieve the textual data from the last child of the 
    first employee and invoke the "splitText(offset)" method.
    The method should return the new Text node.   The offset
    value used for this test is 30.   The "getNodeValue()"
    method is called to check that the new node now contains
    the characters at and after position 30.
    (Starting count at 0)

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
*/

     /*
     * @id hc_textsplittextfour
     */
     (function hc_textsplittextfour() {
   var success; 
    var doc;
      var elementList;
      var addressNode;
      var textNode;
      var splitNode;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      addressNode = elementList.item(0);
      textNode = addressNode.firstChild;

      splitNode = textNode.splitText(30);
      value = splitNode.nodeValue;

      jsUnitCore.assertEquals("textSplitTextFourAssert","98551",value);
       
})()

