
// Fisher Yates shuffle

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

// Randomly select a specified number of elements from an array and return them.
// Note that this function recycles if n > array.length, even when replace=false
// Thus, the values will be repeated, but each subset of array.length will
// be sampled without replacement.
function rndSelect(array, n, replace) {
  if (array.length < 1) {
    throw('Array has no elements.');
  }

  if (replace === undefined) {
    replace = false;
  }

  var result = [];

  if (replace){
    for (i = 0; i < n; i++) {
      var ind = Math.floor(Math.random() * array.length);
      result.push(array[ind]);
    }
  } else {
    var repeat = Math.floor(n / array.length);
    var remainder = n % array.length;

    var newArr = [];

    for (i = 0; i < repeat; i++) {
      newArr = shuffle(array);
      result = result.concat(newArr);
      //console.log(i);
    }
    newArr = shuffle(array);
    result = result.concat(newArr.slice(0, remainder));
  }
  return result;
};


/**
 * Copyright 2012 Akseli Palén.
 * Created 2012-07-15.
 * Licensed under the MIT license.
 *
 * <license>
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * </lisence>
 *
 * Implements functions to calculate combinations of elements in JS Arrays.
 *
 * Functions:
 *   k_combinations(set, k) -- Return all k-sized combinations in a set
 *   combinations(set) -- Return all combinations of the set
 */


/**
 * K-combinations
 *
 * Get k-sized combinations of elements in a set.
 *
 * Usage:
 *   k_combinations(set, k)
 *
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 *
 * Return:
 *   Array of found combinations, size of a combination is k.
 *
 * Examples:
 *
 *   k_combinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 *
 *   k_combinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 *
 *   k_combinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 *
 *   k_combinations([1, 2, 3], 4)
 *   -> []
 *
 *   k_combinations([1, 2, 3], 0)
 *   -> []
 *
 *   k_combinations([1, 2, 3], -1)
 *   -> []
 *
 *   k_combinations([], 0)
 *   -> []
 */
function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;

	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}

	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		return [set];
	}

	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	// Assert {1 < k < set.length}

	// Algorithm description:
	// To get k-combinations of a set, we want to join each element
	// with all (k-1)-combinations of the other elements. The set of
	// these k-sized sets would be the desired result. However, as we
	// represent sets with lists, we need to take duplicates into
	// account. To avoid producing duplicates and also unnecessary
	// computing, we use the following approach: each element i
	// divides the list into three: the preceding elements, the
	// current element i, and the subsequent elements. For the first
	// element, the list of preceding elements is empty. For element i,
	// we compute the (k-1)-computations of the subsequent elements,
	// join each with the element i, and store the joined to the set of
	// computed k-combinations. We do not need to take the preceding
	// elements into account, because they have already been the i:th
	// element so they are already computed and stored. When the length
	// of the subsequent list drops below (k-1), we cannot find any
	// (k-1)-combs, hence the upper limit for the iteration:
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
};


/**
 * Combinations
 *
 * Get all possible combinations of elements in a set.
 *
 * Usage:
 *   combinations(set)
 *
 * Examples:
 *
 *   combinations([1, 2, 3])
 *   -> [[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]
 *
 *   combinations([1])
 *   -> [[1]]
 */
function combinations(set) {
	var k, i, combs, k_combs;
	combs = [];

	// Calculate all non-empty k-combinations
	for (k = 1; k <= set.length; k++) {
		k_combs = k_combinations(set, k);
		for (i = 0; i < k_combs.length; i++) {
			combs.push(k_combs[i]);
		}
	}
	return combs;
};

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function recycle (arr, num) {
  // arr should be an array to recycle.
  // num can be either an integer number to recycle to, or an array whose
  // length will be matched.
  if (Array.isArray(num)) {
    num = num.length;
  }

  if (!Array.isArray(arr)) {
    if (typeof arr == "number") {
      arr = [arr];
    } else {
      throw "arr must be an array or a number!";
    }
  }

  if (arr.length < 1) {
    throw "Can't recycle empty array.";
  }

  if (num < 0) {
    throw "num must be 0 or greater.";
  }

  rep = Math.floor(num / arr.length);
  rem = num % arr.length;

  var tempArr = [];
  for (i=0; i < rep; i++) {
    tempArr = tempArr.concat(arr);
  }
  if (rem > 0) {
    tempArr = tempArr.concat(arr.slice(0, rem));
  }
  return tempArr;
};

function randomRecycle (arr, num) {
  // Recycle the array, but randomly choose the last set (smaller than the
  // length of the array) to complete the recycle.
  // arr should be an array to recycle.
  // num can be either an integer number to recycle to, or an array whose
  // length will be matched.
  if (typeof num === 'object') {
    num = num.length;
  }

  if (arr.length == 0) {
    throw Exception('Array of length zero.');
  }

  rep = Math.floor(num / arr.length);
  rem = num % arr.length;

  var tempArr = [];
  for (i=0; i < rep; i++) {
    tempArr = tempArr.concat(arr);
  }
  if (rem > 0) {
    tempArr = tempArr.concat(rndSelect(arr, rem));
  }
  return tempArr;
};

