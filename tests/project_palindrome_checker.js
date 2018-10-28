function palindrome(str) {
  let newArr = str.toLowerCase().split("");
  newArr = newArr.filter( char => /[a-zA-Z0-9]/.test(char));

  for (let i = 0; i < Math.round(newArr.length/2); i++) {
    if (newArr[i] !== newArr[newArr.length-1-i]) {
      return false;
    }
  }
  return true;
}

//palindrome("eye");
palindrome("2_A3*3#A2");
console.log(palindrome("2_A3*3#A2"));