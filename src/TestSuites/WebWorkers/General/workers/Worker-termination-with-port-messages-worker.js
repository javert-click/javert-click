function echo(evt)
{
    evt.target.postMessage(evt.data);
}

onmessage = function(evt)
{
    console.log('WORKER: got message '+evt.data);
    evt.ports[0].onmessage = echo;
    evt.ports[0].start();
}