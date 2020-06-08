
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeValue()" method for an 

    Attribute Node is the value of the Attribute.

    

    Retrieve the Attribute named "domestic" from the last 

    child of the first employee and check the string returned 

    by the "getNodeValue()" method.   It should be equal to 

    "Yes". 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
*/

     /*
     * @id nodeattributenodevalue
     */
     (function nodeattributenodevalue() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      addrAttr = testAddr.getAttributeNode("domestic");
      attrValue = addrAttr.nodeValue;

      jsUnitCore.assertEquals("nodeAttributeNodeValueAssert1","Yes",attrValue);
       
})()

