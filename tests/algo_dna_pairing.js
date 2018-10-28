function pairElement(str) {
  let newArr = [];
  for (let i=0; i<str.length; i++) {
    newArr.push(pairArray(str[i]));
  }
  return newArr;
}

function pairArray(dna) {
  switch(dna) {
    case "A":
      return ["A","T"];
    case "T":
      return ["T","A"];
    case "C":
      return ["C","G"];
    case "G":
      return ["G","C"];
    default:
      return null;
  }
}
pairElement("GCG");