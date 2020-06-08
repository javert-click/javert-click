
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
   "class", which is already present in this element.  The
   method should replace the existing Attr node with the 
   new one.  This test uses the "createAttribute(name)"
   method from the Document interface. 

* @author Curt Arnold
*/

     /*
     * @id hc_elementreplaceexistingattribute
     */
     (function hc_elementreplaceexistingattribute() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var strong;
      var setAttr;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("class");
      setAttr = testEmployee.setAttributeNode(newAttribute);
      strong = testEmployee.getAttribute("class");
      jsUnitCore.assertEquals("replacedValue","",strong);
       
})()