function genSeq (start, end, by) {
  // Generate a sequence of numbers and return it in an array. by defaults to 1
  // Start and end must be supplied, or default to 0 and 1 respectively.
  start = typeof start === "undefined" ? 0 : start;
  end = typeof end === "undefined" ? 1 : end;
  by = typeof by === "undefined" ? 1 : by;

  var nextElement = start;
  var retVal = [];

  if (start < end) {
    while (nextElement <= end) {
      retVal.push(nextElement);
      nextElement = nextElement + by;
    }
  } else if (end < start) {
    while (nextElement >= end) {
      retVal.push(nextElement);
      nextElement = nextElement - by;
    }
  } else if (end == start) {
    retVal = [start];
  }

  return(retVal);
}

function prod (arr) {
  // Compute the product of all elements in an array.
  var multiply = function (a, b) {
    return(a * b);
  }
  var retVal = arr.reduce(multiply);
  return(retVal);
}

function lengths (arr) {
  // return an array containing the lenths of each element of arr.
  var arrL = arr.length;
  var retVal = [];
  for (i = 0; i < arrL; i++) {
    retVal.push(arr[i].length);
  }
  return (retVal);
}

function repInt (x, times) {
  // Replicates each element of x 'times' times if times.length == x.length.
  // If times is a number, then repeat the whole vector 'times' times.
  if (!Array.isArray(x)) {
    x = [x];
  }



  var i = 0;
  var retArr = [];

  if (Array.isArray(times)) {
    if (times.length == x.length) {

      var tempArr = [];
      var num, val;
      var a=0;

      for (i = 0; i < x.length; i++) {
        tempArr = [];
        num = times[i];
        val = x[i];
        for (a = 0; a < num; a++) {
          tempArr.push(val);
        }
        retArr = retArr.concat(tempArr);
      }
    } else {
      throw "times and x must be same length if both are arrays."
    }
  }

  if (typeof times == "number") {
    for (i = 0; i < times; i++) {
      retArr = retArr.concat(x);
    }
  }

return(retArr);
}


function expandGrid (factorArr, format) {
  // factorList should be an array of arrays. Each element should correspond
  // to a factor, and the elements of each factor array should be the levels of
  // the factor. This function returns an array of arrays. Each array in the
  // returned array contains levels of the iteration of the expanded factors.
  // Based on the R function expand.grid()
  // format should be a character string of either "wide" or "long". If wide,
  // (default) then the result is returned as an array of arrays, each of which
  // has length equal to the number of factors, and represents a single
  // combination. If set to anything else, the result is an array of length
  // equal to the number
  // of factors, and each element is an array containing the varying levels.

  // default
  format = typeof format == "undefined" ? "wide" : format;
  var nargs = factorArr.length;
  if (nargs == 1) {
    factorArr = factorArr[0];
    nargs = factorArr.length;
  }
  if (nargs == 0) {
    return([]);
  }
  var x, nx, i, a, repFacTimes, whichElements, newX;
  var cargs = [];
  var repFac = 1;
  var d = lengths(factorArr);
  var oRep = prod(d);
  if (oRep == 0) {
    throw "All factors must have more than 0 levels."
  } else {
    for (i=0; i < nargs; i++) {
      x = factorArr[i];
      newX = [];
      nx = x.length;
      oRep = oRep / nx;
      repFacTimes = repInt(repFac, nx);
      whichElements = repInt(genSeq(0, nx-1), repFacTimes);
      whichElements = repInt(whichElements, oRep);
      for (a = 0; a < whichElements.length; a++) {
        //debugger;
        newX.push(x[whichElements[a]]);
      }
      cargs[i] = newX;
      repFac = repFac * nx;
    }
  }
// Put them all in the right format.

if (format == "wide") {
  var newCargs = [];
  var tempArr = [];
  for (i = 0; i < cargs[0].length; i++) {
    tempArr = [];
    for (a = 0; a < cargs.length; a++) {
      tempArr[a] = cargs[a][i];
    }
    newCargs[i] = tempArr;
  }
  cargs = newCargs;
}

return(cargs);
}

// Add indexOf if it is not in there.
if(![].indexOf){
    Array.prototype.indexOf= function(what, i){
        i= i || 0;
        var L= this.length;
        while(i< L){
            if(this[i]=== what) return i;
            ++i;
        }
        return -1;
    }
    Array.prototype.lastIndexOf= function(what, i){
        var L= this.length;
        i= i || L-1;
        if(isNaN(i) || i>= L) i= L-1;
        else if(i< 0) i += L;
        while(i> -1){
            if(this[i]=== what) return i;
            --i;
        }
        return -1;
    }
}
