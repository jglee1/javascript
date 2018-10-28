function smallestCommons(arr) {
  let n1 = arr[0];
  let n2 = arr[1];
  let newArr = range(Math.min(n1,n2),Math.max(n1,n2)+1,1);
  console.log(newArr);
  return newArr.reduce( (cum, item) => lcm(cum,item) , arr[0] );
}

const gcd = function(a,b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};

const lcm = function(a,b) {
  return Math.abs(a*b)/gcd(a,b);
}

// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + (i * step));

smallestCommons([1,5]);
console.log(smallestCommons([1,5]));