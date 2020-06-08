
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method raises a 
    HIERARCHY_REQUEST_ERR DOMException if this node is of
    a type that does not allow children of the type "newChild"
    to be inserted.
    
    Retrieve the root node and attempt to replace 
    one of its children with a newly created Attr node.
    An Element node cannot have children of the "Attr"
    type, therefore the desired exception should be raised.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=406
*/

     /*
     * @id hc_nodereplacechildinvalidnodetype
     */
     (function hc_nodereplacechildinvalidnodetype() {
   var success; 
    var doc;
      var rootNode;
      var newChild;
      var elementList;
      var oldChild;
      var replacedChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           newChild = doc.createAttribute("lang");
      elementList = doc.getElementsByTagName("p");
      oldChild = elementList.item(1);
      rootNode = oldChild.parentNode;

      
	{
		success = false;
		try {
            replacedChild = rootNode.replaceChild(newChild,oldChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

