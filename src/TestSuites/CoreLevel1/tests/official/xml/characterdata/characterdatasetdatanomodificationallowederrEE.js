
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Create an ent3 entity reference and call setData on a text child, should thrown a NO_MODIFICATION_ALLOWED_ERR. 

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-72AB8359')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-72AB8359
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/characterdatasetdatanomodificationallowederr.xml
*/

     /*
     * @id characterdatasetdatanomodificationallowederrEE
     */
     (function characterdatasetdatanomodificationallowederrEE() {
   var success; 
    var doc;
      var genderList;
      var genderNode;
      var entText;
      var entReference;
      
	   
	   
	doc = docs["staff.xml"]
           genderList = doc.getElementsByTagName("gender");
      genderNode = genderList.item(4);
      entReference = doc.createEntityReference("ent3");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entReference);
entText = entReference.firstChild;

      jsUnitCore.assertNotNull("entTextNotNull",entText);

	{
		success = false;
		try {
            entText.data = "newData";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

