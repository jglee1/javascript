var input = 
`2 0 -1
1
10`;


function processData(input) {
	
	//Problem 216 from projecteuler.net
	
    let lines = input.split('\n');
	let firstLine = lines[0].split(" ");
    const aVar = parseInt(firstLine[0]);
	const bVar = parseInt(firstLine[1]);
	const cVar = parseInt(firstLine[2]);
	const numQueries = parseInt(lines[1]);
	let upperBoundArray = [];
	let primeNumbers = [];
	
	for (let i = 0; i < numQueries; i++) {
		upperBoundArray.push(parseInt(lines[i+2]));
	}
	
	for (let i = 0; i < numQueries; i++) {
		let upperBound = upperBoundArray[i];
		let primeNumbersPerQuery = findPrimeNumbers(aVar, bVar, cVar, upperBound);
		primeNumbers.push(primeNumbersPerQuery);
		console.log(primeNumbersPerQuery.length);
	}

} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});

function findPrimeNumbers(aVar, bVar, cVar, upperBound) {
	let primenumbers = [];
	for (let i = 0; i <= upperBound; i++) {
		let polynomialValue = polynomialCal (i, aVar, bVar, cVar);
		if ( isPrime(polynomialValue) ) {
			primenumbers.push(polynomialValue);
		}
	}
	return primenumbers;
}


function polynomialCal (num, aVar, bVar, cVar) {
		return aVar*num*num + bVar*num + cVar;
}


// Fermat primality test.
 function isPrime(num) {

	if (num < 2) {
		return false;
	}
	if (num === 2 || num === 3) {
		return true;
	}
	
	let randomInt1 = getRandomInt(2, num - 1);
	let randomInt2 = getRandomInt(2, num - 1);
	
	if(Math.pow(randomInt1,num-1)%num ===1) {
		if (Math.pow(randomInt2,num-1)%num ===1) {
			return true;
		}
	}
	return false;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
