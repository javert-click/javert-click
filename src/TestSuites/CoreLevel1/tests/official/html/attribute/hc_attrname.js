
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
  Retrieve the attribute named class from the last 
  child of of the second "p" element and examine its 
  NodeName.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1112119403
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
*/

     /*
     * @id hc_attrname
     */
     (function hc_attrname() {
   var success; 
    var doc;
      var addressList;
      var testNode;
      var attributes;
      var streetAttr;
      var strong1;
      var strong2;
      
	   
	   
	doc = docs["hc_staff.html"]
           addressList = doc.getElementsByTagName("acronym");
      testNode = addressList.item(1);
      attributes = testNode.attributes;

      streetAttr = attributes.getNamedItem("class");
      strong1 = streetAttr.nodeName;

      strong2 = streetAttr.name;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","class",strong1);
       DOMTestCase.assertEqualsAutoCase("attribute", "name","class",strong2);
       
})()

