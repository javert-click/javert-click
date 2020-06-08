
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getLength()" method returns the number of nodes
   in the list.(Test for EMPTY list)
   
   Create a list of all the children of the Text node 
   inside the first child of the third employee and
   invoke the "getLength()" method.   It should contain
   the value 0.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-203510337
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodelistindexgetlengthofemptylist
     */
     (function hc_nodelistindexgetlengthofemptylist() {
   var success; 
    var doc;
      var emList;
      var emNode;
      var textNode;
      var textList;
      var length;
      
	   
	   
	doc = docs["hc_staff.html"]
           emList = doc.getElementsByTagName("em");
      emNode = emList.item(2);
      textNode = emNode.firstChild;

      textList = textNode.childNodes;

      length = textList.length;

      jsUnitCore.assertEquals("length",0,length);
       
})()

