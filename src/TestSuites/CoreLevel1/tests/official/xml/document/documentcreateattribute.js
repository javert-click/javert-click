
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createAttribute(name)" method creates an Attribute 
   node of the given name.
   
   Retrieve the entire DOM document and invoke its 
   "createAttribute(name)" method.  It should create a  
   new Attribute node with the given name. The name, value
   and type of the newly created object are retrieved and
   output.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1084891198
*/

     /*
     * @id documentcreateattribute
     */
     (function documentcreateattribute() {
   var success; 
    var doc;
      var newAttrNode;
      var attrValue;
      var attrName;
      var attrType;
      
	   
	   
	doc = docs["staff.xml"]
           newAttrNode = doc.createAttribute("district");
      attrValue = newAttrNode.nodeValue;

      jsUnitCore.assertEquals("value","",attrValue);
       attrName = newAttrNode.nodeName;

      jsUnitCore.assertEquals("name","district",attrName);
       attrType = newAttrNode.nodeType;

      jsUnitCore.assertEquals("type",2,attrType);
       
})()

