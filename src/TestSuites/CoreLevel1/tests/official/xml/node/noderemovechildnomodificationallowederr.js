
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeChild(oldChild)" method causes the 
    DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
    if the node is readonly.
    
    Obtain the children of the THIRD "gender" element.   The elements
    content is an entity reference.   Get the FIRST item 
    from the entity reference and execute the "removeChild(oldChild)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-1734834066')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1734834066
*/

     /*
     * @id noderemovechildnomodificationallowederr
     */
     (function noderemovechildnomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var genderNode;
      var entRef;
      var entElement;
      var removedNode;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      genderNode = genderList.item(2);
      entRef = genderNode.firstChild;

      jsUnitCore.assertNotNull("entRefNotNull",entRef);
nodeType = entRef.nodeType;

      
	if(
	(1 == nodeType)
	) {
	entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);

	}
	entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);

	{
		success = false;
		try {
            removedNode = entRef.removeChild(entElement);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

