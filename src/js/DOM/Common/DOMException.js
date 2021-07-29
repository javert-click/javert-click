/**************************/
/* INTERFACE DOMException */
/**************************/

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
const SYNTAX_ERR                   = 12;
const DATA_CLONE_ERR               = 25;

/*
* @id DOMException
*/
function DOMException(code){
  this.code = code;   
  this.DATA_CLONE_ERR = DATA_CLONE_ERR; 
};

exports.DOMException                = DOMException;
exports.INDEX_SIZE_ERR              = INDEX_SIZE_ERR;
exports.DOMSTRING_SIZE_ERR          = DOMSTRING_SIZE_ERR;
exports.HIERARCHY_REQUEST_ERR       = HIERARCHY_REQUEST_ERR;
exports.WRONG_DOCUMENT_ERR          = WRONG_DOCUMENT_ERR;
exports.INVALID_CHARACTER_ERR       = INVALID_CHARACTER_ERR;
exports.NO_DATA_ALLOWED_ERR         = NO_DATA_ALLOWED_ERR;
exports.NO_MODIFICATION_ALLOWED_ERR = NO_MODIFICATION_ALLOWED_ERR;
exports.NOT_FOUND_ERR               = NOT_FOUND_ERR;
exports.NOT_SUPPORTED_ERR           = NOT_SUPPORTED_ERR;
exports.INUSE_ATTRIBUTE_ERR         = INUSE_ATTRIBUTE_ERR;
exports.INVALID_STATE_ERR           = INVALID_STATE_ERR;
exports.DATA_CLONE_ERR              = DATA_CLONE_ERR;
exports.SYNTAX_ERR                  = SYNTAX_ERR;
