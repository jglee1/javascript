function rot13(str) { // LBH QVQ VG!
  let newArr = str.split("");
  let convertedArr = [];
  let convertedCharCode = 0;
  let convertedChar = "";
  for (let i = 0; i < newArr.length; i++) {
    if (/[\W_]/.test(newArr[i])) {
      convertedArr.push(newArr[i]);
    } else {
      convertedCharCode = newArr[i].charCodeAt(0) >= 'N'.charCodeAt(0) ? newArr[i].charCodeAt(0) - 13: newArr[i].charCodeAt(0) + 13;
      convertedChar = String.fromCharCode(convertedCharCode);
      convertedArr.push(convertedChar);
    }
  }
  return convertedArr.join('');
}

// Change the inputs below to test
//rot13("SERR PBQR PNZC");
rot13("A");