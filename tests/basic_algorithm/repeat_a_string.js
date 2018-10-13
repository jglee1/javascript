function repeatStringNumTimes(str, num) {
  let repeatedStr = "";
  if (num <= 0) {
    return "";
  }
  for (let i = 0; i < num; i++) {
    repeatedStr = repeatedStr.concat(str);
  }
  return repeatedStr;
}

repeatStringNumTimes("abc", 3);