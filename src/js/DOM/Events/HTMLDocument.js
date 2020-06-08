/**********************/
/* INTERFACE HTMLDocument */
/**********************/

//const Document    = require ('./Document');
//const HTMLElement = require('./HTMLElement');
//const InputElement= require('./InputElement');
//const FormElement = require('./FormElement');

/*
* @id initHTMLDocument
*/
var initHTMLDocument = function(Document, HTMLElement, InputElement, FormElement){
    /**
     * @id HTMLDocument
     */   
    var HTMLDocument = function (){
        Document.Document.call(this);
        this.head = null;
        this.body = null;
    };

    HTMLDocument.prototype = Object.create(Document.Document.prototype);
    
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

    return {'HTMLDocument': HTMLDocument};
};

module.exports = initHTMLDocument