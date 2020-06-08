
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getAttributes()" method(Node Interface) may
   be used to retrieve the set of all attributes of an
   element. 
   
   Create a list of all the attributes of the last child
   of the first employee by using the "getAttributes()"
   method.  Examine the length of the attribute list.  
   This test uses the "getLength()" method from the        
   NameNodeMap interface.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-84CF096
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2002Mar/0002.html
*/

     /*
     * @id elementretrieveallattributes
     */
     (function elementretrieveallattributes() {
   var success; 
    var doc;
      var addressList;
      var testAddress;
      var attributes;
      
	   
	   
	doc = docs["staff.xml"]
           addressList = doc.getElementsByTagName("address");
      testAddress = addressList.item(0);
      attributes = testAddress.attributes;

      DOMTestCase.assertSize("elementRetrieveAllAttributesAssert",2,attributes);

})()

