
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createEntityReference(name)" method 
   creates a new EntityReference node with the
   specified name and data string.
   
   Retrieve the entire DOM document and invoke its 
   "createEntityReference(name)" method with.  
   an invalid character. It must not create a new EntRef node 
   and raise DOM Exception.

* @author Gabriela Sampaio
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#
* @see http://lists.w3.org/Archives/Public/www-dom-ts/2001Apr/0020.html
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-135944439
* @see http://www.w3.org/Bugs/Public/show_bug.cgi?id=249
*/

/*
* @id documentcreateentityrefinvalidchar
*/
(function documentcreateentityrefinvalidchar() {
    var success; 
    var doc;
    var badEntRef;
    var success;

    success = false;
    doc = docs["staff.xml"]
    try {
        badEntRef = doc.createEntityReference("invalid^Name");
    }
    catch(ex) {
        success = (typeof(ex.code) != 'undefined' && ex.code == 5);
    }
    jsUnitCore.assertTrue("throw_INVALID_CHARACTER_ERR",success);
})()

