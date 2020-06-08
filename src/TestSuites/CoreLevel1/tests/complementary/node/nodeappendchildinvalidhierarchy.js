
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "appendChild(newChild)" method adds the node
    "newChild" to the end of the list of children of the
    node.
    
    The text node cannot have any children. Thus, if we
    try to inser a child on a text node we should have
    DOM Exception.

* @author Gabriela Sampaio
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-184E7107
*/

/*
* @id nodeappendchildinvalidhierarchy
*/
(function nodeappendchildinvalidhierarchy() {
    var success; 
    var doc;
    var textNode;
    var textNodeChild;

    success = false;
    doc = docs["staff.xml"]
    textNode = doc.createTextNode("new text node");
    textNodeChild = doc.createTextNode("child text node");
    try {
        textNode.appendChild(textNodeChild);
    }
    catch(ex) {
        success = (typeof(ex.code) != 'undefined' && ex.code == 3);
    }
    jsUnitCore.assertTrue("throw_INVALID_HIERARCHY_ERR",success);

})()

