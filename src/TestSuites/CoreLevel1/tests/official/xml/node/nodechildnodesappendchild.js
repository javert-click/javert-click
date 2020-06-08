
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Add an element and check that the previously retrieved childNodes NodeList
is live.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodechildnodesappendchild
     */
     (function nodechildnodesappendchild() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var createdNode;
      var expectedLength;
      var length;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      expectedLength = childList.length;

      expectedLength += 1;
createdNode = doc.createElement("text3");
      employeeNode = employeeNode.appendChild(createdNode);
      length = childList.length;

      jsUnitCore.assertEquals("childNodeLength",expectedLength,length);
       
})()

