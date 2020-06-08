
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getNextSibling()" method for an Attr node should return null.
Retrieve the attribute named "domestic" from the last child of of the
first employee and examine its NextSibling node.  This test uses the
"getNamedItem(name)" method from the NamedNodeMap interface.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6AC54C2F
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
*/

     /*
     * @id hc_attrnextsiblingnull
     */
     (function hc_attrnextsiblingnull() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var domesticAttr;
      var s;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressList = doc.getElementsByTagName("acronym");
      testNode = addressList.item(0);
      attributes = testNode.attributes;

      domesticAttr = attributes.getNamedItem("title");
      s = domesticAttr.nextSibling;

      jsUnitCore.assertNull("attrNextSiblingNullAssert",s);
    
})()

