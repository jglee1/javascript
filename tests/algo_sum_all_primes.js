function sumPrimes(num) {
  let arrPrime = [];
  if (num < 2) {
    return 0;
  }
  for (let i = 2; i <= num; i++) {   //find all primes from 2 to num.
    if (isPrime(i)) {
      arrPrime.push(i);
    }
  }

  return arrPrime.reduce( (cum, item) => cum + item );
}

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  if (num === 2) {
    return true;
  }
  for (let i = 2; i < num; i++) {    //for num >= 3.
    if ( num % i === 0) {
      return false;
    }
  }
  return true;
}

sumPrimes(10);
console.log(sumPrimes(10));