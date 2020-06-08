/*
* @id initMocha
*/
var initMocha = function(){
    
    var beforeEachFunction;

    /*
    * @id mochaBeforeEach
    */
    function beforeEach(f){
        beforeEachFunction = f;
    }

    /*
    * @id mochaDescribe
    */
    function describe(description, f){
        try {    
            f();
        } catch (e){
            throw "TEST FAILED: "+description+" INFO: "+e.message
        }
    }

    /*
    * @id mochaIt
    */
    function it(description, f){
        //try { 
            if(beforeEachFunction){
                beforeEachFunction();
            }
            f();
        /*} catch (e){
            return "TEST FAILED: "+description+" INFO: "+e.message
        }*/
    }

    /*
    * @id mochaTest
    */
    function test(description, f){
        it(description, f);
    }

    return {
        'beforeEach': beforeEach,
        'describe': describe,
        'it': it,
        'test': test
    }
}

