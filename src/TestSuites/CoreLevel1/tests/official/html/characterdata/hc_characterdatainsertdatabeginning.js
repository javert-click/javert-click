
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "insertData(offset,arg)" method will insert a string
at the specified character offset.  Insert the data at
the beginning of the character data.

Retrieve the character data from the second child of
the first employee.  The "insertData(offset,arg)"
method is then called with offset=0 and arg="Mss.".
The method should insert the string "Mss." at position 0.
The new value of the character data should be
"Mss. Margaret Martin".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-3EDB695F
*/

     /*
     * @id hc_characterdatainsertdatabeginning
     */
     (function hc_characterdatainsertdatabeginning() {
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

      child.insertData(0,"Mss. ");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataInsertDataBeginningAssert","Mss. Margaret Martin",childData);
       
})()

