
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Creating an attribute with an empty name should cause an INVALID_CHARACTER_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1084891198
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-1084891198')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1084891198
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=525
*/

     /*
     * @id hc_documentinvalidcharacterexceptioncreateattribute1
     */
     (function hc_documentinvalidcharacterexceptioncreateattribute1() {
   var success; 
    var doc;
      var createdAttr;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	{
		success = false;
		try {
            createdAttr = doc.createAttribute("");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 5);
		}
		jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
	}

})()

