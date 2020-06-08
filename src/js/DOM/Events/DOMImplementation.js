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
var initDOMImplementation = function(HTMLDocument, XMLDocument, DocumentType, HTMLElement, Text){
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

	/*
	* @id DOMImplementationCreateHTMLDocument
	*/
	DOMImplementation.prototype.createHTMLDocument = function(title){
		//1. Let doc be a new document that is an HTML document.
		var doc = new HTMLDocument.HTMLDocument();
		//2. Set doc’s content type to "text/html".
		doc.contentType = "text/html";
		//3. Append a new doctype, with "html" as its name and with its node document set to doc, to doc.
		var docType = new DocumentType.DocumentType();
		docType.name = "html";
		doc.doctype = docType;
		//4. Append the result of creating an element given doc, html, and the HTML namespace, to doc.
		var htmlElem = new HTMLElement.HTMLElement("html", doc);
		doc.appendChild(htmlElem);
		//5. Append the result of creating an element given doc, head, and the HTML namespace, to the html element created earlier.
		var headElem = new HTMLElement.HTMLElement("head", doc);
		htmlElem.appendChild(headElem);
		doc.head = headElem;
		//6. If title is given:
		if(title){
			//6.1. Append the result of creating an element given doc, title, and the HTML namespace, to the head element created earlier.
			var titleElem = new HTMLElement.HTMLElement("title", doc);
			headElem.appendChild(titleElem);
			//6.2. Append a new Text node, with its data set to title (which could be the empty string) and its node document set to doc, to the title element created earlier.
			var titleText = new Text.Text(title, doc);
			titleElem.appendChild(titleText);
		}
		//7. Append the result of creating an element given doc, body, and the HTML namespace, to the html element created earlier.
		var bodyElem = new HTMLElement.HTMLElement("body", doc);
		doc.body = bodyElem;
		htmlElem.appendChild(bodyElem);
		//8. doc’s origin is context object’s associated document’s origin.
		//9. Return doc. 
		return doc;
	};

	/*
	* @id DOMImplementationCreateDocument
	*/
	DOMImplementation.prototype.createDocument = function(namespaceURI, qualifiedNameStr, documentType){
		var document = new XMLDocument.XMLDocument();
		document.name = qualifiedNameStr;
		document.namespaceURI = namespaceURI;
		document.docType = documentType;
		return document;
	};

	return {'DOMImplementation': DOMImplementation};
};

module.exports = initDOMImplementation;