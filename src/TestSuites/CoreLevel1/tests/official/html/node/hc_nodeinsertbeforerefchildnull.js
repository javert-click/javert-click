
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    If the "refChild" is null then the
    "insertBefore(newChild,refChild)" method inserts the
    node "newChild" at the end of the list of children. 
    
    Retrieve the second employee and invoke the
    "insertBefore(newChild,refChild)" method with
    refChild=null.   Since "refChild" is null the "newChild"
    should be added to the end of the list.   The last item
    in the list is checked after insertion.   The last Element
    node of the list should be "newChild".

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-952280727
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=247
*/

     /*
     * @id hc_nodeinsertbeforerefchildnull
     */
     (function hc_nodeinsertbeforerefchildnull() {
   var success; 
    var doc;
      var elementList;
      var employeeNode;
      var childList;
      var refChild = null;

      var newChild;
      var child;
      var childName;
      var insertedNode;
      
	   
	   
	doc = docs["hc_staff.html"]
           elementList = doc.getElementsByTagName("p");
      employeeNode = elementList.item(1);
      childList = employeeNode.childNodes;

      newChild = doc.createElement("br");
      insertedNode = employeeNode.insertBefore(newChild,refChild);
      child = employeeNode.lastChild;

      childName = child.nodeName;

      DOMTestCase.assertEqualsAutoCase("element", "nodeName","br",childName);
       
})()

