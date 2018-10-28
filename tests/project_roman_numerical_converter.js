function convertToRoman(num) {

  let digitArr = [];  // from the highest digits. 321 -> digitArr = [3,2,1]
  let digit = 0;
  let numDigit = 0;
  let romanArr = [];

  digitArr = num.toString().split("");
  numDigit = digitArr.length;

  for (let i = 0; i < digitArr.length; i++) {
    romanArr.push(romanDigit(Number(digitArr[i]),numDigit-i));
  }


 return romanArr.join("");
}

function romanDigit(digit, decimal) {
  if (digit === 0) {
    return "";
  }
  let result = "";
  let romanPair = {
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M'
  }

  switch (decimal) {
    case 4: 
      result = romanPair["1000"].repeat(digit);
      break;
    case 3:
      if (digit <= 3) {
        result = romanPair["100"].repeat(digit);
      } else if (digit === 4) {
        result = romanPair["100"].concat(romanPair["500"]);
      } else if (digit === 5) {
        result = romanPair["500"];
      } else if (digit <=8) {
        result = romanPair["500"].concat(romanPair["100"].repeat(digit-5));
      } else if (digit === 9) {
        result = romanPair["100"].concat(romanPair["1000"]);
      }
      break;
    case 2:
      if (digit <= 3) {
        result = romanPair["10"].repeat(digit);
        //console.log(result);
      } else if (digit === 4) {
        result = romanPair["10"].concat(romanPair["50"]);
      } else if (digit === 5) {
        result = romanPair["50"];
      } else if (digit <=8) {
        result = romanPair["50"].concat(romanPair["10"].repeat(digit-5));
      } else if (digit === 9) {
        result = romanPair["10"].concat(romanPair["100"]);
      }
      break;
    default: 
      if (digit <= 3) {
        result = romanPair["1"].repeat(digit);
      } else if (digit === 4) {
        result = romanPair["1"].concat(romanPair["5"]);
        //console.log(result);
      } else if (digit === 5) {
        result = romanPair["5"];
      } else if (digit <=8) {
        result = romanPair["5"].concat(romanPair["1"].repeat(digit-5));
      } else if (digit === 9) {
        result = romanPair["1"].concat(romanPair["10"]);
      }
      break;  
  }
  return result;
}

convertToRoman(4);