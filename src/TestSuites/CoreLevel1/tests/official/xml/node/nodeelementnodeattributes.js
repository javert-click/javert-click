
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method invoked on an Element
    Node returns a NamedNodeMap containing the attributes
    of this node.
    
    Retrieve the last child of the third employee and
    invoke the "getAttributes()" method.   It should return
    a NamedNodeMap containing the attributes of the Element
    node. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodeelementnodeattributes
     */
     (function nodeelementnodeattributes() {
   var success; 
    var doc;
      var elementList;
      var testAddr;
      var addrAttr;
      var attrNode;
      var attrName;
      var attrList = new Array();

      var expected = new Array();
      expected[0] = "domestic";
      expected[1] = "street";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testAddr = elementList.item(2);
      addrAttr = testAddr.attributes;

      for(var indexN65628 = 0;indexN65628 < addrAttr.length; indexN65628++) {
      attrNode = addrAttr.item(indexN65628);
      attrName = attrNode.nodeName;

      attrList[attrList.length] = attrName;

	}
   DOMTestCase.assertEqualsCollection("nodeElementNodeValueAssert1",expected,attrList);
       
})()

