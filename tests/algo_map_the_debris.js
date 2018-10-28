function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  
  let newArr = [];

  let radius = 0;
  let orbP = 0;
  let answer = {};

  for (let i = 0; i < arr.length; i++) {
    radius = arr[i].avgAlt + earthRadius;
    orbP = 2 * Math.PI * Math.sqrt(Math.pow(radius,3)/GM);
    orbP = Math.round(orbP);
    answer = {
      name: arr[i]["name"],
      orbitalPeriod: orbP
    }
    newArr.push(answer);
  }
  return newArr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
console.log(orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]));