function makeClass() {
  "use strict";
  /* Alter code below this line */
  class Thermostat {
    constructor(f_temperature) {
      this._temperature = 5/9 *(f_temperature-32);
    }
    //getter
    get temperature(){
      return this._temperature;
    }
    //setter
    set temperature(c_temperature){
      this._temperature = c_temperature;
    }
  }
  /* Alter code above this line */
  return Thermostat;
}
const Thermostat = makeClass();
const thermos = new Thermostat(76); // setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in C
thermos.temperature = 26;
temp = thermos.temperature; // 26 in C