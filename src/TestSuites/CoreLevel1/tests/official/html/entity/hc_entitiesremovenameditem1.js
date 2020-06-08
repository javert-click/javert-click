
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An attempt to add remove an entity should result in a NO_MODIFICATION_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1788794630
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
*/

     /*
     * @id hc_entitiesremovenameditem1
     */
     (function hc_entitiesremovenameditem1() {
   var success; 
    var doc;
      var entities;
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
entities = docType.entities;

      jsUnitCore.assertNotNull("entitiesNotNull",entities);

	{
		success = false;
		try {
            retval = entities.removeNamedItem("alpha");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("throw_NO_MODIFICATION_ALLOWED_ERR",success);
	}

	}
	
})()

