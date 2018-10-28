function whatIsInAName(collection, source) {
  // What's in a name?
  var arr = [];
  
  // Only change code below this line
  let srcKeys = Object.keys(source);
  arr = collection.filter(function(item){
          for (let i = 0; i< srcKeys.length; i++) {
            let key = srcKeys[i];
            if (!item.hasOwnProperty(key) || item[key] !== source[key]) {
                return false;
            } 
          }
          return true;
        });
  
  // Only change code above this line
  return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });