/**************************/
/* INTERFACE DOMException */
/**************************/


/*
* @id DOMException
*/
export function DOMException(code){
  this.code = code;        
};

export const INDEX_SIZE_ERR               = 1;
export const DOMSTRING_SIZE_ERR           = 2; 
export const HIERARCHY_REQUEST_ERR        = 3; 
export const WRONG_DOCUMENT_ERR           = 4;
export const INVALID_CHARACTER_ERR        = 5;
export const NO_DATA_ALLOWED_ERR          = 6; 
export const NO_MODIFICATION_ALLOWED_ERR  = 7;
export const NOT_FOUND_ERR                = 8;
export const NOT_SUPPORTED_ERR            = 9; 
export const INUSE_ATTRIBUTE_ERR          = 10;  
export const INVALID_STATE_ERR            = 11; 
