
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The getNodeName() method of an Attribute node. 
  Retrieve the attribute named street from the last 
  child of of the second employee and examine its 
  NodeName.  This test uses the getNamedItem(name) method from the NamedNodeMap 
  interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1112119403
*/

     /*
     * @id attrname
     */
     (function attrname() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var name;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testNode = addressList.item(1);
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("street");
      name = streetAttr.nodeName;

      jsUnitCore.assertEquals("nodeName","street",name);
       name = streetAttr.name;

      jsUnitCore.assertEquals("name","street",name);
       
})()

