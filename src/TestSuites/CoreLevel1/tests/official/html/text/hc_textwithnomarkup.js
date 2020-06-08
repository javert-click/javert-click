
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If there is not any markup inside an Element or Attr node
    content, then the text is contained in a single object   
    implementing the Text interface that is the only child
    of the element.
    
    Retrieve the textual data from the second child of the 
    third employee.   That Text node contains a block of 
    multiple text lines without markup, so they should be
    treated as a single Text node.   The "getNodeValue()"    
    method should contain the combination of the two lines.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1312295772
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id hc_textwithnomarkup
     */
     (function hc_textwithnomarkup() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var nodeV;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(2);
      nodeV = nameNode.firstChild;

      value = nodeV.nodeValue;

      jsUnitCore.assertEquals("textWithNoMarkupAssert","Roger\n Jones",value);
       
})()

