function fearNotLetter(str) {
  let baseStr = "abcdefghijklmnopqrstuvwxyz";
  let positionArr = [];   // str's character position number within baseStr. 
  let missingCharPos = [];
  let missingChar = undefined;

  for (let i = 0; i < str.length; i++) {
    positionArr.push(baseStr.indexOf(str[i]));
  }
  console.log(positionArr);
  for (let i = 1; i < positionArr.length; i++) {
    let diff = positionArr[i] - positionArr[i-1];
    if (diff == 2) {          //assume only one character is missing
      missingCharPos.push(positionArr[i-1]+1);
    }
  }
  missingChar = baseStr[missingCharPos];
  return missingChar;
}

fearNotLetter("abce");
console.log(fearNotLetter("abce"));