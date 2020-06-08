
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getValue()" method will return the value of the
  attribute as a string.  The general entity references
  are replaced with their values.
  Retrieve the attribute named "street" from the last 
  child of of the fourth employee and examine the string 
  returned by the "getValue()" method.  The value should
  be set to "Yes" after the EntityReference is
  replaced with its value.  This test uses the  
  "getNamedItem(name)" method from the NamedNodeMap 
  interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
*/

     /*
     * @id attrentityreplacement
     */
     (function attrentityreplacement() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(3);
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("street");
      value = streetAttr.value;

      jsUnitCore.assertEquals("streetYes","Yes",value);
       
})()

