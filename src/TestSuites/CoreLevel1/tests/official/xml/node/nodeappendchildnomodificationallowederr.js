
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method causes the 
    DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
    if the node is readonly.
    
    Obtain the children of the THIRD "gender" element.   The elements
    content is an entity reference.   Get the FIRST item 
    from the entity reference and execute the "appendChild(newChild)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-184E7107')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodeappendchildnomodificationallowederr
     */
     (function nodeappendchildnomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var genderNode;
      var entRef;
      var entElement;
      var createdNode;
      var appendedNode;
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
createdNode = doc.createElement("text3");
      
	{
		success = false;
		try {
            appendedNode = entElement.appendChild(createdNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

