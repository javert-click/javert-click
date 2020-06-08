/*
 * @id initHTMLSlotElement
 */
var initHTMLSlotElement = function(HTMLElement){

   /*
   * @id HTMLSlotElement
   */
   var HTMLSlotElement = function (name, document) {
        HTMLElement.HTMLElement.call(this, name, document);
        this.name = name;
   };

   HTMLSlotElement.prototype = Object.create(HTMLElement.HTMLElement.prototype);

   return {'HTMLSlotElement': HTMLSlotElement};

}

module.exports = initHTMLSlotElement;