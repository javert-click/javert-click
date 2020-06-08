/**********************/
/* INTERFACE Document */
/**********************/

/*
* @id initDocument
*/
var initDocument = function(Nodes, DOMException, LiveNodeList, ArrayUtils){
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
        if(this.isHTML()){
            throw new DOMException.DOMException(9);
        }
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
        if(containsInvalidChar(name)){
            throw new DOMException.DOMException(5);
        }
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
    * @id DocumentGetElementsByTagName
    */
    Document.prototype.getElementsByTagName = function (tagName){
        var doc = this;
        /*
        * @id DocumentGetElementsByTagNameNewCompute
        */
        function newCompute(){
            //var x = result.contents;
            var result = doc.documentElement.getElementsByTagName(tagName).contents;
            if(tagName === "*" || doc.documentElement.tagName === tagName){
                result.splice(0, 0, doc.documentElement);
            }
            return result;
        }
        return new LiveNodeList.LiveNodeList(newCompute, true);
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

    return {'Document': Document};
}



//exports.Document = Document;

