const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const config = {
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	entry: './src/main.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/'
	},
	serve: {
		content: path.resolve(__dirname, 'src'),
		devMiddleware: {
			publicPath: '/build/'
		}
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [
				{
					loader: process.env.WEBPACK_SERVE ? 'style-loader' : MiniCssExtractPlugin.loader
				},
				{
					loader: 'css-loader'
				},
				{
					loader: 'sass-loader',
					options: {
						includePaths: ['node_modules']
					}
				}
			]
		}]
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