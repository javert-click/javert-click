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

var maxLength = 20;

/* 
 * If an event was turned on for one use, then the same event can be triggered once
 * Length limit: 10
 *
 * @id mochaOffTwoSymbolicEvents
 */
describe ( '$.fn.on', function () {
    it ( 'trigger same, setup event', 
    /* @id offTwoSymbolicEvents */
    function () {

        var triggeredEvents, test;

        var ele = $('.event');
        var count = 0;

        /* @id handler */
        function handler () {
          count++
        }

        // Setup symbolic events
        var e1 = symb_string(e1);
        constrainStringLength(e1, 0, maxLength); no_char(e1, '.'); no_char(e1, ' '); no_bugs(e1);

        // Attach handlers via object
        var on_obj = { }; on_obj[e1] = handler; 
        ele.on(on_obj);

        // Correct pre-test values
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (count === 0) && (triggeredEvents === 0);
        JavertAssert(test);

        // Fire and switch off gradually
        ele.trigger(e1);
        
        // Test
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (count === triggeredEvents) && 
               ((count === 1 && e1 !== "") || (count === 0 && e1 === ""));
        JavertAssert(test);

        // Switch off
        ele.off();
        
        // Trigger
        ele.trigger(e1);

        // Test
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (count === triggeredEvents) && 
               ((count === 1 && e1 !== "") || (count === 0 && e1 === ""));
        JavertAssert(test);
    });
});