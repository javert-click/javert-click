
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method raises a 
    HIERARCHY_REQUEST_ERR DOMException if this node is of
    a type that does not allow children of the type "newChild"
    to be inserted.
    
    Retrieve the root node and attempt to insert a newly
    created Attr node.   An Element node cannot have children
    of the "Attr" type, therefore the desired exception
    should be raised.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-952280727')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodeinsertbeforeinvalidnodetype
     */
     (function nodeinsertbeforeinvalidnodetype() {
   var success; 
    var doc;
      var rootNode;
      var newChild;
      var elementList;
      var refChild;
      var insertedNode;
      
	   
	   
	doc = docs["staff.xml"]
           rootNode = doc.documentElement;

      newChild = doc.createAttribute("newAttribute");
      elementList = doc.getElementsByTagName("employee");
      refChild = elementList.item(1);
      
	{
		success = false;
		try {
            insertedNode = rootNode.insertBefore(newChild,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

