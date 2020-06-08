
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createProcessingInstruction(target,data)" method 
   creates a new ProcessingInstruction node with the
   specified name and data string.
   
   Retrieve the entire DOM document and invoke its 
   "createProcessingInstruction(target,data)" method with.  
   an invalid character. It must not create a new PI node 
   and raise DOM Exception.

* @author Gabriela Sampaio
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2001Apr/0020.html
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-135944439
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

/*
* @id documentcreateprocessinginstructioninvalidchar
*/
(function documentcreateprocessinginstructioninvalidchar() {
    var success; 
    var doc;
    var badPI;
    var success;

    success = false;
    doc = docs["staff.xml"]
    try {
        badPI = doc.createProcessingInstruction("invalid^Name","data");
    }
    catch(ex) {
        success = (typeof(ex.code) != 'undefined' && ex.code == 5);
    }
    jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
})()

