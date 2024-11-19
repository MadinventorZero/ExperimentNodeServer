const visualMultiplication = (num1, num2) => {
  // Sufficiently large numbers must be passed in as strings from the beginning or thsi will break as Javascript will have an issue storing such a sufficiently large number as a number
  // Length of seed arrays is 1 less than the sum of the digits of the two numbers
  const readNum1 = String(num1);
  const readNum2 = String(num2);
  const maxLength = Math.max(readNum1.length, readNum2.length);
  const bucketLength = readNum1.length + readNum2.length - 1;
  const buckets = [];
  let row = [];
  let digitTracker = 0;
  // Assemble buckets
  // Read each number digit in num 1
  for (let i = 0; i < readNum1.length; i++) {
    // Start array with current digit
    row = new Array(digitTracker).fill(0);
    // Read each number digit in num 2
    for (let j = 0; j < readNum2.length; j++) {
      // multiply all the numbers in num2 with the current digit in num1
      row.push(Number(readNum1[i]) * Number(readNum2[j]))
    }
    // Increment digitTracker by 1
    digitTracker++;
    // Add trailing placeholders
    row = [...row, ...new Array(maxLength - digitTracker).fill(0)];
    // Push complete row into buckets
    buckets.push(row);
    // Reset row;
    row = [];
  }
  // Loop  throught the digits and assemble the final number
  let finalNumber = [];
  let nextDigit = 0;
  for (let i = bucketLength -1 ; i > -1; i--) {
    // Add together digits based on the current position in the buckets
  	const sumDigits = buckets.reduce((finNum, bucket) => {
      return finNum += bucket[i]
    }, 0);
    // Add any carry over digits to the current sum
    const thisNum = sumDigits ? sumDigits + nextDigit : nextDigit;
    // Helper to visualize number as text
    const stringNum = String(thisNum);
    if (stringNum.length > 1) {
      // Carry over digits
      nextDigit = Number(stringNum.split('').slice(0, stringNum.length - 1).join(''));
      // Keep only the current digit placeholder
      finalNumber.push(Number(stringNum[stringNum.length - 1]));
      // If a next digit remains and this is the last loop, push the value
      if (i -1 === -1) {
        // push any remaining last digit
      	finalNumber.push(nextDigit);
      }
    } else {
      // Reset digit to zero
      nextDigit = 0;
      // Push the current digit
      finalNumber.push(thisNum);
    }
  }
  console.log('How Many Buckets?', buckets.length);
  // Final number is reversed starting with the singles digit placeholder
  // Return the reversed joined number
  const formatNumber = finalNumber.reverse().join('');
  console.log('Exhaustive Multiplication', formatNumber);
  return formatNumber;
};

// VisualMultiplicationLimited only multiply numbers to within a certain precision
const visualMultiplicationLimited = (num1, num2, precision = Infinity) => {
  // Sufficiently large numbers must be passed in as strings from the beginning or thsi will break as Javascript will have an issue storing such a sufficiently large number as a number
  // Length of seed arrays is 1 less than the sum of the digits of the two numbers
  const readNum1 = String(num1);
  const readNum2 = String(num2);
  // The longest digit determines the digit tracker for each row of progressive digit multiplication
  const maxLength = Math.max(readNum1.length, readNum2.length);

  // Short curcuit calculations with precision limiter
  const lengthLimit = Math.min(maxLength, precision);
  const useLimit1 = Math.min(readNum1.length, lengthLimit);
  const useLimit2 = Math.min(readNum2.length, lengthLimit);

  const bucketLength = readNum1.length + readNum2.length - 1;
  // Short curcuit bucket reduction
  const useBucketLength = Math.min(bucketLength, lengthLimit);
  const requiredPadding = bucketLength - lengthLimit;

  const buckets = [];
  let row = [];
  let digitTracker = 0;
  // Assemble buckets
  // Read each number digit in num 1
  for (let i = 0; i < useLimit1; i++) {
    // Start array with current digit
    row = new Array(digitTracker).fill(0);
    // Read each number digit in num 2
    for (let j = 0; j < useLimit2; j++) {
      // multiply all the numbers in num2 with the current digit in num1
      row.push(Number(readNum1[i]) * Number(readNum2[j]))
    }
    // Increment digitTracker by 1
    digitTracker++;
    // Add trailing placeholders
    row = [...row, ...new Array(lengthLimit - digitTracker).fill(0)];
    // Push complete row into buckets
    buckets.push(row);
    // Reset row;
    row = [];
  }
  // Loop  throught the digits and assemble the final number
  let finalNumber = [];
  let nextDigit = 0;
  for (let i = useBucketLength -1 ; i > -1; i--) {
    // Add together digits based on the current position in the buckets
  	const sumDigits = buckets.reduce((finNum, bucket) => {
      return finNum += bucket[i]
    }, 0);
    // Add any carry over digits to the current sum
    const thisNum = sumDigits ? sumDigits + nextDigit : nextDigit;
    // Helper to visualize number as text
    const stringNum = String(thisNum);
    if (stringNum.length > 1) {
      // Carry over digits
      nextDigit = Number(stringNum.split('').slice(0, stringNum.length - 1).join(''));
      // Keep only the current digit placeholder
      finalNumber.push(Number(stringNum[stringNum.length - 1]));
      // If a next digit remains and this is the last loop, push the value
      if (i -1 === -1) {
        // push any remaining last digit
      	finalNumber.push(nextDigit);
      }
    } else {
      // Reset digit to zero
      nextDigit = 0;
      // Push the current digit
      finalNumber.push(thisNum);
    }
  }
  console.log('Precision only buckets', buckets);
  // Pad Digits to precision limit
  if (requiredPadding > 0) {
    finalNumber = [...new Array(requiredPadding).fill(0), ...finalNumber];
  }

  // Final number is reversed starting with the singles digit placeholder
  // Return the reversed joined number
  const formatNumber = finalNumber.reverse().join('');
  console.log('Precision limited number', formatNumber);
  return formatNumber;
};

const randomNumber = (digits) => {
  let number = '';
  while (number.length < digits) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
};

const convertToWave = (num) => num.split('').map((num) => String(Number(num) - 4.5));

const fillWave = (arr) => {
  const output = [];
  for (let i = 0; i < arr.length; i++) {
    const next = i + 1;
    if(arr[i] && arr[next]) {
      output.push(arr[i]);
      const step = (Number(arr[i]) + Number(arr[next])) / 2;
      output.push(step);
    } else {
      output.push(arr[i]);
    }
  }
  return output;
};

module.exports = {
  visualMultiplication,
  visualMultiplicationLimited,
  randomNumber,
  convertToWave,
  fillWave
}