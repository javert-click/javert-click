
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
  Create a new DocumentFragment and add a newly created Element node(with one attribute).  
  Once the element is added, its attribute should be available as an attribute associated 
  with an Element within a DocumentFragment.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-35CB04B5
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68F082
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-B63ED1A3
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=184
*/

     /*
     * @id hc_attrcreatedocumentfragment
     */
    (function hc_attrcreatedocumentfragment() {
      var success; 
       var doc;
         var docFragment;
         var newOne;
         var domesticNode;
         var attributes;
         var attribute;
         var attrName;
         var appendedChild;
         var langAttrCount = 0;
         
        
        
     doc = docs["hc_staff.html"];
              docFragment = doc.createDocumentFragment();
         newOne = doc.createElement("html");
         newOne.setAttribute("lang","EN");
         appendedChild = docFragment.appendChild(newOne);
         domesticNode = docFragment.firstChild;
   
         attributes = domesticNode.attributes;
   
         for(var indexN65656 = 0;indexN65656 < attributes.length; indexN65656++) {
         attribute = attributes.item(indexN65656);
         attrName = attribute.nodeName;
   
         
     if(
     DOMTestCase.equalsAutoCase("attribute", "lang", attrName)
     ) {
     langAttrCount += 1;
   
     }
     
     }
      jsUnitCore.assertEquals("hasLangAttr",1,langAttrCount);
          
   })()
   