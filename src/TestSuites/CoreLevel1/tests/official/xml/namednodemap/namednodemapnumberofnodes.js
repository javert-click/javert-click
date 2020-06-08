
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of nodes
   in the map. 
   
   Retrieve the second employee and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getLength()"
   method is executed.  The number of nodes should be 2.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6D0FB19E
*/

     /*
     * @id namednodemapnumberofnodes
     */
     (function namednodemapnumberofnodes() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      attributes = testEmployee.attributes;

      length = attributes.length;

      jsUnitCore.assertEquals("length",2,length);
       
})()

