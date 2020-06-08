
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeValue()" method for a 
    CDATASection Node is the content of the CDATASection. 
    
    Retrieve the CDATASection node inside the second child
    of the second employee and check the string returned 
    by the "getNodeValue()" method.   It should be equal to 
    "This is a CDATA Section with EntityReference number 2 
    &ent2;".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-667469212
*/

     /*
     * @id nodecdatasectionnodevalue
     */
     (function nodecdatasectionnodevalue() {
   var success; 
    var doc;
      var elementList;
      var cdataName;
      var childList;
      var child;
      var cdataNodeValue;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      cdataName = elementList.item(1);
      childList = cdataName.childNodes;

      child = childList.item(1);
      
	if(
	
	(child == null)

	) {
	child = doc.createCDATASection("This is a CDATASection with EntityReference number 2 &ent2;");
      
	}
	cdataNodeValue = child.nodeValue;

      jsUnitCore.assertEquals("value","This is a CDATASection with EntityReference number 2 &ent2;",cdataNodeValue);
       
})()

