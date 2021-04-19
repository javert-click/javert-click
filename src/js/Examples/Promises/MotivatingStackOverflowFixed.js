const DOM                = initDOM();
const Promise            = initPromise().Promise;

var document             = new DOM.Document.Document();
var elem1                = document.createElement("div");

document.appendChild(elem1);

const lineEventsToProcess = [];
var bothRunning = false;

elem1.addEventListener('line', async(line) => {
    lineEventsToProcess.push(line);
    if (!bothRunning) {
        both();
    }
})

function one(){
    return new Promise((resolve, reject) => {
        resolve('one');
    });
}

function two(){
    return new Promise((resolve, reject) => {
        resolve('two');
    });
}

async function both(){
    bothRunning = true;

    while(lineEventsToProcess.length > 0) {
        console.log('start line');
        var ap = [];
        ap.push(one());
        ap.push(two());
        console.log('processing line');
        await Promise.all(ap);
        console.log('line processed');
        lineEventsToProcess.splice(0, 1);
        console.log('end line');
    }
    bothRunning = false;
}

elem1.dispatchEvent(new DOM.Event.Event('line'));
elem1.dispatchEvent(new DOM.Event.Event('line'));
