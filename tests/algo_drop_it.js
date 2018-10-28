function dropElements(arr, func) {
  // Drop them elements.
  let newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    if (func(newArr[i])) {
      return newArr.slice(i);
    }
  }
  return newArr.slice(newArr.length);
}

dropElements([1, 2, 3], function(n) {return n < 3; });
console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));