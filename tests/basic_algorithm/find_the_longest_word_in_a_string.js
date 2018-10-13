function findLongestWordLength(str) {
  let wordArray = [];
  let longestLength = 0;
  let longestWord = "";
  wordArray = str.split(" ");
  for (let i = 0; i < wordArray.length; i++) {
    if (wordArray[i].length > longestLength) {
      longestWord = wordArray[i];
      longestLength = wordArray[i].length;
    }
  }
  str = longestWord;
  return str.length;
}

findLongestWordLength("The quick brown fox jumped over the lazy dog");