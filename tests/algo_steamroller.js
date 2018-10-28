function steamrollArray(arr) {
  // I'm a steamroller, baby
  let newArr = [].concat(...arr);
  console.log(newArr);
  console.log(newArr[0]);
  return newArr.some(Array.isArray) ? steamrollArray(newArr) : newArr;
}

//steamrollArray([1, [2], [3, [[4]]]]);
//steamrollArray([[["a"]], [["b"]]]);
steamrollArray([1, [], [3, [[4]]]]);
//steamrollArray([1, {}, [3, [[4]]]]);