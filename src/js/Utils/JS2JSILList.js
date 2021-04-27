
/*
* @id JS2JSILList
*/
function JS2JSILList(arr){
    // JSIL Call!
    var jsilList = JSILList_create();
    for(var i = 0; i < arr.length; i++){
        // JSIL Call!
        jsilList = JSILList_add(jsilList, arr[i]);
    }
    return jsilList;
}

function JSILListToArray(arr){
    //JSIL Call!
    return JSILList_to_Array(arr);
}

exports.JS2JSILList = JS2JSILList;
exports.JSILListToArray = JSILListToArray;