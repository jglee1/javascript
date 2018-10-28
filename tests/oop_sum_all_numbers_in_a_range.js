function sumAll(arr) {
  let lowNum = Math.min(...arr);
  let highNum = Math.max(...arr);
  let sum = 0;
  for (let i = lowNum; i <= highNum; i++) {
    sum += i;
  }

  return sum;
}

sumAll([1, 4]);