var DOM        = initDOM();
var HTMLFiles  = initHTMLFiles();
var docload    = initDocumentLoading(DOM, HTMLFiles);

var mocha       = initMocha();
var describe    = mocha.describe;
var it          = mocha.it;

var document    = docload.loadDocument("cash_events.html"); 
var window      = new DOM.Window.Window();
var $           = initCash(document, window);

/* @id constrainStringLength */
function constrainStringLength(e, a, b) {

  for (var i = a; i <= b; i++) {
    var constraint = e.length === i;
    JavertBranch(constraint);
  };

  var lb = a <= e.length; JavertAssume(lb);
  var ub = e.length <= b; JavertAssume(ub);
}

/* @id no_char */
function no_char(s, c) {
  var constraint = true 
  for (var i = 0; i < s.length; i++) {
    constraint = (s[i] !== c);
    JavertAssume(constraint)
  }
}

/* @id no_bugs */
function no_bugs(s) {
  var constraint = true;
  var bugs = [ 'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf',
               'focus', 'focusin', 'blur', 'focusout', 'mouseover', 'mouseenter', 'mouseout', 'mouseleave' ];
  for (var i = 0; i < bugs.length; i++) {
    constraint = (s !== bugs[i]);
    JavertAssume(constraint)
  }
}

/* 
 * Triggering obscure corner cased of the cash event semantics
 * by creating a manual focus event object 
 *
 * @id mochaFocus
 */
describe ( '$.fn.on', function () {
    it ( 'ready', 
    /* @id ready */
    function () {

        var count = 0;

        /* @id  */
        function testReady () { 
          count++;
          return undefined;
        }

        document.readyState = "loading";
        $(testReady);
        document.readyState = "complete";
        $(testReady);

        var triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        var test = (triggeredEvents === 0) && (count === 1);
        JavertAssert(test);
    });
});