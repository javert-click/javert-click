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
 * Correctness of event triggering
 * Length limit: 20
 */
var maxLength = 20;

/*
 * @id mochaSingleAttach 
 */
describe ( '$.fn.on', function () {
    it ( 'coverage testing', 
    /* @id singleAttach */
    function () {

        var triggeredEvents, test;

        var ele = $('.event');
        var count = 0;

        /* @id handler */
        function handler () {
          count++
        }

        // Setup first symbolic event
        var e1 = symb_string(e1);
        constrainStringLength(e1, 0, maxLength);
        no_char(e1, '.'); no_char(e1, ' ');
        
        // Attach handler to e1
        ele.on(e1, handler);  

        var e2 = symb_string(e2);
        constrainStringLength(e2, 0, maxLength);
        no_char(e2, '.'); 

        // Correct pre-test values
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (count === 0) && (triggeredEvents === 0);
        JavertAssert(test);

        // Fire e2
        ele.trigger(e2);
        
        // The event is guaranteed to be triggered 
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (count === triggeredEvents) && 
                ((count === 1 && e1 === e2 && e1 !== "") ||
                 (count === 0 && (e1 !== e2 || e1 === "")));
        JavertAssert(test);
    });
});