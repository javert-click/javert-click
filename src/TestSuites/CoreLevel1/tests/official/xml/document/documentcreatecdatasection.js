
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createCDATASection(data)" method creates a new 
   CDATASection node whose value is the specified string.
   Retrieve the entire DOM document and invoke its 
   "createCDATASection(data)" method.  It should create a
   new CDATASection node whose "data" is the specified 
   string.  The content, name and type are retrieved and
   output.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D26C0AF8
*/

     /*
     * @id documentcreatecdatasection
     */
     (function documentcreatecdatasection() {
   var success; 
    var doc;
      var newCDATASectionNode;
      var newCDATASectionValue;
      var newCDATASectionName;
      var newCDATASectionType;
      
	   
	   
	doc = docs["staff.xml"]
           newCDATASectionNode = doc.createCDATASection("This is a new CDATASection node");
      newCDATASectionValue = newCDATASectionNode.nodeValue;

      jsUnitCore.assertEquals("nodeValue","This is a new CDATASection node",newCDATASectionValue);
       newCDATASectionName = newCDATASectionNode.nodeName;

      jsUnitCore.assertEquals("nodeName","#cdata-section",newCDATASectionName);
       newCDATASectionType = newCDATASectionNode.nodeType;

      jsUnitCore.assertEquals("nodeType",4,newCDATASectionType);
       
})()

