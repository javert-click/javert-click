
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An attempt to add remove an notation should result in a NO_MODIFICATION_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D46829EF
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
*/

     /*
     * @id hc_notationsremovenameditem1
     */
     (function hc_notationsremovenameditem1() {
   var success; 
    var doc;
      var notations;
      var docType;
      var retval;
      
	   
	   
	doc = docs["hc_staff.html"]
           docType = doc.doctype;

      
	if(
	
	!(
	(doc.doctype.content == "text/html")
)

	) {
	jsUnitCore.assertNotNull("docTypeNotNull",docType);
notations = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notations);

	{
		success = false;
		try {
            retval = notations.removeNamedItem("notation1");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

	}
	
})()

