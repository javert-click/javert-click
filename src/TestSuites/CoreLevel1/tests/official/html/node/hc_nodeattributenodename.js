
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Retrieve the Attribute named "title" from the last 
    child of the first p element and check the string returned 
    by the "getNodeName()" method.   It should be equal to 
    "title". 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
*/

     /*
     * @id hc_nodeattributenodename
     */
     (function hc_nodeattributenodename() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(0);
      addrAttr = testAddr.getAttributeNode("title");
      attrName = addrAttr.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","title",attrName);
       
})()

