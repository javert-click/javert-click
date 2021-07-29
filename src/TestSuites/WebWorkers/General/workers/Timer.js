var count = 0;
var id;

onmessage = function(evt)
{
    try
    {
        switch(evt.data)
        {
            case "TimeoutHandler":
                count = 0;
                //TODOMP: use call below instead with "TimeoutHandler()"
                //id = setTimeout("TimeoutHandler()", 10);
                id = setTimeout(TimeoutHandler, 10);
                postMessage('hello');
                break;
            case "IntervalHandler":
                count = 0;
                //id = setInterval("IntervalHandler()", 10);
                id = setInterval(IntervalHandler, 10);
                postMessage('hello');
                break;
        }
    }
    catch(ex)
    {
        postMessage("Fail");
    }
}

function TimeoutHandler()
{
    count++;
    postMessage("worker");
    //TODOMP: use call below instead with "TimeoutHandler()"
    //id = setTimeout("TimeoutHandler()", 10);
    id = setTimeout(TimeoutHandler, 10);

    if (count >= 2)
    {
        clearTimeout(id);
    }
}

function IntervalHandler()
{
    console.log('IntervalHandler, count: '+count+', id: '+id);

    count++;
    postMessage("worker");

    if (count >= 2)
    {
        clearInterval(id);
    }
}