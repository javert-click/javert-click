# JaVerT.Post: Symbolic Analysis of Message-Passing Web Applications

JaVerT.Post is the first symbolic execution tool for Message-Passing Web Programs calling the [WebMessaging](https://html.spec.whatwg.org/multipage/web-messaging.html) and [WebWorkers](https://html.spec.whatwg.org/multipage/workers.html) APIs.

## Starting the Artifact via [Docker](https://docs.docker.com/)
The artifact is a .zip file available [here](INSERT LINK HERE).

Please make sure to have [Docker](https://docs.docker.com/) installed. We recommend using the following configuration: 2 CPUs, Memory 10GB , Swap 1GB and Disk image size 59.6 GB.

1. Download the .zip file.
2. `cd javert-post` [javert-post being the extracted folder from the .zip file]
3. `docker build --tag javert-post .` [builds the docker image]
4. `docker run -it javert-post` [activates the container in interactive mode]
5. `cd javert-post` [navigates to the `javert-post` folder inside the container]
6. `make` [builds JaVerT.Post]
7. `./scripts/setup_environment.sh` [creates the environment folder]
8. `cd environment`

## The Structure of JaVerT.Post
The `~\javert-post` folder is the base folder that contains all of the required infrastructure.

The main folder of interest is the `src` folder, which has the following structure: 

- `js`: JavaScript reference implementations
   - DOM, Promises: Provided by JaVerT.Click. The DOM reference implementation is used by WebMessaging and WebWorkers
   - `MessagePassing/WebMessaging`: WebMessaging API (Section 4)
   - `MessagePassing/WebWorkers`: WebWorkers API (Section 5)
- `ml`: OCaml implementation of JaVerT.Post
  - `MessagePassing`: The Message-Passing Semantics (Section 3)
  - Remaining folders: JaVerT.Click; the relevant folder for JaVerT.Post is:
    - `Events`: The parametric Event Semantics that interacts with the Message-Passing Semantics 
- `TestSuites`: Test suites
  - `WebMessaging`: WebMessaging applicable tests (Section 6.1)
  - `webworker-promise`: The `webworker-promise` library. Contains our symbolic test suite (Section 6.2)
  - `WebWorkers`: WebWorkers applicable tests (Section 6.1)

## Running the Test Suites

### Testing the APIs

We present the testing results for the four APIs below:

|                              | WebMessaging  | WebWorkers  |
|------------------------------|---------------|---------------|
| **Available Tests**          | 121           | 269        |
| **Filtered Tests**           | 30             | 111            | 
| **Applicable Tests**         | 91           | 158        | 
| **Passing Tests**            | 91           | 158         | 

In order to reproduce these results, run the following commands (from the `environment` folder): 

```
./webmessagingtestsuite.sh
./webworkerstestsuite.sh
```

These commands will run all the applicable tests for the WebMessaging and WebWorkers APIs, printing information about its progress; we estimate this process to take approximately **240** minutes for WebMessaging and **500** minutes for WebWorkers.
The test results will be printed to the console, but we provide the full result in the files `result_wm.txt` and `result_workers.txt` (respectively corresponding to the WebMessaging and WebWorkers test suites) in the environment folder.

We also provide the `mp.sh` script for running a single test for each of these APIs. 
The usage is analogous, with the difference that they take a single file as input instead of a folder. 

For instance, the following command will execute the `Channel_postMessage_clone_port_error.js` test of the WebMessaging test suite

```
./mp.sh TestSuites/WebMessaging/general/Channel_postMessage_clone_port_error.js
```

### Testing the `webworker-promise` Library

We analyse [`webworker-promise`](https://github.com/kwolfy/webworker-promise), a promise-wrapper over the WebMessaging and WebWorkers APIs. 
Our analysis has revealed three previously unknown bugs in `webworker-promise` related to a null dereference, an overlooked prototype inheritance and JS dynamic typing.

The reported results (Table 2, section 6.2) are obtained on a machine with an Intel Core i7 CPU 2.5 GHz, DDR3 RAM 16GB, and a 256GB solid-state hard-drive running OSX. Note that we show the results for seven tests in Table 2 (we do not include `EmitOnce`, `PoolError` and `Operation`). We provide the results for the whole test suite in appendix. To reproduce the results, please run the following command:

```
./webworkerpromisetestsuite.sh
```

This command will run the symbolic test suite of `webworker-promise`. The execution should take **55** minutes approximately. Our current results, given below, are different from the ones reported in terms of the number of commands of the following symbolic tests: `EmitOn`, `EmitOff`, `PoolLimit` and `Operation`. This is due to minor refactorings performed in the tests during the last few days. This table will be updated in the version of the paper accordingly.

This is the current breakdown:

| **Test Name**          | `Mirror`    | `Terminate`     | `Error`     | `EmitOn`     | `EmitOff`      |  `EmitOnce`  | `PoolSend`  |  `PoolError`   |  `PoolLimit`  |   `Operation`  |
|----------------------------|--------------|--------------------|--------------|-----------------|------------------|------------------|----------------- |-------------------|------------------|----------------|
| Time                         | 1m32s     | 0m45s            | 1m39s     |  5m33s        | 5m35s         |  10m13s       |  3m8s          |  2m3s             |  12m36s      |   14m44s   |
| #JSIL Commands    | 316,500   | 151,396          |  319,608  |  1,181,553   | 1,088,310    |   1,898,784   |   377,745    |   502,257        |  1,722,600   |   2,011,518  |

Note that in the symbolic tests `Mirror`, `EmitOn`, `EmitOff`, `EmitOnce` and `PoolLimit`, JaVerT.Post finds failing models, which represent the three bug scenarios described in the paper; the remaining symbolic tests are expected to pass. In the following, we give the failing model expected for each test.

#### Mirror.js: Null Dereference Bug (Bug#1 of Section 6.2.2)
```
Assert failed with argument False.
Failing Model: 
         [(#msg: null)]
```

#### EmitOn.js, EmitOff.js, EmitOnce.js: Prototype Inheritance Bug (Bug #2 of Section 6.2.2)
```
Assert failed with argument False.
Failing Model:
	[(#event: "valueOf")]

Assert failed with argument False.
Failing Model:
	[(#event: "toString")]

Assert failed with argument False.
Failing Model:
	[(#event: "toLocaleString")]

Assert failed with argument False.
Failing Model:
	[(#event: "propertyIsEnumerable")]

Assert failed with argument False.
Failing Model:
	[(#event: "isPrototypeOf")]

Assert failed with argument False.
Failing Model:
	[(#event: "hasOwnProperty")]

Assert failed with argument False.
Failing Model:
	[(#event: "constructor")]
```

#### PoolLimit.js: Dynamic Typing Bug (Bug #3 of Section 6.2.2)
````
Assert failed with argument ((2. <= #maxthreads) == true).
Failing Model:
	[(#maxthreads: 1.5)]

Assert failed with argument ((1. <= #maxthreads) == true).
Failing Model:
	[(#maxthreads: 0.5)]
````

This means that, for instance, if the `#msg` symbolic variable defined in `Mirror.js` is given the value `null`, the test assertion fails. The same idea is valid for the other tests failing.

To run an individual test, execute 

```
./webworkerpromise.sh [mainfile]  [workerfile]
``` 

from the `environment` folder. For instance, the command 
```
/webworkerpromise.sh ./TestSuites/webworker-promise/Mirror.js ./TestSuites/webworker-promise/workers/basicworker.js
``` 
runs the `Mirror.js` test.



