const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const localCss = new ExtractTextPlugin('styles-local.css');
const globalCss = new ExtractTextPlugin('styles-global.css');

const common = require('./webpack.common');


const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      },
      {
        test: /^((?!semantic|react-tagsinput|emoji-mart).)*\.css$/,
        use: localCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: {modules: true, importLoaders: 1, localIdentName: '[name]__[hash:base64:5]'}
            },
            {
              loader: 'postcss-loader', options: {
                plugins: [
                  require('postcss-import'),
                  require('postcss-cssnext'),
                ]
              }
            },
          ]
        })
      },
      {
        test: /(semantic\.css|react-tagsinput\.css|emoji-mart\.css)/,
        use: globalCss.extract({
          use: [
            {
              loader: 'css-loader', options: {modules: false, importLoaders: 1}
            },
            {
              loader: 'postcss-loader', options: {
                plugins: [
                  require('postcss-import'),
                  require('postcss-cssnext'),
                ]
              }
            },
          ]
        })
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    globalCss,
    localCss,
    new UglifyJsPlugin(),
  ]
};

module.exports = merge(common, prodConfig);
