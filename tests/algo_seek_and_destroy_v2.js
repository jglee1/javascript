function destroyer(arr, ...restArr) {
  return arr.filter( i => !restArr.includes(i) );
}

//destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));