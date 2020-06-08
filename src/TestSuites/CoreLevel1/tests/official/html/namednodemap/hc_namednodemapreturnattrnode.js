
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
   Retrieve the second p element and create a NamedNodeMap 
   listing of the attributes of the last child.  Once the
   list is created an invocation of the "getNamedItem(name)"
   method is done with name="class".  This should result
   in the method returning an Attr node.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1074577549
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-637646024
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1112119403
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=236
*/

     /*
     * @id hc_namednodemapreturnattrnode
     */
     (function hc_namednodemapreturnattrnode() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var streetAttr;
      var attrName;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      testEmployee = elementList.item(1);
      attributes = testEmployee.attributes;

      streetAttr = attributes.getNamedItem("class");
      DOMTestCase.assertInstanceOf("typeAssert","Attr",streetAttr);
attrName = streetAttr.nodeName;

      DOMTestCase.assertEqualsAutoCase("attribute", "nodeName","class",attrName);
       attrName = streetAttr.name;

      DOMTestCase.assertEqualsAutoCase("attribute", "name","class",attrName);
       
})()

