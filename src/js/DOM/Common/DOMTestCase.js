/*
* @id initDOMTestCase
*/
var initDOMTestCase = function(jsUnitCore){
    
    /*
    * @id assertEqualsAutoCase
    */
    function assertEqualsAutoCase(context, descr, expected, actual){
        jsUnitCore.assertEquals(descr, expected, actual); 
    }

    /*
    * @id assertSize
    */
    function assertSize(descr, expected, actual){
        var actualSize;
        jsUnitCore.assertNotNull(descr, actual);
        actualSize = actual.length;
        jsUnitCore.assertEquals(descr, expected, actualSize);
    }

    /*
    * @id assertEqualsCollection
    */
    function assertEqualsCollection(descr, expected, actual){
        //
        //  if they aren't the same size, they aren't equal
        jsUnitCore.assertEquals(descr, expected.length, actual.length);
        //
        //  if there length is the same, then every entry in the expected list
        //     must appear once and only once in the actual list
        var expectedLen = expected.length;
        var expectedValue;
        var actualLen = actual.length;
        var i;
        var j;
        var matches;
        for(i = 0; i < expectedLen; i++) {
            matches = 0;
            expectedValue = expected[i];
            for(j = 0; j < actualLen; j++) {
                if(expectedValue == actual[j]) {
                    matches++;
                }
            }
            if(matches == 0) {
                throw new Error(descr + ": No match found for " + expectedValue);
            }
            if(matches > 1) {
                throw new Error(descr + ": Multiple matches found for " + expectedValue);
            }
        }
    }

    /*
    * @id toLowerArray
    */
    function toLowerArray(src){
        /*var newArray = new Array();
        var i;
        for (i = 0; i < src.length; i++) {
            newArray[i] = src[i].toLowerCase();
        }
        return newArray;*/
        return src;
    }

    /*
    * @id assertInstanceOf
    */
    function assertInstanceOf(descr, type, obj){
        if(type == "Attr") {
            jsUnitCore.assertEquals(descr,2,obj.nodeType);
            var specd = obj.specified;
        }
    }

    /*
    * @id assertEqualsList
    */
    function assertEqualsList(descr, expected, actual){
        var minLength = expected.length;
        if (actual.length < minLength) {
            minLength = actual.length;
        }
        //
        for(var i = 0; i < minLength; i++) {
            if(expected[i] != actual[i]) {
                jsUnitCore.assertEquals(descr, expected[i], actual[i]);
            }
        }
        //
        //  if they aren't the same size, they aren't equal
        jsUnitCore.assertEquals(descr, expected.length, actual.length);
    }

    /*
    * @id assertEqualsListAutoCase
    */
    function assertEqualsListAutoCase(context, descr, expected, actual){
        var minLength = expected.length;
        if (actual.length < minLength) {
            minLength = actual.length;
        }
        //
        for(var i = 0; i < minLength; i++) {
            assertEqualsAutoCase(context, descr, expected[i], actual[i]);
        }
        //
        //  if they aren't the same size, they aren't equal
        jsUnitCore.assertEquals(descr, expected.length, actual.length);
    }

    /*
    * @id assertSame
    */
    function assertSame(descr, expected, actual){
        if(expected != actual) {
            jsUnitCore.assertEquals(descr, expected.nodeType, actual.nodeType);
            jsUnitCore.assertEquals(descr, expected.nodeValue, actual.nodeValue);
        }
    }

    /*
    * @id equalsAutoCase
    */
    function equalsAutoCase(context, expected, actual){
		/*if (context == "attribute") {
            return expected.toLowerCase() == actual;
            
		}
        return expected.toUpperCase() == actual;*/
        return expected == actual;
    }

    /*
    * @id assertURIEquals
    */
    function assertURIEquals(assertID, scheme, path, host, file, name, query, fragment, isAbsolute, actual){
        //
        //  URI must be non-null
        jsUnitCore.assertNotNull(assertID, actual);

        var uri = actual;

        var lastPound = actual.lastIndexOf("#");
        var actualFragment = "";
        if(lastPound != -1) {
            //
            //   substring before pound
            //
            uri = actual.substring(0,lastPound);
            actualFragment = actual.substring(lastPound+1);
        }
        if(fragment != null) assertEquals(assertID,fragment, actualFragment);

        var lastQuestion = uri.lastIndexOf("?");
        var actualQuery = "";
        if(lastQuestion != -1) {
            //
            //   substring before pound
            //
            uri = actual.substring(0,lastQuestion);
            actualQuery = actual.substring(lastQuestion+1);
        }
        if(query != null) assertEquals(assertID, query, actualQuery);

        var firstColon = uri.indexOf(":");
        var firstSlash = uri.indexOf("/");
        var actualPath = uri;
        var actualScheme = "";
        if(firstColon != -1 && firstColon < firstSlash) {
            actualScheme = uri.substring(0,firstColon);
            actualPath = uri.substring(firstColon + 1);
        }

        if(scheme != null) {
            jsUnitCore.assertEquals(assertID, scheme, actualScheme);
        }

        if(path != null) {
            jsUnitCore.assertEquals(assertID, path, actualPath);
        }

        if(host != null) {
            var actualHost = "";
            if(actualPath.substring(0,2) == "//") {
                var termSlash = actualPath.substring(2).indexOf("/") + 2;
                actualHost = actualPath.substring(0,termSlash);
            }
            jsUnitCore.assertEquals(assertID, host, actualHost);
        }

        if(file != null || name != null) {
            var actualFile = actualPath;
            var finalSlash = actualPath.lastIndexOf("/");
            if(finalSlash != -1) {
                actualFile = actualPath.substring(finalSlash+1);
            }
            if (file != null) {
                jsUnitCore.assertEquals(assertID, file, actualFile);
            }
            if (name != null) {
                var actualName = actualFile;
                var finalDot = actualFile.lastIndexOf(".");
                if (finalDot != -1) {
                    actualName = actualName.substring(0, finalDot);
                }
                jsUnitCore.assertEquals(assertID, name, actualName);
            }
        }

        if(isAbsolute != null) {
            jsUnitCore.assertEquals(assertID, isAbsolute, actualPath.substring(0,1) == "/");
        }
    }

    return {'assertEqualsAutoCase': assertEqualsAutoCase, 
            'assertSize': assertSize, 
            'assertEqualsCollection': assertEqualsCollection, 
            'tolowerArray': toLowerArray, 
            'assertInstanceOf': assertInstanceOf,
            'assertEqualsList': assertEqualsList,
            'assertEqualsListAutoCase': assertEqualsListAutoCase,
            'assertSame': assertSame,
            'equalsAutoCase': equalsAutoCase,
            'assertURIEquals': assertURIEquals,
            'toLowerArray': toLowerArray
        };
}