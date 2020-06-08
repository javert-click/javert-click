
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getSpecified()" method for an Attr node should return true if the 
  value of the attribute is changed. 
  Retrieve the attribute named "class" from the last 
  child of of the THIRD employee and change its 
  value to "Yes"(which is the default DTD value).  This
  should cause the "getSpecified()" method to be true.
  This test uses the "setAttribute(name,value)" method
  from the Element interface and the "getNamedItem(name)"
  method from the NamedNodeMap interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-862529273
*/

     /*
     * @id hc_attrspecifiedvaluechanged
     */
     (function hc_attrspecifiedvaluechanged() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var state;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressList = doc.getElementsByTagName("acronym");
      testNode = addressList.item(2);
      testNode.setAttribute("class","Yα");
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("class");
      state = streetAttr.specified;

      jsUnitCore.assertTrue("acronymClassSpecified",state);

})()

