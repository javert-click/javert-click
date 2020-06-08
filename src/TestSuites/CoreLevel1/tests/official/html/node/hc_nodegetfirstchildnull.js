
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If there is not a first child then the "getFirstChild()"
    method returns null.

    Retrieve the text of the first "em" element and invoke the "getFirstChild()" method.   It
    should return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-169727388
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=246
*/

     /*
     * @id hc_nodegetfirstchildnull
     */
     (function hc_nodegetfirstchildnull() {
   var success; 
    var doc;
      var emList;
      var emNode;
      var emText;
      var nullChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           emList = doc.getElementsByTagName("em");
      emNode = emList.item(0);
      emText = emNode.firstChild;

      nullChild = emText.firstChild;

      jsUnitCore.assertNull("nullChild",nullChild);
    
})()

