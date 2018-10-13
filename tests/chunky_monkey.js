function chunkArrayInGroups(arr, size) {
  let resultGroup = [];
  let numElement = arr.length;
  let numWhole = Math.floor(numElement / size);
  let newArr = arr.slice();

  for (let i = 0; i < numWhole; i++) {
    let eachGroup = newArr.splice(0,size);
    resultGroup.push(eachGroup);
  }
  if (newArr.length != 0) {
    resultGroup.push(newArr);
  }
  return resultGroup;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);