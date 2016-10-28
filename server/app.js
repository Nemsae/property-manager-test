// SET SERVER PORT
// const PORT = process.env.PORT || 8000;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/property-manager'; //  name of the database

// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const config = require('./config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URI = config.db[NODE_ENV];

mongoose.Promise = Promise;
mongoose.connect(DB_URI, (err) => {  //  connecting to mongo database
  console.log(err || `MongoDB connected to ${DB_URI}`);
});
// APP DECLARATION css italic
const app = express();

//  WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
  let indexPath = path.join(__dirname, '../build/index.html');
  res.sendFile(indexPath);
});

// // SERVER LISTEN
// app.listen(PORT, (err) => {
//   console.log(err || `Express listening on port ${PORT}`);
// });

module.exports = app;
