/********************************/
/* INTERFACE DOMImplementation  */
/********************************/

//const HTMLDocument = require('./HTMLDocument');
//const DocumentType = require('./DocumentType');
//const HTMLElement  = require('./HTMLElement'); 
//const Text         = require('./Text');

/*
* @id initDOMImplementation
*/
var initDOMImplementation = function(HTMLDocument, DocumentType, HTMLElement, Text){
	/**
	 * @id DOMImplementation
	 */
	var DOMImplementation = function (){
	    this.features = [];
	    this.features['xml']  = ['1.0'];
	    this.features['XML']  = [null, '1.0'];
	    this.features['HTML'] = [null, '1.0'];
	    this.features['html'] = ['1.0'];
	};

	/*
	* @id DOMImplementationHasFeature
	*/
	DOMImplementation.prototype.hasFeature = function(feature, version){
		if(version === ""){
			return (this.features[feature] !== undefined);
		}else{
			var found = false;
			for(var i = 0; i < this.features[feature].length; i++){
				if(this.features[feature][i] === version){
					found = true;
				}
			}
			return found;
		}
	};

	return {'DOMImplementation': DOMImplementation};
};


//exports.DOMImplementation = DOMImplementation;