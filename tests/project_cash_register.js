function checkCashRegister(price, cash, cid) {
  var change = [];
  var status = "";
  var cidReverse = cid.reverse();
  var result = {};
  //console.log(cidReverse);

  // Here is your change, ma'am.
  let numChange = cash - price;
  let initNumChange = numChange;

  let currencyAmount = [100.00, 20.00, 10.00, 5.00, 1.00, 0.25, 0.1, 0.05, 0.01];
  let currencyUnit = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME","NICKEL","PENNY" ];
  let numUnit = [];

  //console.log(cidReverse[5][1]/currencyAmount[5]);
  //console.log(cidReverse[5][1]);
  //console.log(currencyAmount[5]);

  for (let i = 0; i < currencyAmount.length; i++) {
    let eachUnit = 0;
    while (Math.round(numChange*100)/100 >= currencyAmount[i] && (eachUnit+1) <= cidReverse[i][1]/currencyAmount[i]) {
      numChange -= currencyAmount[i];
      eachUnit++;
    }
    numUnit.push(eachUnit);
  }
  //console.log(numChange);
  //console.log(numUnit);

  for (let i = 0; i < numUnit.length; i++) {
    if (numUnit[i]>0) {
      change.push( [currencyUnit[i],numUnit[i]*currencyAmount[i]] );
    }
  }
  //console.log(change);
  if (Math.round(numChange*100)/100 > 0) {
    status = "INSUFFICIENT_FUNDS"
    change = [];
  } else {
    let cidSum = 0;
    for (let i = 0; i < cidReverse.length; i++) {
      cidSum += cidReverse[i][1];
    }
    //console.log(cidSum);
    if (cidSum > initNumChange) {
      status = "OPEN";
    } else if (cidSum === initNumChange) {
      status = "CLOSED";
      change = cidReverse.reverse();
    }
  }

  result["status"] = status;
  result["change"] = change;
  //console.log(result);
  //console.log(result["status"]);
  //console.log(result["change"]) ;
  return result;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

//checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
//checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
//checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);