import webpack from 'webpack';
import path from 'path';

import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

// RESOURCES
// - https://medium.freecodecamp.org/a-beginners-introduction-to-webpack-2620415e46b3
// - https://hackernoon.com/how-to-build-a-react-project-from-scratch-using-webpack-4-and-babel-56d4a26afd32
// - https://medium.freecodecamp.org/how-to-use-reactjs-with-webpack-4-babel-7-and-material-design-ff754586f618
// - https://stackoverflow.com/a/31906902/2076595
// - https://github.com/johnagan/clean-webpack-plugin
// - https://stackoverflow.com/a/40040957/2076595

const config = (env) => ({
	entry: './src/js/index.js',

	output: {
		path: path.resolve(path.join(__dirname, '/build')),
		filename: 'js/[name].[hash].js',
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|\.entry\.js)/,
				use: [
					// 'file-loader?name=./js/[name].[hash].[ext]',
					// 'extract-loader',
					'babel-loader',
				],
			},
			{
				test: /\.(css|styl)$/,
				use: (env.MODE === 'production') ? [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader', options: { url: false, sourceMap: true } },
					'stylus-loader',
				] : [
					'style-loader',
					'css-loader',
					'stylus-loader',
				],
			},
			{
				test: /\.pug$/,
				use: [
					'html-loader?attrs=false',
					'pug-html-loader'
				],
			}
		]
	},

	plugins: [
		// Clean build folder
		new CleanWebpackPlugin(),

		// (Production Only) Extract all CSS and capture it into a file
		(env.MODE === 'production') ? new MiniCssExtractPlugin({
			filename: "css/style.[hash].css",
		}) : function() {},

		// (Production Only) Minify CSS
		(env.MODE === 'production') ? new OptimizeCssAssetsPlugin() : function() {},

		// Compile index.html
		new HtmlWebpackPlugin({
			template: './src/index.pug',
			filename: './index.html',
			minify: (env.MODE === 'production') ? {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			} : false,
		}),

		// Compile 404.html
		new HtmlWebpackPlugin({
			template: './src/404.pug',
			filename: './404.html',
			minify: (env.MODE === 'production') ? {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			} : false,
		}),

		// Inject some stuff into our JS
		new webpack.DefinePlugin({
			'process.env.MODE': JSON.stringify(env.MODE),
		}),

		// Copy our assets
		new CopyWebpackPlugin([
			{ from: 'src/static' },
		])
	],
	target: 'web'
});

module.exports = config;