
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    A comment is all the characters between the starting
  '<!--' and ending '-->' 
  Retrieve the nodes of the DOM document.  Search for a 
  comment node and the content is its value.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1334481328
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=509
*/

     /*
     * @id hc_commentgetcomment
     */
     (function hc_commentgetcomment() {
   var success; 
    var doc;
      var elementList;
      var child;
      var childName;
      var childValue;
      var commentCount = 0;
      var childType;
      var attributes;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.childNodes;

      for(var indexN65630 = 0;indexN65630 < elementList.length; indexN65630++) {
      child = elementList.item(indexN65630);
      childType = child.nodeType;

      
	if(
	(8 == childType)
	) {
	childName = child.nodeName;

      jsUnitCore.assertEquals("nodeName","#comment",childName);
       childValue = child.nodeValue;

      jsUnitCore.assertEquals("nodeValue"," This is comment number 1.",childValue);
       attributes = child.attributes;

      jsUnitCore.assertNull("attributes",attributes);
    commentCount += 1;

	}
	
	}
   	jsUnitCore.assertTrue("atMostOneComment",
      
	(commentCount < 2)
);

})()

