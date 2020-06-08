
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNodeType()" method for a CDATASection Node
    returns the constant value 4.
    
    Retrieve the CDATASection node contained inside the
    second child of the second employee and invoke the 
    "getNodeType()" method.   The method should return 4. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-667469212
*/

     /*
     * @id nodecdatasectionnodetype
     */
     (function nodecdatasectionnodetype() {
   var success; 
    var doc;
      var elementList;
      var testName;
      var cdataNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      testName = elementList.item(1);
      cdataNode = testName.lastChild;

      nodeType = cdataNode.nodeType;

      
	if(
	(3 == nodeType)
	) {
	cdataNode = doc.createCDATASection("");
      nodeType = cdataNode.nodeType;

      
	}
	jsUnitCore.assertEquals("nodeTypeCDATA",4,nodeType);
       
})()

