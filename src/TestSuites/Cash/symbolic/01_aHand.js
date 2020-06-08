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
 * Nothing can be triggered if nothing has been turned on
 * Length limit: 20
 */ 
var maxLength = 20;
 
/*
 * @id mochaNoEvent
 */
describe ( '$.fn.on', function () {
    it ( 'no event can be triggered', 
    /* @id noEvent */
    function () {

        var triggeredEvents, test;

        var ele = $('.event');

        // Setup symbolic events
        var e = symb_string(e1);
        constrainStringLength(e, 0, maxLength); 
        no_char(e, '.'); 

        // No events are triggered 
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (triggeredEvents === 0);
        JavertAssert(test);

        // Trigger e
        ele.trigger(e);
        
        // No events are triggered 
        triggeredEvents = DOM.EventTarget.EventTarget.prototype.triggeredEvents;
        test = (triggeredEvents === 0);
        JavertAssert(test);
    });
});
