
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method raises a 
    HIERARCHY_REQUEST_ERR DOMException if the node to 
    append is one of this node's ancestors.
    
    Retrieve the second employee and attempt to append 
    an ancestor node(root node) to it.
    An attempt to make such an addition should raise the 
    desired exception.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-258A00AF')/constant[@name='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#xpointer(id('ID-184E7107')/raises/exception[@name='DOMException']/descr/p[substring-before(.,':')='HIERARCHY_REQUEST_ERR'])
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

     /*
     * @id nodeappendchildnodeancestor
     */
     (function nodeappendchildnodeancestor() {
   var success; 
    var doc;
      var newChild;
      var elementList;
      var employeeNode;
      var appendedChild;
      
	   
	   
	doc = docs["staff.xml"]
           newChild = doc.documentElement;

      elementList = doc.getElementsByTagName("employee");
      employeeNode = elementList.item(1);
      
	{
		success = false;
		try {
            appendedChild = employeeNode.appendChild(newChild);
        }
		catch(ex) {
      success = (typeof(ex.code) != 'undefined' && ex.code == 3);
		}
		jsUnitCore.assertTrue("throw_HIERARCHY_REQUEST_ERR",success);
	}

})()

