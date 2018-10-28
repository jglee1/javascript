function diffArray(arr1, arr2) {
  var newArr = [];
  newArr = newArr.concat(arr1.filter( item => !arr2.includes(item)));
  newArr = newArr.concat(arr2.filter( item => !arr1.includes(item)));
  // Same, same; but different.
  return newArr;
}

diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]);
console.log(diffArray([1, 2, 3, 5], [1, 2, 3, 4, 5]));