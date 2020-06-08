
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertData(offset,arg)" method will insert a string 
   at the specified character offset.  Insert the data in 
   the middle of the character data. 
   
   Retrieve the character data from the second child of  
   the first employee.  The "insertData(offset,arg)"
   method is then called with offset=9 and arg="Ann".
   The method should insert the string "Ann" at position 9.
   The new value of the character data should be
   "Margaret Ann Martin".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3EDB695F
*/

     /*
     * @id hc_characterdatainsertdatamiddle
     */
     (function hc_characterdatainsertdatamiddle() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var childData;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("strong");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      child.insertData(9,"Ann ");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataInsertDataMiddleAssert","Margaret Ann Martin",childData);
       
})()

