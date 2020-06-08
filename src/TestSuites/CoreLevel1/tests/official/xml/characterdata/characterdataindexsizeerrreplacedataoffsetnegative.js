
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "replaceData(offset,count,arg)" method raises an
   INDEX_SIZE_ERR DOMException if the specified offset
   is negative. 
   
   Retrieve the character data of the last child of the
   first employee and invoke its
   "replaceData(offset,count,arg) method with offset=-5
   and count=3 and arg="ABC".  It should raise the
   desired exception since the offset is negative.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INDEX_SIZE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-E5CBA7FB')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INDEX_SIZE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-E5CBA7FB
*/

     /*
     * @id characterdataindexsizeerrreplacedataoffsetnegative
     */
     (function characterdataindexsizeerrreplacedataoffsetnegative() {
   var success; 
    var doc;
      var elementList;
      var nameNode;
      var child;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      nameNode = elementList.item(0);
      child = nameNode.firstChild;

      
	{
		success = false;
		try {
            child.replaceData(-5,3,"ABC");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 1);
		}
		jsUnitCore.assertTrue("throws_INDEX_SIZE_ERR",success);
	}

})()

