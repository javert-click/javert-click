// https://stackoverflow.com/questions/61384695/using-async-await-with-events

const DOM                = initDOM();
const Promise            = initPromise().Promise;

var document             = new DOM.Document.Document();
var elem1                = document.createElement("div");

document.appendChild(elem1);

elem1.addEventListener('line', async(line) => {
    console.log('start line');
    await both();
    console.log('end line');
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
    var ap = [];
    ap.push(one());
    ap.push(two());
    console.log('processing line');
    await Promise.all(ap);
    console.log('line processed');
}

elem1.dispatchEvent(new DOM.Event.Event('line'));
elem1.dispatchEvent(new DOM.Event.Event('line'));
