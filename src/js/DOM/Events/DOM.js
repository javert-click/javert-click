const initDOMRect               = require ('./DOMRect');
const initCSSStyleDeclaration   = require ('./CSSStyleDeclaration');
const initEventsSemantics       = require ('./EventsSemantics');
const initEventListener         = require ('./EventListener');
const initArrayUtils            = require ('../Common/ArrayUtils');
const initStringUtils           = require ('../Common/StringUtils');
const initClassList             = require ('./ClassList');
const initDOMException          = require ('../Common/DOMException');
const initEventTarget           = require ('./EventTarget');
const initLiveNodeList          = require ('../Common/LiveNodeList');
const initNode                  = require ('./Node');
const initNodeList              = require ('../Common/NodeList');
const initWindow                = require ('./Window');
const initEvent                 = require ('./Event');
const initPerformance           = require ('./Performance');
const initCharacterData         = require ('../Common/CharacterData');
const initText                  = require ('../Common/Text');
const initAttribute             = require ('../Common/Attribute');
const initDocumentFragment      = require ('../Common/DocumentFragment');
const initDocumentType          = require ('../Common/DocumentType');
const initEntityReference       = require ('../Common/EntityReference');
const initProcessingInstruction = require ('../Common/ProcessingInstruction');
const initCDATASection          = require ('../Common/CDATASection');
const initComment               = require ('../Common/Comment');
const initNamedNodeMap          = require ('../Common/NamedNodeMap');
const initElement               = require ('./Element');
const initEntity                = require ('../Common/Entity');
const initNotation              = require ('../Common/Notation');
const initCustomEvent           = require ('./CustomEvent');
const initUIEvent               = require ('./UIEvent');
const initKeyboardEvent         = require ('./KeyboardEvent');
const initMouseEvent            = require ('./MouseEvent');
const initWheelEvent            = require ('./WheelEvent');
const initGamepadEvent          = require ('./GamepadEvent');
const initFocusEvent            = require ('./FocusEvent');
const initCompositionEvent      = require ('./CompositionEvent');
const initDocument              = require ('./Document');
const initShadowRoot            = require ('./ShadowRoot');
const initHTMLElement           = require ('./HTMLElement');
const initInputElement          = require ('./InputElement');
const initFormElement           = require ('./FormElement');
const initHTMLDocument          = require ('./HTMLDocument');
const initXMLDocument           = require ('./XMLDocument');
const initDOMImplementation     = require ('./DOMImplementation');
const initHTMLSlotElement       = require ('./HTMLSlotElement');
const initPromise               = require ('../../Promises/Promise');

/*
* @id initDOM
*/
var initDOM = function(){
    var DOM                   = {};
    DOM.DOMRect               = initDOMRect();
    DOM.EventsSemantics       = initEventsSemantics();
    DOM.EventListener         = initEventListener();
    DOM.ArrayUtils            = initArrayUtils();
    DOM.StringUtils           = initStringUtils();
    DOM.ClassList             = initClassList(DOM.ArrayUtils, DOM.StringUtils);
    DOM.DOMException          = initDOMException();
    DOM.EventTarget           = initEventTarget(DOM.EventsSemantics, DOM.EventListener, DOM.ArrayUtils, DOM.DOMException);
    DOM.LiveNodeList          = initLiveNodeList();
    DOM.Node                  = initNode(DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils, DOM.EventTarget);
    DOM.NodeList              = initNodeList();
    DOM.Window                = initWindow(DOM.EventTarget);
    DOM.window                = new DOM.Window.Window();
    DOM.Event                 = initEvent(DOM.Node, DOM.Window, DOM.window);
    DOM.CSSStyleDeclaration   = initCSSStyleDeclaration(DOM.Event);
    DOM.Performance           = initPerformance(DOM.EventTarget, DOM.window);
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
    DOM.Element               = initElement(DOM.Node, DOM.Attribute, DOM.LiveNodeList, DOM.NamedNodeMap, DOM.DOMException, DOM.Event, DOM.StringUtils, DOM.CSSStyleDeclaration, DOM.DOMRect);
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
    DOM.CustomEvent           = initCustomEvent(DOM.Event);
    DOM.UIEvent               = initUIEvent(DOM.Event, DOM.Window);
    DOM.KeyboardEvent         = initKeyboardEvent(DOM.UIEvent, DOM.Window);
    DOM.MouseEvent            = initMouseEvent(DOM.UIEvent, DOM.Window);
    DOM.WheelEvent            = initWheelEvent(DOM.MouseEvent, DOM.Window);
    DOM.GamepadEvent          = initGamepadEvent(DOM.Event, DOM.Window);
    DOM.FocusEvent            = initFocusEvent(DOM.UIEvent, DOM.Window);
    DOM.CompositionEvent      = initCompositionEvent(DOM.UIEvent, DOM.Window);
    DOM.Document              = initDocument(Nodes, DOM.DOMException, DOM.LiveNodeList, DOM.ArrayUtils, DOM.Event, DOM.CustomEvent, DOM.StringUtils);
    DOM.ShadowRoot            = initShadowRoot(DOM.DocumentFragment);
    DOM.HTMLElement           = initHTMLElement(DOM.Element, DOM.Event, DOM.ShadowRoot, DOM.ClassList, DOM.CSSStyleDeclaration);
    DOM.InputElement          = initInputElement(DOM.HTMLElement, DOM.MouseEvent, DOM.Event, DOM.Node);
    DOM.FormElement           = initFormElement(DOM.HTMLElement);
    DOM.HTMLDocument          = initHTMLDocument(DOM.Document, DOM.HTMLElement, DOM.InputElement, DOM.FormElement);
    DOM.XMLDocument           = initXMLDocument(DOM.Document);
    DOM.DOMImplementation     = initDOMImplementation(DOM.HTMLDocument, DOM.XMLDocument, DOM.DocumentType, DOM.HTMLElement, DOM.Text);
    DOM.HTMLSlotElement       = initHTMLSlotElement(DOM.HTMLElement);


    DOM.Promise               = initPromise();

    initEventTarget.Node      = DOM.Node;
    initEventTarget.Element   = DOM.Element;
    initEventTarget.Text      = DOM.Text;
    initEventTarget.ShadowRoot= DOM.ShadowRoot;
    initEventTarget.Window    = DOM.Window;
    initEventTarget.MouseEvent= DOM.MouseEvent;
    initEventTarget.window    = DOM.window;

    DOM.activateInnerHTML = function (domParser) {
      var DOM = this;
      var HTMLElement = DOM.HTMLElement.HTMLElement;
      Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
        /*
        * @id HTMLElementInnerHTMLGet
        */
        get: function(){
            return this._innerHTML;
        },
        /*
        * @id HTMLElementInnerHTMLSet
        */
        set: function(html_str){
            var nodes = setInnerHTML(domParser, this.ownerDocument, this, html_str);
            var parent = this.parentNode;
            parent.removeChild(this);
            for(var i = 0; i < nodes.length; i++){
              nodes[i]._innerHTML = html_str;
              parent.appendChild(nodes[i]);
            }
        }
      });
    };

    Object.defineProperty(DOM.HTMLElement.HTMLElement.prototype, 'contentWindow', {
      /*
      * @id HTMLElementContentWindowGet
      */
      get: function(){
          return DOM.window;
      }
    });

    return DOM;
};

module.exports = initDOM;