function sumFibs(num) {
  let num1 = 1;
  let num2 = 1;
  let fibArr = [num1, num2];
  let fibOddSum = num1+num2;  // sum on the first 2 Odd Fib numbers.
  //console.log(fibArr);
  //console.log(fibOddSum);
  while (num1 + num2 <= num) {
    let nextFib = num1 + num2;
    fibArr.push(nextFib);
    //console.log(nextFib);
    if (nextFib % 2 === 1) {
      fibOddSum += nextFib;
    }
    num1 = num2;
    num2 = nextFib;
  }
  console.log(fibArr);
  console.log(fibOddSum);
  return fibOddSum;
}

sumFibs(4);
console.log(sumFibs(10));