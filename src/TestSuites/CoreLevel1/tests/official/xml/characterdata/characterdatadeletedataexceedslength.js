
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the sum of the offset and count used in the        
   "deleteData(offset,count) method is greater than the
   length of the character data then all the characters
   from the offset to the end of the data are deleted. 
   
   Retrieve the character data from the last child of the
   first employee.  The "deleteData(offset,count)"
   method is then called with offset=4 and count=50.
   The method should delete the characters from position 4
   to the end of the data since the offset+count(50+4)
   is greater than the length of the character data(35).
   The new value of the character data should be "1230".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7C603781
*/

     /*
     * @id characterdatadeletedataexceedslength
     */
     (function characterdatadeletedataexceedslength() {
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

      child.deleteData(4,50);
      childData = child.data;

      jsUnitCore.assertEquals("characterdataDeleteDataExceedsLengthAssert","1230",childData);
       
})()

