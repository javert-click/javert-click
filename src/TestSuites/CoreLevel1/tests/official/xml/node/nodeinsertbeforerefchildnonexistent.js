
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method raises a 
    NOT_FOUND_ERR DOMException if the reference child is
    not a child of this node.
    
    Retrieve the second employee and attempt to insert a
    new node before a reference node that is not a child
    of this node.   An attempt to insert before a non child
    node should raise the desired exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-952280727')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NOT_FOUND_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodeinsertbeforerefchildnonexistent
     */
     (function nodeinsertbeforerefchildnonexistent() {
   var success; 
    var doc;
      var refChild;
      var newChild;
      var elementList;
      var elementNode;
      var insertedNode;
      
	   
	   
	doc = docs["staff.xml"]
           newChild = doc.createElement("newChild");
      refChild = doc.createElement("refChild");
      elementList = doc.getElementsByTagName("employee");
      elementNode = elementList.item(1);
      
	{
		success = false;
		try {
            insertedNode = elementNode.insertBefore(newChild,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 8);
		}
		jsUnitCore.assertTrue("throw_NOT_FOUND_ERR",success);
	}

})()

