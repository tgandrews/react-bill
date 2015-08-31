'use strict';

var path = require('path');

module.exports = function (config) {
  config.set({
    captureConsole: true,
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/helpers/pack/**/*.js',
      'test/helpers/react/**/*.js',
      'test/spec/**/*.js'
    ],
    preprocessors: {
      'test/helpers/createComponent.js': ['webpack', 'sourcemap'],
      'test/spec/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.gif/,
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        }, {
          test: /\.jpg/,
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        }, {
          test: /\.png/,
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }, {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.sass/,
          loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
        }, {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }, {
          test: /\.woff/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        }, {
          test: /\.woff2/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff2'
        }]
      },
      resolve: {
        alias: {
          'styles': path.join(process.cwd(), './src/styles/'),
          'components': path.join(process.cwd(), './src/components/'),
          'stores': '../../../src/stores/',
          'actions': '../../../src/actions/',
          'helpers': path.join(process.cwd(), './test/helpers/')
        }
      }
    },
    webpackMiddleware: {
      noInfo: true,
      stats: {
        colors: true
      }
    },
    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome', 'Firefox'],
    reporters: ['dots'],
    captureTimeout: 60000,
    singleRun: true,
    plugins: [
        require('karma-webpack'),
        require('karma-sourcemap-loader'),
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-firefox-launcher')
    ]
  });
};
