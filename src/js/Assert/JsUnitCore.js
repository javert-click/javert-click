/*
* @id initJsUnitCore
*/
function initJsUnitCore(){
    
    /*
    * @id assertEquals
    */
    function assertEquals() {
        validateArguments(2, arguments);
        var var1=nonCommentArg(1, 2, arguments);
        var var2=nonCommentArg(2, 2, arguments);
        asserts(commentArg(2, arguments), var1 === var2, 'Expected ' + var1 + ' (' + typeof(var1) + ') but was ' + displayStringForValue(var2) + ' (' + typeof(var2) + ')');
    }

    /*
    * @id assertEqualsArray
    */
    function assertEqualsArray(){
        validateArguments(2, arguments);
        var var1=nonCommentArg(1, 2, arguments);
        var var2=nonCommentArg(2, 2, arguments);
        assertEquals('arrays should have same length', var1.length, var2.length);

        for(var i = 0; i < var1.length; i ++){
            assertEquals('each element of the array should be equal', var1[i], var2[i]);
        }
    }

    /*
    * @id assertDeepEqual
    */
    function assertDeepEqual(){
        validateArguments(2, arguments);
        var x=nonCommentArg(1, 2, arguments);
        var y=nonCommentArg(2, 2, arguments);
        if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
        // after this just checking type of one would be enough
        if (x.constructor !== y.constructor) { return false; }
        // if they are functions, they should exactly refer to same one (because of closures)
        if (x instanceof Function) { return x === y; }
        // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
        if (x instanceof RegExp) { return x === y; }
        if (x === y || x.valueOf() === y.valueOf()) { return true; }
        if (Array.isArray(x) && x.length !== y.length) { return false; }
    
        // if they are dates, they must had equal valueOf
        if (x instanceof Date) { return false; }
    
        // if they are strictly equal, they both need to be object at least
        if (!(x instanceof Object)) { return false; }
        if (!(y instanceof Object)) { return false; }
    
        // recursive object equality check
        var p = Object.keys(x);
        return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
            p.every(function (i) { return assertDeepEqual(x[i], y[i]); });
    }

    /*
    * @id assertNotNull
    */
   function assertNotNull(){
        validateArguments(1, arguments);
        var aVar=nonCommentArg(1, 1, arguments);
        asserts(commentArg(1, arguments), aVar !== null, 'Expected not to be null');
   }

    /*
    * @id assertNull
    */
   function assertNull(){
		validateArguments(1, arguments);
        var aVar=nonCommentArg(1, 1, arguments);
        asserts(commentArg(1, arguments), aVar === null, 'Expected null but was ' + displayStringForValue(aVar));
   }

    /*
    * @id assertTrue
    */
   function assertTrue(){
        validateArguments(1, arguments);
        var booleanValue=nonCommentArg(1, 1, arguments);
    
        if (typeof(booleanValue) != 'boolean')
        JsUnitCoreError('Bad argument to assertTrue(boolean)');
    
        asserts(commentArg(1, arguments), booleanValue === true, 'Call to assertTrue(boolean) with false');
   }

    /*
    * @id assertFalse
    */
   function assertFalse(){
		validateArguments(1, arguments);
		var booleanValue=nonCommentArg(1, 1, arguments);
	
		if (typeof(booleanValue) != 'boolean')
		JsUnitCoreError('Bad argument to assertFalse(boolean)');
	
		asserts(commentArg(1, arguments), booleanValue === false, 'Call to assertFalse(boolean) with true');
   }

    /*
    * @id validateArguments
    */
    function validateArguments(expectedNumberOfNonCommentArgs, sargs) {
        if (!( sargs.length == expectedNumberOfNonCommentArgs ||
            (sargs.length == expectedNumberOfNonCommentArgs + 1 && typeof(sargs[0]) == 'string') ))
        JsUnitCoreError('Incorrect arguments passed to assert function');
    }

    /*
    * @id asserts
    */
    function asserts(comment, booleanValue, failureMessage) {
        //console.log('CALLING ASSERT WITH '+booleanValue);
        if (!booleanValue){
            throw new Error(failureMessage);
            //JavertAssert(false);
        }
    }

    /*
    * @id nonCommentArg
    */
    function nonCommentArg(desiredNonCommentArgIndex, expectedNumberOfNonCommentArgs, sargs) {
        return argumentsIncludeComments(expectedNumberOfNonCommentArgs, sargs) ?
        sargs[desiredNonCommentArgIndex] :
        sargs[desiredNonCommentArgIndex - 1];
    }

    /*
    * @id argumentsIncludeComments
    */
    function argumentsIncludeComments(expectedNumberOfNonCommentArgs, sargs) {
        return sargs.length == expectedNumberOfNonCommentArgs + 1;
    }

    /*
    * @id commentArg
    */
    function commentArg(expectedNumberOfNonCommentArgs, sargs) {
        if (argumentsIncludeComments(expectedNumberOfNonCommentArgs, sargs))
        return sargs[0];
    
        return null;
    }

    /*
    * @id displayStringForValue
    */
    function displayStringForValue(aVar) {
        if (aVar === null) 
        return 'null';
        
        /*if (aVar === top.JSUNIT_UNDEFINED_VALUE) 
        return 'undefined';*/
        
        return aVar;
    }

    /*
    * @id JsUnitCoreError
    */
    function JsUnitCoreError(errorMessage) {
        var errorObject         = new Object();
        errorObject.description = errorMessage;
        //errorObject.stackTrace  = getStackTrace();
        throw errorObject;
    }

    return {'assertEquals': assertEquals, 
            'assertNotNull': assertNotNull, 
            'assertNull': assertNull, 
            'assertTrue': assertTrue, 
            'assertFalse': assertFalse, 
            'assertDeepEqual': assertDeepEqual,
            'assertEqualsArray': assertEqualsArray};
}










