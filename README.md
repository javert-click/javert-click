# JaVerT.Post: Symbolic Analysis of Message-Passing Web Applications

JaVerT.Post is the first symbolic execution tool for Message-Passing Web Programs calling the [WebMessaging](https://html.spec.whatwg.org/multipage/web-messaging.html) and [WebWorkers](https://html.spec.whatwg.org/multipage/workers.html) APIs.

## Starting the Artifact via [Docker](https://docs.docker.com/)
The artifact is a .zip file available [here](https://www.dropbox.com/s/wbpvsgtcspvz0z1/javert-post.zip?dl=0).

Please make sure to have [Docker](https://docs.docker.com/) installed. We recommend using the following configuration: 2 CPUs, Memory 10GB , Swap 1GB and Disk image size 59.6 GB.

1. Download the .zip file.
2. `cd javert-post` [javert-post being the extracted folder from the .zip file]
3. `docker build --tag javert-post .` [builds the docker image]
4. `docker run -it javert-post` [activates the container in interactive mode]
5. `cd javert-post` [navigates to the `javert-post` folder inside the container]
6. `make` [builds JaVerT.Post]
7. `./scripts/setup_environment.sh` [creates the environment folder]
8. `cd environment` [JaVerT.Post should always be invoked from the environment folder]

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

## Running JaVerT.Post

We provide the `mp.sh` script for running JavaScript programs calling the WebMessaging and WebWorkers APIs.

### Usage

```
./mp.sh [file] [--workers]
```

Please make sure to invoke JaVerT.Post from the `environment` folder. The `file` parameter must be the JavaScript file to be analysed and the `--workers` flag informs whether or not the program creates worker threads.\
**Example**: the following command will execute the `Channel_postMessage_clone_port_error.js` test of the WebMessaging test suite

```
./mp.sh ./TestSuites/WebMessaging/general/Channel_postMessage_clone_port_error.js
```

and the following output should be printed to the console:
```
-----Running ./TestSuites/WebMessaging/general/Channel_postMessage_clone_port_error.js-----
NUMBER OF ASSERTS CHECKED: 1
--Passing: 1
--Failing: 0
TEST PASSED
```

## Running the Test Suites

Here we show how to reproduce the results described in our paper.

### Testing the APIs

We present the testing results for the four APIs below (Table 1 of evaluation section):

|                              | WebMessaging  | WebWorkers  |
|------------------------------|---------------|---------------|
| **Available Tests**          | 121           | 269        |
| **Filtered Tests**           | 30             | 111            | 
| **Applicable Tests**         | 91           | 158        | 
| **Passing Tests**            | 91           | 158         | 

We provide detailed information about the test filtering process in appendix. In order to run the applicable tests of WebMessaging and WebWorkers in JaVerT.Post, run the following commands (from the `environment` folder): 

```
./webmessagingtestsuite.sh
./webworkerstestsuite.sh
```

JaVerT.Post prints progress messages; we estimate the execution to take approximately **240 minutes** for WebMessaging (`webmessagingtestsuite.sh`) and **500 minutes** for WebWorkers (`webworkerstestsuite.sh`).
The test results will be printed to the console, but we print more detailed results to the files `result_wm.txt` and `result_workers.txt` (respectively corresponding to the WebMessaging and WebWorkers test suites) located in the environment folder.

### Testing the `webworker-promise` Library

We analyse [`webworker-promise`](https://github.com/kwolfy/webworker-promise), a promise-wrapper over the WebMessaging and WebWorkers APIs. 
Our analysis has revealed three previously unknown bugs in `webworker-promise` related to a null dereference, an overlooked prototype inheritance and JS dynamic typing.

The reported results (Table 2, section 6.2) are obtained on a machine with an Intel Core i7 CPU 2.5 GHz, DDR3 RAM 16GB, and a 256GB solid-state hard-drive running OSX. Note that, in Table 2, we show the results for seven tests only (we do not include `EmitOnce`, `PoolError` and `Operation`), while here we show the results for the whole test suite. To run the test suite, please execute the following command:

```
./webworkerpromisetestsuite.sh
```

JaVerT.Post prints progress messages; the execution should take approximately **55 minutes**. Our current results, given below, are different from the ones reported in terms of the number of commands for the following symbolic tests: `EmitOn`, `EmitOff`, `PoolLimit` and `Operation`. The number of commands is measured at the JSIL (intermediate language for JavaScript) level. This difference is due to minor refactorings performed in those tests. This table will be updated in the version of the paper accordingly.

This is the current breakdown:

| **Test Name**          | `Mirror`    | `Terminate`     | `Error`     | `EmitOn`     | `EmitOff`      |  `EmitOnce`  | `PoolSend`  |  `PoolError`   |  `PoolLimit`  |   `Operation`  |
|----------------------------|--------------|--------------------|--------------|-----------------|------------------|------------------|----------------- |-------------------|------------------|----------------|
| Time                         | 1m32s     | 0m45s            | 1m39s     |  5m33s        | 5m35s         |  10m13s       |  3m8s          |  2m3s             |  12m36s      |   14m44s   |
| #JSIL Cmds    | 316,500   | 151,396          |  319,608  |  1,181,553   | 1,088,310    |   1,898,784   |   377,745    |   502,257        |  1,722,600   |   2,011,518  |

Note that in the symbolic tests `Mirror`, `EmitOn`, `EmitOff`, `EmitOnce` and `PoolLimit`, JaVerT.Post finds failing models, which represent the three bug scenarios described in the paper; the remaining symbolic tests are expected to pass. In the following, we give the failing model(s) expected for each test.

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

This means that, for instance, if the `#msg` symbolic variable defined in `Mirror.js` is given the value `null`, the test assertion fails. The same idea applies to the other failing tests.

To run an individual test, execute 

```
./webworkerpromise.sh [mainfile] [workerfile]
``` 

from the `environment` folder. For instance, the command 
```
/webworkerpromise.sh ./TestSuites/webworker-promise/Mirror.js ./TestSuites/webworker-promise/workers/basicworker.js
``` 
runs the `Mirror.js` test.



