/*
* @id initCash
*/
var initCash = function (document, window) {
  
  /** This should be hidden... */
  var smallAZ = {
    a: 97,
    b: 98,
    c: 99,
    d: 100,
    e: 101,
    f: 102,
    g: 103,
    h: 104,
    i: 105,
    j: 106,
    k: 107,
    l: 108,
    m: 109,
    n: 110,
    o: 111,
    p: 112,
    q: 113,
    r: 114,
    s: 115,
    t: 116,
    u: 117,
    v: 118,
    w: 119,
    x: 120,
    y: 121,
    z: 122
  }

  var largeAZ = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90
  }

  var underscore = {_ : 95};

  var wordCharacters = [smallAZ, largeAZ, underscore];

  var whitespaceCharacters = ['\t', '\n', '\v', '\f', '\r'];
  
  function toUpperCase(c){
    if(largeAZ.hasOwnProperty(c)) return c;
    if(smallAZ.hasOwnProperty(c)){
      var currCode = smallAZ[c];
      var toUpperCaseCode = currCode - 32;
      for(uC in largeAZ){
        if(largeAZ[uc] === toUpperCaseCode){
          return uC;
        }
      }
    }
    return c;
  }

  /*
  * @id CashHasCharactersInObj
  */
  function hasCharactersInObj(str, j, k, obj){
    for(var i = j; i < k; i++){
      if ((!obj.hasOwnProperty(str[i]) || str[i] == ' ') && str[i] !== "-")
        return false; 
    }
    return true;
  }

  /*
  * @id CashCheckWordCharacters
  */
  function checkWordCharacters(str, j, k) {
    for(var l = 0; l < wordCharacters.length; l++){
      if(hasCharactersInObj(str, j, k, wordCharacters[l]))
        return true;
    }
    return false;
  }

  /*
  * @id CashCheckWhiteSpaceCharacters
  */
  function checkWhiteSpaceCharacters(str){
    for(var i = 0; i < whitespaceCharacters.length; i++){
      if(str.indexOf(whitespaceCharacters[i]) !== -1)
        return false
    }
    return true;
  }
  
  /*
  * @id CashIsId
  */
  function isId(str) { 
    if (str[0] !== "#") return false; 
    return checkWordCharacters(str, 1, str.length);
  }
  
  /*
  * @id CashIsClass
  */
  function isClass (str) {
    if (str[0] !== ".") return false;
    var res = checkWordCharacters(str, 1, str.length);
    return res;
  }
  
  /*
  * @id CashIsHtmlTag
  */
  function isHtmlTag (str) {
    return (str[0] === "<") && (str[str.length -1] === ">"); 
  }
  
  /*
  * @id CashIsTagNAme
  */
  function isTagName (str) { 
    return checkWordCharacters(str, 0, str.length);
  }

  /*
  * @id CashIsNonWhiteSpace
  */
  function isNonWhiteSpace(str){
    return checkWhiteSpaceCharacters(str, 0, str.length);
  }

  var doc = document,
    win = window,
    div = doc.createElement('div'),
    _a = Array.prototype,
    filter = _a.filter,
    indexOf = _a.indexOf,
    map = _a.map,
    push = _a.push,
    reverse = _a.reverse,
    slice = _a.slice,
    some = _a.some,
    splice = _a.splice;
  
    /*
  var idRe = /^#[\w-]*$/,
    classRe = /^\.[\w-]*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; 

  /*
  * @id CashFindAux
  */
  function find(selector, context) {
    if (context === void 0) {
      context = doc;
    }

    return !isDocument(context) && !isElement(context) ? [] : isClass(selector) ? context.getElementsByClassName(selector.slice(1)) : isTagName(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
  } 

  /*
  * @id Cash
  */
  var Cash = function () {
      
      /*
      * @id CashConstructor
      */
      function Cash(selector, context) {
        if (context === void 0) {
          context = doc;
        }

        if (!selector) return;
        if (isCash(selector)) return selector;
        var eles = selector;

        if (isString(selector)) {
          var ctx = isCash(context) ? context[0] : context;
          eles = isId(selector) ? ctx.getElementById(selector.slice(1)) : find(selector, ctx); isHtmlTag(selector) ? parseHTML(selector) : find(selector, ctx);
          if (!eles) return;
        } else if (isFunction(selector)) {
          return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }

        if (eles.nodeType || eles === win) eles = [eles];
        this.length = eles.length;

        for (var i = 0, l = this.length; i < l; i++) {
          this[i] = eles[i];
        }
      }

      /*
      * @id CashInit
      */
      Cash.prototype.init = function (selector, context) {
        return new Cash(selector, context);
      };

      return Cash;
    }();

  var cash = Cash.prototype.init;
  cash.fn = cash.prototype = Cash.prototype; // Ensuring that `cash () instanceof cash`

  Cash.prototype.length = 0;
  Cash.prototype.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

  if (typeof Symbol === 'function') {
    Cash.prototype[Symbol['iterator']] = Array.prototype[Symbol['iterator']];
  }

  /*
  * @id CashGet
  */
  Cash.prototype.get = function (index) {
    if (index === undefined) return slice.call(this);
    return this[index < 0 ? index + this.length : index];
  };

  /*
  * @id CashEq
  */
  Cash.prototype.eq = function (index) {
    return cash(this.get(index));
  };

  /*
  * @id CashFirst
  */
  Cash.prototype.first = function () {
    return this.eq(0);
  };

  /*
  * @id CashLast
  */
  Cash.prototype.last = function () {
    return this.eq(-1);
  };

  /*
  * @id CashMap
  */
  Cash.prototype.map = function (callback) {
    return cash(map.call(this, function (ele, i) {
      return callback.call(ele, i, ele);
    }));
  };

  /*
  * @id CashSlice
  */
  Cash.prototype.slice = function () {
    return cash(slice.apply(this, arguments));
  }; 

  /*
  * @id CashDashAlpha
  */
  function dashAlpha(str){
    if(str.indexOf('-') == -1){
      return [];
    }else{
      var result = [];
      for(var i = 0; i < str.length; i++){
        if(str.charAt(i) === '-'){
          var remaining = str.substring(i+1, str.length);
          var char = remaining.charAt(0);
          if(smallAZ.hasOwnProperty(char)){
            result.push(i);
          }
        }
      }
      return result;
    }
  }

  /*
  * @id CashReplaceDashes
  */
  function replaceDashes(str, positions){
    for(var i = 0; i < str.length; i++){
      if(positions.indexOf(i) !== -1){
        str = str.substring(0, i) + toUpperCase(str.charAt(i)) + str.substring(i + 1, str.length);
      }
    }
    return str;
  }

  /*function camelCaseReplace(match, letter) {
    return letter.toUpperCase();
  }*/

  /*
  * @id CashCamelCase
  */
  function camelCase(str) {
    return replaceDashes(str, dashAlpha(str));
  }

  cash.camelCase = camelCase;

  /*
  * @id CashEachAux
  */
  function each(arr, callback) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback.call(arr[i], i, arr[i]) === false) break;
    }
  }

  cash.each = each;

  /*
  * @id CashEach
  */
  Cash.prototype.each = function (callback) {
    each(this, callback);
    return this;
  };

  /*
  * @id CashRemoveProp
  */
  Cash.prototype.removeProp = function (prop) {
    return this.each(function (i, ele) {
      delete ele[prop];
    });
  }; 


  /*
  * @id CashExtendAux
  */
  function extend(target) {
    var objs = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      objs[_i - 1] = arguments[_i];
    }

    var args = arguments,
      length = args.length;

    for (var i = length < 2 ? 0 : 1; i < length; i++) {
      for (var key in args[i]) {
        target[key] = args[i][key];
      }
    }

    return target;
  }

  /*
  * @id CashExtend
  */
  Cash.prototype.extend = function (plugins) {
    return extend(cash.fn, plugins);
  };

  cash.extend = extend;
  cash.guid = 1;

  /*
  * @id CashMatches
  */
 function matches(ele, selector) {
  //var matches = (ele['matches'] || ele['webkitMatchesSelector'] || ele['mozMatchesSelector'] || ele['msMatchesSelector'] || ele['oMatchesSelector']);
  //var ret = !!matches && matches.call(ele, selector);
  var classAttrValue = ele.getAttribute('class');
  var allMatches = document.querySelectorAll(selector);
  for(var i = 0; i < allMatches.length; i++){
    var classMatched = allMatches[i].getAttribute('class');
    if(classMatched === classAttrValue){
      return true;
    }
  }
  //var match = classAttrValue && (selector.slice(1,selector.length) === classAttrValue);
  return false;
}

  cash.matches = matches;

  /*
  * @id CashPluck
  */
  function pluck(arr, prop, deep) {
    var plucked = [];

    for (var i = 0, l = arr.length; i < l; i++) {
      var val_1 = arr[i][prop];

      while (val_1 != null) {
        plucked.push(val_1);
        if (!deep) break;
        val_1 = val_1[prop];
      }
    }

    return plucked;
  } 


  /*
  * @id CashIsCash
  */
  function isCash(x) {
    return x instanceof Cash;
  }

  /*
  * @id CashIsWindow
  */
  function isWindow(x) {
    return !!x && x === x.window;
  }

  /*
  * @id CashIsDocument
  */
  function isDocument(x) {
    return !!x && x.nodeType === 9;
  }

  /*
  * @id CashIsElement
  */
  function isElement(x) {
    return !!x && x.nodeType === 1;
  }

  /*
  * @id CashIsFunction
  */
  function isFunction(x) {
    return typeof x === 'function';
  }

  /*
  * @id CashIsString
  */
  function isString(x) {
    return typeof x === 'string';
  }

  function isNumeric(x) {
    var numX = new Number(x);
    return !isNaN(numX) && isFinite(x);
  }

  var isArray = Array.isArray;
  cash.isWindow = isWindow;
  cash.isFunction = isFunction;
  cash.isString = isString;
  cash.isNumeric = isNumeric;
  cash.isArray = isArray;

  /*
  * @id CashProp
  */
  Cash.prototype.prop = function (prop, value) {
    if (!prop) return;

    if (isString(prop)) {
      if (arguments.length < 2) return this[0] && this[0][prop];
      return this.each(function (i, ele) {
        ele[prop] = value;
      });
    }

    for (var key in prop) {
      this.prop(key, prop[key]);
    }

    return this;
  }; 

  /*
  * @id CashGetCompareFunction
  */
  function getCompareFunction(comparator) {
    return isString(comparator) ? function (i, ele) {
      return matches(ele, comparator);
    } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
      return comparator.is(ele);
    } : function (i, ele) {
      return ele === comparator;
    };
  }

  /*
  * @id CashFilter
  */
  Cash.prototype.filter = function (comparator) {
    if (!comparator) return cash();
    var compare = getCompareFunction(comparator);
    return cash(filter.call(this, function (ele, i) {
      return compare.call(ele, i, ele);
    }));
  }; 

  /*
  * @id CashFiltered
  */
  function filtered(collection, comparator) {
    return !comparator || !collection.length ? collection : collection.filter(comparator);
  };

  /*
  * @id CashGetSplitValues
  */
  function getSplitValues(str) {
    return (isString(str) && str.length > 0) ? str.split(' ') || [] : [];
  };

  /*
  * @id CashHasClass
  */
  Cash.prototype.hasClass = function (cls) {
    return cls && some.call(this, function (ele) {
      return ele.classList.contains(cls);
    });
  };

  /*
  * @id CashRemoveAttr
  */
  Cash.prototype.removeAttr = function (attr) {
    var attrs = getSplitValues(attr);
    if (!attrs.length) return this;
    return this.each(function (i, ele) {
      each(attrs, function (i, a) {
        ele.removeAttribute(a);
      });
    });
  };

  /*
  * @id CashAttr
  */
  function attr(attr, value) {
    if (!attr) return;

    if (isString(attr)) {
      if (arguments.length < 2) {
        if (!this[0]) return;
        var value_1 = this[0].getAttribute(attr);
        return value_1 === null ? undefined : value_1;
      }

      if (value === undefined) return this;
      if (value === null) return this.removeAttr(attr);
      return this.each(function (i, ele) {
        ele.setAttribute(attr, value);
      });
    }

    for (var key in attr) {
      this.attr(key, attr[key]);
    }

    return this;
  }

  Cash.prototype.attr = attr;

  /*
  * @id CashToggleClass
  */
  Cash.prototype.toggleClass = function (cls, force) {
    var classes = getSplitValues(cls),
      isForce = force !== undefined;
    if (!classes.length) return this;
    return this.each(function (i, ele) {
      each(classes, function (i, c) {
        if (isForce) {
          force ? ele.classList.add(c) : ele.classList.remove(c);
        } else {
          ele.classList.toggle(c);
        }
      });
    });
  };

  /*
  * @id CashAddClass
  */
  Cash.prototype.addClass = function (cls) {
    return this.toggleClass(cls, true);
  };

  /*
  * @id CashRemoveClass
  */
  Cash.prototype.removeClass = function (cls) {
    return !arguments.length ? this.attr('class', '') : this.toggleClass(cls, false);
  }; 

  /*
  * @id CashUnique
  */
  function unique(arr) {
    return arr.length > 1 ? filter.call(arr, function (item, index, self) {
      return indexOf.call(self, item) === index;
    }) : arr;
  }

  cash.unique = unique;

  /*
  * @id CashAdd
  */
  Cash.prototype.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
  }; 

  /*
  * @id CashComputedStyle
  */
  function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele) || !prop) return;
    var style = win.getComputedStyle(ele, null);
    return prop ? isVariable ? style.getPropertyValue(prop) || undefined : style[prop] : style;
  } 

  /*
  * @id CashComputedStyleInt
  */
  function computeStyleInt(ele, prop) {
    return Number(computeStyle(ele, prop), 10) || 0;
  }

  /*
  * @id CashIsCSSVariable
  */
  function isCSSVariable(prop) {
    //return cssVariableRe.test(prop);
    return (prop.length >= 2) && (prop.charAt(0) === '-') && (prop.charAt(1) === '-');
  } 

  var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms', 'o'];

  /*
  * @id CashGetPrefixedProp
  */
  function getPrefixedProp(prop, isVariable) {
    if (isVariable === void 0) {
      isVariable = isCSSVariable(prop);
    }

    if (isVariable) return prop;

    if (!prefixedProps[prop]) {
      var propCC = camelCase(prop);
        //propUC = "" + propCC.charAt(0).toUpperCase() + propCC.slice(1),
        //props = split((propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC), ' ');
        var props = [propCC];
      each(props, function (i, p) {
        if (p in style) {
          prefixedProps[prop] = p;
          return false;
        }
      });
    }

    return prefixedProps[prop];
  }

  ;
  cash.prefixedProp = getPrefixedProp; 

  var numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
  };

  /*
  * @id CashGetSuffixedValue
  */
  function getSuffixedValue(prop, value, isVariable) {
    if (isVariable === void 0) {
      isVariable = isCSSVariable(prop);
    }

    return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
  }

  /*
  * @id CashCSS
  */
  function css(prop, value) {
    if (isString(prop)) {
      var isVariable_1 = isCSSVariable(prop);
      prop = getPrefixedProp(prop, isVariable_1);
      if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
      if (!prop) return this;
      value = getSuffixedValue(prop, value, isVariable_1);
      return this.each(function (i, ele) {
        if (!isElement(ele)) return;

        if (isVariable_1) {
          ele.style.setProperty(prop, value); //TSC
        } else {
          ele.style[prop] = value; //TSC
        }
      });
    }

    for (var key in prop) {
      this.css(key, prop[key]);
    }

    return this;
  }

  ;
  Cash.prototype.css = css; 

  /*
  * @id CashGetData
  */
  function getData(ele, key) {
    var value = ele.dataset ? ele.dataset[key] || ele.dataset[camelCase(key)] : ele.getAttribute("data-" + key);

    try {
      return JSON_Parse(value);
    } catch (_a) { }

    return value;
  } 

  function JSON_Parse(json){
    if(json === null) return null;
    var json_number = new Number(json);
    if(isNaN(json_number)){
      switch(json){
        case "true":
          return true;
        case "false":
          return false;
        case "null":
          return null;
        default:
          if(is_Obj(json)){
            return parseJSONFromString(json);
          }else if(is_Array(json)){
            return parseArrayFromString(json);
          }else{
            //there is nothing else we can do here, so we just return the string
            return json;
          }
      }
    }else{
      return json_number.valueOf();
    }
  }

  function is_Array(json){
    return json.charAt(0) === "[" && json.charAt(json.length -1) === "]"; 
  }

  function is_Obj(json){
    return json.charAt(0) === "{" && json.charAt(json.length -1) === "}"; 
  }

  function is_singleTag(str){
    if(str.charAt(0) !== "<" || str.charAt(str.length -1) !== ">"){
      return "";
    }
    var indexEnd = str.indexOf(">", 0);
    if(indexEnd !== str.charAt(str.length-1)){
      //case of the format <tagName></tagName>
      var indexBegin = str.indexOf("<", 1);
      if(indexEnd !== indexBegin -1){
        return "";
      }
      return (checkWordCharacters(str, indexBegin+1, str.length-1) && checkWordCharacters(str, indexEnd+1, str.length-2)) ? str.substring(indexBegin+1, str.length-1) : "";
    }else{
      //case of the format <tagName> or <tagName/>
      var indexClose = str.indexOf("/", 1);
      if(indexClose !== -1){
        return checkWordCharacters(str, indexBegin+1, str.length-2) ? str.substring(indexBegin+1, str.length-2) : ""
      }else{
        return checkWordCharacters(str, indexBegin+1, str.length-1) ? str.substring(indexBegin+1, str.length-1) : ""
      }
    }
  }

  function JSON_Stringify(jsonobj){
    if(jsonobj === undefined) return jsonobj;
    if(typeof jsonobj === "object"){
      if(jsonobj === null) return "null";
      if(jsonobj instanceof Array) return "[" + jsonobj.toString() + "]";
      var jsonstr = "{";
      for(var prop in jsonobj){
        jsonstr = jsonstr + "'"+prop+"'" + ":"+JSON_Stringify(jsonobj[prop]) + ",";
      }
      jsonstr = jsonstr.substring(0, jsonstr.length -1) + "}";
      return jsonstr;
    }else{
      return jsonobj.toString();
    }
  };

  function parseJSONFromString(jsonstr){
    var openP = jsonstr.indexOf("{");
    var closeP = jsonstr.indexOf("}");
    if(openP === -1 || closeP === -1){
      return jsonstr;
    }
    var obj = {};
    var hasProperties = true;
    while(hasProperties){
      var propNameI = jsonstr.indexOf("'"); 
      var propNameE = jsonstr.indexOf("'", propNameI+1);
      if(propNameI === -1 || propNameE === -1){
        return obj;
      }
      var propName = jsonstr.substring(propNameI+1, propNameE);
      if(jsonstr.charAt(propNameE+1) === ":"){
        var comma = jsonstr.indexOf(",", propNameE);
        var propValueI = propNameE + 2;
        var propValueE = comma;
        if(comma === -1){
          hasProperties = false
          propValueE = closeP;
        }
        var propValue = jsonstr.substring(propValueI, propValueE);
        obj[propName] = JSON_Parse(propValue);
      }
    }
    return obj;
  }

  function parseArrayFromString(jsonstr){
    var openP = jsonstr.indexOf("[");
    var closeP = jsonstr.indexOf("]");
    if(openP === -1 || closeP === -1){
      return jsonstr;
    }
    var obj = new Array();
    var hasElements = true;
    var lastElemEnds = 1;
    while(hasElements){
        var comma = jsonstr.indexOf(",", lastElemEnds);
        var element;
        if(comma === -1){
          hasElements = false
          element = jsonstr.substring(lastElemEnds, jsonstr.length-1);
        }else{
          element = jsonstr.substring(lastElemEnds, comma);
          lastElemEnds = lastElemEnds + 1 + element.length;
        }
        obj.push(JSON_Parse(element));
    }
    return obj;
  }


  /*
  * @id CashSetData
  */
  function setData(ele, key, value) {
    try {
      value = JSON_Stringify(value);
    } catch (_a) { }

    if (ele.dataset) {
      ele.dataset[camelCase(key)] = value;
    } else {
      ele.setAttribute("data-" + key, value);
    }
  }

  //REGEXP
  //var dataAttributeRe = /^data-(.+)/;

  /*
  * @id CashData
  */
  function data(name, value) {
    var _this = this;

    if (!name) {
      if (!this[0]) return;
      var datas_1 = {};
      each(this[0].attributes, function (i, attr) {
        var match;
        if(attr.name.length > 5 && attr.name.substring(0, 6) === "data-"){
          match = attr.name.substring(6, attr.name.length);
        }
        //var match = attr.name.match(dataAttributeRe);
        if (!match) return;
        datas_1[match[1]] = _this.data(match[1]);
      });
      return datas_1;
    }

    if (isString(name)) {
      if (value === undefined) return this[0] && getData(this[0], name);
      return this.each(function (i, ele) {
        return setData(ele, name, value);
      });
    }

    for (var key in name) {
      this.data(key, name[key]);
    }

    return this;
  }

  Cash.prototype.data = data; 

  /*
  * @id CashGetExtraSpace
  */
  function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
  }

  each(['Width', 'Height'], 
  /*
  * @id CashInnerProp
  */
  function (i, prop) {
    Cash.prototype["inner" + prop] = function () {
      if (!this[0]) return;
      if (isWindow(this[0])) return win["inner" + prop];
      return this[0]["client" + prop];
    };
  });
  each(['width', 'height'], function (index, prop) {
    /*
    * @id CashEachValue
    */
    Cash.prototype[prop] = function (value) {
      if (!this[0]) return value === undefined ? undefined : this;

      if (!arguments.length) {
        if (isWindow(this[0])) return this[0][camelCase("outer-" + prop)];
        return this[0].getBoundingClientRect()[prop] - getExtraSpace(this[0], !index);
      }

      if(typeof value === 'string' && value.indexOf('px') !== -1){
        value = value.substring(0, value.length-2);
      }
      var valueNumber = Number(value);

      return this.each(
        /*
        * @id CashEachComputedStyle
        */
        function (i, ele) {
          if (!isElement(ele)) return;
          var boxSizing = computeStyle(ele, 'boxSizing');
          ele.style[prop] = getSuffixedValue(prop, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
      });
    };
  });
  each(['Width', 'Height'], function (index, prop) {
    /*
    * @id CashEachOuterProp
    */
    Cash.prototype["outer" + prop] = function (includeMargins) {
      if (!this[0]) return;
      if (isWindow(this[0])) return win["outer" + prop];
      return this[0]["offset" + prop] + (includeMargins ? computeStyleInt(this[0], "margin" + (!index ? 'Left' : 'Top')) + computeStyleInt(this[0], "margin" + (!index ? 'Right' : 'Bottom')) : 0);
    };
  }); 

  var defaultDisplay = {};

  /*
  * @id CashGetDefaultDisplay
  */
  function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName]) return defaultDisplay[tagName];
    var ele = doc.createElement(tagName);
    doc.body.appendChild(ele);
    var display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
  }

  /*
  * @id CashIsHidden
  */
  function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
  }

  /*
  * @id CashToggle
  */
  Cash.prototype.toggle = function (force) {
    return this.each(function (i, ele) {
      force = force !== undefined ? force : isHidden(ele);

      if (force) {
        ele.style.display = '';

        if (isHidden(ele)) {
          ele.style.display = getDefaultDisplay(ele.tagName);
        }
      } else {
        ele.style.display = 'none';
      }
    });
  };

  /*
  * @id CashHide
  */
  Cash.prototype.hide = function () {
    return this.toggle(false);
  };

  /*
  * @id CashShow
  */
  Cash.prototype.show = function () {
    return this.toggle(true);
  }; // @optional ./hide.ts
  // @optional ./show.ts
  // @optional ./toggle.ts


  /*
  * @id CashHasNamespaces
  */
  function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, function (ns) {
      return ns1.indexOf(ns) < 0;
    });
  }

  var eventsNamespace = '__cashEvents';
  var eventsNamespacesSeparator = '.';
  var eventsFocus = {
      focus: 'focusin',
      blur: 'focusout'
  };
  var eventsHover = {
      mouseenter: 'mouseover',
      mouseleave: 'mouseout'
  };
  //REGEXP
  var mouseEvents = ["mouse", "pointer", "contextMenu", "drag", "drop", "click", "dblclick"];
  //eventsMouseRe = /^(?:mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;

  /*
  * @id CashGetEventNameBubbling
  */
  function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
  } 

  /*
  * @id CashGetEventsCache
  */
  function getEventsCache(ele) {
    return ele[eventsNamespace] = ele[eventsNamespace] || {};
  } 

  /*
  * @id CashAddEvent
  */
  function addEvent(ele, name, namespaces, selector, callback) {
    callback.guid = callback.guid || cash.guid++;
    var eventCache = getEventsCache(ele);
    eventCache[name] = eventCache[name] || [];
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
  } 

  /*
  * @id CashParseEventName
  */
  function parseEventName(eventName) {
    var parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1)]
    // return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
  } 

  /*
  * @id CashRemoveEvent
  */
  function removeEvent(ele, name, namespaces, selector, callback) {
    var cache = getEventsCache(ele);

    if (!name) {
      for (name in cache) {
        removeEvent(ele, name, namespaces, selector, callback);
      }

      delete ele[eventsNamespace];
    } else if (cache[name]) {
      cache[name] = cache[name].filter(function (a) {
        var ns = a[0],
          sel = a[1],
          cb = a[2];
        if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
        ele.removeEventListener(name, cb);
      });
    }
  }

  /*
  * @id CashOff
  */
  Cash.prototype.off = function (eventFullName, selector, callback) {
    var _this = this;

    if (eventFullName === undefined) {
      this.each(function (i, ele) {
        return removeEvent(ele);
      });
    } else {
      if (isFunction(selector)) {
        callback = selector;
        selector = '';
      }

      each(getSplitValues(eventFullName), 
      /*
      * @id CashEachParseEventName
      */
      function (i, eventFullName) {
        var _a = parseEventName(getEventNameBubbling(eventFullName)),
          name = _a[0],
          namespaces = _a[1];

        _this.each(function (i, ele) {
          return removeEvent(ele, name, namespaces, selector, callback);
        }); //TSC

      });
    }

    return this;
  };

  /*
  * @id CashOn
  */
  function on(eventFullName, selector, callback, one) {
    var _this = this;

    if (!isString(eventFullName)) {
      for (var key in eventFullName) {
        this.on(key, selector, eventFullName[key]);
      }

      return this;
    }

    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    /*
    * @id CashEachGetSplitValues
    */
    each(getSplitValues(eventFullName), 
    function (i, eventFullName) {
      var _a = parseEventName(getEventNameBubbling(eventFullName)),
        name = _a[0],
        namespaces = _a[1];
      /*
      * @id CashEachFinalCallback
      */
      _this.each(
        function (i, ele) {
        /*
        * @id CashFinalCallback
        */
        var finalCallback = 
        function finalCallback(event) {
          if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
          var thisArg = ele;

          if (selector) {
            var target = event.target;

            while (!matches(target, selector)) {
              //TSC
              if (target === ele) {
                //console.log('For some reason, we do nothing here!');
                return;
              }
              //console.log('setting target to parentNode');
              target = target.parentNode;
              if (!target) return;
            }
            thisArg = target;
            event.__delegate = true;
          }

          if (event.__delegate) {
            Object.defineProperty(event, 'currentTarget', {
              configurable: true,
              get: function () {
                return thisArg;
              }
            });
        }
          var returnValue = callback.call(thisArg, event, event.data); //TSC

          if (one) {
            removeEvent(ele, name, namespaces, selector, finalCallback); //TSC
          }

          if (returnValue === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        };

        finalCallback.guid = callback['guid'] = callback['guid'] || cash.guid++; //TSC

        addEvent(ele, name, namespaces, selector, finalCallback); //TSC
      });
    });
    return this;
  }

  Cash.prototype.on = on;

  /*
  * @id CashOne
  */
  function one(eventFullName, selector, callback) {
    return this.on(eventFullName, selector, callback, true); //TSC
  }

  ;
  Cash.prototype.one = one;

  /*
  * @id CashReady
  */
  Cash.prototype.ready = function (callback) {
    var finalCallback = function finalCallback() {
      return callback(cash);
    };

    if (doc.readyState !== 'loading') {
      win.setTimeout(finalCallback);
    } else {
      doc.addEventListener('DOMContentLoaded', finalCallback);
    }

    return this;
  };

  /*
  * @id CashTrigger
  */
  Cash.prototype.trigger = function (eventFullName, data) {
    var evt;

    if (isString(eventFullName)) {
      var _a = parseEventName(eventFullName),
        name_1 = _a[0],
        namespaces = _a[1],
        type = mouseEvents.indexOf(name_1) !== -1 ? 'MouseEvents' : 'HTMLEvents';

      evt = doc.createEvent(type);
      evt.initEvent(name_1, true, true);
      evt.namespace = namespaces.join(eventsNamespacesSeparator);
    } else {
      evt = eventFullName;
    }

    evt.data = data;
    var isEventFocus = evt.type in eventsFocus;
    return this.each(
      /*
      * @id CashEachDispatch
      */
      function (i, ele) {
      if (isEventFocus && isFunction(ele[evt.type])) {
        ele[evt.type]();
      } else {
        ele.dispatchEvent(evt);
      }
    });
  }; 

  /*
  * @id CashGetValue
  */
  function getValue(ele) {
    if (ele.multiple) return pluck(filter.call(ele.options, function (option) {
      return option.selected && !option.disabled && !option.parentNode.disabled;
    }), 'value');
    return ele.value || '';
  }

  //REGEXP
  //var queryEncodeSpaceRe = /%20/g;

  /*function queryEncode(prop, value) {
    return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value).replace(queryEncodeSpaceRe, '+');
  }*/ 

  // REGEXP
  //var skippableRe = /file|reset|submit|button|image/i,
  //  checkableRe = /radio|checkbox/i;

  /*Cash.prototype.serialize = function () {
    var query = '';
    this.each(function (i, ele) {
      each(ele.elements || [ele], function (i, ele) {
        if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
        var value = getValue(ele);
        if (value === undefined) return;
        var values = isArray(value) ? value : [value];
        each(values, function (i, value) {
          query += queryEncode(ele.name, value);
        });
      });
    });
    return query.substr(1);
  };*/

  /*
  * @id CashVal
  */
  function val(value) {
    if (value === undefined) return this[0] && getValue(this[0]);
    return this.each(function (i, ele) {
      if (ele.tagName === 'SELECT') {
        var eleValue_1 = isArray(value) ? value : value === null ? [] : [value];
        each(ele.options, function (i, option) {
          option.selected = eleValue_1.indexOf(option.value) >= 0;
        });
      } else {
        ele.value = value === null ? '' : value;
      }
    });
  }

  Cash.prototype.val = val;

  /*
  * @id CashClone
  */
  Cash.prototype.clone = function () {
    return this.map(function (i, ele) {
      return ele.cloneNode(true);
    });
  };

  /*
  * @id CashDetach
  */
  Cash.prototype.detach = function () {
    return this.each(function (i, ele) {
      if (ele.parentNode) {
        ele.parentNode.removeChild(ele);
      }
    });
  }; 

  //var fragmentRe = /^\s*<(\w+)[^>]*>/,
    //singleTagRe = /^\s*<(\w+)\s*\/?>(?:<\/\1>)?\s*$/;
  var containers;

  /*
  * @id CashInitContainers
  */
  function initContainers() {
    if (containers) return;
    var table = doc.createElement('table'),
      tr = doc.createElement('tr');
    containers = {
      '*': div,
      tr: doc.createElement('tbody'),
      td: tr,
      th: tr,
      thead: table,
      tbody: table,
      tfoot: table
    };
  }

  function parseHTML(html) {
    initContainers();
    if (!isString(html)) return [];
    var singleTag = is_singleTag(html);
    if (singleTag !== "") return [singleTag];
    var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
  }

  cash.parseHTML = parseHTML;

  /*
  * @id CashEmpty
  */
  Cash.prototype.empty = function () {
    return this.each(function (i, ele) {
      while (ele.firstChild) {
        ele.removeChild(ele.firstChild);
      }
    });
  };

  /*
  * @id CashHtml
  */
  function html(html) {
    if (html === undefined) return this[0] && this[0].innerHTML;
    return this.each(function (i, ele) {
      ele.innerHTML = html;
    });
  }

  Cash.prototype.html = html;

  /*
  * @id CashRemove
  */
  Cash.prototype.remove = function () {
    return this.detach().off();
  };

  /*
  * @id CashText
  */
  function text(text) {
    if (text === undefined) return this[0] ? this[0].textContent : '';
    return this.each(function (i, ele) {
      ele.textContent = text;
    });
  }

  ;
  Cash.prototype.text = text;

  /*
  * @id CashUnwrap
  */
  Cash.prototype.unwrap = function () {
    this.parent().each(function (i, ele) {
      var $ele = cash(ele);
      $ele.replaceWith($ele.children());
    });
    return this;
  }; 

  var docEle = doc.documentElement;

  /*
  * @id CashOffset
  */
  Cash.prototype.offset = function () {
    var ele = this[0];
    if (!ele) return;
    var rect = ele.getBoundingClientRect();
    return {
      top: rect.top + win.pageYOffset - docEle.clientTop,
      left: rect.left + win.pageXOffset - docEle.clientLeft
    };
  };

  /*
  * @id CashOffsetParent
  */
  Cash.prototype.offsetParent = function () {
    return cash(this[0] && this[0].offsetParent);
  };

  /*
  * @id CashPosition
  */
  Cash.prototype.position = function () {
    var ele = this[0];
    if (!ele) return;
    return {
      left: ele.offsetLeft,
      top: ele.offsetTop
    };
  };

  /*
  * @id CashChildren
  */
  Cash.prototype.children = function (comparator) {
    var result = [];
    this.each(function (i, ele) {
      push.apply(result, ele.children);
    });
    return filtered(cash(unique(result)), comparator);
  };

  /*
  * @id CashContents
  */
  Cash.prototype.contents = function () {
    var result = [];
    this.each(function (i, ele) {
      push.apply(result, ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.childNodes);
    });
    return cash(unique(result));
  };

  /*
  * @id CashFind
  */
  Cash.prototype.find = function (selector) {
    var result = [];

    for (var i = 0, l = this.length; i < l; i++) {
      var found = find(selector, this[i]);

      if (found.length) {
        push.apply(result, found);
      }
    }

    return cash(unique(result));
  }; 

  //REGEXP
  //var scriptTypeRe = /^$|^module$|\/(?:java|ecma)script/i,
    //HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

  /*function evalScripts(node) {
    var collection = cash(node);
    collection.filter('script').add(collection.find('script')).each(function (i, ele) {
      if (!ele.src && scriptTypeRe.test(ele.type)) {
        // The script type is supported
        if (ele.ownerDocument.documentElement.contains(ele)) {
          // The element is attached to the DOM // Using `documentElement` for broader browser support
          eval(ele.textContent.replace(HTMLCDATARe, ''));
        }
      }
    });
  }*/ 

 /*
  * @id CashInsertElementAux
  */
  function insertElement(anchor, child, prepend, prependTarget) {
    if (prepend) {
      anchor.insertBefore(child, prependTarget);
    } else {
      anchor.appendChild(child);
    }

    evalScripts(child);
  } 

  /*
  * @id CashInsertContentAux
  */
  function insertContent(parent, child, prepend) {
    each(parent, function (index, parentEle) {
      each(child, function (i, childEle) {
        insertElement(parentEle, !index ? childEle : childEle.cloneNode(true), prepend, prepend && parentEle.firstChild);
      });
    });
  }

  /*
  * @id CashAppend
  */
  Cash.prototype.append = function () {
    var _this = this;

    each(arguments, function (i, selector) {
      insertContent(_this, cash(selector));
    });
    return this;
  };

  /*
  * @id CashAppendTo
  */
  Cash.prototype.appendTo = function (selector) {
    insertContent(cash(selector), this);
    return this;
  };

  /*
  * @id CashInsertAfter
  */
  Cash.prototype.insertAfter = function (selector) {
    var _this = this;

    cash(selector).each(function (index, ele) {
      var parent = ele.parentNode;

      if (parent) {
        _this.each(function (i, e) {
          insertElement(parent, !index ? e : e.cloneNode(true), true, ele.nextSibling);
        });
      }
    });
    return this;
  };

  /*
  * @id CashAfter
  */
  Cash.prototype.after = function () {
    var _this = this;

    each(reverse.apply(arguments), function (i, selector) {
      reverse.apply(cash(selector).slice()).insertAfter(_this);
    });
    return this;
  };

  /*
  * @id CashInsertBefore
  */
  Cash.prototype.insertBefore = function (selector) {
    var _this = this;

    cash(selector).each(function (index, ele) {
      var parent = ele.parentNode;

      if (parent) {
        _this.each(function (i, e) {
          insertElement(parent, !index ? e : e.cloneNode(true), true, ele);
        });
      }
    });
    return this;
  };

  /*
  * @id CashBefore
  */
  Cash.prototype.before = function () {
    var _this = this;

    each(arguments, function (i, selector) {
      cash(selector).insertBefore(_this);
    });
    return this;
  };

  /*
  * @id CashPrepend
  */
  Cash.prototype.prepend = function () {
    var _this = this;

    each(arguments, function (i, selector) {
      insertContent(_this, cash(selector), true);
    });
    return this;
  };

  /*
  * @id CashPrependTo
  */
  Cash.prototype.prependTo = function (selector) {
    insertContent(cash(selector), reverse.apply(this.slice()), true);
    return this;
  };

  /*
  * @id CashReplaceWith
  */
  Cash.prototype.replaceWith = function (selector) {
    return this.before(selector).remove();
  };

  /*
  * @id CashReplaceAll
  */
  Cash.prototype.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
  };

  /*
  * @id CashWrapAll
  */
  Cash.prototype.wrapAll = function (selector) {
    if (this[0]) {
      var structure = cash(selector);
      this.first().before(structure);
      var wrapper = structure[0];

      while (wrapper.children.length) {
        wrapper = wrapper.firstElementChild;
      }

      this.appendTo(wrapper);
    }

    return this;
  };

  /*
  * @id CashWrap
  */
  Cash.prototype.wrap = function (selector) {
    return this.each(function (index, ele) {
      var wrapper = cash(selector)[0];
      cash(ele).wrapAll(!index ? wrapper : wrapper.cloneNode(true));
    });
  };

  /*
  * @id CashWrapInner
  */
  Cash.prototype.wrapInner = function (selector) {
    return this.each(function (i, ele) {
      var $ele = cash(ele),
        contents = $ele.contents();
      contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
  };

  /*
  * @id CashHas
  */
  Cash.prototype.has = function (selector) {
    var comparator = isString(selector) ? function (i, ele) {
      return !!find(selector, ele).length;
    } : function (i, ele) {
      return ele.contains(selector);
    };
    return this.filter(comparator);
  };

  /*
  * @id CashIs
  */
  Cash.prototype.is = function (comparator) {
    if (!comparator || !this[0]) return false;
    var compare = getCompareFunction(comparator);
    var check = false;
    this.each(function (i, ele) {
      check = compare.call(ele, i, ele);
      return !check;
    });
    return check;
  };

  /*
  * @id CashNext
  */
  Cash.prototype.next = function (comparator, all) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', all))), comparator);
  };

  /*
  * @id CashNextAll
  */
  Cash.prototype.nextAll = function (comparator) {
    return this.next(comparator, true);
  };

  /*
  * @id CashNot
  */
  Cash.prototype.not = function (comparator) {
    if (!comparator || !this[0]) return this;
    var compare = getCompareFunction(comparator);
    return this.filter(function (i, ele) {
      return !compare.call(ele, i, ele);
    });
  };

  /*
  * @id CashParent
  */
  Cash.prototype.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
  };

  /*
  * @id CashIndex
  */
  Cash.prototype.index = function (selector) {
    var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
  };

  /*
  * @id CashClosest
  */
  Cash.prototype.closest = function (comparator) {
    if (!comparator || !this[0]) return cash();
    var filtered = this.filter(comparator);
    if (filtered.length) return filtered;
    return this.parent().closest(comparator);
  };

  /*
  * @id CashParents
  */
  Cash.prototype.parents = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentElement', true))), comparator);
  };

  /*
  * @id CashPrev
  */
  Cash.prototype.prev = function (comparator, all) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', all))), comparator);
  };

  /*
  * @id CashPrevAll
  */
  Cash.prototype.prevAll = function (comparator) {
    return this.prev(comparator, true);
  };

  /*
  * @id CashSiblings
  */
  Cash.prototype.siblings = function (comparator) {
    var result = [];
    this.each(function (i, ele) {
      push.apply(result, cash(ele).parent().children(function (ci, child) {
        return child !== ele;
      }));
    });
    return filtered(cash(unique(result)), comparator);
  }; 

  return cash;
}