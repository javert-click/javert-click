const DOM                = initDOM();
const Event              = DOM.Event;
const CustomEvent        = DOM.CustomEvent;
const Document           = DOM.Document;
const Text               = DOM.Text;
const MouseEvent         = DOM.MouseEvent;
const KeyboardEvent      = DOM.KeyboardEvent;
const UIEvent            = DOM.UIEvent;
const Performance        = DOM.Performance;
const ArrayUtils         = DOM.ArrayUtils;

const Promise            = initPromise().Promise;
var HTMLFiles            = initUIEventsFiles();
var docload              = initDocumentLoading(DOM, HTMLFiles);
var document             = docload.loadDocument("EventTimestampSafeResolution.html");
var window               = DOM.window;
var self                 = window.clone();
var testharness          = initTestHarness(DOM, Promise, this);
var performance          = new Performance.Performance();
window.document 		 = document;
document.browsingContext = window;


'use strict';

// Computes greatest common divisor of a and b using Euclid's algorithm
function computeGCD(a, b) {
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error('Parameters must be integer numbers');
  }

  var r;
  while (b != 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return (a < 0) ? -a : a;
}

// Finds minimum resolution Δ given a set of samples which are known to be in the form of N*Δ.
// We use GCD of all samples as a simple estimator.
/* @id eMR */
function estimateMinimumResolution(samples) {
  var gcd;
  for (var i = 0; i < samples.length; i++) {
    const val = samples[i];
    gcd = gcd ? computeGCD(gcd, val) : val;
  }

  return gcd;
}

testharness.
test(function() {
  const samples = [];
  for (var i = 0; i < 100; i++) {
    var deltaInMicroSeconds = 0;
    const e1 = new MouseEvent.MouseEvent('test1');
    do {
      const e2 = new MouseEvent.MouseEvent('test2');
      deltaInMicroSeconds = Math.round((e2.timeStamp - e1.timeStamp) * 1000);
    } while (deltaInMicroSeconds == 0) // only collect non-zero samples
    samples.push(deltaInMicroSeconds);
  }
  const minResolution = estimateMinimumResolution(samples);
  testharness.assert_greater_than_equal(minResolution, 5);
}, 'Event timestamp with resolution better than 5 microseconds');
