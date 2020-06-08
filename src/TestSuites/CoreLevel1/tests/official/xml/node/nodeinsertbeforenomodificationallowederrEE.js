
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertBefore(newChild,refChild)" method causes the 
    DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
    if the node is readonly.
    
    Create an ent4 entity reference and and execute the "insertBefore(newChild,refChild)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-952280727')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/nodeinsertbeforenomodificationallowederr.xml
*/

     /*
     * @id nodeinsertbeforenomodificationallowederrEE
     */
     (function nodeinsertbeforenomodificationallowederrEE() {
   var success; 
    var doc;
      var entRef;
      var createdNode;
      var insertedNode;
      var refChild = null;

      
	   
	   
	doc = docs["staff.xml"]
           entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
createdNode = doc.createElement("text3");
      
	{
		success = false;
		try {
            insertedNode = entRef.insertBefore(createdNode,refChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

