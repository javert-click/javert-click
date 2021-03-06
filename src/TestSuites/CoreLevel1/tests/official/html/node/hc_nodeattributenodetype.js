
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getNodeType()" method for an Attribute Node

    returns the constant value 2.

    

    Retrieve the first attribute from the last child of

    the first employee and invoke the "getNodeType()"   

    method.   The method should return 2. 


* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id hc_nodeattributenodetype
     */
     (function hc_nodeattributenodetype() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var nodeType;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testAddr = elementList.item(0);
      addrAttr = testAddr.getAttributeNode("title");
      nodeType = addrAttr.nodeType;

      jsUnitCore.assertEquals("nodeAttrNodeTypeAssert1",2,nodeType);
       
})()

