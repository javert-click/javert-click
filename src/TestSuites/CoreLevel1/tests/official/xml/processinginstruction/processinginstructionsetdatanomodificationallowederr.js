
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "setData(data)" method for a processing instruction causes the 
   DOMException NO_MODIFICATION_ALLOWED_ERR to be raised
   if the node is readonly.
   
   Obtain the children of the THIRD "gender" element.  The elements
   content is an entity reference.  Try to remove the "domestic" attribute
   from the entity reference by executing the "setData(data)" method.
   This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-837822393
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-837822393')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-837822393
*/

     /*
     * @id processinginstructionsetdatanomodificationallowederr
     */
     (function processinginstructionsetdatanomodificationallowederr() {
   var success; 
    var doc;
      var genderList;
      var gender;
      var entRef;
      var piNode;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      gender = genderList.item(2);
      entRef = gender.firstChild;

      jsUnitCore.assertNotNull("entRefNotNull",entRef);
piNode = entRef.lastChild;

      jsUnitCore.assertNotNull("piNodeNotNull",piNode);

	{
		success = false;
		try {
            piNode.data = "newData";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

