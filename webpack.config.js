const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

	entry: './src/main.js',

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/'
	},

	serve: {
		port: 3000,
		content: path.resolve(__dirname, 'src'),
		devMiddleware: {
			publicPath: '/build/'
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
					loader: process.env.WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: process.env.WEBPACK_SERVE ? true : false
					}
				},
				{
					loader: 'sass-loader',
					options: {
						includePaths: ['node_modules'],
						sourceMap: process.env.WEBPACK_SERVE ? true : false
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
				sourceMap: process.env.WEBPACK_SERVE ? true : false
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},

	plugins: [
		new Dotenv(),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css',
			chunkFilename: '[id].bundle.css'
		})
	]
}

module.exports = config