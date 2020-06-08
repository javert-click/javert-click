
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
  The "setNodeValue()" method changes the character data 
  currently stored in the node.
  Retrieve the character data from the second child 
  of the first employee and invoke the "setNodeValue()" 
  method, call "getData()" and compare.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
*/

     /*
     * @id characterdatasetnodevalue
     */
     (function characterdatasetnodevalue() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      var childValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.nodeValue = "Marilyn Martin";

      childData = child.data;

      jsUnitCore.assertEquals("data","Marilyn Martin",childData);
       childValue = child.nodeValue;

      jsUnitCore.assertEquals("value","Marilyn Martin",childValue);
       
})()

