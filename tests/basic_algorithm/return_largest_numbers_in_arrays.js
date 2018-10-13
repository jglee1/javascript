function largestOfFour(arr) {
  let subArrWithLargestNumber = [];
  for (let i = 0; i < arr.length; i++) {
    let largestnumber = arr[i][0];  //assign the first number of the sub array to the largest number
    for (let j = 1; j < arr[i].length; j++) {  //iterate from the second number.
      if (largestnumber < arr[i][j]) {
        largestnumber = arr[i][j];
      }

    }
    subArrWithLargestNumber.push(largestnumber);
  }
  arr = subArrWithLargestNumber;
  return arr;
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);