
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If there is not an explicit value assigned to an attribute
  and there is a declaration for this attribute and that
  declaration includes a default value, then that default
  value is the attributes default value.
  Retrieve the attribute named "street" from the last 
  child of of the first employee and examine its 
  value.  That value should be the value given the
  attribute in the DTD file.  The test uses the 
  "getNamedItem(name)" method from the NamedNodeMap 
  interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id attrdefaultvalue
     */
     (function attrdefaultvalue() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(0);
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("street");
      value = streetAttr.nodeValue;

      jsUnitCore.assertEquals("attrDefaultValueAssert","Yes",value);
       
})()

