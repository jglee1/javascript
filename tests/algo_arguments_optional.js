function addTogether() {
  if (typeof arguments[0] !== "number") {
    return undefined;
  }
  if (arguments.length === 2 && typeof arguments[1] !== "number") {
    return undefined;
  }
  if (arguments.length === 2) {   
    return arguments[0] + arguments[1];
  } else if (arguments.length === 1) {
    const sumFunc = (item) => {
      if (typeof item !== "number") {
        return undefined;
      }
      return arguments[0] + item;
    }
    return sumFunc;
  }
}

console.log(addTogether(2,3));

//addTogether("http://bit.ly/IqT6zt")