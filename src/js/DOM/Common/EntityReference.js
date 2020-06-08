/******************************/
/* INTERFACE EntityReference  */
/******************************/

//const Node = require('./Node')

/**
 * @id initEntityReference
 */
var initEntityReference = function(Node){
    
    /**
     * @id EntityReference
     */
    var EntityReference = function(name, entity, document){
        Node.Node.call(this);
        this.name = name;
        this.entity = entity;
        this.nodeType = Node.ENTITY_REFERENCE_NODE;
        this.ownerDocument = document;
    };

    EntityReference.prototype = Object.create(Node.Node.prototype);

    /*
    * @id EntityReferenceClone
    */
    EntityReference.prototype.clone = function(){
        return new EntityReference(this.name, this.entity, null);
    }

    Object.defineProperty(EntityReference.prototype, 'nodeName', {
        /*
        * @id EntityReferenceNodeNameGet
        */
        get: function(){
            return this.name;
        }
    });

    /*
    * The children of the entity reference are actually the entity children. 
    * This is why the firstChild, lastChild and childNodes properties are redefined.
    */
    Object.defineProperty(EntityReference.prototype, 'firstChild', {
        /*
        * @id EntityReferenceFirstChildGet
        */
        get: function(){
            return this.entity.firstChild || null;
        }
    });

    Object.defineProperty(EntityReference.prototype, 'lastChild', {
        /*
        * @id EntityReferenceLastChildGet
        */
        get: function(){
            return this.entity.lastChild || null;
        }
    });

    Object.defineProperty(EntityReference.prototype, 'childNodes', {
        /*
        * @id EntityReferenceChildNodesGet
        */
        get: function(){
            return this.entity.childNodes || null;
        }
    });

    return {'EntityReference': EntityReference};
};


module.exports = initEntityReference