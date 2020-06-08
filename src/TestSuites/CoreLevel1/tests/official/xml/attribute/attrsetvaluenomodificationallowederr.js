
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setValue()" method for an attribute causes the 
  DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
  if the node is readonly.
  Obtain the children of the THIRD "gender" element.  The elements
  content is an entity reference.  Get the "domestic" attribute
  from the entity reference and execute the "setValue()" method.
  This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#ID-221662474
* @see http://www.w3.org/TR/2000/WD-DOM-Level-1-20000929/level-one-core#xpointer(id('ID-221662474')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/DOM/updates/REC-DOM-Level-1-19981001-errata.html
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-221662474
*/

     /*
     * @id attrsetvaluenomodificationallowederr
     */
     (function attrsetvaluenomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var genList;
      var gen;
      var gList;
      var g;
      var attrList;
      var attrNode;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      jsUnitCore.assertNotNull("genderNotNull",gender);
genList = gender.childNodes;

      gen = genList.item(0);
      jsUnitCore.assertNotNull("genderFirstChildNotNull",gen);
gList = gen.childNodes;

      g = gList.item(0);
      jsUnitCore.assertNotNull("genderFirstGrandchildNotNull",g);
attrList = g.attributes;

      jsUnitCore.assertNotNull("attributesNotNull",attrList);
attrNode = attrList.getNamedItem("domestic");
      jsUnitCore.assertNotNull("attrNotNull",attrNode);

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

