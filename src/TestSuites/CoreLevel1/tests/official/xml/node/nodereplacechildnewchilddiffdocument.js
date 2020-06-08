
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method raises a 
    WRONG_DOCUMENT_ERR DOMException if the "newChild" was
    created from a different document than the one that 
    created this node.
    
    Retrieve the second employee and attempt to replace one   
    of its children with a node created from a different 
    document.   An attempt to make such a replacement 
    should raise the desired exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id nodereplacechildnewchilddiffdocument
     */
     (function nodereplacechildnewchilddiffdocument() {
   var success; 
    var doc1;
      var doc2;
      var oldChild;
      var newChild;
      var elementList;
      var elementNode;
      var replacedChild;
      
	   
	   
	doc1 = docs["staff.xml"]
           
	   
	   
	doc2 = doc1.cloneNode(true);
           newChild = doc1.createElement("newChild");
      elementList = doc2.getElementsByTagName("employee");
      elementNode = elementList.item(1);
      oldChild = elementNode.firstChild;

      
	{
		success = false;
		try {
            replacedChild = elementNode.replaceChild(newChild,oldChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

