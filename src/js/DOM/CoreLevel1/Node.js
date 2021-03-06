/******************/
/* INTERFACE NODE */
/******************/

/*
* @id initNode
*/
var initNode = function(DOMException, LiveNodeList, ArrayUtils){

    /*
    * @id Node
    */
    var Node = function () {
        Node.counter = (Node.counter || 0) + 1;  
        this.id = Node.counter; 
        this.nodeType             = 0;
        this.__nodeName           = null;
        this.localName            = null;
        this.ownerDocument        = null;
        this.parentNode           = null;
        this.__childNodes         = [];
        this.__observers          = []; 
        this.attributes           = null;
        this.namespaceURI         = null;
        this._value               = null;
        this.prefix               = null;
        this.slot                 = null;
    };

    /*NodeType*/
    const ELEMENT_NODE                = 1;
    const ATTRIBUTE_NODE              = 2;
    const TEXT_NODE                   = 3;
    const CDATA_SECTION_NODE          = 4;
    const ENTITY_REFERENCE_NODE       = 5;
    const ENTITY_NODE                 = 6;
    const PROCESSING_INSTRUCTION_NODE = 7;
    const COMMENT_NODE                = 8;
    const DOCUMENT_NODE               = 9;
    const DOCUMENT_TYPE_NODE          = 10;
    const DOCUMENT_FRAGMENT_NODE      = 11;
    const NOTATION_NODE               = 12;

    Object.defineProperty(Node.prototype, 'nodeValue', {
            /**
            * @id nodeValueGet
            */
            get: function(){return this._value;},

            /**
            * @id nodeValueSet
            */
            set: function (value){}
    });    

    /**
    * The first child is the first element of the childNodes array
    */
    Object.defineProperty(Node.prototype, 'firstChild', {
            /**
            * @id firstChildGet
            */
            get: function(){
                return this.__childNodes.length > 0 ? this.__childNodes[0] : null;
            }
    });  

    /**
    * Analogous to firstChild
    */
    Object.defineProperty(Node.prototype, 'lastChild', {
            /**
            * @id lastChildGet
            */
            get: function(){
                return this.__childNodes.length > 0 ? this.__childNodes[this.__childNodes.length - 1] : null;
            }
    }); 

    /**
    * This is the next child in the childNodes array. When not present, returns null.
    */
    Object.defineProperty(Node.prototype, 'nextSibling', {
            /**
            * @id nextSiblingGet
            */
            get: function(){
                if(this.parentNode){
                    var i = this.searchNode(this, this.parentNode.__childNodes);
                    return this.parentNode.__childNodes[i+1] || null;
                }else{
                    return null;
                }
            }
    });  

    /**
    * This is the previous child in the childNodes array. When not present, returns null.
    */
   Object.defineProperty(Node.prototype, 'previousSibling', {
        /**
        * @id previousSiblingGet
        */
        get: function(){
            if(this.parentNode){
                var i = this.searchNode(this, this.parentNode.__childNodes);
                return this.parentNode.__childNodes[i-1] || null;
            }else{
                return null;
            }
        }
    });  

    /**
    * childNodes returns a live node list of the node children. If necessary, the list is re-computed.
    */
    Object.defineProperty(Node.prototype, 'childNodes', {
        /**
         * @id childNodesGet
         */
        get: function(){
            var elem = this; 
            /*
            * @id compute
            */
            var compute = function () { 
                return elem.__childNodes; 
            }
            var nl           = new LiveNodeList.LiveNodeList(compute); 
            this.addObserver(nl); 
            return nl; 
        }
    }); 

    /**
    * @id addObserver
    */
    Node.prototype.addObserver = function (o) { 
        this.__observers.push(o); 
    }

    /**
    * @id notify
    */
    Node.prototype.notify = function () {  
        for (var i = 0; i<this.__observers.length; i++) { 
            this.__observers[i].observe(); 
        }
    }

    /**
    * @id insertBefore
    */
    Node.prototype.insertBefore = function (newChild, refChild) {
        var resChild;
        this.notify(); 
        newChild.notify();
        LiveNodeList.LiveNodeList.prototype.recompute();
        checkChildValidity(this, newChild); 
        if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
            for(var i = 0; i < newChild.__childNodes.length; i++){
                insertChild(this, newChild.__childNodes[i], refChild);
            }
            resChild = newChild;
        }else{
            resChild = insertChild(this, newChild, refChild);
        }
        return resChild;
    };

    /**
    * @id appendChild
    */
    Node.prototype.appendChild = function(newChild){
        return this.insertBefore(newChild, null);
    };

    /**
    * @id replaceChild
    */
    Node.prototype.replaceChild = function(newChild, oldChild){
        this.notify(); 
        newChild.notify(); 
        LiveNodeList.LiveNodeList.prototype.recompute();
        checkChildValidity(this, newChild);
        var indexNew = this.searchNode(newChild, this.__childNodes);
        if(indexNew > -1){
            //newChild already exists in the tree. It is first removed
            this.__childNodes.splice(indexNew, 1);
        }
        var indexOld = this.searchNode(oldChild, this.__childNodes);
        if(indexOld === -1){
            //node to be replaced is not found. Throws NOT_FOUND_ERR
            throw new DOMException.DOMException(8);
        }
        if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
            //when the node is a document fragment, we replace the oldChild witht the children of the doc frag node.
            this.__childNodes.splice(indexOld, 1, newChild.__childNodes[0]);
            for(var i = 1; i < newChild.__childNodes.length; i++){
                this.__childNodes.splice(indexOld+1, 0, newChild.__childNodes[i]);
            }
        }else{
            //replacing oldChild with newChild.
            this.__childNodes.splice(indexOld, 1, newChild);
        }
        return oldChild;
    };

    /**
    * @id removeChild
    */
    Node.prototype.removeChild = function (oldChild){
        this.notify(); 
        LiveNodeList.LiveNodeList.prototype.recompute();
        if(this.is_readonly()){
            throw new DOMException.DOMException(7);
        }
        var i = this.searchNode(oldChild, this.__childNodes);
        if(i === -1){
            //oldChild does not exist.
            throw new DOMException.DOMException(8);
        }else{
            this.__childNodes.splice(i,1);
            oldChild.parentNode = null;
            return oldChild;
        }
    };

    /**
    * @id searchNode
    */
    Node.prototype.searchNode = function(node, nodeList){
        for(var i = 0; i < nodeList.length; i++){
            if(nodeList[i].id === node.id){
                return i;
            }
        }
        return -1;
    };

    /**
    * @id hasChildNodes
    */
    Node.prototype.hasChildNodes = function(){
        return this.__childNodes.length > 0;
    };

    /**
    * @id cloneNode
    */
    Node.prototype.cloneNode = function(deep, document){
        var newNode = this.clone();
        if(newNode.nodeType === DOCUMENT_NODE){
            document = newNode;
        }
        newNode.nodeType = this.nodeType;
        newNode.__nodeName = this.__nodeName;
        newNode.localName = this.localName;
        if(deep || this.nodeType === ATTRIBUTE_NODE){
            for(var i = 0; i < this.__childNodes.length; i++){
                var clone = this.__childNodes[i].cloneNode(deep, document);
                newNode.appendChild(clone);
            }
        }
        if(this.nodeType === ELEMENT_NODE && this.attributes){
            for(var i = 0; i < this.attributes.length; i++){
                var clone = this.attributes.item(i).cloneNode(deep, document);
                newNode.setAttributeNode(clone);
            }
        } 
        //newNode.attributes = this.attributes;
        newNode.namespaceURI = this.namespaceURI;
        newNode.prefix = this.prefix;
        if(document){
            newNode.ownerDocument = document;
        }
        return newNode;
    };

    /**
    * @id is_readonly
    */
    Node.prototype.is_readonly = function(){
        var readonly = false;
        if(this.nodeType === ENTITY_REFERENCE_NODE){
            readonly = true;
        }else if(this.parentNode === null){
            if(this.nodeType === ATTRIBUTE_NODE){
                //for the attribute we need to check if the element containing it is readonly.
                readonly = this.ownerElement && this.ownerElement.is_readonly();
            }
        }else{
            if(this.parentNode.nodeType === ENTITY_NODE || this.parentNode.nodeType === ENTITY_REFERENCE_NODE){
                readonly = true;
            }else{
                readonly = this.parentNode.is_readonly();
            }
        }
        return readonly;
    };

    /**
    * @id normalize
    */
    Node.prototype.normalize = function(){
        for (var i = 0; i<this.__childNodes.length;i++) {
          if (i>0) {
            var child = this.__childNodes[i];
            var prevChild = this.__childNodes[i-1];

            if (child.nodeType === TEXT_NODE &&
                prevChild.nodeType === TEXT_NODE){
              // remove the child and decrement i
              prevChild.appendData(child._data);

              this.removeChild(child);
              i--;
            }
          }
          this.__childNodes[i].normalize();
        }
    };

    //AUXILIARY FUNCTIONS

    /*
    * @id insertChild
    */
    function insertChild(parent, newChild, refChild){
        if(parent.nodeType === DOCUMENT_NODE && newChild.nodeType === ELEMENT_NODE){
            parent.documentElement = newChild;
            if(parent.doctype){
                parent.doctype.name = newChild.tagName;
            }
        }
        newChild.parentNode = parent;
        if(parent.searchNode(newChild, parent.__childNodes) > -1){
            parent.removeChild(newChild);
        }
        if(refChild === null){
            parent.__childNodes.push(newChild); 
            return newChild;
        }else{var i = parent.searchNode(refChild, parent.__childNodes);
            if(i === -1){
                throw new DOMException.DOMException(8);     
            }else{
                parent.__childNodes.splice(i, 0, newChild);
                return newChild;
            }
        }
    };

    /*
    * @id validHierarchy
    */
    function validHierarchy(node, newChild){
        var childType = newChild.nodeType;
        var allowed = [ELEMENT_NODE, PROCESSING_INSTRUCTION_NODE, COMMENT_NODE, TEXT_NODE, CDATA_SECTION_NODE, ENTITY_REFERENCE_NODE, DOCUMENT_FRAGMENT_NODE];
        var result = false;
        switch(node.nodeType){
            case ELEMENT_NODE: case DOCUMENT_FRAGMENT_NODE: case ENTITY_REFERENCE_NODE: case ENTITY_NODE:
                result = (allowed.indexOf(childType) >= 0);
                break;
            case ATTRIBUTE_NODE:
                result = (childType === TEXT_NODE || childType === ENTITY_REFERENCE_NODE || childType === DOCUMENT_FRAGMENT_NODE);
                break;
            case DOCUMENT_NODE:
                if(childType === ELEMENT_NODE){
                    result = (node.documentElement === null);
                }else{
                    result = (childType === PROCESSING_INSTRUCTION_NODE || childType === COMMENT_NODE || childType === DOCUMENT_TYPE_NODE || childType === DOCUMENT_FRAGMENT_NODE);
                }
                break;
            default:
                result = false;
        }
        return result;
    }

    /*
    * @id checkChildValidity
    */
    function checkChildValidity(node, newChild){
        if(!validHierarchy(node, newChild) || nodeAncestor(node, newChild)){
            throw new DOMException.DOMException(3);
        }
        if(node.is_readonly()){
            throw new DOMException.DOMException(7);
        }
        if(node.ownerDocument && newChild.ownerDocument && !node.ownerDocument.isSameDocument(newChild.ownerDocument)){
            throw new DOMException.DOMException(4);
        }
    }

    /*
    * @id nodeAncestor
    */
    var nodeAncestor = function(node, ancestor){
        if(node === null){
            return false;
        }else{
            return ((node.id === ancestor.id) || nodeAncestor(node.parentNode, ancestor));
        }
    };

    return {
            'Node': Node, 
            'ELEMENT_NODE': ELEMENT_NODE, 
            'ATTRIBUTE_NODE': ATTRIBUTE_NODE, 
            'TEXT_NODE': TEXT_NODE, 
            'CDATA_SECTION_NODE': CDATA_SECTION_NODE, 
            'ENTITY_REFERENCE_NODE': ENTITY_REFERENCE_NODE,
            'ENTITY_NODE': ENTITY_NODE,
            'PROCESSING_INSTRUCTION_NODE': PROCESSING_INSTRUCTION_NODE,
            'COMMENT_NODE': COMMENT_NODE,
            'DOCUMENT_NODE': DOCUMENT_NODE,
            'DOCUMENT_TYPE_NODE': DOCUMENT_TYPE_NODE,
            'DOCUMENT_FRAGMENT_NODE': DOCUMENT_FRAGMENT_NODE,
            'NOTATION_NODE': NOTATION_NODE 
        };
};
