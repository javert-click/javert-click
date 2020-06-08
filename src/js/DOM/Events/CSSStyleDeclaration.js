/*
* @id initCSSStyleDeclaration
*/
var initCSSStyleDeclaration = function(Event){

    /*
    * @id CSSStyleDeclaration
    */
    function CSSStyleDeclaration(node){
       this.__node = node;
       this.__transitions_map = {};
       this.__animations_map = {}; 
    };

    Object.defineProperty(CSSStyleDeclaration.prototype, "marginTop", {
        get: function(){
            return computeMargin(this);
        }
    });

    Object.defineProperty(CSSStyleDeclaration.prototype, "marginBottom", {
        get: function(){
            return computeMargin(this);
        }
    });

    Object.defineProperty(CSSStyleDeclaration.prototype, "marginLeft", {
        get: function(){
            return computeMargin(this);
        }
    });

    Object.defineProperty(CSSStyleDeclaration.prototype, "marginRight", {
        get: function(){
            return computeMargin(this);
        }
    });

    Object.defineProperty(CSSStyleDeclaration.prototype, "transition", {
        get: function () {
            return this.__transition_str;
        },
        set: function(str){
            var arr = str.split(" ");
            var transitions_map = this.__transitions_map;
            var stl, time;
            for (var i=0; i<arr.length; i+=2) {
                stl = arr[i];
                time = arr[i+1];
                transitions_map[stl] = time;
            }
            this.__transition_str = str; 
            return str;
        }
    });


    Object.defineProperty(CSSStyleDeclaration.prototype, "animation", {
        get: function () {
            return this.__animation_str;
        },
        set: function(str){
            var arr = str.split(" ");
            var animations_map = this.__animations_map;
            var atype, adur, nr;
            for (var i=0; i<arr.length; i+=3) {
                atype = arr[i];
                adur = arr[i+1];
                nr = arr[i+2];
                animations_map[atype] =  { type: atype, dur: adur, nr: nr };
            }
            this.__animation_str = str; 
            return str;
        }
    });


    Object.defineProperty(CSSStyleDeclaration.prototype, "opacity", {
        get: function(){
            return this.__opacity;
        },
        set : function (op) {
            this.__opacity = op;
            if (this.__transitions_map && this.__transitions_map["opacity"]){
                this.__node.dispatchEvent(new Event.Event('transitionrun'));
                this.__node.dispatchEvent(new Event.Event('transitionstart'));
                this.__node.dispatchEvent(new Event.Event('transitionend'));
            }
            return op;
        }
    });

    CSSStyleDeclaration.prototype.animate = function () { 
        this.__node.dispatchEvent(new Event.Event('animationstart'));
        this.__node.dispatchEvent(new Event.Event('animationiteration'));
        this.__node.dispatchEvent(new Event.Event('animationend'));
    }; 
    
    Object.defineProperty(CSSStyleDeclaration.prototype, "display", {
        get: function(){
            return this.__display;
        },
        set : function (disp) {
            this.__display = disp;
            if (disp === "none"){
                this.__node.dispatchEvent(new Event.Event('transitioncancel'));
                this.__node.dispatchEvent(new Event.Event('animationcancel'));
            }
            return disp;
        }
    }); 

    CSSStyleDeclaration.prototype.getPropertyValue = function(property){
        return this[property] || "";
    };

    CSSStyleDeclaration.prototype.setProperty = function(property, value){
        this[property] = String(value);
    }

    function computeMargin(style){
        return style.margin ? style.margin.substring(0, style.margin.length -2) : 0;
    }

    return {'CSSStyleDeclaration': CSSStyleDeclaration};

}

module.exports = initCSSStyleDeclaration;