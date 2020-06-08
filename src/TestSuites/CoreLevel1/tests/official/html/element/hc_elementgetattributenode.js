
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the attribute "title" from the last child
   of the first "p" element and check its node name.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-217A91B8
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
*/

     /*
     * @id hc_elementgetattributenode
     */
     (function hc_elementgetattributenode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var domesticAttr;
      var nodeName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(0);
      domesticAttr = testEmployee.getAttributeNode("title");
      nodeName = domesticAttr.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","title",nodeName);
       
})()

