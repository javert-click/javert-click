
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the sum of the offset and count exceeds the length then 
   all the characters to the end of the data are replaced.
   
   Retrieve the character data from the last child of the
   first employee.  The "replaceData(offset,count,arg)"
   method is then called with offset=0 and count=50 and
   arg="2600".  The method should replace all the characters
   with "2600". This is because the sum of the offset and
   count exceeds the length of the character data.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
*/

     /*
     * @id characterdatareplacedataexceedslengthofdata
     */
     (function characterdatareplacedataexceedslengthofdata() {
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

      child.replaceData(0,50,"2600");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataReplaceDataExceedsLengthOfDataAssert","2600",childData);
       
})()

