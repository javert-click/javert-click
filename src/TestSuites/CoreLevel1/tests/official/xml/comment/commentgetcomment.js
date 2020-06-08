
var docs = initDOMHeapCoreLevel1();
//var DOM = initDOM();
//var parser = initDocumentLoading(DOM);
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   

/**
* 
    A comment is all the characters between the starting
  '<!--' and ending '-->' 
  Retrieve the nodes of the DOM document.  Search for a 
  comment node and the content is its value.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1334481328
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D095
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-111237558
*/

     /*
     * @id commentgetcomment
     */
     (function commentgetcomment() {
   var success; 
    var doc;
      var elementList;
      var child;
      var childName;
      var childValue;
      var commentCount = 0;
      var childType;
      
	   
	//doc = docload.loadDocument("hc_staff.html");
	doc = docs["staff.xml"];
           elementList = doc.childNodes;

      for(var indexN65623 = 0;indexN65623 < elementList.length; indexN65623++) {
      child = elementList.item(indexN65623);
      childType = child.nodeType;

      
	if(
	(8 == childType)
	) {
	childName = child.nodeName;

      jsUnitCore.assertEquals("nodeName","#comment",childName);
       childValue = child.nodeValue;

      jsUnitCore.assertEquals("nodeValue"," This is comment number 1.",childValue);
       commentCount = commentCount + 1;

	}
	
	}
   jsUnitCore.assertEquals("commentCount",1,commentCount);
       
})()

