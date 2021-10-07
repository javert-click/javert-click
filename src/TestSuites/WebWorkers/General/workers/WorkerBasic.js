/*var result = "Fail";

onmessage = function(evt)
{
    result = "Pass";
    postMessage(result);
}*/

function s(){
    var result = "Fail";

    onmessage = function(evt)
    {
      result = "Pass";
      postMessage(result);
    }
}
s();
module.exports = s;