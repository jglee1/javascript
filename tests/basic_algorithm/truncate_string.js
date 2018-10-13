function truncateString(str, num) {
  let strLength = str.length;
  let newStr = "";
  newStr = str.substring(0,num);
  if (strLength > num) {
    newStr = newStr.concat('...');
  }
  return newStr;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);