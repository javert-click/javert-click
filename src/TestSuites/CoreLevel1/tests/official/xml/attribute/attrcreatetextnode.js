
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setValue()" method for an attribute creates a 
  Text node with the unparsed content of the string.
  Retrieve the attribute named "street" from the last 
  child of of the fourth employee and assign the "Y&ent1;" 
  string to its value attribute.  This value is not yet
  parsed and therefore should still be the same upon
  retrieval. This test uses the "getNamedItem(name)" method
  from the NamedNodeMap interface.  

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Apr/0057.html
*/

     /*
     * @id attrcreatetextnode
     */
     (function attrcreatetextnode() {
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
      streetAttr.value = "Y&ent1;";

      value = streetAttr.value;

      jsUnitCore.assertEquals("value","Y&ent1;",value);
       value = streetAttr.nodeValue;

      jsUnitCore.assertEquals("nodeValue","Y&ent1;",value);
       
})()

