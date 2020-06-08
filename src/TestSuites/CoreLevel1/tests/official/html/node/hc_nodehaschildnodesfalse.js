
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "hasChildNodes()" method returns false if the node
    does not have any children.
    
    Retrieve the text of the first "em" element and invoke the "hasChildNodes()" method.   It
    should return false.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1451460987
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-810594187
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodehaschildnodesfalse
     */
     (function hc_nodehaschildnodesfalse() {
   var success; 
    var doc;
      var emList;
      var emNode;
      var emText;
      var hasChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           emList = doc.getElementsByTagName("em");
      emNode = emList.item(0);
      emText = emNode.firstChild;

      hasChild = emText.hasChildNodes();
      jsUnitCore.assertFalse("hasChild",hasChild);

})()

