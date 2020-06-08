
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
The "getAttributes()" method invoked on a CDATASection
Node returns null.

Retrieve the CDATASection node contained inside the
second child of the second employee and invoke the
"getAttributes()" method on the CDATASection node.
It should return null.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-667469212
*/

     /*
     * @id nodecdatasectionnodeattribute
     */
     (function nodecdatasectionnodeattribute() {
   var success; 
    var doc;
      var elementList;
      var cdataName;
      var cdataNode;
      var attrList;
      var nodeType;
      
	   
	   
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
	attrList = cdataNode.attributes;

      jsUnitCore.assertNull("cdataSection",attrList);
    
})()

