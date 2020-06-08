
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If an Attr is explicitly assigned any value, then that value is the attributes effective value.
  Retrieve the attribute named "domestic" from the last child of of the first employee 
  and examine its nodeValue attribute.  This test uses the "getNamedItem(name)" method 
  from the NamedNodeMap interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
*/

     /*
     * @id hc_attreffectivevalue
     */
     (function hc_attreffectivevalue() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var domesticAttr;
      var value;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressList = doc.getElementsByTagName("acronym");
      testNode = addressList.item(0);
      attributes = testNode.attributes;

      domesticAttr = attributes.getNamedItem("title");
      value = domesticAttr.nodeValue;

      jsUnitCore.assertEquals("attrEffectiveValueAssert","Yes",value);
       
})()

