let sampleWord = "banan1";
let pwRegex = /(?=[a-zA-z]{3,})(?=\D*\d{2})/; // Change this line
let result = pwRegex.test(sampleWord);
console.log(result);