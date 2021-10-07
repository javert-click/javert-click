onmessage = function(evt)
{
    for (var i=0; true; i++)
    {
        if (i%4 == 0)
        {
            postMessage(i);
        }
    }
}