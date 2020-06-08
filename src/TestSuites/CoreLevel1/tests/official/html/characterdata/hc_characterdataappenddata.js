
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendData(arg)" method appends a string to the end 
   of the character data of the node.
   
   Retrieve the character data from the second child 
   of the first employee.  The appendData(arg) method is
   called with arg=", Esquire".  The method should append 
   the specified data to the already existing character  
   data.  The new value return by the "getLength()" method
   should be 24.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-32791A2F
*/

     /*
     * @id hc_characterdataappenddata
     */
     (function hc_characterdataappenddata() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childValue;
      var childLength;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.appendData(", Esquire");
      childValue = child.data;

      childLength = childValue.length;
      jsUnitCore.assertEquals("characterdataAppendDataAssert",24,childLength);
       
})()

