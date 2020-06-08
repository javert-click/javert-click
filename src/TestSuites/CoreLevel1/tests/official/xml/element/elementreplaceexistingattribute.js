
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method adds a new
   attribute to the Element.  If the "newAttr" Attr node is
   already present in this element, it should replace the
   existing one. 
   
   Retrieve the last child of the third employee and add a 
   new attribute node by invoking the "setAttributeNode(new 
   Attr)" method.  The new attribute node to be added is 
   "street", which is already present in this element.  The
   method should replace the existing Attr node with the 
   new one.  This test uses the "createAttribute(name)"
   method from the Document interface. 

* @author NIST
* @author Mary Brady
*/

     /*
     * @id elementreplaceexistingattribute
     */
     (function elementreplaceexistingattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var name;
      var setAttr;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("street");
      setAttr = testEmployee.setAttributeNode(newAttribute);
      name = testEmployee.getAttribute("street");
      jsUnitCore.assertEquals("elementReplaceExistingAttributeAssert","",name);
       
})()

