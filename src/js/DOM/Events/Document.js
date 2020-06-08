//const Element = require ('./Element');
//const Node = require ('./Node');
//const DocumentFragment = require ('./DocumentFragment');
//const Text = require ('./Text');
//const Comment = require ('./Comment');
//const CDATASection = require ('./CDATASection');
//const ProcessingInstruction = require ('./ProcessingInstruction');
//const Attribute = require ('./Attribute');
//const EntityReference = require ('./EntityReference');
//const DOMException = require ('./DOMException');
//const LiveNodeList = require ('./LiveNodeList');
//const ArrayUtils   = require('./utils/ArrayUtils');
//const Event        = require('./Event');
//const CustomEvent  = require('./CustomEvent');


/**********************/
/* INTERFACE Document */
/**********************/

/*
* @id initDocument
*/
var initDocument = function(Nodes, DOMException, LiveNodeList, ArrayUtils, Event, CustomEvent, StringUtils){
    const Element               = Nodes.Element;
    const Node                  = Nodes.Node;
    const DocumentFragment      = Nodes.DocumentFragment;
    const Text                  = Nodes.Text;
    const Comment               = Nodes.Comment;
    const CDATASection          = Nodes.CDATASection;
    const ProcessingInstruction = Nodes.ProcessingInstruction;
    const Attribute             = Nodes.Attribute;
    const EntityReference       = Nodes.EntityReference;

    /*
    * @id Document
    */   
    var Document = function (){
        Node.Node.call(this);
        this.nodeType = 9;
        this.implementation = null;
        this.documentElement = null;
        this.browsingContext = null;
        this.doctype = null;
        this.ownerDocument = null;
        this.nodeName = '#document'; 
        this.defaultAttributes = [];
        this.activeElement = null;
    };

    var invalidCharacters = ['^', '_'];

    function containsInvalidChar(name){
        if(name.length === 0){
            return true;
        }
        var contains = false;
        var i = 0;
        while(!contains && i < invalidCharacters.length){
            if(name.indexOf(invalidCharacters[i]) != -1){
                contains = true;
            }
            i++;
        }
        return contains;
    }

    Document.prototype = Object.create(Node.Node.prototype);

    /**
     * @id DocumentCreateElement
    */
    Document.prototype.createElement = function (tagName){
        /*if(tagName.length === 0 || tagName.match(tagRegEx)){
            throw new DOMException.DOMException(5);
        }*/
        if(containsInvalidChar(tagName)){
            throw new DOMException.DOMException(5);
        }
        var element = new Element.Element(tagName, this);
        element.setDefaultAttributes(this.defaultAttributes);
        return element;
    };

    /**
    * @id DocumentCreateDocumentFragment
    */
    Document.prototype.createDocumentFragment = function(){
        var docFrag = new DocumentFragment.DocumentFragment();
        docFrag.ownerDocument = this;
        return docFrag;
    };

    /**
    * @id DocumentCreateTextNode
    */
    Document.prototype.createTextNode = function (data){
        var text = new Text.Text(data, this);
        return text;
    };

    /**
    * @id DocumentCreateComment
    */
    Document.prototype.createComment = function (data){
        var comment = new Comment.Comment(data, this);
        return comment;
    };

    /**
    * @id DocumentCreateCDATASection
    */
    Document.prototype.createCDATASection = function (data){
        if(this.isHTML()){
            throw new DOMException.DOMException(9);
        }
        var cdatasection = new CDATASection.CDATASection(data, this);
        return cdatasection;
    };

    /**
    * @id DocumentCreateProcessingInstruction
    */
    Document.prototype.createProcessingInstruction = function (target, data){
        /* if(target.match(tagRegEx) || !target || !target.length){
            throw new DOMException.DOMException(5);
        } */
        if(containsInvalidChar(target)){
            throw new DOMException.DOMException(5);
        }
        /*if(this.isHTML()){
            throw new DOMException.DOMException(9);
        }*/
        var processingInstruction = new ProcessingInstruction.ProcessingInstruction(target, data, this);
        return processingInstruction;
    };

    /**
    * @id DocumentCreateAttribute
    */ 
    Document.prototype.createAttribute = function (name){
        /*if(!name || !name.length || name.match(attrRegExp)){
            throw new DOMException.DOMException(5);
        }*/
        var attribute = new Attribute.Attribute(name, this);
        return attribute;
    };

    /**
    * @id DocumentCreateEntityReference
    */
    Document.prototype.createEntityReference = function (name){
        if(this.isHTML()){
            throw new DOMException.DOMException(9);
        }
        /*if(name.match(tagRegEx) || !name || !name.length){
            throw new DOMException.DOMException(5);
        }*/
        if(containsInvalidChar(name)){
            throw new DOMException.DOMException(5);
        }
        var entity = null;
        if(this.doctype.entities){
            entity = this.doctype.entities.getNamedItem(name);
        }
        var entityRef = new EntityReference.EntityReference(name, entity, this);
        return entityRef;
    };

    /**
    * @id DocumentCreateEvent
    */
    Document.prototype.createEvent = function(inter_face){
        var event = null;
        switch (inter_face) {
        case "CustomEvent":    
          event = new CustomEvent.CustomEvent(""); 
          break;
        default: 
          event = new Event.Event("");
        }
        //this should not be necessary! 
        event.initialized = false;
        return event;
    };

    /**
    * @id DocumentGetElementsByTagName
    */
    Document.prototype.getElementsByTagName = function (tagName){
        var doc = this;
        var result = doc.documentElement.getElementsByTagName(tagName);
        if(tagName === "*" || doc.documentElement.tagName === tagName){
            result.splice(0, 0, doc.documentElement);
        }
        return result;
    };

    /**
    * @id getElementById
    */
    Document.prototype.getElementById = function (elementId){
        return this.elementById(this.documentElement, elementId);
    };

    /**
    * @id isSameDocument
    */
    Document.prototype.isSameDocument = function(document){
        return (this.id === document.id);
    };

    /**
    * @id DocumentIsHTML
    */
    Document.prototype.isHTML = function(){
        return this.doctype && this.doctype.name === "html";
    }

    /*
    * @id DocumentClone
    */
    Document.prototype.clone = function(){
        var newDocument = new Document();
        return newDocument;
    }

    /*
    * @id DocumentHasFocus
    */
    Document.prototype.hasFocus = function(){
        return false;
    }

    /*
    * @id DocumentGetTheParent
    */
    Document.prototype.getTheParent = function (event){
        //A document’s get the parent algorithm, given an event, returns null if event’s type attribute value is "load" 
        //or document does not have a browsing context, and the document’s relevant global object otherwise.
        if(event.type === "load" || !this.browsingContext){
            return null;
        }else{
            return this.browsingContext;
        }
    };

    /*
    * @id DocumentGetElementsByClassName
    */
    Document.prototype.getElementsByClassName = function(name){
        var nl = elementsByClassName(this.documentElement, name, []);
        return nl;
    };

    //AUXILIARY FUNCTIONS

    /*
    * @id DocumentGetElementById
    */
    Document.prototype.elementById = function (element, elementId){
        var value = "";
        if(element.nodeType === Node.ELEMENT_NODE){
            value = element.getAttribute("id");
        }
        if(value === elementId){
            return element;
        }else{
            if(element.hasChildNodes()){
                for(var i = 0; i < element.childNodes.length; i++){
                    var result = this.elementById(element.childNodes.item(i), elementId);
                    if(result != null){
                        return result;
                    }
                }
            }else{
                return null;
            }
        }
    };

    /*
    * @id DocumentClone
    */
    Document.prototype.clone = function(){
        var newDocument = new Document();
        return newDocument;
    };

    /*
    * @id DocumentQuerySelectorAll
    */
    Document.prototype.querySelectorAll = function(selector){
        var commaSep = ", ";
        var spaceSep = " ";
        var selectorsComma = StringUtils.split(selector, commaSep);
        if(selectorsComma.length > 1){
            var results = [];
            for(var i = 0; i < selectorsComma.length; i++){
                var result = this.querySelector(selectorsComma[i]);
                for(var j = 0; j < result.length; j++){
                    if(result[j].searchNode(result[j], results) === -1){
                        results.push(result[j]);
                    }
                }
            }
            return results;
        }else{
            var spaceSeps = StringUtils.split(selector, spaceSep);
            if(spaceSeps.length === 2){
                var elems = this.querySelector(spaceSeps[1]);
                var parents = this.querySelector(spaceSeps[0]);
                return ArrayUtils.filter(elems, function(e){
                    return e.searchNode(e.parentNode, parents) !== -1;
                });
            }else{
                //case where there is no sep!
                return this.querySelector(selector);
            }
        }
    }

    /*
    * @id DocumentQuerySelector
    */
    Document.prototype.querySelector = function(selector){
        if(selector.length > 1){
            var fstChar = selector.charAt(0);
            switch(fstChar){
                case ".":
                  return this.getElementsByClassName(selector.substring(1, selector.length));
                case "#":
                    return this.getElementById(selector.substring(1, selector.length));
                default:
                    return this.getElementsByTagName(selector); 
            }
        }
    }

    /*
    * @id elementsByClassName
    */
    function elementsByClassName(element, name, list){
        if(element.nodeType === Node.ELEMENT_NODE){
            var className = element.getAttribute("class");
            var classNameSplits = className ? StringUtils.split(className, " ") : [];
            if(classNameSplits.indexOf(name) !== -1){
                list.push(element);
            } 
        }
        for(var i = 0; i < element.childNodes.length; i++){
            elementsByClassName(element.childNodes.item(i), name, list);
        }
        return list;
    }

    return {'Document': Document};
}

module.exports = initDocument;

