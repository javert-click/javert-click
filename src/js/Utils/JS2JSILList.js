/*
* @id initJS2JSILList
*/
function initJS2JSILList(){

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

    return {'JS2JSILList': JS2JSILList};
}