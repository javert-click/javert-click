
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "newChild" is a DocumentFragment object then all
    its children are inserted in the same order before the
    the "refChild". 
    
    Create a DocumentFragment object and populate it with
    two Element nodes.   Retrieve the second employee and
    insert the newly created DocumentFragment before its
    fourth child.   The second employee should now have two
    extra children("newChild1" and "newChild2") at 
    positions fourth and fifth respectively.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeinsertbeforedocfragment
     */
     (function hc_nodeinsertbeforedocfragment() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild;
      var newdocFragment;
      var newChild1;
      var newChild2;
      var child;
      var childName;
      var appendedChild;
      var insertedNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      refChild = childList.item(3);
      newdocFragment = doc.createDocumentFragment();
      newChild1 = doc.createElement("br");
      newChild2 = doc.createElement("b");
      appendedChild = newdocFragment.appendChild(newChild1);
      appendedChild = newdocFragment.appendChild(newChild2);
      insertedNode = employeeNode.insertBefore(newdocFragment,refChild);
      child = childList.item(3);
      childName = child.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "childName3","br",childName);
       child = childList.item(4);
      childName = child.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "childName4","b",childName);
       
})()

