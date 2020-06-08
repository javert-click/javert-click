
var docs = initDOMHeapCoreLevel1();
var jsUnitCore = initJsUnitCore();
var DOMTestCase = initDOMTestCase(jsUnitCore);   


/**
* 
    The "createDocumentFragment()" method creates an empty 
   DocumentFragment object.
   Retrieve the entire DOM document and invoke its 
   "createDocumentFragment()" method.  The content, name, 
   type and value of the newly created object are output.

* @author NIST
* @author Mary Brady
* @see http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core#ID-35CB04B5
*/

     /*
     * @id documentcreatedocumentfragment
     */
     (function documentcreatedocumentfragment() {
   var success; 
    var doc;
      var newDocFragment;
      var children;
      var length;
      var newDocFragmentName;
      var newDocFragmentType;
      var newDocFragmentValue;
      
	   
	   
	doc = docs["staff.xml"]
           newDocFragment = doc.createDocumentFragment();
      children = newDocFragment.childNodes;

      length = children.length;

      jsUnitCore.assertEquals("length",0,length);
       newDocFragmentName = newDocFragment.nodeName;

      jsUnitCore.assertEquals("name","#document-fragment",newDocFragmentName);
       newDocFragmentType = newDocFragment.nodeType;

      jsUnitCore.assertEquals("type",11,newDocFragmentType);
       newDocFragmentValue = newDocFragment.nodeValue;

      jsUnitCore.assertNull("value",newDocFragmentValue);
    
})()

