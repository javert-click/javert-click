
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getElementsByTagName(tagName)" method returns a 
   NodeList of all the Elements with a given tagName
   in a pre-order traversal of the tree.
   
   Retrieve the entire DOM document and invoke its 
   "getElementsByTagName(tagName)" method with tagName
   equal to "strong".  The method should return a NodeList 
   that contains 5 elements.  The FOURTH item in the
   list is retrieved and output.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-A6C9094
*/

     /*
     * @id hc_documentgetelementsbytagnamevalue
     */
     (function hc_documentgetelementsbytagnamevalue() {
   var success; 
    var doc;
      var nameList;
      var nameNode;
      var firstChild;
      var childValue;
      
	   
	   
	doc = docs["hc_staff.html"]
           nameList = doc.getElementsByTagName("strong");
      nameNode = nameList.item(3);
      firstChild = nameNode.firstChild;

      childValue = firstChild.nodeValue;

      jsUnitCore.assertEquals("documentGetElementsByTagNameValueAssert","Jeny Oconnor",childValue);
       
})()

