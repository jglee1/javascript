function titleCase(str) {
  let strArray = str.split(" ");
  for (let i = 0; i < strArray.length; i++) {
    strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1).toLowerCase();
  }
  str = strArray.join(" ");
  return str;
}

titleCase("I'm a little tea pot");