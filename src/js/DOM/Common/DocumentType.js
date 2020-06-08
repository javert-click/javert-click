/***************************/
/* INTERFACE DocumentType  */
/***************************/

//const Node = require ('./Node');
//const NamedNodeMap = require ('./NamedNodeMap');

/*
 * @id initDocumentType 
 */
var initDocumentType = function(Node){
    
    /**
     * @id DocumentType
     */
     var DocumentType = function(){
        Node.Node.call(this);
        this.name = null;
        this.entities = null;
        this.notations = null;
        this.nodeType = Node.DOCUMENT_TYPE_NODE;
     }

    DocumentType.prototype = Object.create(Node.Node.prototype);

    Object.defineProperty(DocumentType.prototype, 'content', {
            /*
            * @id DocumentTypeContentGet
            */
            get: function(){
                if(this.name === 'html'){
                        return "text/"+this.name;
                }else{
                        return "text/xml";
                }
                    
            }
    }); 

    Object.defineProperty(DocumentType.prototype, 'nodeName', {
            /*
            * @id DocumentTypeNodeNameGet
            */
            get: function(){
                return this.name;       
            }
    });

    return {'DocumentType': DocumentType};

};

module.exports = initDocumentType;