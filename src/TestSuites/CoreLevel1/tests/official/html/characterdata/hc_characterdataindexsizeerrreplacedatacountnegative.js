
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceData(offset,count,arg)" method raises an
   INDEX_SIZE_ERR DOMException if the specified count
   is negative. 
   
   Retrieve the character data of the last child of the
   first employee and invoke its
   "replaceData(offset,count,arg) method with offset=10
   and count=-3 and arg="ABC".  It should raise the
   desired exception since the count is negative.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INDEX_SIZE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-6531BCCF
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-6531BCCF')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INDEX_SIZE_ERR'])
*/

     /*
     * @id hc_characterdataindexsizeerrreplacedatacountnegative
     */
     (function hc_characterdataindexsizeerrreplacedatacountnegative() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      var badString;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("acronym");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      
	{
		success = false;
		try {
            badString = child.substringData(10,-3);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 1);
		}
		jsUnitCore.assertTrue("throws_INDEX_SIZE_ERR",success);
	}

})()

