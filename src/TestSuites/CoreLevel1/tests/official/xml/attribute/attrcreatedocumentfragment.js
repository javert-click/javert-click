
//var docs = initDOMHeapCoreLevel1();
var DOM         = initDOM();
var HTMLFiles   = initHTMLFiles();
var docload     = initDocumentLoading(DOM, HTMLFiles);
var jsUnitCore  = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Attr nodes may be associated with Element nodes contained within a DocumentFragment.
  Create a new DocumentFragment and add a newly created Element node(with one attribute).  
  Once the element is added, its attribute should be available as an attribute associated 
  with an Element within a DocumentFragment.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-35CB04B5
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A3
*/

     /*
     * @id attrcreatedocumentfragment
     */
     (function attrcreatedocumentfragment() {
   var success; 
    var doc;
      var docFragment;
      var newOne;
      var domesticNode;
      var domesticAttr;
      var attrs;
      var attrName;
      var appendedChild;
      
	   
	   
  //doc = docs["staff.xml"]
  doc = docload.loadDocument("staff.xml");
           docFragment = doc.createDocumentFragment();
      newOne = doc.createElement("newElement");
      newOne.setAttribute("newdomestic","Yes");
      appendedChild = docFragment.appendChild(newOne);
      domesticNode = docFragment.firstChild;

      domesticAttr = domesticNode.attributes;

      attrs = domesticAttr.item(0);
      attrName = attrs.name;

      jsUnitCore.assertEquals("attrCreateDocumentFragmentAssert","newdomestic",attrName);
       
})()

