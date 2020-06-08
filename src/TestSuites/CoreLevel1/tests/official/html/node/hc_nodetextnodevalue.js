
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    Text Node is the content of the Text node.
    
    Retrieve the Text node from the last child of the first 
    employee and check the string returned by the 
    "getNodeValue()" method.   It should be equal to 
    "1230 North Ave. Dallas, Texas 98551". 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id hc_nodetextnodevalue
     */
     (function hc_nodetextnodevalue() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var textNode;
      var textValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(0);
      textNode = testAddr.firstChild;

      textValue = textNode.nodeValue;

      jsUnitCore.assertEquals("textNodeValue","1230 North Ave. Dallas, Texas 98551",textValue);
       
})()

