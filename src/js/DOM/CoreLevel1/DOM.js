//const EventsSemantics = require ('./EventsSemantics'); 
//const EventListener   = require ('./EventListener'); 
//const ArrayUtils      = require ('./ArrayUtils'); 
//const DOMException    = require ('./DOMException'); 
//const EventTarget     = require ('./EventTarget'); 
//const LiveNodeList    = require ('./LiveNodeList'); 

/*
* @id initDOM
*/
var initDOM = function(){
    var DOM                   = {};
    DOM.DOMImplementation     = initDOMImplementation();
    //DOM.EventsSemantics       = initEventsSemantics();
    //DOM.EventListener         = initEventListener();
    DOM.ArrayUtils            = initArrayUtils();
    DOM.DOMException          = initDOMException();
    //DOM.EventTarget           = initEventTarget(DOM.EventsSemantics, DOM.EventListener, DOM.ArrayUtils, DOM.DOMException);
    DOM.LiveNodeList          = initLiveNodeList(); 
    //DOM.Node                  = initNode(DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils, DOM.EventTarget);
    DOM.Node                  = initNode(DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils);
    DOM.NodeList              = initNodeList();
    //DOM.Window                = initWindow(DOM.EventTarget);  
    //DOM.Event                 = initEvent(DOM.Node, DOM.Window);      
    DOM.CharacterData         = initCharacterData(DOM.Node, DOM.DOMException); 
    DOM.Text                  = initText(DOM.CharacterData, DOM.DOMException, DOM.Node);
    DOM.Attribute             = initAttribute(DOM.Node, DOM.DOMException, DOM.Text);
    DOM.DocumentFragment      = initDocumentFragment(DOM.Node); 
    DOM.DocumentType          = initDocumentType(DOM.Node);
    DOM.EntityReference       = initEntityReference(DOM.Node); 
    DOM.ProcessingInstruction = initProcessingInstruction(DOM.Node, DOM.DOMException); 
    DOM.CDATASection          = initCDATASection(DOM.Text, DOM.Node); 
    DOM.Comment               = initComment(DOM.CharacterData, DOM.Node);
    DOM.NamedNodeMap          = initNamedNodeMap(DOM.DOMException, DOM.Attribute, DOM.ArrayUtils);
    DOM.Element               = initElement(DOM.Node, DOM.Attribute, DOM.LiveNodeList, DOM.NamedNodeMap, DOM.DOMException);
    DOM.Entity                = initEntity(DOM.Node);
    DOM.Notation              = initNotation(DOM.Node);
    var Nodes = { 
      Element:               DOM.Element, 
      Node:                  DOM.Node, 
      DocumentFragment:      DOM.DocumentFragment, 
      Text:                  DOM.Text, 
      Comment:               DOM.Comment, 
      CDATASection:          DOM.CDATASection, 
      ProcessingInstruction: DOM.ProcessingInstruction, 
      Attribute:             DOM.Attribute, 
      EntityReference:       DOM.EntityReference,
      Entity:                DOM.Entity,
      Notation:              DOM.Notation
    }
    //DOM.CustomEvent           = initCustomEvent(DOM.Event); 
    //DOM.UIEvent               = initUIEvent(DOM.Event, DOM.Window);
    //DOM.MouseEvent            = initMouseEvent(DOM.UIEvent, DOM.Window);
    //DOM.Document              = initDocument(Nodes, DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils, DOM.Event, DOM.CustomEvent);
    DOM.Document                = initDocument(Nodes, DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils);
    //DOM.ShadowRoot            = initShadowRoot(DOM.DocumentFragment);

    //initEventTarget.Node      = DOM.Node;
    //initEventTarget.ShadowRoot= DOM.ShadowRoot;
    //initEventTarget.Window    = DOM.Window;
    //initEventTarget.MouseEvent= DOM.MouseEvent;
    return DOM;
};