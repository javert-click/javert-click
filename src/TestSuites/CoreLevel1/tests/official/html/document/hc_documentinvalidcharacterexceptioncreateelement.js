
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createElement(tagName)" method raises an
   INVALID_CHARACTER_ERR DOMException if the specified
   tagName contains an invalid character. 
   
   Retrieve the entire DOM document and invoke its 
   "createElement(tagName)" method with the tagName equal
   to the string "invalid^Name".  Due to the invalid 
   character the desired EXCEPTION should be raised.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-2141741547')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INVALID_CHARACTER_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-2141741547
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id hc_documentinvalidcharacterexceptioncreateelement
     */
     (function hc_documentinvalidcharacterexceptioncreateelement() {
   var success; 
    var doc;
      var badElement;
      
	   
	   
	doc = docs["hc_staff.html"]
           
	{
		success = false;
		try {
            badElement = doc.createElement("invalid^Name");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 5);
		}
		jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
	}

})()

