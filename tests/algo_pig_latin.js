function translatePigLatin(str) {
  let regex = /[^aeiou]*/;
  let letterRemoved = str.match(regex);
  console.log(letterRemoved);
  let pigLatin = str.replace(regex, "");
  console.log(pigLatin);
  if (/\w/.test(letterRemoved)) {
    pigLatin = pigLatin.concat(letterRemoved).concat('ay');
  } else {
    pigLatin = pigLatin.concat('way');
  }
  return pigLatin;
}

//translatePigLatin("consonant");
console.log(translatePigLatin("algorithm"));