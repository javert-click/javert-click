
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the entire DOM document and invoke its 
   "createAttribute(name)" method.  It should create a  
   new Attribute node with the given name. The name, value
   and type of the newly created object are retrieved and
   output.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1084891198
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=243
*/

     /*
     * @id hc_documentcreateattribute
     */
     (function hc_documentcreateattribute() {
   var success; 
    var doc;
      var newAttrNode;
      var attrValue;
      var attrName;
      var attrType;
      
	   
	   
	doc = docs["hc_staff.html"]
           newAttrNode = doc.createAttribute("title");
      attrValue = newAttrNode.nodeValue;

      jsUnitCore.assertEquals("value","",attrValue);
       attrName = newAttrNode.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "name","title",attrName);
       attrType = newAttrNode.nodeType;

      jsUnitCore.assertEquals("type",2,attrType);
       
})()

