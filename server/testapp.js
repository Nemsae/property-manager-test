// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URI = config.db[NODE_ENV];

mongoose.Promise = Promise;
mongoose.connect(DB_URI, (err) => {  //  connecting to mongo database
  console.log(err || `MongoDB connected to ${DB_URI}`);
});

// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  let filepath = path.resolve('index.html');
  res.sendFile(filepath);
});

module.exports = app;
