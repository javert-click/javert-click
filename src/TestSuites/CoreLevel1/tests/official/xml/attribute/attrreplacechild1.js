
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
Replacing a child node from an attribute in an entity reference
should result in an NO_MODIFICATION_ALLOWED_ERR DOMException.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-785887307
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-785887307')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='NO_MODIFICATION_ALLOWED_ERR'])
*/

     /*
     * @id attrreplacechild1
     */
     (function attrreplacechild1() {
   var success; 
    var doc;
      var entRef;
      var entElement;
      var attrNode;
      var textNode;
      var removedNode;
      var newChild;
      
	   
	   
	doc = docs["staff.xml"]
           entRef = doc.createEntityReference("ent4");
      jsUnitCore.assertNotNull("createdEntRefNotNull",entRef);
entElement = entRef.firstChild;

      jsUnitCore.assertNotNull("entElementNotNull",entElement);
attrNode = entElement.getAttributeNode("domestic");
      textNode = attrNode.firstChild;

      jsUnitCore.assertNotNull("attrChildNotNull",textNode);
newChild = doc.createTextNode("Yesterday");
      
	{
		success = false;
		try {
            removedNode = attrNode.replaceChild(newChild,textNode);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 7);
		}
		jsUnitCore.assertTrue("setValue_throws_NO_MODIFICATION_ERR",success);
	}

})()

