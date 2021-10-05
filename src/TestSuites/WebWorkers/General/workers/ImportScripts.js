try
{
    //importScripts('WorkerBasic.js')
    var f = require("./WorkerBasic.js");
    f();
}
catch(ex)
{
    result = "Fail";
    postMessage(result);
}