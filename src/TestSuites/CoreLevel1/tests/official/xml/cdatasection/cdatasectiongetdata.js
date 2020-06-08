
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Retrieve the last CDATASection node located inside the
second child of the second employee and examine its
content.  Since the CDATASection interface inherits
from the CharacterData interface(via the Text node),
the "getData()" method can be used to access the
CDATA content.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
*/

     /*
     * @id cdatasectiongetdata
     */
     (function cdatasectiongetdata() {
   var success; 
    var doc;
      var nameList;
      var child;
      var lastChild;
      var data;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           nameList = doc.getElementsByTagName("name");
      child = nameList.item(1);
      lastChild = child.lastChild;

      nodeType = lastChild.nodeType;

      jsUnitCore.assertEquals("isCDATA",4,nodeType);
       data = lastChild.data;

      jsUnitCore.assertEquals("data","This is an adjacent CDATASection with a reference to a tab &tab;",data);
       
})()

