
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createProcessingInstruction(target,data) method 
   raises an INVALID_CHARACTER_ERR DOMException if the
   specified tagName contains an invalid character. 

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-135944439
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-135944439')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id documentinvalidcharacterexceptioncreatepi
     */
     (function documentinvalidcharacterexceptioncreatepi() {
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
            badPI = doc.createProcessingInstruction("invalid^Name","data");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 5);
		}
		jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
	}

		}
	
})()

