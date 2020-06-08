
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method raises a 
    WRONG_DOCUMENT_ERR DOMException if the "newChild" was
    created from a different document than the one that 
    created this node.
    
    Retrieve the second employee and attempt to append    
    a node created from a different document.   An attempt 
    to make such a replacement should raise the desired 
    exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-184E7107')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodeappendchildnewchilddiffdocument
     */
     (function nodeappendchildnewchilddiffdocument() {
   var success; 
    var doc1;
      var doc2;
      var newChild;
      var elementList;
      var elementNode;
      var appendedChild;
      
	   
	   
	doc1 = docs["staff.xml"]
           
	   
	   
	doc2 = doc1.cloneNode(true)
           newChild = doc1.createElement("newChild");
      elementList = doc2.getElementsByTagName("employee");
      elementNode = elementList.item(1);
      
	{
		success = false;
		try {
            appendedChild = elementNode.appendChild(newChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

