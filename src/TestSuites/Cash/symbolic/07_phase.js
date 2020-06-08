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

var maxLength = 1;

/* 
 * If an event was turned on for one use, then the same event can be triggered once
 * Length limit: 1
 * No namespaces
 *
 * @id mochaOffTwoSymbolicEvents
 */
describe ( '$.fn.on', function () {
    it ( 'trigger same, setup event', 
    /* @id offTwoSymbolicEvents */
    function () {

        var test;

        var ele = $('.event');
        var parent = $('.parent');
        var count = 0;

        /* @id handler */
        function handler () {
          if (count++ === 1) return false
        }

        // Setup symbolic events
        var e1 = symb_string(e1);
        constrainStringLength(e1, 0, maxLength); no_char(e1, '.'); no_char(e1, ' '); no_bugs(e1);

        var e2 = symb_string(e2);
        constrainStringLength(e2, 0, maxLength); no_char(e2, '.'); no_char(e2, ' '); no_bugs(e2);

        // The events are different
        var diff = (e1 !== e2);
        JavertAssume(diff);

        // Attach handlers via parent
        parent.on (e1, '.event', handler);
        parent.on (e2, '.parent', handler);

        // Correct pre-test values
        test = (count === 0);
        JavertAssert(test);

        // Trigger e1 on the parent 
        parent.trigger(e1);

        // Nothing happened
        test = (count === 0);
        JavertAssert(test);
        
        // Trigger e1 on the element 
        ele.trigger(e1);

        // e1 triggered if non-empty
        test = (count === 1 && e1 !== "") ||
               (count === 0 && e1 === "");
        JavertAssert(test);

        // Fire e2 on the element
        ele.trigger(e2);
        
        // e2 triggered if non-empty
        test = (count === 2 && (e1 !== "" && e2 !== "")) ||
               (count === 1 && (e1 === "" || e2 === ""));
        JavertAssert(test);
    });
});