
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method raises a 
    NOT_FOUND_ERR DOMException if the old child is
    not a child of this node.
    
    Retrieve the second employee and attempt to replace a
    node that is not one of its children.   An attempt to
    replace such a node should raise the desired exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodereplacechildoldchildnonexistent
     */
     (function nodereplacechildoldchildnonexistent() {
   var success; 
    var doc;
      var oldChild;
      var newChild;
      var elementList;
      var elementNode;
      var replacedNode;
      
	   
	   
	doc = docs["staff.xml"]
           newChild = doc.createElement("newChild");
      oldChild = doc.createElement("oldChild");
      elementList = doc.getElementsByTagName("employee");
      elementNode = elementList.item(1);
      
	{
		success = false;
		try {
            replacedNode = elementNode.replaceChild(newChild,oldChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 8);
		}
		jsUnitCore.assertTrue("throw_NOT_FOUND_ERR",success);
	}

})()

