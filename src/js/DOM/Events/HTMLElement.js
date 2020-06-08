/**************************/
/* INTERFACE HTMLElementt */
/**************************/

//const Element    = require ('./Element');
//const Event      = require ('./Event');
//const ShadowRoot = require('./ShadowRoot');

/**
* @id initHTMLElement
*/
var initHTMLElement = function(Element, Event, ShadowRoot, ClassList, CSSStyleDeclaration){

   /**
     * @id HTMLElement
     */
    var HTMLElement = function (tagName, document){
        Element.Element.call(this, tagName, document);
        this.disabled = false;
        this._shadowRoot = null;
        this.style = getInitialStyle(this);
        this.classList = new ClassList.ClassList(this.style);
        this._innerHTML = "";
    };

    HTMLElement.prototype = Object.create(Element.Element.prototype);

    Object.defineProperty(HTMLElement.prototype, 'onclick', {
        /*
        * @id HTMLElementOnClick
        */
        set: function(f){
            this.addEventListener("click", f);
        }
    });

    Object.defineProperty(HTMLElement.prototype, 'shadowRoot', {
        //The shadowRoot attribute’s getter must run these steps:
        /*
        * @id HTMLElementShadowRootGet
        */
        get: function(){
            //1. Let shadow be context object’s shadow root.
            var shadow = this._shadowRoot;
            //2. If shadow is null or its mode is "closed", then return null.
            if(shadow === null || shadow.mode === "closed"){
                return null;
            }
            //3. Return shadow.
            return shadow;
        },

        /*
        * @id HTMLElementShadowRootSet
        */
        set: function(shadow){
            this._shadowRoot = shadow;
        }
    });

    Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
        /*
        * @id HTMLElementClientHeightGet
        */
        get: function(){
            if(this.style && this.style.height){
                var innerHeight = Number(removePx(this.style.height));
                if(this.style.padding){
                    var paddingNumber = Number(removePx(this.style.padding));
                    innerHeight = innerHeight + paddingNumber * 2
                }
                return innerHeight;
            }else{
                return 0;
            }
        }
    });

    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
        get: function(){
            if(this.style && this.style.width){
                var innerWidth = Number(removePx(this.style.width));
                if(this.style.padding){
                    var paddingNumber = Number(removePx(this.style.padding));
                    innerWidth = innerWidth + paddingNumber * 2
                }
                return innerWidth;
            }else{
                return 0;
            }
        }
    });

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
        get: function(){
            var border = 0;
            if(this.style && this.style.border){
                border = Number(removePx(this.style.border));
            }
            return this.clientHeight + border*2;
        }
    });

    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        get: function(){
            var border = 0;
            if(this.style && this.style.border){
                border = Number(removePx(this.style.border));
            }
            return this.clientWidth + border*2;
        }
    });

    /*
    * @id HTMLElementClick
    */
    HTMLElement.prototype.click = function(){
        var type = this.type;
        if(type === "submit"){
            this.submit();
        }else{
            //1. If this element is a form control that is disabled, then return.
            if(this.is_disabled()){
                return;
            }
            var clickEvent = new Event.Event("click");
            this.dispatchEvent(clickEvent);
        }
    };

    /*
    * @id HTMLElementSubmit
    */
    HTMLElement.prototype.submit = function(){
        //1. If this element is a form control that is disabled, then return.
        if(this.is_disabled()){
            return;
        }
        //there is a lot more to do here
        //Let continue be the result of firing an event named submit at form, with the bubbles attribute initialized to true and the cancelable attribute initialized to true.
        var submitEvent = new Event.Event("submit");
        submitEvent.bubbles = true;
        submitEvent.cancelable = true;
        this.dispatchEvent(submitEvent);
    };

    /*
    * @id HTMLElementIsDisabled
    */
    HTMLElement.prototype.is_disabled = function(){
        return this.disabled;
    };

    /*
    * @id HTMLElementAttachShadow
    */
    HTMLElement.prototype.attachShadow = function(init){
        //The attachShadow(init) method, when invoked, must run these steps:
        //1. If context object’s namespace is not the HTML namespace, then throw a "NotSupportedError" DOMException
        //2. If context object’s local name is not a valid custom element name, "article", "aside", "blockquote", "body", "div", "footer", "h1", "h2", "h3", "h4", "h5", "h6", "header", "main" "nav", "p", "section", or "span", then throw a "NotSupportedError" DOMException.
        //3. If context object’s local name is a valid custom element name, or context object’s is value is not null, then:
        //4. If context object is a shadow host, then throw an "NotSupportedError" DOMException.
        //5. Let shadow be a new shadow root whose node document is context object’s node document, host is context object, and mode is init’s mode.
        var shadow = new ShadowRoot.ShadowRoot(init.mode, this);
        shadow.ownerDocument = this.ownerDocument;
        //6. Set context object’s shadow root to shadow
        this.shadowRoot = shadow;
        //7. Return shadow
        return shadow;
    };

    function removePx(str){
        if(typeof str === 'string' && str.indexOf('px') !== -1){
            return str.substring(0, str.indexOf('px'));
        }
    }

    function getInitialStyle(node){
        var style = new CSSStyleDeclaration.CSSStyleDeclaration(node);
        style.height = "";
        style.position = "";
        style.width = "";
        return style;
    }

    return {'HTMLElement': HTMLElement};

};

module.exports = initHTMLElement