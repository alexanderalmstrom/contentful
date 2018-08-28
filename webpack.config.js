const path = require('path')
const webpack = require('webpack')

const config = {
	mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
	entry: './src/main.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/'
	},
	serve: {
		content: path.resolve(__dirname, 'src')
	}
}

module.exports = config