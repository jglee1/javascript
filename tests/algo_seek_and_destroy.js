function destroyer(arr, ...restArr) {
  let newArr = [].concat(arr);
  console.log(restArr);
  for (let i = newArr.length - 1; i >=0; i--) {
    if (restArr.includes(newArr[i])) {
      newArr.splice(i,1);
    }
  }
  
  return newArr;
}

//destroyer([1, 2, 3, 1, 2, 3], 2, 3);
console.log(destroyer([1, 2, 3, 1, 2, 3], 2, 3));