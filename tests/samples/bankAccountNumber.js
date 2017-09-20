/*
Author: Andrew Spencer
Description: Generates a random westpac number
*/
let bank
let branch
function start() {
   bank = '03'
   branch = '0'
    for(i = 0; i < 3; i++) {
        branch += Math.floor(Math.random() * 10)
      }
  let general_ledger = '0'
  let suffix = '000'
  general_ledger +=  Math.floor(Math.random() * 9)
  for (i = 0; i < 4; i++) {
    general_ledger +=  Math.floor(Math.random() * 10)
  }
  let weightings = [ 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
  let positions = [ 2, 3, 4, 5, 7, 8, 9, 10, 11 ];
  let modulus = 11;
  const digits = [bank, branch, general_ledger]
  let sum = 0
  for (i = 0; i < positions.length -1; i++)  {
    sum += digits[positions[i]] * weightings[i]
  }
 // const suffix = '000'
//  return {
//    bank: bank,
//    branch: branch,
//    general_ledger: general_ledger,
//    suffix: suffix,
//    check_digit: check_digit
//  }

  let dividend = Math.ceil( sum / modulus ) * modulus;
  let check_digit = dividend - sum;
  let result = start()
while (check_digit > 9) {
  let result = start()
}
general_ledger = general_ledger - check_digit
console.log('blah')
console.log( bank-branch-general_ledger-suffix)
}
