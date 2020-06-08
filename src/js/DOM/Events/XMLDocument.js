/**********************/
/* INTERFACE XMLDocument */
/**********************/

//const Document    = require ('./Document');
//const HTMLElement = require('./HTMLElement');
//const InputElement= require('./InputElement');
//const FormElement = require('./FormElement');

/*
* @id initXMLDocument
*/
var initXMLDocument = function(Document){
    /**
     * @id XMLDocument
     */   
    var XMLDocument = function (){
        Document.Document.call(this);
    };

    XMLDocument.prototype = Object.create(Document.Document.prototype);

    return {'XMLDocument': XMLDocument};
};

module.exports = initXMLDocument