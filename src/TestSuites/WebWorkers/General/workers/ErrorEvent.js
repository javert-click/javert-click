onmessage = function(evt)
{
    console.log('WORKER: got message '+evt.data);
    throw(new Error(evt.data));
}

onerror = function(message, location, line, col)
{
    console.log('Executing onerror handler!');
    postMessage( {"message": message, "filename": location, "lineno": line, "colno": col} );
    return false; // "not handled" so the error propagates up to the Worker object
}