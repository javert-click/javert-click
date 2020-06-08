
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
An attempt to add an element to the named node map returned by notations should 
result in a NO_MODIFICATION_ERR or HIERARCHY_REQUEST_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D46829EF
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1025163788
*/

     /*
     * @id hc_notationssetnameditem1
     */
     (function hc_notationssetnameditem1() {
   var success; 
    var doc;
      var notations;
      var docType;
      var retval;
      var elem;
      
	   
	   
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
elem = doc.createElement("br");
      
      try {
      retval = notations.setNamedItem(elem);
      fail("throw_HIER_OR_NO_MOD_ERR");
     
      } catch (ex) {
		  if (typeof(ex.code) != 'undefined') {      
       switch(ex.code) {
       case /* HIERARCHY_REQUEST_ERR */ 3 :
       break;
      case /* NO_MODIFICATION_ALLOWED_ERR */ 7 :
       break;
          default:
          throw ex;
          }
       } else { 
       throw ex;
        }
         }
        
	}
	
})()

