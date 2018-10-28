function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  // Only change code below this line
  arr = arr.concat(collection);
  arr = arr.filter(function(item){
          for (let i = 0; i< Object.keys(source).length; i++) {
            let key = Object.keys(source)[i];
            if (item.hasOwnProperty(key)) {
              if (item[key] !== source[key]) {
                return false;
              } 
            } else {
              return false;
            }
          }
          return true;
        });
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });