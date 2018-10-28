function uniteUnique(arr, ...rest) {
  let newArr = [...arr];
  console.log(newArr);
  rest.forEach(function(item){
    item.forEach(function(elt){
      if (!newArr.includes(elt)) {
        newArr.push(elt);
      }
    })
  })
  console.log(newArr);
  return newArr;
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);