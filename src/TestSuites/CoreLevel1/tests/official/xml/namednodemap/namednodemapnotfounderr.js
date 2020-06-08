
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeNamedItem(name)" method raises a 
   NOT_FOUND_ERR DOMException if there is not a node
   named "name" in the map.
   
   Create a NamedNodeMap object from the attributes of the
   last child of the third employee and attempt to remove
   the "district" attribute.  There is not a node named
   "district" in the list and therefore the desired   
   exception should be raised.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='INUSE_ATTRIBUTE_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D58B193
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-D58B193')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='INUSE_ATTRIBUTE_ERR'])
*/

     /*
     * @id namednodemapnotfounderr
     */
     (function namednodemapnotfounderr() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var attributes;
      var removedNode;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      attributes = testEmployee.attributes;

      
	{
		success = false;
		try {
            removedNode = attributes.removeNamedItem("district");
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 8);
		}
		jsUnitCore.assertTrue("throw_NOT_FOUND_ERR",success);
	}

})()

