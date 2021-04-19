const DOM                = initDOM();
const Promise            = initPromise().Promise;

var document             = new DOM.Document.Document();
var tagName1             = symb_string(tagName1);
var tagName2             = symb_string(tagName2);
var elem1                = document.createElement(tagName1);

document.appendChild(elem1);

var p = new Promise(function(resolve, reject){
    elem1.addEventListener("click", function(){
        resolve('div clicked');
    })
});

p.then((value) => {
    console.log('executing handler');
    var elem2 = document.createElement("tagName2");
    document.appendChild(elem2);
    console.log('did second append');
    // expected output: "Success!"
});

var event_type = symb_string(event_type);
elem1.dispatchEvent(new DOM.Event.Event(event_type));
