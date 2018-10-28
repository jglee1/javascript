function sentensify(str) {
  // Add your code below this line
  return str.split(/\W/).join(" ");  
  
  // Add your code above this line
}
sentensify("May-the-force-be-with-you");
console.log(sentensify("May-the-force-be-with-you"));  // "May the force be with you"