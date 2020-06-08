
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setAttributeNode(newAttr)" method returns the
   null value if no previously existing Attr node with the
   same name was replaced.
   
   Retrieve the last child of the third employee and add a 
   new attribute to it.  The new attribute node added is 
   "district", which is not part of this Element.  The   
   method should return the null value.   
   This test uses the "createAttribute(name)"
   method from the Document interface. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-887236154
*/

     /*
     * @id elementsetattributenodenull
     */
     (function elementsetattributenodenull() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var newAttribute;
      var districtAttr;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      newAttribute = doc.createAttribute("district");
      districtAttr = testEmployee.setAttributeNode(newAttribute);
      jsUnitCore.assertNull("elementSetAttributeNodeNullAssert",districtAttr);
    
})()

