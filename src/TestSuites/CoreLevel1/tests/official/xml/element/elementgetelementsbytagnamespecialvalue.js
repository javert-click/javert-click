
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getElementsByTagName(name)" method may use the
special value "*" to match all tags in the element
tree.

Create a NodeList of all the descendant elements
of the last employee by using the special value "*".
The method should return all the descendant children(6)
in the order the children were encountered.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
*/

     /*
     * @id elementgetelementsbytagnamespecialvalue
     */
     (function elementgetelementsbytagnamespecialvalue() {
   var success; 
    var doc;
      var elementList;
      var lastEmployee;
      var lastempList;
      var child;
      var childName;
      var result = new Array();

      var expectedResult = new Array();
      expectedResult[0] = "employeeId";
      expectedResult[1] = "name";
      expectedResult[2] = "position";
      expectedResult[3] = "salary";
      expectedResult[4] = "gender";
      expectedResult[5] = "address";

      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      lastEmployee = elementList.item(4);
      lastempList = lastEmployee.getElementsByTagName("*");
      for(var indexN65642 = 0;indexN65642 < lastempList.length; indexN65642++) {
      child = lastempList.item(indexN65642);
      childName = child.nodeName;

      result[result.length] = childName;

	}
   DOMTestCase.assertEqualsList("tagNames",expectedResult,result);
       
})()

