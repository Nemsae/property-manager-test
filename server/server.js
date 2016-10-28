require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = require('./app');
const http = require('http');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const server = http.createServer(app);

//  WEBPACK CONFIG
const compiler = webpack(webpackConfig);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

// SERVER LISTEN
app.listen(PORT, (err) => {
  console.log(err || `Express listening on port ${PORT}`);
});

//  either app or server
//  module.exports = server;
