
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getImplementation()" method returns the 
   DOMImplementation object that handles this document. 
   Retrieve the entire DOM document and invoke its 
   "getImplementation()" method.  It should return a 
   DOMImplementation whose "hasFeature("XML","1.0")
   method returns the boolean value "true".

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1B793EBA
*/

     /*
     * @id documentgetimplementation
     */
     (function documentgetimplementation() {
   var success; 
    var doc;
      var docImpl;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           docImpl = doc.implementation;
state = docImpl.hasFeature("XML","1.0");
jsUnitCore.assertTrue("documentGetImplementationAssert",state);

})()

