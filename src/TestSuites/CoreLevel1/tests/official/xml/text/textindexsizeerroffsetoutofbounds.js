
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "splitText(offset)" method raises an
    INDEX_SIZE_ERR DOMException if the specified offset is
    greater than the number of characters in the Text node.
    
    Retrieve the textual data from the second child of the 
    third employee and invoke the "splitText(offset)" method.
    The desired exception should be raised since the offset
    is a greater than the number of characters in the Text
    node.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INDEX_SIZE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-38853C1D
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-38853C1D')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INDEX_SIZE_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id textindexsizeerroffsetoutofbounds
     */
     (function textindexsizeerroffsetoutofbounds() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var textNode;
      var splitNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("name");
      nameNode = elementList.item(2);
      textNode = nameNode.firstChild;

      
	{
		success = false;
		try {
            splitNode = textNode.splitText(300);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 1);
		}
		jsUnitCore.assertTrue("throw_INDEX_SIZE_ERR",success);
	}

})()

