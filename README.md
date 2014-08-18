lmfit.js
========

JavaScript (emscripten) port of lmfit library:

"a self-contained C library for Levenberg-Marquardt least-squares minimization and curve fitting" (quote http://apps.jcns.fz-juelich.de/doku/sc/lmfit)

See some live [examples](https://m0ose.github.io/lmfit.js/test2.html)

usage:
=====

```
// this is the function used to fit the data
  var fitfunct = function(t, p) {
    return Math.sin(t*p[0])// note this only uses p[0]. That is because the number of paramenters for this function is 1
  }

// assemble an object to be fit. 
  var data = {
    f: fitfunct,// fitting function. 
    n: 1, // number of parameters the fit function takes
    par: new Float64Array([1.4]), // best guess for parameter or parameters
    m: dataInT.length, // number of elements in data 
    t: new Float64Array(dataInT), // x axis data
    y: new Float64Array(dataInY) // y axis data
  }

  var res = lmfit(data) // the dirty work
  console.log(res) // res will return give you a good parameter

```
the result will look like 
```
[1.9027810350977]
```

look for more examples in the test2.html source code. 

