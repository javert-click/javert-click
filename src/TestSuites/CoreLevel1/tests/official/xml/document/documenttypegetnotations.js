
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "getNotations()" method creates a NamedNodeMap that   
   contains all the notations declared in the DTD.
   
   Retrieve the Document Type for this document and create
   a NamedNodeMap object of all the notations.  There
   should be two items in the list (notation1 and notation2).

* @author NIST
* @author Mary Brady
* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-D46829EF
*/

     /*
     * @id documenttypegetnotations
     */
     (function documenttypegetnotations() {
   var success; 
    var doc;
      var docType;
      var notationList;
      var notation;
      var notationName;
      var actual = new Array();

      var expected = new Array();
      expected[0] = "notation1";
      expected[1] = "notation2";

      
	   
	   
	doc = docs["staff.xml"]
           docType = doc.doctype;

      jsUnitCore.assertNotNull("docTypeNotNull",docType);
notationList = docType.notations;

      jsUnitCore.assertNotNull("notationsNotNull",notationList);
for(var indexN65627 = 0;indexN65627 < notationList.length; indexN65627++) {
      notation = notationList.item(indexN65627);
      notationName = notation.nodeName;

      actual[actual.length] = notationName;

	}
   DOMTestCase.assertEqualsCollection("names",expected,actual);
       
})()

