
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceData(offset,count,arg)" method raises a NO_MODIFICATION_ALLOWED_ERR 
   DOMException if the node is readonly.
   
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Get the FIRST item 
   from the entity reference and execute the "replaceData(offset,count,arg)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-E5CBA7FB')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
*/

     /*
     * @id characterdatareplacedatanomodificationallowederr
     */
     (function characterdatareplacedatanomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var genderNode;
      var entElement;
      var entElementContent;
      var entReference;
      var nodeType;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      genderNode = genderList.item(2);
      entReference = genderNode.firstChild;

      jsUnitCore.assertNotNull("entReferenceNotNull",entReference);
nodeType = entReference.nodeType;

      
	if(
	(1 == nodeType)
	) {
	entReference = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entReference);

	}
	entElement = entReference.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);
entElementContent = entElement.firstChild;

      jsUnitCore.assertNotNull("entElementContentNotNull",entElementContent);

	{
		success = false;
		try {
            entElementContent.replaceData(1,3,"newArg");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

