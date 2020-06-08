
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setValue()" method for an attribute causes the 
  DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
  if the node is readonly.

  Create an entity reference using document.createEntityReference()
  Get the "domestic" attribute from the entity 
  reference and execute the "setValue()" method.
  This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#ID-221662474
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#xpointer(id('ID-221662474')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/DOM/updates/REC-DOM-Level-1-19981001-errata.html
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/attrsetvaluenomodificationallowederr.xml
*/

     /*
     * @id attrsetvaluenomodificationallowederrEE
     */
     (function attrsetvaluenomodificationallowederrEE() {
   var success; 
    var doc;
      var entRef;
      var entElement;
      var attrList;
      var attrNode;
      var gender;
      var genderList;
      var appendedChild;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      jsUnitCore.assertNotNull("genderNotNull",gender);
entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("entRefNotNull",entRef);
appendedChild = gender.appendChild(entRef);
      entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);
attrList = entElement.attributes;

      attrNode = attrList.getNamedItem("domestic");
      
	{
		success = false;
		try {
            attrNode.value = "newvalue";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("setValue_throws_NO_MODIFICATION",success);
	}

	{
		success = false;
		try {
            attrNode.nodeValue = "newvalue2";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("setNodeValue_throws_NO_MODIFICATION",success);
	}

})()

