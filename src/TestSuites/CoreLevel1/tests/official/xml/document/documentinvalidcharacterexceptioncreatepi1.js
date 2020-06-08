
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Creating a processing instruction with an empty target should cause an INVALID_CHARACTER_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-135944439
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-135944439')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=525
*/

     /*
     * @id documentinvalidcharacterexceptioncreatepi1
     */
     (function documentinvalidcharacterexceptioncreatepi1() {
   var success; 
    var doc;
      var badPI;
      
	   
	   
	doc = docs["hc_staff.xml"]
           
	if(
	
	(doc.doctype.content == "text/html")

	) {
	
	{
		success = false;
		try {
            badPI = doc.createProcessingInstruction("foo","data");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 9);
		}
		jsUnitCore.assertTrue("throw_NOT_SUPPORTED_ERR",success);
	}

	}
	
		else {
			
	{
		success = false;
		try {
            badPI = doc.createProcessingInstruction("","data");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 5);
		}
		jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
	}

		}
	
})()

