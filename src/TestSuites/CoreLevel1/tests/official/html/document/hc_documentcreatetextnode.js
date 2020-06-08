
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createTextNode(data)" method creates a Text node 
   given the specfied string.
   Retrieve the entire DOM document and invoke its 
   "createTextNode(data)" method.  It should create a 
   new Text node whose "data" is the specified string.
   The NodeName and NodeType are also checked.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1975348127
*/

     /*
     * @id hc_documentcreatetextnode
     */
     (function hc_documentcreatetextnode() {
   var success; 
    var doc;
      var newTextNode;
      var newTextName;
      var newTextValue;
      var newTextType;
      
	   
	   
	doc = docs["hc_staff.html"]
           newTextNode = doc.createTextNode("This is a new Text node");
      newTextValue = newTextNode.nodeValue;

      jsUnitCore.assertEquals("value","This is a new Text node",newTextValue);
       newTextName = newTextNode.nodeName;

      jsUnitCore.assertEquals("strong","#text",newTextName);
       newTextType = newTextNode.nodeType;

      jsUnitCore.assertEquals("type",3,newTextType);
       
})()

