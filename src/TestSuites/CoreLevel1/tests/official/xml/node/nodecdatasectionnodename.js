
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The string returned by the "getNodeName()" method for a 
    CDATASection Node is #cdata-section".
    
    Retrieve the CDATASection node inside the second child
    of the second employee and check the string returned 
    by the "getNodeName()" method.   It should be equal to 
    "#cdata-section". 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-667469212
*/

     /*
     * @id nodecdatasectionnodename
     */
     (function nodecdatasectionnodename() {
   var success; 
    var doc;
      var elementList;
      var cdataName;
      var cdataNode;
      var nodeType;
      var cdataNodeName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      cdataName = elementList.item(1);
      cdataNode = cdataName.lastChild;

      nodeType = cdataNode.nodeType;

      
	if(
	!(4 == nodeType)
	) {
	cdataNode = doc.createCDATASection("");
      
	}
	cdataNodeName = cdataNode.nodeName;

      jsUnitCore.assertEquals("cdataNodeName","#cdata-section",cdataNodeName);
       
})()

