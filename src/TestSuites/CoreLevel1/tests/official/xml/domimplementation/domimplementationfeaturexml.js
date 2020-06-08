
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
hasFeature("xml", "1.0") should return true for implementations that can read staff documents.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5CED94D7
*/

     /*
     * @id domimplementationfeaturexml
     */
     (function domimplementationfeaturexml() {
   var success; 
    var doc;
      var domImpl;
      var state;
      
	   
	   
	doc = docs["staff.xml"]
           domImpl = doc.implementation;
state = domImpl.hasFeature("xml","1.0");
jsUnitCore.assertTrue("hasXML1",state);

})()

