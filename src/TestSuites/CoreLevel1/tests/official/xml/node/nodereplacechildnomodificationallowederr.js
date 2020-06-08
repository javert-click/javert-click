
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceChild(newChild,oldChild)" method causes the 
    DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
    if the node is readonly.
    
    Obtain the children of the THIRD "gender" element.   The elements
    content is an entity reference.   Get the FIRST item 
    from the entity reference and execute the "replaceChild(newChild,oldChild)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
*/

     /*
     * @id nodereplacechildnomodificationallowederr
     */
     (function nodereplacechildnomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var genderNode;
      var entRef;
      var entElement;
      var createdNode;
      var replacedChild;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      genderNode = genderList.item(2);
      entRef = genderNode.firstChild;

      nodeType = entRef.nodeType;

      
	if(
	(1 == nodeType)
	) {
	entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);

	}
	entElement = entRef.firstChild;

      createdNode = doc.createElement("newChild");
      
	{
		success = false;
		try {
            replacedChild = entRef.replaceChild(createdNode,entElement);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

