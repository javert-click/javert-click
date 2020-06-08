
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setData(data)" method raises a NO_MODIFICATION_ALLOWED_ERR 
   DOMException if the node is readonly.
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Get the FIRST item 
   from the entity reference and execute the "setData(data)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-72AB8359')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
*/

     /*
     * @id characterdatasetdatanomodificationallowederr
     */
     (function characterdatasetdatanomodificationallowederr() {
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
            entElementContent.data = "newData";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

