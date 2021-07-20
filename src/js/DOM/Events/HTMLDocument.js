/**********************/
/* INTERFACE HTMLDocument */
/**********************/

const Document          = require('./Document');
const HTMLElement       = require('./HTMLElement');
const InputElement      = require('./InputElement');
const FormElement       = require('./FormElement');
const HTMLIFrameElement = require('./HTMLIFrameElement');

/**
 * @id HTMLDocument
 */   
var HTMLDocument = function (){
    Document.Document.call(this);
    this.__head = null;
    this.__body = null;
};

HTMLDocument.prototype = Object.create(Document.Document.prototype);

Object.defineProperty(HTMLDocument.prototype, 'head', {
    get: function(){
        return this.__head;
    }
});

Object.defineProperty(HTMLDocument.prototype, 'body', {
    get: function(){
        return this.__body;
    },
    set: function(o){
        this.__body = o;
        if(o){
          this.__body.__onmessageerror = null;
          var body = this.__body;
          var w = this.window;
          this.__body.setAttribute = function(name, value){
            if(value){
              var fun = function(){ var window = w; eval(value); };
              body[name] = fun;
            } 
          }
          Object.defineProperty(this.__body, 'onmessageerror',{
              set: function(f){
                this.__onmessageerror = f;
                if(w){
                  w.onmessageerror = f;
                } 
              },
              get: function(){
                return this.__onmessageerror;
              }
          });
        }
    }
});

/*
* @id HTMLDocumentCreateElement
*/
HTMLDocument.prototype.createElement = function(tagName){
    /* if(tagName.length === 0 || tagName.match(tagRegEx)){
        throw new DOMException.DOMException(5);
    }*/
    var element = null;
    switch(tagName){
        case "input":
            element = new InputElement.InputElement(tagName, this);
            break;
        case "form":
            element = new FormElement.FormElement(tagName, this);
            break;
        case "iframe":
            element = new HTMLIFrameElement.HTMLIFrameElement(tagName, this);
            break;
        default:
            element = new HTMLElement.HTMLElement(tagName, this);

    }
    element.setDefaultAttributes(this.defaultAttributes);
    return element;
};

/*
* @id HTMLDocumentClone
*/
HTMLDocument.prototype.clone = function(){
    var newDocument = new HTMLDocument();
    newDocument.head = this.head;
    newDocument.body = this.body;
    return newDocument;
};

exports.HTMLDocument = HTMLDocument;