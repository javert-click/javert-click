/**************************/
/* INTERFACE DOMException */
/**************************/

/*
* @id initDOMException
*/
var initDOMException = function(){

    /*
    * @id DOMException
    */
    var DOMException = function(code){
        this.code = code;        
    };

    const INDEX_SIZE_ERR               = 1;
    const DOMSTRING_SIZE_ERR           = 2; 
    const HIERARCHY_REQUEST_ERR        = 3; 
    const WRONG_DOCUMENT_ERR           = 4;
    const INVALID_CHARACTER_ERR        = 5;
    const NO_DATA_ALLOWED_ERR          = 6; 
    const NO_MODIFICATION_ALLOWED_ERR  = 7;
    const NOT_FOUND_ERR                = 8;
    const NOT_SUPPORTED_ERR            = 9; 
    const INUSE_ATTRIBUTE_ERR          = 10;  
    const INVALID_STATE_ERR            = 11; 

    return {'DOMException': DOMException, 
            'INDEX_SIZE_ERR': INDEX_SIZE_ERR,
            'DOMSTRING_SIZE_ERR': DOMSTRING_SIZE_ERR,
            'HIERARCHY_REQUEST_ERR': HIERARCHY_REQUEST_ERR,
            'WRONG_DOCUMENT_ERR': WRONG_DOCUMENT_ERR,
            'INVALID_CHARACTER_ERR': INVALID_CHARACTER_ERR,
            'NO_DATA_ALLOWED_ERR': NO_DATA_ALLOWED_ERR,
            'NO_MODIFICATION_ALLOWED_ERR': NO_MODIFICATION_ALLOWED_ERR,
            'NOT_FOUND_ERR': NOT_FOUND_ERR,
            'NOT_SUPPORTED_ERR': NOT_SUPPORTED_ERR,
            'INUSE_ATTRIBUTE_ERR': INUSE_ATTRIBUTE_ERR,
            'INVALID_STATE_ERR': INVALID_STATE_ERR};
};

module.exports = initDOMException;
