/**********************/
/* INTERFACE Element  */
/**********************/
//const Node = require ('./Node.js');
//const Attribute = require('./Attribute.js');
//const LiveNodeList = require('./LiveNodeList.js');
//const NamedNodeMap = require('./NamedNodeMap');
//const DOMException = require('./DOMException');

/*
* @id initElement
*/
var initElement = function(Node, Attribute, LiveNodeList, NamedNodeMap, DOMException){
    /**
     * @id Element
     */
    var Element = function (tagName, document){
        Node.Node.call(this);
        this.tagName = tagName;
        this.nodeName = tagName;
        this.nodeType = Node.ELEMENT_NODE;
        this.ownerDocument = document;
        this.defaultAttrs = [];
        this.attributes = null
        this.schemaTypeInfo = null;
        this.shadowRoot = null;
    };

    Element.prototype = Object.create(Node.Node.prototype);

    /**
    * @id ElementGetElementsByTagName
    */
    Element.prototype.getElementsByTagName = function (name){
        var elem = this; 
        /**
        * @id ElementGetElementsByTagNameCompute
        */
        var compute = (function () {
            var result = [];  
            for(var k = 0; k < elem.childNodes.length; k++){
                var listRes = elementsByTagName(elem.childNodes.item(k), name, []);
                for(var j = 0; j < listRes.length; j++){
                    result.push(listRes[j]);
                }
            }
            return result; 
        }); 
        var list = new LiveNodeList.LiveNodeList(compute, true); 
        // add nl to the observers of all the children of elem 
        return list; 
    };

    /**
    * @id ElementGetAttribute
    */
    Element.prototype.getAttribute = function (name){
        if(this.attributes){
            for(var i = 0; i < this.attributes.length; i++){
                if(this.attributes.item(i).name === name){
                    return this.attributes.item(i).value;
                } 
            }
        }
        return "";
    };

    /**
    * @id ElementGetAttributeNode
    */
    Element.prototype.getAttributeNode = function (name){
        if(this.attributes){
           for(var i = 0; i < this.attributes.length; i++){
                if(this.attributes.item(i).name === name){
                    return this.attributes.item(i);
                } 
            } 
        }
        return null;
    };

    /**
    * @id ElementSetAttribute
    */
    Element.prototype.setAttribute = function (name, value){
        if(this.is_readonly()){
                throw new DOMException.DOMException(7);
        }
        /*if(!name || !name.length || name.match(attrRegExp)){
            throw new DOMException.DOMException(5);
        }*/
        if(!this.attributes){
            this.attributes = new NamedNodeMap.NamedNodeMap(this.ownerDocument, this);
        }
        var attribute = this.getAttributeNode(name);
        if(attribute != null){
            attribute.nodeValue = value;
        }else{
            attribute = this.ownerDocument.createAttribute(name);
            var text = this.ownerDocument.createTextNode(value);
            attribute.appendChild(text);
            //attribute.value = value;
            //if(name === "id"){
            //    attribute.isId = true;
            //}
            this.attributes.setNamedItem(attribute);
            attribute.ownerElement = this;
        }
        attribute.specified = true;
    };

    /**
    * @id ElementSetAttributeNode
    */
    Element.prototype.setAttributeNode = function(newAttr){
        if(this.is_readonly()){
            throw new DOMException.DOMException(7);
        }
        if(!this.attributes){
            this.attributes = new NamedNodeMap.NamedNodeMap(this.ownerDocument, this);
        }
        var existing = this.getAttributeNode(newAttr.name);
        this.attributes.setNamedItem(newAttr);
        newAttr.ownerElement = this;
        return existing;
    };

    /**
    * @id ElementRemoveAttribute
    */
    Element.prototype.removeAttribute = function(name){
        if(this.is_readonly()){
            throw new DOMException.DOMException(7);
        }
        this.attributes.removeNamedItem(name);
    };

    /**
    * @id ElementRemoveAttributeNode
    */
    Element.prototype.removeAttributeNode = function(oldAttr){
        if(this.is_readonly()){
            throw new DOMException.DOMException(7);
        }
        if(!this.attributes.searchItemById(oldAttr)){
            throw new DOMException.DOMException(8);
        }
        var attr = this.attributes.removeNamedItem(oldAttr.nodeName);
        return attr;
    };

    /**
    * @id ElementNormalize
    */
    Element.prototype.normalize = function(){
        if(this.attributes){
            for(var j = 0; j < this.attributes.length; j++){
                this.attributes.item(j).normalize();
            }
        }
        Node.Node.prototype.normalize.call(this);
    };

    /**
    * @id ElementSetDefaultAttributes
    */
    Element.prototype.setDefaultAttributes = function(defaultAttributes){
        for(var i = 0; i < defaultAttributes.length; i++){
            if(defaultAttributes[i].elem === this.nodeName){
                 this.defaultAttrs.push(defaultAttributes[i]);
                 var DOMattr = this.ownerDocument.createAttribute(defaultAttributes[i].name);
                 DOMattr.value = defaultAttributes[i].value;
                 DOMattr.specified = false;
                 this.setAttributeNode(DOMattr);   
            }
        }
    }

    /*
    * @id ElementClone
    */
    Element.prototype.clone = function(){
        return new Element(this.tagName, null);
    };

    /**
    * @id elementsByTagName
    */
    function elementsByTagName (node, name, acc){
        var childNodes = node.childNodes;
        if(node.tagName === name || (name === "*" && node.nodeType === Node.ELEMENT_NODE)){
            acc.push(node);
        }
        if(childNodes !== null){
            for(var i = 0; i < childNodes.length; i++){
                elementsByTagName(childNodes.item(i), name, acc);
            }
        }
        return acc;
    };

    return {'Element': Element};
};



//exports.Element = Element;