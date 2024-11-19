const express = require('express');
const { processingController } = require("../controllers/processingController");
const processingRouter = express.Router();

processingRouter.get('/multiply', processingController.randomGen, processingController.multiply, processingController.multiplyShort, (req, res) => {
  console.log('Successfully multiplied!');
  const { fullNumber, precisionLimitedNumber, numbers, digitLimit } = res.locals;
  console.log(fullNumber.length, precisionLimitedNumber.length);
  return res.status(200).json({ digitLimit, numbers, fullNumber, precisionLimitedNumber });
});

processingRouter.get('/waveForm', processingController.randomGen, processingController.multiply, processingController.visualizeWaveForm, (req, res) => {
  console.log('Viewing Waveform');
  console.log(res.locals);
  return res.status(200).json(res.locals);
})

module.exports = {
  processingRouter
}