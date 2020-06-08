
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "cloneNode(deep)" method returns a copy of the node
    only if deep=false.
    
    Retrieve the second employee and invoke the
    "cloneNode(deep)" method with deep=false.   The
    method should only clone this node.   The NodeName and
    length of the NodeList are checked.   The "getNodeName()"
    method should return "employee" and the "getLength()"
    method should return 0.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3A0ED0A4
*/

     /*
     * @id nodeclonenodefalse
     */
     (function nodeclonenodefalse() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var clonedNode;
      var cloneName;
      var cloneChildren;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      clonedNode = employeeNode.cloneNode(false);
      cloneName = clonedNode.nodeName;

      jsUnitCore.assertEquals("name","employee",cloneName);
       cloneChildren = clonedNode.childNodes;

      length = cloneChildren.length;

      jsUnitCore.assertEquals("length",0,length);
       
})()

