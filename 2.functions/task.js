function getArrayParams(...arr) {
  if (arr.length === 0) {
    return { min: 0, max: 0, avg: 0 };
  }

  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];

    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }

    sum += value;
  }

  const avg = Number((sum / arr.length).toFixed(2));

  return { min: min, max: max, avg: avg };
}

function summElementsWorker(...args) {
  if (args.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

function differenceMaxMinWorker(...args) {
  if (args.length === 0) {
    return 0;
  }

  let min = args[0];
  let max = args[0];

  for (let i = 1; i < args.length; i++) {
    const value = args[i];
    if (value > max) {
      max = value;
    }
    if (value < min) {
      min = value;
    }
  }

  return max - min;
}

function differenceEvenOddWorker(...args) {
  if (args.length === 0) {
    return 0;
  }

  let sumEvenElement = 0;
  let sumOddElement = 0;

  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (value % 2 === 0) {
      sumEvenElement += value;
    } else {
      sumOddElement += value;
    }
  }

  return sumEvenElement - sumOddElement;
}

function averageEvenElementsWorker(...args) {
  if (args.length === 0) {
    return 0;
  }

  let sumEvenElement = 0;
  let countEvenElement = 0;

  for (let i = 0; i < args.length; i++) {
    const value = args[i];
    if (value % 2 === 0) {
      sumEvenElement += value;
      countEvenElement++;
    }
  }

  if (countEvenElement === 0) {
    return 0;
  }

  return sumEvenElement / countEvenElement;
}

function makeWork(arrOfArr, func) {
  if (!arrOfArr || arrOfArr.length === 0) {
    return 0;
  }

  const firstResult = func(...arrOfArr[0]);
  let maxWorkerResult = firstResult;

  for (let i = 1; i < arrOfArr.length; i++) {
    const currentResult = func(...arrOfArr[i]);

    if (currentResult > maxWorkerResult) {
      maxWorkerResult = currentResult;
    }
  }

  return maxWorkerResult;
}
