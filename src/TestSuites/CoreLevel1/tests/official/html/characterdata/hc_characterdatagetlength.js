
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of characters 
  stored in this nodes data.
  Retrieve the character data from the second 
  child of the first employee and examine the 
  value returned by the getLength() method.  

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7D61178C
*/

     /*
     * @id hc_characterdatagetlength
     */
     (function hc_characterdatagetlength() {
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

      childValue = child.data;

      childLength = childValue.length;
      jsUnitCore.assertEquals("characterdataGetLengthAssert",15,childLength);
       
})()

