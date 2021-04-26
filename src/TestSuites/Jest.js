import {assertEquals, assertNotNull, assertNull, assertTrue, assertFalse, assertDeepEqual, assertEqualsArray} from '../js/Assert/JsUnitCore.js'
import { Promise } from '../js/Promises/Promise';

function spyOn(mod, fname, thisobj, ntimes){
    var f_spy = {fun_name: fname, called: false, n_called: 0, throws: false, calls: []};
    var f = mod[fname];
    var f_old = generateFunName(mod.prototype);
    mod[f_old] = f;

    /*
    * @id f_aux
    */
    var f_aux = function(){
        console.log('Executing new '+fname);
        var args_f_aux = arguments;
        try{
            var res = f.apply(thisobj, args_f_aux);
            f_spy.args = args_f_aux;
            f_spy.called = true;
            f_spy.calls[f_spy.n_called] = f_spy.args;
            f_spy.n_called++;
            if(f_spy.n_called === ntimes){
                mod[fname] = mod[f_old];
                mod[f_old] = undefined;
            }
            return res;
        } catch (e){
            f_spy.throws = true;
        }
    }
    mod[fname] = f_aux;
    return f_spy;
}

function expect(spyInfo){
    return {
        toHaveBeenCalledWith: function(){
            var actual_args = spyInfo.args;
            var expected_args = arguments;
            assertEqualsArray(actual_args, expected_args);
        },
        notToHaveBeenCalled: function(){
            assertFalse(spyInfo.called);
        },
        toHaveBeenCalledTimes: function(n){
            assertEquals(n, spyInfo.n_called);
        }
    }
}

function waitToBeCalledTimes(spyInfo, n){
    if(!n) n = 1;
    return new Promise((resolve) => {
        function scheduleCheck(){
            __ES__schedule(checkMock);
        }
        function checkMock(){
            if(spyInfo.n_called >= n){
                resolve();
            }else{
                scheduleCheck();
            }
        }
        scheduleCheck();
    });
}

function waitToBeCalledWith(spyInfo, argsarr){
    return new Promise((resolve) => {

        function scheduleCheck(){
            __ES__schedule(checkMock);
        }

        function checkMock(){
            var actual_args = spyInfo.args;
            try{
                assertEqualsArray(argsarr, actual_args);
                resolve();
            } catch (e){
                scheduleCheck();
            }
        }
        scheduleCheck();
    });
}

function expectToThrow(f){
    try{
        f();
    } catch (err) {}
}

function expectNotToThrow(f){
    try{
        f()
    } catch (e) { throw e }
}

/*
* @id expectToEqual
*/
function expectToEqual(actual, expected){
    if (!(assertDeepEqual(actual, expected))) throw new Error("Actual value ("+actual+") different from expected ("+expected+")");
}

function expectToBeInstanceOf(obj, mod){
    if(!(obj instanceof mod)){
        throw new Error("Object "+obj+" not instance of "+mod);
    } 
}

function expectToEqualArray(actual, expected){
    return assertEqualsArray(actual, expected);
}

function asMock(mod, fname){ 
    return {
        mockReturnValue: function(val){
            var f = mod[fname];
            mod[fname] = function(){
                if(f) f();
                return val;
            }
        }
    }
}

function generateFunName(obj){
    var f_name = "";
    for(const prop in obj){
        f_name = f_name + prop;
    }
    return f_name;
}

function fn(){ return () => {} };

export { spyOn, expect, expectToThrow, expectNotToThrow, expectToEqual, asMock, expectToEqualArray, fn, waitToBeCalledTimes, waitToBeCalledWith, expectToBeInstanceOf };