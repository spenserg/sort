var _fibset = {0:1,1:1};

/*
*  NUMBERS
*/

function pi_nth_digit(n) {
  if (n == undefined || n < 0) { n = 10; }
  var result = 4 * (Math.atan(1 / 5) * 4 - Math.atan(1 / 239));
  return result.toFixed(n);
}

function e_nth_digit(n) {
  if (n == undefined || n < 0) { n = 10; }
  var result = 0.0;
  for (var i = 0; i < (n < 10 ? 10 : n); i++) {
    result += (2 * i + 2) / factorial(2 * i + 1);
  }
  return result.toFixed(n);
}

function factorial (n) {
  if (n < 1 || n == undefined) { return null; }
  return (n != 1) ? n * factorial(n - 1) : 1;
}

function fibonacci_sum (n) {
  if (n == undefined || n < 1) { return null; }
  if (_fibset[n]) {
    return _fibset[n];
  }
  _fibset[n] = fibonacci_sum(n - 2) + fibonacci_sum(n - 1);
  return _fibset(n);
}

function is_prime(n) {
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function factorize(n) {
  if (n < 1) { return null; }
  if (n == 1) { return [1]; }
  if (is_prime(n)) { return [n]; }
  var result = [];
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return result.concat(factorize(i),factorize(n / i));
    }
  }
  return quick_sort(result);
}

function all_factors(n) {
  if (n < 0) { return null; }
  if (n == 0) { return 0; }
  var result = [1,n];
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result.concat(n,i);
    }
  }
  return array_unique(quick_sort(result));
}

function prime_factors (n) {
  return quick_sort(array_unique(factorize(n).concat(1)));
}

/* 
*  SORT FUNCTIONS
*/

function bub_sort(arr) {
  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < arr[i-1]) {
        var tmp = arr[i];
        arr[i] = arr[i-1];
        arr[i-1] = tmp;
        done = false;
      }
    }
  }
  return arr;
}

function sel_sort(arr) {
  var result = [];
  var min_index = 0;
  while (arr.length > 0) {
    min_index = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] < arr[min_index] ) {
        min_index = i;
      }
    }
    result.push(arr[min_index]);
    arr.splice(min_index,1);
  }
  return result;
}

function merge_sort(arr) {
  if (arr.length < 2) { return arr; }
  var arr1 = arr.splice(0,Math.floor(arr.length/2));

  return merge(merge_sort(arr1), merge_sort(arr));
}

function merge(arr1, arr2) {
  var result = new Array(arr1.length + arr2.length);
  var cur_index = 0;
  var p1 = 0;
  var p2 = 0;
  while (p1 < arr1.length && p2 < arr2.length) {
    if (arr1[p1] > arr2[p2]) {
      result[cur_index] = arr2[p2];
      p2++;
    } else {
      result[cur_index] = arr1[p1];
      p1++;
    }
    cur_index++;
  }
  while (p2 < arr2.length) {
    result[cur_index] = arr2[p2];
    cur_index++;
    p2++;
  }
  while (p1 < arr1.length) {
    result[cur_index] = arr1[p1];
    cur_index++;
    p1++;
  }
  return result;
}

function quick_sort(arr) {
  if (arr.length < 2) { return arr; }
  var pivot = arr[0];
  var p1 = 0;
  var p2 = arr.length
  while (p1 < p2 - 1) {
    while (arr[p1 + 1] < pivot) {
      p1++;
    }
    while (arr[p2 - 1] >= pivot && p2 > 1) {
      p2--;
    }
    if (p1 != p2 - 1) {
      var tmp = arr[p1 + 1];
      arr[p1 + 1] = arr[p2 - 1];
      arr[p2 - 1] = tmp;
    }
  }
  var arr1 = arr.splice(1,p1);
  var arr2 = arr.splice(1);

  return quick_sort(arr1).concat(pivot,quick_sort(arr2));
}

function test(name, expected, actual) {
  if (expected != actual) {
    console.log("Test " + name + " failed!");
    console.log("Expected:");
    console.log(expected);
    console.log("Actual:");
    console.log(actual);
    console.log("");
  }
}

/*
** ARRAYS
*/

function array_unique(arr) {
  return arr.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

test ("bub t1","-3 -> -2 -> -1 -> 0 -> 1 -> 2 -> 3",bub_sort([3,-3,2,-2,0,1,-1]).join(" -> "));
test ("bub t2","1 -> 2 -> 3 -> 4 -> 5",bub_sort([5,4,3,2,1]).join(" -> "));
test ("bub t3","9",bub_sort([9]).join(" -> "));
test ("bub t4","",bub_sort([]).join(" -> "));
test ("sel t1","-3 -> -2 -> -1 -> 0 -> 1 -> 2 -> 3",sel_sort([3,-3,2,-2,0,1,-1]).join(" -> "));
test ("sel t2","1 -> 2 -> 3 -> 4 -> 5",sel_sort([5,4,3,2,1]).join(" -> "));
test ("sel t3","9",sel_sort([9]).join(" -> "));
test ("sel t4","",sel_sort([]).join(" -> "));
test ("merge t1","-3 -> -2 -> -1 -> 0 -> 1 -> 2 -> 3",merge_sort([3,-3,2,-2,0,1,-1]).join(" -> "));
test ("merge t2","1 -> 2 -> 3 -> 4 -> 5",merge_sort([5,4,3,2,1]).join(" -> "));
test ("merge t3","9",merge_sort([9]).join(" -> "));
test ("merge t4","",merge_sort([]).join(" -> "));
test ("quick t1","-3 -> -2 -> -1 -> 0 -> 1 -> 2 -> 3",quick_sort([3,-3,2,-2,0,1,-1]).join(" -> "));
test ("quick t2","1 -> 2 -> 3 -> 4 -> 5",quick_sort([5,4,3,2,1]).join(" -> "));
test ("quick t3","9",quick_sort([9]).join(" -> "));
test ("quick t4","",quick_sort([]).join(" -> "));
test ("pi nth t1","3.14",pi_nth_digit(2));
test ("pi nth t1","3",pi_nth_digit(0));
test ("pi nth t1","3.1415926536",pi_nth_digit(-3));
test ("e nth t1","2.72",e_nth_digit(2));
test ("e nth t1","3",e_nth_digit(0));
test ("e nth t1","2.7182818285",e_nth_digit(-3));
test ("prime factors t1","1,3,5",prime_factors(15).join(","));
test ("prime factors t1","1,2,5",prime_factors(100).join(","));
test ("factorize t1","2*2*5*5",factorize(100).join("*"));
