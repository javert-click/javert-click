
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceData(offset,count,arg)" method replaces the 
   characters starting at the specified offset with the
   specified string.  Test the situation where the length 
   of the arg string is greater than the specified offset.
   
   Retrieve the character data from the last child of the
   first employee.  The "replaceData(offset,count,arg)"
   method is then called with offset=0 and count=4 and
   arg="260030".  The method should replace characters one  
   thru four with "260030".  Note that the length of the
   specified string is greater that the specified offset.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
*/

     /*
     * @id characterdatareplacedataexceedslengthofarg
     */
     (function characterdatareplacedataexceedslengthofarg() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.replaceData(0,4,"260030");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataReplaceDataExceedsLengthOfArgAssert","260030 North Ave. Dallas, Texas 98551",childData);
       
})()

