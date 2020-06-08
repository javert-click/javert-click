
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "replaceData(offset,count,arg)" method replaces the
characters starting at the specified offset with the
specified string.  Test for replacement in the
middle of the data.

Retrieve the character data from the last child of the
first employee.  The "replaceData(offset,count,arg)"
method is then called with offset=5 and count=5 and
arg="South".  The method should replace characters five
thru 9 of the character data with "South".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
*/

     /*
     * @id hc_characterdatareplacedatabegining
     */
     (function hc_characterdatareplacedatabegining() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.replaceData(0,4,"2500");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataReplaceDataBeginingAssert","2500 North Ave. Dallas, Texas 98551",childData);
       
})()

