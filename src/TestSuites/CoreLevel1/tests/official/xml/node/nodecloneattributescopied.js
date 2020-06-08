
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the cloneNode method is used to clone an
    Element node, all the attributes of the Element are
    copied along with their values.
    
    Retrieve the last child of the second employee and invoke
    the cloneNode method.   The
    duplicate node returned by the method should copy the
    attributes associated with this node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
*/

     /*
     * @id nodecloneattributescopied
     */
     (function nodecloneattributescopied() {
   var success; 
    var doc;
      var elementList;
      var addressNode;
      var clonedNode;
      var attributes;
      var attributeNode;
      var attributeName;
      var result = new Array();

      var expectedResult = new Array();
      expectedResult[0] = "domestic";
      expectedResult[1] = "street";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      addressNode = elementList.item(1);
      clonedNode = addressNode.cloneNode(false);
      attributes = clonedNode.attributes;

      for(var indexN65637 = 0;indexN65637 < attributes.length; indexN65637++) {
      attributeNode = attributes.item(indexN65637);
      attributeName = attributeNode.nodeName;

      result[result.length] = attributeName;

	}
   DOMTestCase.assertEqualsCollection("nodeCloneAttributesCopiedAssert1",expectedResult,result);
       
})()

