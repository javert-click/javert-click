
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "deleteData(offset,count)" method removes a range of
characters from the node.  Delete data at the beginning
of the character data.

Retrieve the character data from the last child of the
first employee.  The "deleteData(offset,count)"
method is then called with offset=0 and count=16.
The method should delete the characters from position
0 thru position 16.  The new value of the character data
should be "Dallas, Texas 98551".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7C603781
*/

     /*
     * @id characterdatadeletedatabegining
     */
     (function characterdatadeletedatabegining() {
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

      child.deleteData(0,16);
      childData = child.data;

      jsUnitCore.assertEquals("characterdataDeleteDataBeginingAssert","Dallas, Texas 98551",childData);
       
})()

