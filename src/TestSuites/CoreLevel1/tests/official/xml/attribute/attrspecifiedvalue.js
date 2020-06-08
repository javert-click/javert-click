
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getSpecified()" method for an Attr node should 
  be set to true if the attribute was explicitly given
  a value.
  Retrieve the attribute named "domestic" from the last 
  child of of the first employee and examine the value 
  returned by the "getSpecified()" method.  This test uses 
  the "getNamedItem(name)" method from the NamedNodeMap 
  interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-862529273
*/

     /*
     * @id attrspecifiedvalue
     */
     (function attrspecifiedvalue() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var domesticAttr;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(0);
      attributes = testNode.attributes;

      domesticAttr = attributes.getNamedItem("domestic");
      state = domesticAttr.specified;

      jsUnitCore.assertTrue("domesticSpecified",state);

})()

