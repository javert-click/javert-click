const WindowInfo = require('../../../../js/DOM/Events/Window');
const window = WindowInfo.getInstance();

if (window.opener)
{
    window.onload = function()
    {
        try
        {
            window.opener.postMessage("MSG_ONLOAD_FIRED", "*");
        }
        catch(ex)
        {
            window.close();
        }
    }
}

//TODOMP: window.onmessage!
onmessage = function(e)
{
   // console.log('IFrame: running window.onmessage, msg: '+e.data);
   // console.log('IFrame: e.ports '+e.ports.toString());
    try
    {
        if (typeof(e.data) == "object" && typeof(e.data.test) == "string")
        {
            console.log('IFrame: going to send message to main, e.source.__port: '+e.source.__port);
            //TODOMP:
            //eval(e.data.test);
            e.source.postMessage(e.ports.toString(), "*", e.ports);
        }
        else if (e.data == "*" || e.data == "/")
        {
            e.source.postMessage(e.data, e.data);
        }
        else
        {
            e.source.postMessage(e.data, e.origin);
        }

        if (e.data == "ports")
        {
            console.log('IFrame: got message ports. Length: '+e.ports.length);
            var total = e.ports.length;
            for (var i=0; i<total; i++)
            {
                e.ports[i].onmessage = function (evt)
                {
                    console.log('IFrame: sending message '+evt.data+' to main.');
                    evt.target.postMessage(evt.data);
                }
            }
        }
    }
    catch(ex)
    {
    }
}

console.log('IFrame: finished script');