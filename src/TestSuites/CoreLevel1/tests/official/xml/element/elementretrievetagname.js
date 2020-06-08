
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getElementsByTagName()" method returns a NodeList 
   of all descendant elements with a given tagName.    
   
   Invoke the "getElementsByTagName()" method and create
   a NodeList of "position" elements.  Retrieve the second 
   "position" element in the list and return the NodeName. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-104682815
*/

     /*
     * @id elementretrievetagname
     */
     (function elementretrievetagname() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var name;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("position");
      testEmployee = elementList.item(1);
      name = testEmployee.nodeName;

      jsUnitCore.assertEquals("nodename","position",name);
       name = testEmployee.tagName;

      jsUnitCore.assertEquals("tagname","position",name);
       
})()

