function alphabeticalOrder(arr) {
  // Add your code below this line
  return arr.sort(function(a,b) {
    return a > b;
  });
  
  // Add your code above this line
}
alphabeticalOrder(["a", "d", "c", "a", "z", "g"]);
console.log(alphabeticalOrder(["a", "d", "c", "a", "z", "g"]));