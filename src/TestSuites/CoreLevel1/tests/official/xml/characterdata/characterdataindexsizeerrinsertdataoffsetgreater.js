
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "insertData(offset,arg)" method raises an
   INDEX_SIZE_ERR DOMException if the specified offset
   is greater than the number of characters in the string. 
   
   Retrieve the character data of the last child of the
   first employee and invoke its insertData"(offset,arg)"
   method with offset=40 and arg="ABC".  It should raise
   the desired exception since the offset is greater than
   the number of characters in the string.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INDEX_SIZE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-7C603781
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-7C603781')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INDEX_SIZE_ERR'])
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id characterdataindexsizeerrinsertdataoffsetgreater
     */
     (function characterdataindexsizeerrinsertdataoffsetgreater() {
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
            child.insertData(40,"ABC");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 1);
		}
		jsUnitCore.assertTrue("throw_INDEX_SIZE_ERR",success);
	}

})()

