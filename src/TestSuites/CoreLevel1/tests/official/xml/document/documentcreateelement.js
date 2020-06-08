
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createElement(tagName)" method creates an Element 
   of the type specified.
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method with tagName="address".
   The method should create an instance of an Element node
   whose tagName is "address".  The NodeName, NodeType 
   and NodeValue are returned.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
*/

     /*
     * @id documentcreateelement
     */
     (function documentcreateelement() {
   var success; 
    var doc;
      var newElement;
      var newElementName;
      var newElementType;
      var newElementValue;
      
	   
	   
	doc = docs["staff.xml"]
           newElement = doc.createElement("address");
      newElementName = newElement.nodeName;

      jsUnitCore.assertEquals("name","address",newElementName);
       newElementType = newElement.nodeType;

      jsUnitCore.assertEquals("type",1,newElementType);
       newElementValue = newElement.nodeValue;

      jsUnitCore.assertNull("valueInitiallyNull",newElementValue);
    
})()

