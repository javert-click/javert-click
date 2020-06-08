
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "removeAttributeNode(oldAttr)" method removes the
   specified attribute node and restores any default values. 
   
   Retrieve the last child of the third employeed and 
   remove its "street" Attr node.  Since this node has a
   default value defined in the DTD file, that default
   should immediately be the new value.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D589198
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id elementremoveattributerestoredefaultvalue
     */
     (function elementremoveattributerestoredefaultvalue() {
   var success; 
    var doc;
      var elementList;
      var testEmployee;
      var streetAttr;
      var attribute;
      var removedAttr;
      
	   
	   
	doc = docs["staff.xml"]
           elementList = doc.getElementsByTagName("address");
      testEmployee = elementList.item(2);
      streetAttr = testEmployee.getAttributeNode("street");
      removedAttr = testEmployee.removeAttributeNode(streetAttr);
      attribute = testEmployee.getAttribute("street");
      jsUnitCore.assertEquals("streetYes","Yes",attribute);
       
})()

