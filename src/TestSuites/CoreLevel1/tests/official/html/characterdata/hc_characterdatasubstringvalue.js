
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "substringData(offset,count)" method returns the 
   specified string.
   
   Retrieve the character data from the second child 
   of the first employee and access part of the data 
   by using the substringData(offset,count) method.  The
   method should return the specified substring starting 
   at position "offset" and extract "count" characters.
   The method should return the string "Margaret".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6531BCCF
*/

     /*
     * @id hc_characterdatasubstringvalue
     */
     (function hc_characterdatasubstringvalue() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var substring;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      substring = child.substringData(0,8);
      jsUnitCore.assertEquals("characterdataSubStringValueAssert","Margaret",substring);
       
})()

