
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method for an attribute causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Try to remove the "domestic" attribute
   from the entity reference by executing the "removeAttributeNode(oldAttr)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-D589198')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
*/

     /*
     * @id elementremoveattributenodenomodificationallowederr
     */
     (function elementremoveattributenodenomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var genList;
      var gen;
      var nodeType;
      var gList;
      var genElement;
      var attrList;
      var attrNode;
      var removedAttr;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      genList = gender.childNodes;

      gen = genList.item(0);
      jsUnitCore.assertNotNull("genNotNull",gen);
nodeType = gen.nodeType;

      
	if(
	(1 == nodeType)
	) {
	gen = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",gen);

	}
	gList = gen.childNodes;

      genElement = gList.item(0);
      jsUnitCore.assertNotNull("genElementNotNull",genElement);
attrList = genElement.attributes;

      attrNode = attrList.getNamedItem("domestic");
      
	{
		success = false;
		try {
            removedAttr = genElement.removeAttributeNode(attrNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

