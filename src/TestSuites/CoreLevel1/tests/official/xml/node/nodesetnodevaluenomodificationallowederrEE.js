
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    Create an entity reference and execute the "setNodeValue(nodeValue)" method.
    This causes a NO_MODIFICATION_ALLOWED_ERR DOMException to be thrown.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-F68D080')/setraises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-F68D080
* @see http://www.w3.org/2001/DOM-Test-Suite/level1/core/nodesetnodevaluenomodificationallowederr.xml
*/

     /*
     * @id nodesetnodevaluenomodificationallowederrEE
     */
     (function nodesetnodevaluenomodificationallowederrEE() {
   var success; 
    var doc;
      var entRef;
      var entText;
      
	   
	   
	doc = docs["staff.xml"]
           entRef = doc.createEntityReference("ent3");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
entText = entRef.firstChild;

      jsUnitCore.assertNotNull("entTextNotNull",entText);

	{
		success = false;
		try {
            entText.nodeValue = "newValue";

        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

})()

