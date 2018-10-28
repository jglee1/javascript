var Person = function(firstAndLast) {
  // Complete the method below and implement the others similarly
  let nameArr = firstAndLast.split(" ");
  console.log(nameArr);
  
  var _firstName = nameArr[0];
  var _lastName = nameArr[1];
  var _fullName = firstAndLast;
  
  this.getFullName = function() {
    return _fullName;
  };
  this.getFirstName = function () {
    return _firstName;
  };
  this.getLastName = function () {
    return _lastName;
  };
  this.setFirstName = function (first) {
    _firstName = first;
    _fullName = first + " " + _lastName;
    //return this._firstName;
  };
  this.setLastName = function (last) {
    _lastName = last;
    _fullName = _firstName + " " + last;
    //return this._lastName;
  };
  this.setFullName = function (firstAndLast) {
    _fullName = firstAndLast;
    _firstName = firstAndLast.split(" ")[0];
    _lastName = firstAndLast.split(" ")[1];
    //return this._fullName;
  };
};

var bob = new Person('Bob Ross');
