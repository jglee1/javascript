const s = [5, 7, 2];
function editInPlace() {
  "use strict";
  // change code below this line
  let s0 = s[0];
  let s1 = s[1];
  let s2 = s[2];
  
  s[0] = s2;
  s[1] = s0;
  s[2] = s1;
  // s = [2, 5, 7]; <- this is invalid

  // change code above this line
}
editInPlace();