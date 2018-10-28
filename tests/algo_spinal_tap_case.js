function spinalCase(str) {
  // "It's such a fine line between stupid, and clever."
  // --David St. Hubbins
  let newArr = str.replace(/<.*?>/,"");
  console.log(newArr);
  newArr = newArr.trim().split("");
  console.log(newArr);
  let answerArr = [];
  for (let i=0; i< newArr.length; i++) {
    if (i === 0) {          // first letter
      answerArr.push(newArr[i].toLowerCase());
      //console.log(newArr[i]);
      //console.log(answerArr);
    } else if ( newArr[i] === '_') {
      answerArr.push('-');
    } else if (newArr[i] === newArr[i].toLowerCase() && /\w/.test(newArr[i]) ) {   //lower case letter
      answerArr.push(newArr[i]);
    } else if (newArr[i] === newArr[i].toUpperCase() && /\w/.test(newArr[i]) && answerArr[answerArr.length-1] !== '-') {   // upper case letter without previous hyphen
      answerArr.push('-',newArr[i].toLowerCase());
    } else if (newArr[i] === newArr[i].toUpperCase() && /\w/.test(newArr[i])) {   // upper case letter with previous hypen
      answerArr.push(newArr[i].toLowerCase());
    } else if (answerArr[answerArr.length-1] !== '-') {
      answerArr.push('-');
    }
  }
  console.log(answerArr);
  answerArr = answerArr.join("");
  console.log(answerArr);
  return answerArr;
}

//spinalCase('This Is Spinal Tap');
console.log(spinalCase("The_Andy_<wbr>Griffith_Show"));
console.log('-'=== '-'.toLowerCase());
console.log('-'=== '-'.toUpperCase());
