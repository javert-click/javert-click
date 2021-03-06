
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getParentNode()" method invoked on a node that has
    just been created and not yet added to the tree is null. 

    Create a new "employee" Element node using the             
    "createElement(name)" method from the Document interface.
    Since this new node has not yet been added to the tree,
    the "getParentNode()" method will return null.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1060184317
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeparentnodenull
     */
     (function hc_nodeparentnodenull() {
   var success; 
    var doc;
      var createdNode;
      var parentNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           createdNode = doc.createElement("br");
      parentNode = createdNode.parentNode;

      jsUnitCore.assertNull("parentNode",parentNode);
    
})()

