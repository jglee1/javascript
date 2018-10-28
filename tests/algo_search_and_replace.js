function myReplace(str, before, after) {
  let newStr = str.slice();
  let isUpperCase = (before[0] === before[0].toUpperCase()) ? true : false;
  //console.log(isUpperCase);
  let replace = after.slice();
  //console.log(replace);
  if (isUpperCase) {
    replace = replace[0].toUpperCase() + replace.slice(1);
    //console.log("Upper", replace);
  } else {
    replace = replace[0].toLowerCase() + replace.slice(1);
    //console.log("Lower", replace);
  }
  //console.log(newStr);
  newStr = newStr.replace(before,replace);
  return newStr;
}

//myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");
console.log(myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped"));