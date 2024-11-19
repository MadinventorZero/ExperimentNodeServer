const { randomNumber, visualMultiplication, visualMultiplicationLimited, fillWave, convertToWave } = require("../helpers/processingUtils");

const processingController = {};

processingController.randomGen = (req, res, next) => {
  const { digitLimit, bigDigit } = req.query;
  console.log('Digit??', digitLimit);
  const useLimit = digitLimit ? String(Number(digitLimit) + 3) : 1000;
  const useBigDigit = bigDigit ? bigDigit : 1000;
  const someNum1 = randomNumber(useBigDigit);
  const someNum2 = randomNumber(useBigDigit);
  console.log([someNum1, someNum2]);
  res.locals.digitLimit = useLimit;
  res.locals.bigDigit = useBigDigit;
  res.locals.numbers = [someNum1, someNum2];
  return next();
};

processingController.multiply = (req, res, next) => {
  const { numbers, bigDigit } = res.locals;
  res.locals.fullNumber = Number(bigDigit) <= 1000 ? visualMultiplication(numbers[0], numbers[1]) : 'Processing takes a long time';
  return next();
};

processingController.multiplyShort = (req, res, next) => {
  const { numbers, digitLimit } = res.locals;
  res.locals.precisionLimitedNumber = visualMultiplicationLimited(numbers[0], numbers[1], digitLimit);
  return next();
};

processingController.visualizeWaveForm = (req, res, next) => {
  const { numbers } = res.locals;
  res.locals.results = [fillWave(convertToWave(numbers[0])), fillWave(convertToWave(numbers[1]))];
  return next();
};

module.exports = {
  processingController
}