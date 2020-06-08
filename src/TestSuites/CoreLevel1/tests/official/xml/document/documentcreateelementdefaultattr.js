
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createElement(tagName)" method creates an Element 
   of the type specified.  In addition, if there are known attributes
   with default values, Attr nodes representing them are automatically
   created and attached to the element.
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method with tagName="address".
   The method should create an instance of an Element node
   whose tagName is "address".  The tagName "address" has an 
   attribute with default values, therefore the newly created element
   will have them.  

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id documentcreateelementdefaultattr
     */
     (function documentcreateelementdefaultattr() {
   var success; 
    var doc;
      var newElement;
      var defaultAttr;
      var child;
      var name;
      var value;
      
	   
	   
	doc = docs["staff.xml"]
           newElement = doc.createElement("address");
      defaultAttr = newElement.attributes;

      child = defaultAttr.item(0);
      jsUnitCore.assertNotNull("defaultAttrNotNull",child);
name = child.nodeName;

      jsUnitCore.assertEquals("attrName","street",name);
       value = child.nodeValue;

      jsUnitCore.assertEquals("attrValue","Yes",value);
       DOMTestCase.assertSize("attrCount",1,defaultAttr);

})()

