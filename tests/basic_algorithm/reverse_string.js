function reverseString(str) {
  let newStr = [];
  for (let i = str.length - 1; i >= 0; i--) {
    newStr.push(str[i]);
  }
  str = newStr.join("");
  return str;
}

reverseString("hello");