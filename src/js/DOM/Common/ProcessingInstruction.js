/************************************/
/* INTERFACE ProcessingInstruction  */
/************************************/

//const Node = require('./Node');
//const DOMException = require('./DOMException');

/*
* @id initProcessingInstruction
*/
var initProcessingInstruction = function(Node, DOMException){
    
    /*
    * @id ProcessingInstruction
    */
    var ProcessingInstruction = function(target, data, document){
        Node.Node.call(this);
        this.target = target;
        this._data = data;
        this.nodeType = Node.PROCESSING_INSTRUCTION_NODE;
        this.ownerDocument = document;
    };

    ProcessingInstruction.prototype = Object.create(Node.Node.prototype);

    /*
    * @id ProcessingInstructionClone
    */
    ProcessingInstruction.prototype.clone = function(){
        return new ProcessingInstruction(this.target, this.data, this.ownerDocument);
    }

    Object.defineProperty(ProcessingInstruction.prototype, 'nodeName', {
        /*
        * @id ProcessingInstructionNodeNameGet
        */
        get: function(){
            return this.target;
        }
    });

    Object.defineProperty(ProcessingInstruction.prototype, 'data', {
        /*
        * @id ProcessingInstructionDataSet 
        */
        set: function(value){
            if(this.is_readonly()){
                throw new DOMException.DOMException(7);
            }else{
                this._data = value;
            }
        },

        /*
        * @id ProcessingInstructionDataGet 
        */
        get: function(){
            return this._data;
        }
    });

    Object.defineProperty(ProcessingInstruction.prototype, 'nodeValue', {
        /*
        * @id ProcessingInstructionNodeValueGet
        */
        get: function(){
            return this.data;
        },

        /*
        * @id ProcessingInstructionNodeValueSet 
        */
        set: function(value){
            this.data = value;
        }
    });

    return {'ProcessingInstruction': ProcessingInstruction};
};

module.exports = initProcessingInstruction
