
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createElement(tagName)" method creates an Element 
   of the type specified.
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method with tagName="acronym".
   The method should create an instance of an Element node
   whose tagName is "acronym".  The NodeName, NodeType 
   and NodeValue are returned.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
*/

     /*
     * @id hc_documentcreateelement
     */
     (function hc_documentcreateelement() {
   var success; 
    var doc;
      var newElement;
      var newElementName;
      var newElementType;
      var newElementValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           newElement = doc.createElement("acronym");
      newElementName = newElement.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "strong","acronym",newElementName);
       newElementType = newElement.nodeType;

      jsUnitCore.assertEquals("type",1,newElementType);
       newElementValue = newElement.nodeValue;

      jsUnitCore.assertNull("valueInitiallyNull",newElementValue);
    
})()

