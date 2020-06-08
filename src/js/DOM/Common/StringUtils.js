/*
* @id initStringUtils
*/
var initStringUtils = function(){

    /*
    * @id StringUtilsSplit
    */
    function split(selector, sep){
        var i = 0;
        var isep = selector.indexOf(sep);
        if(isep !== -1){
            return [selector.substring(0, isep)].concat(split(selector.substring(isep+sep.length, selector.length), sep));
        }else{
            return [selector];
        }
    }

    /*
    * @id StringRemoveWhiteSpaces
    */
    function removeWhiteSpaces(string){
        var wc = string.indexOf(" ");
        if(wc !== -1){
            return removeWhiteSpaces(string.substring(0, wc)+string.substring(wc+1, string.length));
        }else{
            return string;
        }
    }
	
	return {'split': split, 'removeWhiteSpaces': removeWhiteSpaces};
};

module.exports = initStringUtils;