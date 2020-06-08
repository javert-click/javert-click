/*
* @id initDOMRect
*/
var initDOMRect = function(){
    
    /*
    * @id DOMRect
    */
    function DOMRect(){
        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
        this.top = null;
        this.right = null;
        this.bottom = null;
        this.left = null;
    }

    return {'DOMRect': DOMRect};
}

module.exports = initDOMRect;