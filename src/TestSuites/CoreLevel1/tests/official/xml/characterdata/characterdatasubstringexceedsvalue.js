
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the sum of the "offset" and "count" exceeds the
   "length" then the "substringData(offset,count)" method
   returns all the characters to the end of the data. 
   
   Retrieve the character data from the second child 
   of the first employee and access part of the data 
   by using the substringData(offset,count) method
   with offset=9 and count=10.  The method should return 
   the substring "Martin" since offset+count > length
   (19 > 15).

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6531BCCF
*/

     /*
     * @id characterdatasubstringexceedsvalue
     */
     (function characterdatasubstringexceedsvalue() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var substring;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      substring = child.substringData(9,10);
      jsUnitCore.assertEquals("characterdataSubStringExceedsValueAssert","Martin",substring);
       
})()

