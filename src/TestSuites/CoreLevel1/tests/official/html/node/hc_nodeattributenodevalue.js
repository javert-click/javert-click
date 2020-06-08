
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeValue()" method for an 
    Attribute Node is the value of the Attribute.
    
    Retrieve the Attribute named "title" from the last 
    child of the first "p" and check the string returned 
    by the "getNodeValue()" method.   It should be equal to 
    "Yes". 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id hc_nodeattributenodevalue
     */
     (function hc_nodeattributenodevalue() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(0);
      addrAttr = testAddr.getAttributeNode("title");
      attrValue = addrAttr.nodeValue;

      jsUnitCore.assertEquals("nodeValue","Yes",attrValue);
       
})()

