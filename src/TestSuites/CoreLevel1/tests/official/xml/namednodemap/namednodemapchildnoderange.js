
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase();   


/**
* 
    The range of valid child node indices is 0 to Length -1.
   
   Create a NamedNodeMap object from the attributes of the
   last child of the third employee and traverse the
   list from index 0 thru length -1.  All indices should
   be valid.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D0FB19E
*/

     /*
     * @id namednodemapchildnoderange
     */
     (function namednodemapchildnoderange() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var child;
      var length;
      
	   
	   
	doc = docs["staff.xml"];
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      attributes = testEmployee.attributes;

      length = attributes.length;

      jsUnitCore.assertEquals("length",2,length);
       child = attributes.item(0);
      child = attributes.item(1);
      
})()

