
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeChild(oldChild)" method raises a 
    NOT_FOUND_ERR DOMException if the old child is
    not a child of this node.
    
    Retrieve the second employee and attempt to remove a
    node that is not one of its children.   An attempt to
    remove such a node should raise the desired exception.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-1734834066')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_noderemovechildoldchildnonexistent
     */
     (function hc_noderemovechildoldchildnonexistent() {
   var success; 
    var doc;
      var oldChild;
      var elementList;
      var elementNode;
      var removedChild;
      
	   
	   
	doc = docs["hc_staff.html"]
           oldChild = doc.createElement("br");
      elementList = doc.getElementsByTagName("p");
      elementNode = elementList.item(1);
      
	{
		success = false;
		try {
            removedChild = elementNode.removeChild(oldChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 8);
		}
		jsUnitCore.assertTrue("throw_NOT_FOUND_ERR",success);
	}

})()

