var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/client'],
  target: 'web',
  cache: false,
  context: __dirname,
  devtool: false,
  output: {
    path: path.join(__dirname, 'static/dist'),
    filename: 'client.js',
    chunkFilename: '[name]-[id].js',
    publicPath: 'dist/'
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,

      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        include: /\.json$/,
        loader: 'json'
      },
      {
        include: /\.jsx?/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
        )
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'web_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
