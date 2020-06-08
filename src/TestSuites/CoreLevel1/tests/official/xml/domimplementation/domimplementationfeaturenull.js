
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
hasFeature("XML", null) should return true for implementations that can read staff documents.

* @author NIST
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-5CED94D7
* @see http://www.w3.org/2000/11/DOM-Level-2-errata#core-14
*/

     /*
     * @id domimplementationfeaturenull
     */
     (function domimplementationfeaturenull() {
   var success; 
    var doc;
      var domImpl;
      var state;
      var nullVersion = null;

      
	   
	   
	doc = docs["staff.xml"]
           domImpl = doc.implementation;
state = domImpl.hasFeature("XML",nullVersion);
jsUnitCore.assertTrue("hasXMLnull",state);

})()

