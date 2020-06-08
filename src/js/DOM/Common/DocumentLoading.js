/*
* @id initDocumentLoading
*/
function initDocumentLoading(DOM, HTMLFiles) {
	
	/*
	* @id loadDocument
	*/
	function loadDocument(file) {
		var ext = file.substring(file.lastIndexOf('.') + 1);
		var is_xml =  ext === "xml";
		var document;
		var jsonxml;
		if(is_xml || !DOM.HTMLDocument){
			document = new DOM.Document.Document();
			document.implementation = new DOM.DOMImplementation.DOMImplementation();
		}else{
			//Document is HTML
			document = new DOM.HTMLDocument.HTMLDocument();
			document.implementation = new DOM.DOMImplementation.DOMImplementation();
		}
		jsonxml = HTMLFiles.getJSON(file);
		var defaultAttributes = [];
		document.doctype = null;
		if(jsonxml.declaration){
			document.doctype = new DOM.DocumentType.DocumentType();
			document.doctype.name = ext;
			if(is_xml){
				if(jsonxml.declaration.dtd){
					defaultAttributes = getDefaultAttrs(jsonxml.declaration.dtd);
					document.defaultAttributes = defaultAttributes
				}
				createDOMNotations(jsonxml, document);
				createDOMEntities(jsonxml, document);
			}
		}
		parseJSON2DOM(document, document, jsonxml, defaultAttributes);
		return document;
	}

	/*
	* @id getDefaultAttrs
	*/
	function getDefaultAttrs(dtdjson){
		var defaultAttrs = [];
		if(dtdjson){
				DOM.ArrayUtils.map(dtdjson, 
					/*
					* @id getDefaultAttrsMapDtdJSON
					*/
					function(d) {
					DOM.ArrayUtils.map(d.attributes, 
						/*
						* @id getDefaultAttrsPushAttr
						*/
						function(a){
						if(a.default){
							defaultAttrs.push({
								name: a.attr_name,
								value: a.default,
								elem:  a.elem
							})
						}
					});    
				});
		}
		return defaultAttrs;
	}

	/*
	* @id parseJSON2DOM
	*/
	function parseJSON2DOM(document, parent, doc, defaultAttrs) {

		for (var i = 0; i < doc.elements.length; i++) {
			var DOMchildren = parseJSONElement2DOM(document, doc.elements[i], defaultAttrs);
			if (DOMchildren !== null) {
				for (var j = 0; j < DOMchildren.length; j++) {
					parent.appendChild(DOMchildren[j]);
				}
			}
		}
	}

	/*
	* @id parseJSON2DOMElements
	*/
	function parseJSON2DOMElements(document, doc, defaultAttrs) {
		var res = [];
		for (var i = 0; i < doc.elements.length; i++) {
			var DOMchildren = parseJSONElement2DOM(document, doc.elements[i], defaultAttrs);
			if (DOMchildren !== null) {
				for (var j = 0; j < DOMchildren.length; j++) {
					res.push(DOMchildren[j]);
				}
			}
		}
		return res;
	}

	/*
	* @id createDOMNotations
	*/
	function createDOMNotations(jsonxml, document) {
		document.doctype.notations = new DOM.NamedNodeMap.NamedNodeMap(document);
		for (var i = 0; i < jsonxml.declaration.notations.length; i++) {
			var notation = jsonxml.declaration.notations[i];
			var DOMnotation = new DOM.Notation.Notation(notation.not_name, document);
			if (notation.visibility === "PUBLIC") {
				DOMnotation.publicId = notation.value;
			} else if (notation.visibility === "SYSTEM") {
				DOMnotation.systemId = notation.value;
			}
			document.doctype.notations.setNamedItem(DOMnotation);
		}
	}

	/*
	* @id createDOMEntities
	*/
	function createDOMEntities(jsonxml, document) {
		document.doctype.entities = new DOM.NamedNodeMap.NamedNodeMap(document);
		for (var i = 0; i < jsonxml.declaration.entities.length; i++) {
			var entity = jsonxml.declaration.entities[i];
			if (!document.doctype.entities || !document.doctype.entities.getNamedItem(entity.ent_name)) {
				var DOMentity = new DOM.Entity.Entity(entity.ent_name, document);
				if (entity.public) {
					DOMentity.publicId = entity.public_id;
					DOMentity.systemId = entity.systemId;
				}
				var entityElements = entity.value;
				parseJSON2DOM(document, DOMentity, entityElements, []);
				if (entity.ndata) {
					DOMentity.notationName = entity.link;
				}
				document.doctype.entities.setNamedItem(DOMentity);
			}
		}
	}

	/*
	* @id createDOMElement
	*/
	function createDOMElement(jsonElement, document, defaultAttrs) {
		var name = jsonElement.name;
		var attrs = jsonElement.attributes;
		var DOMelement = document.createElement(name);
		if (document.isHTML()) {
			//DOMelement = new DOM.HTMLElement(name, document);
			switch (name) {
				case "head":
					document.head = DOMelement;
					break;
				case "body":
					document.body = DOMelement;
					break;
			}
		}
		if (attrs) {
			for (var i = 0; i < attrs.length; i++) {
				var attribute = attrs[i];
				if (!document.isHTML()) {
					var DOMattr = document.createAttribute(attribute.name);
					var attrChildren = attribute.elements;
					if (attrChildren && attrChildren.length > 0) {
						for (var j = 0; j < attrChildren.length; j++) {
							var attrChild = attrChildren[j];
							var DOMAttrChildren = parseJSONElement2DOM(document, attrChild, defaultAttrs);
							for (var k = 0; k < DOMAttrChildren.length; k++) {
								DOMattr.appendChild(DOMAttrChildren[k]);
							}
						}
						DOMelement.setAttributeNode(DOMattr);
					} else {
						DOMelement.setAttribute(attribute.name, attribute.value);
					}
				} else {
					//attrValue = replaceHTMLEntities(attribute.value);
					DOMelement.setAttribute(attribute.name, attribute.value);
				}
			}
		}
		if (jsonElement.elements) {
			for (var i = 0; i < jsonElement.elements.length; i++) {
				var e = jsonElement.elements[i];
				var DOMchildren = parseJSONElement2DOM(document, e, defaultAttrs);
				for (var j = 0; j < DOMchildren.length; j++) {
					DOMelement.appendChild(DOMchildren[j]);
				}
			}
		}
		return DOMelement;
	}

	/*
	* @id createDOMTextNodes
	*/
	function createDOMTextNodes(jsonText, document) {
		var data = jsonText.text;
		if (!document.isHTML()) {
			var entRefs = jsonText.elements;
			if (entRefs) {
				var nodes = [];
				for (var i = 0; i < entRefs.length; i++) {
					nodes.push(parseJSONElement2DOM(document, entRefs[i], []))
				}
				return nodes;
			} else {
				var DOMtext = document.createTextNode(data);
				return [DOMtext];
			}
		} else {
			//data = replaceHTMLEntities(data);
			var DOMtext = document.createTextNode(data);
			return [DOMtext];
		}
	}

	/*
	* @id createDOMComment
	*/
	function createDOMComment(jsonComment, document) {
		var data = jsonComment.comment;
		var DOMcomment = document.createComment(data);
		return DOMcomment;
	}

	/*
	* @id createDOMInstruction
	*/
	function createDOMInstruction(jsonInstruction, document) {
		var target = jsonInstruction.name;
		var data = jsonInstruction.instruction;
		var DOMinstruction = document.createProcessingInstruction(target, data, document);
		return DOMinstruction;
	}

	/*
	* @id createDOMCDATA
	*/
	function createDOMCDATA(jsonCDATA, document) {
		var data = jsonCDATA.cdata;
		var DOMcdata = document.createCDATASection(data);
		return DOMcdata;
	}

	/*
	* @id createEntityReference
	*/
	function createEntityReference(jsonEntityRef, document) {
		var name = jsonEntityRef.name;
		var DOMEntityRef = document.createEntityReference(name, document);
		return DOMEntityRef;
	}

	/*
	* @id parseJSONElement2DOM
	*/
	function parseJSONElement2DOM(document, element, defaultAttrs) {
		switch (element.type) {
			case "element":
				return [createDOMElement(element, document, defaultAttrs)];

			case "text":
				return createDOMTextNodes(element, document);

			case "comment":
				return [createDOMComment(element, document)];

			case "instruction":
				return [createDOMInstruction(element, document)];

			case "cdata":
				return [createDOMCDATA(element, document)];

			case "entityreference":
				return [createEntityReference(element, document)];

			default:
				return null;
		}
	}

	return { "loadDocument": loadDocument, "parseJSON2DOMElements": parseJSON2DOMElements };
}

module.exports = initDocumentLoading;
