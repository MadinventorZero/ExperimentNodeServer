const express = require('express');
const cors = require('cors');
const path = require('path');
const { processingRouter } = require('./routers/processingRouter');

const app = express();
const PORT = 8080;

// Parse the body of requests and apply cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/api', processingRouter);

// Unknown Routes and Global error handlers
app.use((req, res) => res.status(400).send('The page your are looking for does not exist'));

const errorDetail = {
  log: 'Express Global Error Handler Caught an Unknown Error',
  status: 500,
  message: { err: 'Error Check You\'re Route'}
}

// Global error handler
app.use((err, req, res, next) => {
  const currentError = Object.assign({}, errorDetail, err);
  res.status(currentError.status).json(currentError.message);
})

// Listen on PORT
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));