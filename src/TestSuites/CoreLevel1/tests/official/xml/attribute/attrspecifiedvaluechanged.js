
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getSpecified()" method for an Attr node should return true if the 
  value of the attribute is changed. 
  Retrieve the attribute named "street" from the last 
  child of of the THIRD employee and change its 
  value to "Yes"(which is the default DTD value).  This
  should cause the "getSpecified()" method to be true.
  This test uses the "setAttribute(name,value)" method
  from the Element interface and the "getNamedItem(name)"
  method from the NamedNodeMap interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-862529273
*/

     /*
     * @id attrspecifiedvaluechanged
     */
     (function attrspecifiedvaluechanged() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(2);
      testNode.setAttribute("street","Yes");
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("street");
      state = streetAttr.specified;

      jsUnitCore.assertTrue("streetSpecified",state);

})()

