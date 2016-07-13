var webpack = require('webpack');
var config = require('./webpack.config.prod.js');

config.cache = true;
config.debug = true;
config.devtool = 'eval';

config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
);

config.output.publicPath = 'http://localhost:8080/dist/';
config.output.hotUpdateMainFilename = 'update/[hash]/update.json';
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js';

config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true
  }),
  new webpack.NoErrorsPlugin()
];

config.module = {
  loaders: [
    {
      include: /\.json$/,
      loader: 'json'
    },
    {
      include: /\.jsx?/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
    }
  ]
};

config.devServer = {
  publicPath: 'http://localhost:8080/dist/',
  contentBase: './static',
  hot: true,
  inline: true,
  lazy: false,
  quiet: true,
  noInfo: false,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
  host: '0.0.0.0'
};

module.exports = config;
