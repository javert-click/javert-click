const convert               = require('xml-js');
var fs                      = require("fs");

const DOM                   = require('../DOMCore/DOM.js');
const ArrayUtils            = require('../DOMCore/utils/ArrayUtils');

const base_examples_dir     = "../InputFiles/";
const html_symbols_json_filename = "../InputFiles/html_symbols.json"

const html_symbols_json = JSON.parse(fs.readFileSync(html_symbols_json_filename).toString('utf-8'));

function parseDTDElements(str){
  var elem_dtd_re = /<!ELEMENT\s*(\w*)\s*\((.*)\)\s*>/;  
  var matches = elem_dtd_re.exec(str);
  return{
    name:          matches[1],
    content_model: matches[2]
  }
}

function parseContentModel(str){
  var content_model_re = /\s*(#PCDATA|\w*)(\s*(\,|\||\?|\+|\*)\s*(#PCDATA|\w*))*(#PCDATA|\w*)?/g;  
  var matches = content_model_re.exec(str);
  return{
    elem1:  matches[1],
    op   :  matches[3],
    elem2:  matches[4]
  }
}

function parseDTDAttrList(attr_list_re, str){
  var matches = attr_list_re.exec(str);
  if(!matches){
    return null;
  }else{
    return{
      ent_name : matches[1],
      attr_data: matches[2]
    }
  }
}

function parseSingleAttr(single_attr_re, str){
  var matches = single_attr_re.exec(str);
  if(!matches){
    return null;
  }else{
    return{
      attr_name   : matches[1],
      attr_type   : matches[2],
      default     : matches[4]
    }
  }
}

function parseDTD(str){
  //parseDTDElements(str);
  var attr_list_re = /<!ATTLIST\s*(\w*)\s*\n*(([^\>])*)\s*>/g; 
  var single_attr_re = /\s*(\w*)\s*(CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS|NOTATION)\s*(#REQUIRED|#IMPLIED|\"(\w*)\"|#FIXED\s*\"(\w*)\")/g;
  var attrs = [];
  var retAttrs = true;
  while(retAttrs){
    retAttrs = parseDTDAttrList(attr_list_re, str);
    if(retAttrs) { 
      attrs.push(retAttrs); 
      var attrdata = retAttrs.attr_data;
      retAttrs.attributes = [];
      var retAttr = true;
      while(retAttr){
        var retAttr = parseSingleAttr(single_attr_re, attrdata);
        if(retAttr) { 
          retAttr.elem = retAttrs.ent_name;
          retAttrs.attributes.push(retAttr); 
        }
      }
    }
  }
  return attrs;
}
 

function parseXMLHeader(str){
  //XML header
  var xml_header_re = /<\?xml\s*version=\"(\S*)\"\?><\?(\S*)\s*(\S*)\?>/;
  var matches = xml_header_re.exec(str);
  return {
      version:      matches[1],
      pi_target:    matches[2],
      pi_data:      matches[3]
  }
}

function parseDocType(str) {
  // DOCTYPE
  var doc_type_re = /<!DOCTYPE\s*(\w*)\n*\s*(\w*)\s*\"([^\""]*)\"\s*\n*(\"([^\""]*)\")?\s*(\[((.|\n)*)\])?\s*>/;  
  var matches = doc_type_re.exec(str);
  if(!matches){
    return null;
  }
  return {
      type:     'DOCTYPE',  
      doc_name: matches[1], 
      system:   matches[2], 
      dtd:      matches[3],
      dtd2:     matches[5],
      meta:     matches[6]
  }
}

function matchEntity(re, str) { 
    var matches = re.exec(str);
    if (!matches) {
      return null
    } else { 
        return { 
            ent_name:  matches[2], 
            public:    matches[3] !== undefined, 
            public_id: matches[4], 
            value:     matches[5],
            ndata:     matches[7] !== undefined, 
            link:      matches[8]
        }    
    }
}

