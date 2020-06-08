
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createComment(data)" method creates a new Comment
   node given the specified string. 
   Retrieve the entire DOM document and invoke its 
   "createComment(data)" method.  It should create a new
   Comment node whose "data" is the specified string.
   The content, name and type are retrieved and output.

* @author Curt Arnold
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-1334481328
*/

     /*
     * @id hc_documentcreatecomment
     */
     (function hc_documentcreatecomment() {
   var success; 
    var doc;
      var newCommentNode;
      var newCommentValue;
      var newCommentName;
      var newCommentType;
      
	   
	   
	doc = docs["hc_staff.html"]
           newCommentNode = doc.createComment("This is a new Comment node");
      newCommentValue = newCommentNode.nodeValue;

      jsUnitCore.assertEquals("value","This is a new Comment node",newCommentValue);
       newCommentName = newCommentNode.nodeName;

      jsUnitCore.assertEquals("strong","#comment",newCommentName);
       newCommentType = newCommentNode.nodeType;

      jsUnitCore.assertEquals("type",8,newCommentType);
       
})()

