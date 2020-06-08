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
var initElement = function(Node, Attribute, LiveNodeList, NamedNodeMap, DOMException, Event, StringUtils, CSSStyleDeclaration, DOMRect){
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
        //this.shadowRoot = null;
    };

    Element.prototype = Object.create(Node.Node.prototype);

    /**
    * @id ElementGetElementsByTagName
    */
    Element.prototype.getElementsByTagName = function (name){
        var elem = this; 
        var result = [];  
        for(var k = 0; k < elem.childNodes.length; k++){
            var listRes = elementsByTagName(elem.childNodes.item(k), name, []);
            for(var j = 0; j < listRes.length; j++){
                result.push(listRes[j]);
            }
        }
        return result; 
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
        return null;
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
    * @id ElementHasAttribute
    */
    Element.prototype.hasAttribute = function (name){
        for(var i = 0; i < this.attributes.length; i++){
            if(this.attributes.item(i).name === name){
                return true;
            } 
        }
        return false;
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
        if(name === "class" && this.classList){
            if(value){
                this.classList.add(value);
            }else{
                this.classList.removeAll();
            }
        }
        if(name === "style"){
            this.style = computeStyle(value, this);
        }
        if(name === "checked" && this.checked !== undefined){
            this.checked = true;
        }
        if(attribute != null){
            attribute.nodeValue = value;
        }else{
            attribute = this.ownerDocument.createAttribute(name);
            var text = this.ownerDocument.createTextNode(value);
            attribute.appendChild(text);
            //attribute.value = value;
            if(name === "id"){
                attribute.isId = true;
            }
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

    /*
    * @id ElementAttachShadow
    */
    Element.prototype.attachShadow = function(init){
        //The attachShadow(init) method, when invoked, must run these steps:
        //If context object’s namespace is not the HTML namespace, then throw a "NotSupportedError" DOMException.
        throw new DOMException.DOMException(9);
    };


    /*
    * @id ElementFocus
    */
   Element.prototype.focus = function(options){
        //The relatedTarget should be initialized to the element losing focus (in the case of a focus or focusin event) or the element gaining focus (in the case of a blur or focusout event).
        var focusEvent = new Event.Event("focus");
        focusEvent.bubbles = true;
        focusEvent.relatedTarget = this.ownerDocument.activeElement;
        this.ownerDocument.activeElement = this;
        this.dispatchEvent(focusEvent);
   };

    /*
    * @id ElementBlur
    */
    Element.prototype.blur = function(options){
        var blurEvent = new Event.Event("blur");
        blurEvent.bubbles = true;
        this.ownerDocument.activeElement = this;
        this.dispatchEvent(blurEvent);
    };

    Element.prototype.getBoundingClientRect = function(){
        var rect = new DOMRect.DOMRect();
        rect.height = Number(this.style.height.substring(0, this.style.height.length -2));
        rect.width = Number(this.style.width.substring(0, this.style.width.length -2));
        return rect;
    };

       
    Object.defineProperty(Element.prototype, "ontransitionstart", {
        set: function(hdlr){
            this.addEventListener('transitionstart', hdlr)
        }
    }); 

    
    Object.defineProperty(Element.prototype, "ontransitioncancel", {
        set: function(hdlr){
            this.addEventListener('transitioncancel', hdlr)
        }
    }); 
    

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

    function computeStyle(cssPropValue, node){
        var style = new CSSStyleDeclaration.CSSStyleDeclaration(node);
        if(cssPropValue){
            var propsValues = StringUtils.split(cssPropValue, ";");
            for(var i = 0; i < propsValues.length; i++){
                if(propsValues[i]){
                    var propVal = StringUtils.split(propsValues[i], ":");
                    var prop = StringUtils.removeWhiteSpaces(propVal[0]);
                    var val = StringUtils.removeWhiteSpaces(propVal[1]);
                    style[prop] = val;
                }
            }
        }
        return style;
    }



    return {'Element': Element};
};

module.exports = initElement;