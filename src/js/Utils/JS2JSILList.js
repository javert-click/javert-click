
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

exports.JS2JSILList = JS2JSILList;