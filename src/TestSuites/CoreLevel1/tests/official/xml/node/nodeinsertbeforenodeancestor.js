
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method raises a 
    HIERARCHY_REQUEST_ERR DOMException if the node to be
    inserted is one of this nodes ancestors.
    
    Retrieve the second employee and attempt to insert a
    node that is one of its ancestors(root node).   An 
    attempt to insert such a node should raise the 
    desired exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-952280727')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodeinsertbeforenodeancestor
     */
     (function nodeinsertbeforenodeancestor() {
   var success; 
    var doc;
      var newChild;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var insertedNode;
      
	   
	   
	doc = docs["staff.xml"]
           newChild = doc.documentElement;

      elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      refChild = childList.item(0);
      
	{
		success = false;
		try {
            insertedNode = employeeNode.insertBefore(newChild,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

