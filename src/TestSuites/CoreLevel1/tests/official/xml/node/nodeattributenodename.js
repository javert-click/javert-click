
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The string returned by the "getNodeName()" method for an 

    Attribute Node is the name of the Attribute.

    

    Retrieve the Attribute named "domestic" from the last 

    child of the first employee and check the string returned 

    by the "getNodeName()" method.   It should be equal to 

    "domestic". 


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
*/

     /*
     * @id nodeattributenodename
     */
     (function nodeattributenodename() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(0);
      addrAttr = testAddr.getAttributeNode("domestic");
      attrName = addrAttr.nodeName;

      jsUnitCore.assertEquals("nodeAttributeNodeNameAssert1","domestic",attrName);
       
})()

