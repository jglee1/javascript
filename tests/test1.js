
function multiplesOf3and5(number) {
  // Good luck!
  var result = 0;
  
  for (var i = 1 ; i < number ; i++) {
    if(i % 3 == 0 || i % 5 == 0) {
      result += i;
    }
  }  
  return result;
}


alert(multiplesOf3and5(10));


