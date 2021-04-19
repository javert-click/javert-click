var p;

/*
* @id h1
*/
function h1(){
    p = {name: 'Mary'};
}

/*
* @id h2
*/
function h2(){
    console.log(p.name);
}

__ES__wrapper__addHandler("click", "h1");
__ES__wrapper__addHandler("focus", "h2");
__ES__wrapper__aDispatch(1.0, "focus");
__ES__wrapper__sDispatch("click");