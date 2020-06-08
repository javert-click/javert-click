
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method raises a 
    WRONG_DOCUMENT_ERR DOMException if the "newChild" was
    created from a different document than the one that 
    created this node.
    
    Retrieve the second employee and attempt to insert a new 
    child that was created from a different document than the
    one that created the second employee.   An attempt to
    insert such a child should raise the desired exception.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-952280727')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='WRONG_DOCUMENT_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeinsertbeforenewchilddiffdocument
     */
     (function hc_nodeinsertbeforenewchilddiffdocument() {
   var success; 
    var doc1;
      var doc2;
      var refChild;
      var newChild;
      var elementList;
      var elementNode;
      var insertedNode;
      
	   
	   
	//doc1 = docload.loadDocument("hc_staff.html")
           
	   
	   
    //doc2 = docload.loadDocument("hc_staff.html")
    doc1 = docs["hc_staff.html"];
    doc2 = doc1.cloneNode(true);
           newChild = doc1.createElement("br");
      elementList = doc2.getElementsByTagName("p");
      elementNode = elementList.item(1);
      refChild = elementNode.firstChild;

      
	{
		success = false;
		try {
            insertedNode = elementNode.insertBefore(newChild,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 4);
		}
		jsUnitCore.assertTrue("throw_WRONG_DOCUMENT_ERR",success);
	}

})()

