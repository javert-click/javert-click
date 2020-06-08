# JaVerT.Click: Symbolic Analysis of Event-Driven Web Applications

JaVerT.Click is a symbolic execution tool for JavaScript that, for the first time, supports reasoning about JavaScript programs that manipulate any/all of the DOM Core Level 1, DOM UI Events, JavaScript Promises, and the JavaScript async/await APIs.

## Downloading the Artifact
The artifact is a VirtualBox `.ova` file available [here](https://imperialcollegelondon.box.com/s/mzyevnolk6ts2zx3wdu9ia061votisy4).

### Starting the Artifact
1. Install [Virtual Box](https://www.virtualbox.org/wiki/Downloads) if you haven't got it already.
2. Open Virtual Box.
3. Click on File --> Import Appliance.
4. Select the downloaded `.ova` file.
5. We suggest allocating 8 GB RAM and 4 CPUs, the VM should work with less RAM and fewer CPUs.
6. Select the Virtual Machine and start it up by clicking on the Start arrow.

The VM will start Ubuntu 18.4 LTS. If required, the OS user is `javert-click` and the password is `1234`.

### The Structure of JaVerT.Click
Open the `Terminal` application and navigate to the `~\JavaScriptVerification` folder. 
This is the base folder that contains all of the required infrastructure.

The main folder of interest is the `src` folder, which has the following structure: 

- `js`: JavaScript reference implementations
   - `DOM/CoreLevel1`: DOM Core Level 1 (Section 3.1)
   - `DOM/Events`: DOM UI Events (Section 3.2)
   - `Promises`: Promises (Section 4.1)
- `ml`: OCaml implementation of JaVerT.Click
  - `Events`: The Events Semantics (Section 2)
  - Remaining folders: JaVerT 2.0; the relevant folder for JaVerT.Click is:
    - `GeneralSemantics`: The parametric JaVerT 2.0 interpreter that interacts with the Events Semantics 
- `TestSuites`: Test suites
  - `Cash`: The `cash` library
    - `concrete`: The `cash` concrete test suite (Section 5.2.1)
      - `events/official`: The official `cash` concrete test suite
      - `events/complementary`: Our complementary concrete tests for 100% line coverage
    - `symbolic`: Our `cash` symbolic test suite (Section 5.2.2)
  - `CoreLevel1`: DOM Core Level 1 (Section 5.1)
    - `tests/official`:  Applicable DOM Core Level 1 official tests
    - `tests/complementary`:  Our complementary tests for 100% line coverage
  - `UIEvents`: DOM UI Events (Section 5.1)
    - `tests/filtered_out`: Filtered DOM UI Events official tests, arranged by reason of filtering
    - `tests/official`:  The applicable DOM UI Events official tests
    - `tests/complementary`:  Our complementary tests for 100% line coverage
  - `test262`: Promises and async/await (Section 5.1)
    - `Promises_original`: All Test262 Promises tests
    - `Promises_filtered_out`: Filtered Promises tests, arranged by reason of filtering
    - `Promises_tests`: Applicable Promises tests
    - `AsyncAwait_original`: All Test262 async/await tests
    - `AsyncAwait_filtered_out`: Filtered async/await tests, arranged by reason of filtering
    - `AsyncAwait_tests`: Applicable async/await tests

**Note**: The `async/await` (Section 4.2) mechanism is implemented by transpilation to ES5 Strict + Promises. We also provide our JSParser
project, located in the home folder. More specifically, the transpilation of the `async/await` at `JS_Parser/src/JS2JS.ml`.

### Running the Test Suites

Before running the test suites, execute

```
./scripts/setup_environment.sh
cd environment
./remake.sh
```

to create and move to the `environment` folder. The `js` and the `TestSuites` folders mentioned above are copied into this folder integrally.

#### Testing the APIs

We present the testing results for the four APIs below:

|                              | Core Level 1  | Events        | Promises      | async/await   |
|------------------------------|---------------|---------------|---------------|---------------|
| **Available Tests**          | 527           | 83            | 474           | 86            |
| **Filtered Tests**           | 0             | 27            | 130           | 18            |
| **Applicable Tests**         | 527           | 56            | 344           | 68            |
| **Passing Tests**            | 527           | 56            | 344           | 68            |
|------------------------------|---------------|---------------|---------------| --------------|
| **Test Suite Line Coverage** | 98.14%        | 97.41%        | 98.76%        | N/A           |
| **Number of Untested Lines** | 13            | 8             | 5             | N/A           |
| **Additional Tests**         | 5             | 3             | N/A           | N/A           |

This table differs from the table presented in Section 5.1 in the following ways:

1. For Core Level 1, the test suite line coverage is 98.14%, in the submitted version it was 98.15%; we believe this was a typo.
2. For DOM UI Events, we have used the latest version of the test suite, which has evolved from the one used in the submission. The filtering is now as follows: 2 tests using Ajax features, 6 tests using animation, 1 test using ES6 features, 5 tests using the `postMessage` API, and 13 tests using scrolling (these 27 tests can be inspected in the `TestSuites/UIEvents/tests/filtered_out` folder). The line-coverage of UI Events is different form the one reported in the submitted version of the paper, since that in the submission we simply measured the coverage of the main UI Events dispatch algorithm. We are now measuring the line coverage of all UI Events relevant functions, thereby obtaining a higher coverage. The number of non-covered lines is, nonetheless, the same, as is the number of tests required to complete it.
3. For Promises, there was a typo in the number of filtered tests: 1 test was filtered out for proxies (not 2), meaning 130 tests (not 131) are filtered overall and 344 tests (not 343) are applicable. Additionally, there are four lines in the implementation of the `Promise.allSettled` function that do not get triggered; we have discovered those after refactoring the implementation and discuss them in the note below. We do not provide any complementary tests.
4. For async/await, we are adding 47 tests targeting parsing into applicable tests, as advised by the reviewers. In this test suite, 38 tests are supposed to fail due to them testing for parsing errors; they can all be found in the folder `TestSuites/test262/AsyncAwait_tests/parsing_negative`. We count these 38 failures as passing tests because they are indeed supposed to fail

The version of the paper submitted with the artefact was updated with these new results. In order to reproduce them, run the following command: 

```
./runtestsuites.sh
```

This script will run the four test suites, printing information about its progress; we estimate this process to take approximately one hour.
The main summary can be found in the `testsuite_results.txt` file in `environment/results`. 
A file named `results.txt` will be created in all four test suite folders also, containing the results for the appropriate test suite. 
For example, for DOM Core Level 1 tests, the file in question is `environment/TestSuites/CoreLevel1/tests/official/results.txt`. 

In addition to this script, we provide scripts for running each test suite separately:
-  DOM Core Level 1: `./domcorelevel1testsuite.sh [dir] [optional: coverage]`; the folder containing all of the official tests is `TestSuites/CoreLevel1/tests/official`
-  UI Events: `./domuieventstestsuite.sh [dir] [optional: coverage]`; the folder containing all of the applicable tests is `TestSuites/UIEvents/tests/official`
-  Promises and async/await: `es6testsuite.sh [dir] [optional: coverage]`, the folders containing all of the applicable 
tests are `TestSuites/test262/Promises_tests` and `TestSuites/test262/AsyncAwait_tests`. The coverage parameter is not valid for async/await here, but only for promises.

In the unlikely case that the `./runtestsuites.sh` script fails, please run the scripts for the four test suites individually. For instance, the following command will execute the DOM Core Level 1 official test suite, and provide coverage results:

```
./domcorelevel1testsuite.sh TestSuites/CoreLevel1/tests/official coverage
```

We also provide scripts for running a single test for each of these APIs: `domcorelevel1.sh`, `domuievents.sh`, and `es6.sh`. 
The usage is analogous, with the difference that they take a single file as input instead of a folder. 

For instance, the following command will execute the `CustomEvents.js` test of the UI Events test suite

```
./domuievents.sh TestSuites/UIEvents/tests/official/CustomEvents.js
```

#### Note: Coverage Gaps in `Promise.allSettled`

We refer to the specification of the `Promise.allSettled` function, which is not yet part of the standard and is available [here](https://tc39.es/proposal-promise-allSettled/).
The following are the lines not covered by the test suite, for the following reasons:

- 1. `Promise.allSettled(iterable)`
  - Coverage gap: `p__allSettled: missing lines ['619', '620']`
  - In the specification: Step 5. `IfAbruptRejectPromise(iteratorRecord, promiseCapability)`.
  - Reason: The `GetIterator` function called in step 4 never returns an abrupt completion.
- 1.1. Runtime Semantics: `PerformPromiseAllSettled (iteratorRecord, constructor, resultCapability)`
  - Coverage gap: `p__PerformPromiseAllSettled: missing lines ['645']`
  - In the specification: Step 7. If `IsCallable(promiseResolve)` is `false`, throw a `TypeError` exception.
  - Reason: `promiseResolve` is never not callable.
- 1.3 `Promise.allSettled` Reject Element Functions
  - Coverage gap: `__aux_PromiseAllSettledRejectElement: missing lines ['715']`
  - In the specification: Step 3. If `alreadyCalled.[[Value]]` is true, return `undefined`.
  - Reason: `alreadyCalled.[[Value]]` is never true.

### Testing the `cash` Library

We analyse [`cash`](https://github.com/fabiospampinato/cash), an alternative jQuery library that makes extensive use of DOM UI events. 
Our analysis has revealed two previously unknown bugs in `cash`: one related to overlooked prototype inheritance[^1] and the other to unintended event triggering[^2].

To reproduce the results reported for the `cash` library in Sections 5.2.1 and 5.2.2, run the following command from the `environment` folder:

```
./cash.sh
```

This command will run both the concrete and the symbolic `cash` test suites. The execution should take 45 minutes approximately. 
We also provide scripts that allow one to run the test suites separately (also from the `environment` folder):

-  `cash` official concrete test suite: `./cashconcretetestsuite.sh TestSuites/Cash/concrete/events/official`
-  `cash` complementary tests: `./cashconcretetestsuite.sh TestSuites/Cash/concrete/events/complementary`
-  `cash` symbolic test suite: `./cashsymbolictestsuite.sh`

Finally, we provide the `./cashconcrete.sh [file]` and `./cashsymbolic.sh [file]` scripts that allow one to run each cash concrete/symbolic test separately. 

#### The `cash` Concrete Test Suite
We run the `cash` concrete test suite and measure its line coverage. We focus on the `events` module of `cash`, but we also measure the line coverage of
the entire test suite using [Istanbul](https://istanbul.js.org/) and [Karma](https://karma-runner.github.io/0.8/config/coverage.html). 
The artifact comes with the entire `cash` repository and the script required to generate the full line coverage results. 
We provide these results in `cash/pregenerated_coverage`. 
They can also be generated by running the following command from the `~/cash` folder:

```
npm run test:karma
```

This command will generate a line coverage folder under the `~/cash` directory with an html file describing the line coverage of 
the entire concrete test suite. Please refer to `cash/coverage/index.html`.

The concrete test suite of `cash` targets a number of features; we focus only on the `events` module for 
which there are 18 concrete tests, of which 16 should pass and 2 should fail. 

To run the concrete tests for the `events` module of `cash` in JaVerT.Click, go back to the folder `~/JavaScriptVerification/environment`
and run 

```
./cashconcretetestsuite.sh TestSuites/Cash/concrete/events/official
``` 

This script will also report the line coverage, which matches precisely that reported in Section 5.2.1. The test results are printed to the console and a summary report is stored in the `environment/results/cash_results.txt` file. 


#### The `cash` Symbolic Test Suite
We provide a symbolic test suite for `cash` that contains 8 tests and achieves 100% line coverage of all `cash` event-related functions. To run the symbolic tests, execute the script `cashsymbolictestsuite.sh` in the `environment` folder. Analogously to the concrete case, this script will also report the coverage. The test results are printed to the console and a summary report is stored in the `environment/results/cash_results.txt` file. The coverage should be 100% for all functions listed.

Notice that we run each test twice; one time in multi-threaded mode to measure the time and a second time in single-threaded mode to measure the test coverage and the number of executed commands. We report only the time measured in multi-threaded mode. 

The reported `cash` symbolic test suite are obtained on a machine with an Intel Core i7-4980HQ CPU 2.80 GHz, DDR3 RAM 16GB, and a 256GB solid-state hard-drive running OSX. The running times of the tests are likely to be slower in the artifact, due to the virtual machine environment.

Our current results, given below, are different from the ones reported in the submitted version of the paper, for two reasons:
1. we have reduced the overhead: it is now 4.454 seconds, with 9 lines of code, and 899,390 executed commands; and
2. we have made a number of streamlining changes to the implementation

This is the current breakdown:

| **Test Name**          | `rHand`   | `sHand`    | `tOne`     | `tOff`     | other      | **Total**      |
|------------------------|-----------|------------|------------|------------|------------|----------------|
| Time (s)               | 5.540     | 144.383    | 24.347     |  22.873    | 42.197     | **239.340**    |
| Time with overhead (s) | 9.994     | 148.837    | 28.801     |  27.327    | 60.013     | **274.972**    |
| Commands               | 1,468,907 | 38,240,506 |  9,288,337 |  9,400,471 | 14,150,893 | **72,549,114** |
| Commands with overhead | 2,368,297 | 39,139,896 | 10,187,727 | 10,299,861 | 17,748,453 | **79,744,234** |

This table was updated in the version of the paper submitted with the artifact accordingly.

To run an individual test, execute 

```
./cashsymbolic.sh [file]
``` 

from the `environment` folder.

Note that in the symbolic test `02_sHand.js`, JaVerT.Click finds failing models, which represent the bug scenarios described in the paper; the remaining symbolic tests are expected to pass. This test, described in detail in Section 5.2.2.1, tests that if a single handler has been registered to a given event using `.on`, then that is the only handler that can be triggered for that event. One of the failing models returned by JaVerT.Click is:

```
Assert failed with argument (false == true).
Failing Model:
[(#e1: "focus"), (#e2: "focusin")]
```

and it means that if the symbolic string variables `e1` and `e2` defined in `02_sHand.js` are given the values `"focus"` and `"focusin"`, respectively, the test assertion fails. This, in turn, means that if we register a handler for `focus`, we will be able to trigger it using `focusin`, and similarly for other counter-models.

[^1]: https://github.com/fabiospampinato/cash/issues/317

[^2]: https://github.com/fabiospampinato/cash/issues/318
