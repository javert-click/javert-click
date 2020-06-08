
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   

/**
* 
Adjacent CDATASection nodes cannot be merged together by
use of the "normalize()" method from the Element interface.
Retrieve second child of the second employee and invoke
the "normalize()" method.  The Element under contains
two CDATASection nodes that should not be merged together
by the "normalize()" method.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-162CF083
*/

     /*
     * @id cdatasectionnormalize
     */
     (function cdatasectionnormalize() {
      var success; 
        var doc;
          var nameList;
          var lChild;
          var childNodes;
          var cdataN;
          var data;
          
        
        
      doc = docs["staff.xml"]
          nameList = doc.getElementsByTagName("name");
          lChild = nameList.item(1);
          lChild.normalize();
          childNodes = lChild.childNodes;

          cdataN = childNodes.item(1);
          jsUnitCore.assertNotNull("firstCDATASection",cdataN);
          data = cdataN.data;

          jsUnitCore.assertEquals("data1","This is a CDATASection with EntityReference number 2 &ent2;",data);
          cdataN = childNodes.item(3);
          jsUnitCore.assertNotNull("secondCDATASection",cdataN);
          data = cdataN.data;

          jsUnitCore.assertEquals("data3","This is an adjacent CDATASection with a reference to a tab &tab;",data);
          
    })()

