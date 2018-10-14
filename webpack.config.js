const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')
const Dotenv = require('dotenv-webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const RevPlugin = require('./lib/rev')

const env = process.env.WEBPACK_SERVE ? 'development' : 'production'

const config = {
  mode: env,

  entry: './src/main.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  serve: {
    port: 5000,
    content: path.resolve(__dirname, 'src'),
    devMiddleware: {
      publicPath: '/'
    },
    add: (app) => {
      app.use(convert(history()))
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["react-hot-loader/babel"],
            cacheDirectory: true
          }
        }
      },
      {
      test: /\.scss$/,
      use: [
        {
          loader: env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: env == 'development' ? true : false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: ['node_modules'],
            sourceMap: env == 'development' ? true : false
          }
        }
      ]
    }]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: env == 'development'? true : false
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },

  plugins: [
    new Dotenv()
  ]
}

if (env == 'production') {
  config.output.filename = '[name].[contenthash].js'

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        CONTENTFUL_SPACE: JSON.stringify(process.env.CONTENTFUL_SPACE),
        CONTENTFUL_ACCESS_TOKEN: JSON.stringify(process.env.CONTENTFUL_ACCESS_TOKEN),
        CONTENTFUL_PREVIEW_ACCESS_TOKEN: JSON.stringify(process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN),
        CONTENTFUL_PREVIEW: JSON.stringify(process.env.CONTENTFUL_PREVIEW),
        CONTENTFUL_ENVIRONMENT: JSON.stringify(process.env.CONTENTFUL_ENVIRONMENT)
      }
    }),
    new CleanWebpackPlugin('build'),
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: ''
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new ManifestPlugin({
      basePath: '/',
      filter: function (file) {
        return file.isChunk
      }
    }),
    new RevPlugin({
      layoutPath: path.resolve(__dirname, 'build', 'index.html'),
      manifestPath: path.resolve(__dirname, 'build', 'manifest.json')
    })
  )
}

module.exports = config
