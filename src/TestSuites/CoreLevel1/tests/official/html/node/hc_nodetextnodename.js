
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    Text Node is "#text".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id hc_nodetextnodename
     */
     (function hc_nodetextnodename() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var textNode;
      var textName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(0);
      textNode = testAddr.firstChild;

      textName = textNode.nodeName;

      jsUnitCore.assertEquals("textNodeName","#text",textName);
       
})()

