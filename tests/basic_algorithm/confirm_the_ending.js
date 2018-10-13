function confirmEnding(str, target) {
  let targetLength = target.length;
  let lastSubString = str.substring(str.length-targetLength,str.length);
  if (lastSubString === target) {
    return true;
  } else {
    return false;
  }
}

confirmEnding("Bastian", "n");