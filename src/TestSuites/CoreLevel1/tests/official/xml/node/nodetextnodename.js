
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeName()" method for a 

    Text Node is "#text".

    

    Retrieve the Text Node from the last child of the

    first employee and check the string returned 

    by the "getNodeName()" method.   It should be equal to 

    "#text". 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodetextnodename
     */
     (function nodetextnodename() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var textNode;
      var textName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      textNode = testAddr.firstChild;

      textName = textNode.nodeName;

      jsUnitCore.assertEquals("nodeTextNodeNameAssert1","#text",textName);
       
})()

