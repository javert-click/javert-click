
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertData(offset,arg)" method will insert a string 
   at the specified character offset.  Insert the data at 
   the end of the character data. 
   
   Retrieve the character data from the second child of  
   the first employee.  The "insertData(offset,arg)"
   method is then called with offset=15 and arg=", Esquire".
   The method should insert the string ", Esquire" at 
   position 15.  The new value of the character data should
   be "Margaret Martin, Esquire".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3EDB695F
*/

     /*
     * @id hc_characterdatainsertdataend
     */
     (function hc_characterdatainsertdataend() {
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

      child.insertData(15,", Esquire");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataInsertDataEndAssert","Margaret Martin, Esquire",childData);
       
})()

