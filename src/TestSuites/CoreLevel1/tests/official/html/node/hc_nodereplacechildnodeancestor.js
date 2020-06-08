
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method raises a 
    HIERARCHY_REQUEST_ERR DOMException if the node to put
    in is one of this node's ancestors.
    
    Retrieve the second employee and attempt to replace
    one of its children with an ancestor node(root node).
    An attempt to make such a replacement should raise the 
    desired exception.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id hc_nodereplacechildnodeancestor
     */
     (function hc_nodereplacechildnodeancestor() {
   var success; 
    var doc;
      var newChild;
      var elementList;
      var employeeNode;
      var childList;
      var oldChild;
      var replacedNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           newChild = doc.documentElement;

      elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      oldChild = childList.item(0);
      
	{
		success = false;
		try {
            replacedNode = employeeNode.replaceChild(newChild,oldChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

