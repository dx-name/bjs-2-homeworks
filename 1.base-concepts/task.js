"use strict"
function solveEquation(a, b, c) {
  const d = b ** 2 - 4 * a * c;

  if (d < 0) {
    return [];
  }

  if (d === 0) {
    const root = -b / (2 * a);
    return [root];
  }

  const sqrtD = Math.sqrt(d);
  const root1 = (-b + sqrtD) / (2 * a);
  const root2 = (-b - sqrtD) / (2 * a);

  return [root1, root2];
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  const monthlyRate = (percent / 100) / 12;

  const loanBody = amount - contribution;

  if (loanBody <= 0) {
    return Number(contribution.toFixed(2));
  }

  const numerator = monthlyRate / (Math.pow(1 + monthlyRate, countMonths) - 1);
  const monthlyPayment = loanBody * (monthlyRate + numerator);

  const totalPayment = monthlyPayment * countMonths + contribution;

  return Number(totalPayment.toFixed(2));
}