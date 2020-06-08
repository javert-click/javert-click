
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is already in the tree, it is first
    removed before the new one is appended.
    
    Retrieve the first child of the second employee and   
    append the first child to the end of the list.   After
    the "appendChild(newChild)" method is invoked the first 
    child should be the one that was second and the last
    child should be the one that was first.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

     /*
     * @id nodeappendchildchildexists
     */
     (function nodeappendchildchildexists() {
   var success; 
    var doc;
      var elementList;
      var childNode;
      var newChild;
      var lchild;
      var fchild;
      var lchildName;
      var fchildName;
      var appendedChild;
      var initialName;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("employee");
      childNode = elementList.item(1);
      newChild = childNode.firstChild;

      initialName = newChild.nodeName;

      appendedChild = childNode.appendChild(newChild);
      fchild = childNode.firstChild;

      fchildName = fchild.nodeName;

      lchild = childNode.lastChild;

      lchildName = lchild.nodeName;

      
	if(
	("employeeId" == initialName)
	) {
	jsUnitCore.assertEquals("assert1_nowhitespace","name",fchildName);
       jsUnitCore.assertEquals("assert2_nowhitespace","employeeId",lchildName);
       
	}
	
		else {
			jsUnitCore.assertEquals("assert1","employeeId",fchildName);
       jsUnitCore.assertEquals("assert2","#text",lchildName);
       
		}
	
})()

