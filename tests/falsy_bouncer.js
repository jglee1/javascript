function bouncer(arr) {
  for (let i = 0; i < arr.length; i++) {
    if ( Boolean(arr[i]) === false ) {
      arr.splice(i,1);
    }
  }
  console.log(arr);
  return arr;
}

bouncer([7, "ate", "", false, 9]);