function parseEntities(str) { 
    // ENTITY 
    var entity_re  = /(\n)?<!ENTITY\s*(\S*)\s*(PUBLIC\s*\"(\S*)\")?\s*\"(([^\"])*)\"\s*(NDATA\s*(\S+))?\s*>/g; 
    var rets       = []; 
    var ret        = true; 
    while (ret) { 
      ret = matchEntity(entity_re, str);
      if (ret) { rets.push(ret) } 
    } 
    return rets; 
}

function matchNotation(re, str) { 
    var matches = re.exec(str);
    if (!matches) { 
        return null
    } else { 
        return { 
            not_name:    matches[2], 
            visibility:  matches[3], 
            value:       matches[4]
          }
    }
}

function parseNotations(str) {
   // Notation
   var notation_re = /(\n)?<!NOTATION\s*(\S*)\s*(PUBLIC|SYSTEM)\s*\"(\S*)\"\s*>/g; 
   var rets       = []; 
   var ret        = true; 
   while (ret) { 
     ret = matchNotation(notation_re, str);
     if (ret) { rets.push(ret) } 
   } 
   return rets;
}

function parseMetaXMLInfo (docType, str) { 
    var metadata  = docType.meta; 
    var entities  = parseEntities(metadata); 
    for(var i = 0; i < entities.length; i++){
      var entity = entities[i];
      var xml_fragment_entity = entity.value;
      if(entity.public_id){
        entity.systemId = entity.value;
      }
        try{
            var json_entity = JSON.parse(convert.xml2json(xml_fragment_entity, {compact: false, spaces: 0}));
            entity.value = json_entity;
        } catch(err){
            //entity value is just text
            //var entityText = document.createTextNode(entity.value);
            //DOMentity.insertBefore(entityText, null);
            var entityText = entity.value;
            entity.value = {"elements": [{"type": "text", "text": entityText}]};
        }
    }
    var notations = parseNotations(metadata); 
    docType.entities  = entities; 
    docType.notations = notations;
    //return docType 
}

function parseDocumentStr(filename) { 
  var xml_str = fs.readFileSync(base_examples_dir+filename).toString('utf-8');
  var str = xml_str.replace(/&/g,"&amp;");              
  var document = new DOM.Document();
  var docType   = parseDocType(str); 
  var defaultAttrs = null;
  var jsonxml = convert.xml2json(str, {compact: false, spaces: 0});
  var jsonobj = JSON.parse(jsonxml);
  jsonobj.declaration = docType;
  if(docType){
      var documentType = new DOM.DocumentType();
      document.doctype = documentType;
      var ext = filename.substr(filename.lastIndexOf('.') + 1);
      if(ext === "xml"){
        //meta_xml_info = parseMetaXMLInfo(docType, xml_str); 
        parseMetaXMLInfo(docType, xml_str, jsonobj);
        //createNotations(meta_xml_info, document);
        //createEntities(meta_xml_info, document);
        if(docType.system === "SYSTEM"){
          var dtdname = docType.dtd;
          var dtd_str = fs.readFileSync(base_examples_dir+dtdname).toString('utf-8');
          dtdjson = parseDTD(dtd_str);
          jsonobj.declaration.dtd = dtdjson;
          defaultAttrs = getDefaultAttrs(dtdjson);
          document.defaultAttributes = defaultAttrs;
        }
      }else{
        document.doctype.name = ext;
      }
  }
  //console.log(meta_xml_info.entities);
  
  //console.log(jsonxml.isExtensible())
  //jsonobj.entities = meta_xml_info.entities;
  //jsonobj.notations = meta_xml_info.notations;
  replaceAttributes(jsonobj);
  //console.log(JSON.stringify(jsonobj));
  replaceTextNodes(jsonobj);
  return JSON.stringify(jsonobj).replace(/&amp;/g,"&");
}

function parseDocument(filename) { 
  var xml_str = fs.readFileSync(base_examples_dir+filename).toString('utf-8');
  var str = xml_str.replace(/&/g,"&amp;");              
  var document = new DOM.Document();
  var docType   = parseDocType(str); 
  var defaultAttrs = null;
  if(docType){
      var documentType = new DOM.DocumentType();
      document.doctype = documentType;
      var ext = filename.substr(filename.lastIndexOf('.') + 1);
      if(ext === "xml"){
        var meta_xml_info = parseMetaXMLInfo(docType, xml_str); 
        createNotations(meta_xml_info, document);
        createEntities(meta_xml_info, document);
        if(meta_xml_info.system === "SYSTEM"){
          var dtdname = meta_xml_info.dtd;
          var dtd_str = fs.readFileSync(base_examples_dir+dtdname).toString('utf-8');
          dtdjson = parseDTD(dtd_str);
          defaultAttrs = getDefaultAttrs(dtdjson);
          document.defaultAttributes = defaultAttrs;
        }
      }else{
        document.doctype.name = ext;
      }
  }
  var jsonxml = convert.xml2json(str, {compact: false, spaces: 0});
  parseJSON2DOM(document, document, JSON.parse(jsonxml), defaultAttrs);
  return document;
}


function getDefaultAttrs(dtdjson){
    var defaultAttrs = [];
    if(dtdjson){
            ArrayUtils.map(dtdjson, function(d) {
                ArrayUtils.map(d.attributes, function(a){
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


function createNotations(meta_xml_info, document){
    document.doctype.notations = new DOM.NamedNodeMap(document);
    for(var i = 0; i < meta_xml_info.notations.length; i++){
      var notation = meta_xml_info.notations[i];
      var DOMnotation = new DOM.Notation(notation.not_name, document);
      if(notation.visibility === "PUBLIC"){
          DOMnotation.publicId = notation.value;
      }else if(notation.visibility === "SYSTEM"){
          DOMnotation.systemId = notation.value;
      }
      document.doctype.notations.setNamedItem(DOMnotation);
  }
}

function createEntities(meta_xml_info, document){
    document.doctype.entities = new DOM.NamedNodeMap(document);
    for(var i = 0; i < meta_xml_info.entities.length; i++){
    var entity = meta_xml_info.entities[i];
    if(!document.doctype.entities || !document.doctype.entities.getNamedItem(entity.ent_name)){
        var DOMentity = new DOM.Entity(entity.ent_name, document);
        if(entity.public){
            DOMentity.publicId = entity.public_id;
            DOMentity.systemId = entity.value;
        }
        var xml_fragment_entity = entity.value;
        try{
            var json_entity = JSON.parse(convert.xml2json(xml_fragment_entity, {compact: false, spaces: 0}));
            parseJSON2DOM(document, DOMentity, json_entity, null);
        } catch(err){
            //entity value is just text
            var entityText = document.createTextNode(entity.value);
            DOMentity.insertBefore(entityText, null);
        }
        if(entity.ndata){
            DOMentity.notationName = entity.link;
        }
        document.doctype.entities.setNamedItem(DOMentity);
        }
    }
}

function computeEntRefs(jsonxml, data){
    var nodes = [];
    var matches = data.split(/(&ent\d;)/gi);
    var length = matches.length;
    if(length > 1){
        for(var i = 0; i < length; i++){
            var match = matches[i];
            if(match !== ""){
                if(i & 1){
                    //case when we have an entity
                    var entName = match.slice(0, match.length -1).slice(1);
                    nodes.push({"type": "entityreference", "name": entName});
                }else{
                    //case when we have text
                    nodes.push({"type": "text", "text": match});
                }
            }
        }
    } 
    return nodes;
}

function replaceTextNodes(jsonxml){
  if(jsonxml.elements){
    for(var i = 0; i < jsonxml.elements.length; i++){
      var element = jsonxml.elements[i];
      if(element.type === "text" || element.type === "cdata"){
        var nodes = computeEntRefs(jsonxml, element.text || element.cdata);
        if(nodes.length > 0){
          jsonxml.elements = jsonxml.elements.splice(0, i).concat(nodes).concat(jsonxml.elements.splice(i+1));
        }
      }else if(element.type === "element"){
        if(element.attributes){
          for(var j = 0; j < element.attributes.length; j++){
            var attribute = element.attributes[j];
            var entRefs = computeEntRefs(jsonxml, attribute.value);
            if(entRefs){
              attribute.elements = entRefs;
            }
          }
        }
      }
      replaceTextNodes(element);
    }
  }
}

function replaceAttributes(jsonxml){
    if(jsonxml.declaration){
        if(jsonxml.declaration.entities){
            for(var i = 0; i < jsonxml.declaration.entities.length; i++){
                var entity = jsonxml.declaration.entities[i];
                replaceAttributesElems(entity.value);
            }
        }
        if(jsonxml.declaration.notations){
            for(notation in jsonxml.declaration.notations){
                replaceAttributesElems(notation);
            }
        }
    }
    replaceAttributesElems(jsonxml);
}

function replaceAttributesElems(jsonxml){
    if(jsonxml.elements){
      for(var i = 0; i < jsonxml.elements.length; i++){
        var element = jsonxml.elements[i];
        if(element.type === "element" && element.attributes){
          var attrs = [];
          for(attribute in element.attributes){
            attrs.push({"name": attribute, "value": element.attributes[attribute]});
          }
          element.attributes = attrs;
        }
        replaceAttributes(element);
      }
    }
}

function matchHTMLEntityReferences(data){
    var ret        = true;
    var rets       = []; 
    var entRefRe   = /&[a-zA-Z]*;/g;
    return data.match(entRefRe) || [];
}

function replaceHTMLEntities (str) { 
    var matches = matchHTMLEntityReferences(str);
    for(var i = 0; i < matches.length; i++){
         var full_value = ArrayUtils.find(html_symbols_json,
            function(symbol) {
                return symbol["Named Code"] === matches[i];
            })["Char"];
         str = str.replace(new RegExp(matches[i],'g'), full_value);
    }

    return str; 
}

function createDOMElement(jsonElement, document, defaultAttrs){
    var name       = jsonElement.name; 
    var attrs      = jsonElement.attributes; 
    var DOMelement = document.createElement(name);
    for(var attrName in attrs){
        var attrValue = attrs[attrName];
        attrValue = replaceEntRef(attrValue);
        if(!document.isHTML()){
          var matchEntRefs = computeEntRefs(attrValue, document);
          if(matchEntRefs.length > 0){
            var DOMattr = document.createAttribute(attrName);
            ArrayUtils.map(matchEntRefs, function(e){DOMattr.appendChild(e)});
            DOMelement.setAttributeNode(DOMattr);
          }else{
            DOMelement.setAttribute(attrName, attrValue); 
          }
        }else{
            attrValue = replaceHTMLEntities(attrValue);
            DOMelement.setAttribute(attrName, attrValue);  
        }           
    }
    if(jsonElement.elements){
        ArrayUtils.map(jsonElement.elements, function(e){
            var DOMchildren = parseJSONElement2DOM(document, e, defaultAttrs);
            ArrayUtils.map(DOMchildren, function(c){DOMelement.appendChild(c)});
        });
    }
    return DOMelement;
}

function createDOMTextNodes(jsonText, document){
    var children = [];
    var data = jsonText.text;
    data = replaceEntRef(data);
    if(!document.isHTML()){
        var entRefs = computeEntRefs(data, document);
        if(entRefs.length > 0){
          return entRefs;
        }else{
          var DOMtext = document.createTextNode(data);
          return [DOMtext];
        }
    }else{
        data = replaceHTMLEntities(data);
        var DOMtext = document.createTextNode(data);
        return [DOMtext];
    }
}

function createDOMComment(jsonComment, document){
    var data = jsonComment.comment;
    var DOMcomment = document.createComment(data);
    return DOMcomment;
}

function createDOMInstruction(jsonInstruction, document){
    var target = jsonInstruction.name;
    var data   = jsonInstruction.instruction;
    var DOMinstruction = document.createProcessingInstruction(target, data, document);
    return DOMinstruction; 
}

function createDOMCDATA(jsonCDATA, document){
    var data = jsonCDATA.cdata;
    data = replaceEntRef(data);
    var DOMcdata = document.createCDATASection(data);
    return DOMcdata; 
}

function parseJSONElement2DOM(document, element, defaultAttrs){
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
    
    default: 
      return null; 
  } 
}

function replaceEntRef(data){
    return data.replace("&amp;","&");
}

function filterElemDefaultAttrs(elemName, defaultAttrs){
    var res = [];
    for(var i = 0; i < defaultAttrs.length; i++){
        if(defaultAttrs[i].elem === elemName){
            res.push(defaultAttrs[i]);
        }
    }
    return res;
}

function parseJSON2DOM (document, parent, doc, defaultAttrs) { 
    for (var i = 0; i < doc.elements.length; i++){
        var DOMchildren = parseJSONElement2DOM(document, doc.elements[i], defaultAttrs); 
        if (DOMchildren !== null) {
            for(var j = 0; j < DOMchildren.length; j++){
                parent.appendChild(DOMchildren[j]);
            }
        }
    }
}

exports.parseDocument = parseDocument;
exports.parseDocumentStr = parseDocumentStr;
