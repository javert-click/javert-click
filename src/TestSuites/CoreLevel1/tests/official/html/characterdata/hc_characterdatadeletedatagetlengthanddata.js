
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    On successful invocation of the "deleteData(offset,count)"
   method, the "getData()" and "getLength()" methods reflect
   the changes. 
   
   Retrieve the character data from the last child of the
   first employee.  The "deleteData(offset,count)"
   method is then called with offset=30 and count=5.
   The method should delete the characters from position
   30 thru position 35.  The new value of the character data
   should be "1230 North Ave. Dallas, Texas" which is
   returned by the "getData()" method and "getLength()"
   method should return 30".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7D61178C
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7C603781
*/

     /*
     * @id hc_characterdatadeletedatagetlengthanddata
     */
     (function hc_characterdatadeletedatagetlengthanddata() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      var childLength;
      var result = new Array();

      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.deleteData(30,5);
      childData = child.data;

      jsUnitCore.assertEquals("data","1230 North Ave. Dallas, Texas ",childData);
       childLength = child.length;

      jsUnitCore.assertEquals("length",30,childLength);
       
})()

