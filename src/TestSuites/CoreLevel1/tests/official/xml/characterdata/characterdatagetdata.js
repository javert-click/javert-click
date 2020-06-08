
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 

    The "getData()" method retrieves the character data 

  currently stored in the node.

  Retrieve the character data from the second child 

  of the first employee and invoke the "getData()" 

  method.  The method returns the character data 

  string.


* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
*/

     /*
     * @id characterdatagetdata
     */
     (function characterdatagetdata() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      childData = child.data;

      jsUnitCore.assertEquals("characterdataGetDataAssert","Margaret Martin",childData);
       
})()

