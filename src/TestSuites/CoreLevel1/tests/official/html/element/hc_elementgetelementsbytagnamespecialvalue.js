
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

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1938918D
*/

     /*
     * @id hc_elementgetelementsbytagnamespecialvalue
     */
     (function hc_elementgetelementsbytagnamespecialvalue() {
   var success; 
    var doc;
      var elementList;
      var lastEmployee;
      var lastempList;
      var child;
      var childName;
      var result = new Array();

      var expectedResult = new Array();
      expectedResult[0] = "em";
      expectedResult[1] = "strong";
      expectedResult[2] = "code";
      expectedResult[3] = "sup";
      expectedResult[4] = "var";
      expectedResult[5] = "acronym";

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      lastEmployee = elementList.item(4);
      lastempList = lastEmployee.getElementsByTagName("*");
      for(var indexN65639 = 0;indexN65639 < lastempList.length; indexN65639++) {
      child = lastempList.item(indexN65639);
      childName = child.nodeName;

      result[result.length] = childName;

	}
   DOMTestCase.assertEqualsListAutoCase("element", "tagNames",expectedResult,result);
       
})()

