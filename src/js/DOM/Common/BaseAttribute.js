/************************/
/* INTERFACE Attribute  */
/************************/

const DOMException = require('./DOMException');

/*
* This API works with multiple versions of Node and Text (Core Level 1 and 3)
* @id initAttribute
*/
function initAttribute(Node, Text){

    /**
     * @id Attribute
     */
    var Attribute = function (name, document){
        Node.Node.call(this);
        this.nodeName = name;
        this.name = name;
        this.nodeType = Node.ATTRIBUTE_NODE;
        this._value = "";
        this.ownerDocument = document;
        this.setValue = false;

        this.ownerElement = null;
        this.schemaTypeInfo = null;
        this.isId = false;
        this.specified = true;

        Object.defineProperty(this, 'value', {
            /**
            * @id attributeValueGet 
            */
            get: function(){return this.nodeValue;},
            
            /**
            * @id attributeValueSet
            */
            set: function(value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.nodeValue = value;
            }
        });

        Object.defineProperty(this, 'nodeValue', {
            /**
            * @id attributeNodeValueGet
            */
            get: function(){
                if(this.setValue){
                    return this._value;
                }else{
                    var value = "";
                    for(var i = 0; i < this.childNodes.length; i++){
                        var child = this.childNodes.item(i);
                        if(child.nodeType === Node.ENTITY_REFERENCE_NODE){
                            for(var j = 0; j < child.entity.childNodes.length; j++){
                                value += child.entity.childNodes.item(j).nodeValue;
                            }
                        }else{
                            value += child.data;
                        }
                }
                return value;
                }
            },
            /**
            * @id attributeNodeValueSet
            */
            set: function (value){
                if(this.is_readonly()){
                    throw new DOMException.DOMException(7);
                }
                this.setValue = true;
                this._value = value;
                var text = new Text.Text(value, this.ownerDocument);
                this.appendChild(text);
        }
        });

    };
    Attribute.prototype = Object.create(Node.Node.prototype);    

    /*
    * @id AttributeClone
    */
    Attribute.prototype.clone = function(){
        var newNode = new Attribute(this.name, null);
        newNode.nodeValue = this.nodeValue;
        return newNode;
    };

    return {'Attribute': Attribute};
}

exports.initAttribute = initAttribute;