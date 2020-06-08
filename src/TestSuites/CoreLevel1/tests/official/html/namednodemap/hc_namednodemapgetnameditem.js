
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the second "p" element and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getNamedItem(name)"
   method is done with name="title".  This should result
   in the title Attr node being returned.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-349467F9
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2003Jun/0011.html
*/

     /*
     * @id hc_namednodemapgetnameditem
     */
     (function hc_namednodemapgetnameditem() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var domesticAttr;
      var attrName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      domesticAttr = attributes.getNamedItem("title");
      attrName = domesticAttr.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","title",attrName);
       
})()

