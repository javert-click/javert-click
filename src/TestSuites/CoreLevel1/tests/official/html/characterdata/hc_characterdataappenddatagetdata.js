
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    On successful invocation of the "appendData(arg)" 
   method the "getData()" method provides access to the
   concatentation of data and the specified string.
   
   Retrieve the character data from the second child 
   of the first employee.  The appendData(arg) method is
   called with arg=", Esquire".  The method should append 
   the specified data to the already existing character  
   data.  The new value return by the "getData()" method
   should be "Margaret Martin, Esquire".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-32791A2F
*/

     /*
     * @id hc_characterdataappenddatagetdata
     */
     (function hc_characterdataappenddatagetdata() {
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

      child.appendData(", Esquire");
      childData = child.data;

      jsUnitCore.assertEquals("characterdataAppendDataGetDataAssert","Margaret Martin, Esquire",childData);
       
})()

