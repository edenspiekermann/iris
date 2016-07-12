var webpack = require('webpack');
var config = require('./webpack.config.prod.js');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack.isomorphic-tools'));

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
  new webpack.NoErrorsPlugin(),
  webpackIsomorphicToolsPlugin.development()
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
      test: /\.scss$/,
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
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
