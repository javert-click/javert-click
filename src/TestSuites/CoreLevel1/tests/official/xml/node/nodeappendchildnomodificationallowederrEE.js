
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method causes the 
    DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
    if the node is readonly.
    
    Create an ent4 entity reference and  the "appendChild(newChild)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-184E7107')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/nodeappendchildnomodificationallowederr.xml
*/

     /*
     * @id nodeappendchildnomodificationallowederrEE
     */
     (function nodeappendchildnomodificationallowederrEE() {
   var success; 
    var doc;
      var entRef;
      var createdNode;
      var appendedNode;
      
	   
	   
	doc = docs["staff.xml"]
           entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
createdNode = doc.createElement("text3");
      
	{
		success = false;
		try {
            appendedNode = entRef.appendChild(createdNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

