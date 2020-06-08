
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Creating an element with an empty name should cause an INVALID_CHARACTER_ERR.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-2141741547')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=525
*/

     /*
     * @id hc_documentinvalidcharacterexceptioncreateelement1
     */
     (function hc_documentinvalidcharacterexceptioncreateelement1() {
   var success; 
    var doc;
      var badElement;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	{
		success = false;
		try {
            badElement = doc.createElement("");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 5);
		}
		jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
	}

})()

