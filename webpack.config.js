const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

const BASE_JS_PATH = "./src/client/js/";

module.exports = {
	resolve: {
		alias: {
			path: require.resolve("path-browserify"),
		},
	},
	entry: {
		main: `${BASE_JS_PATH}main.js`,
		navbar: `${BASE_JS_PATH}navbar.js`,
		classInfo: `${BASE_JS_PATH}class-info.js`,
		watchScreenController: `${BASE_JS_PATH}watch-screen-controller.js`,
		markdown: `${BASE_JS_PATH}markdown.js`,
		edit: `${BASE_JS_PATH}edit.js`,
		delete: `${BASE_JS_PATH}delete.js`,
		checkNewAss: `${BASE_JS_PATH}check-new-ass.js`,
		saveAss: `${BASE_JS_PATH}save-ass.js`,
		autoSkipper: `${BASE_JS_PATH}auto-skipper.js`,
		copyLink: `${BASE_JS_PATH}copy-link.js`,
		createIssue: `${BASE_JS_PATH}create-issue.js`,
		editProfile: `${BASE_JS_PATH}edit-profile.js`,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/styles.css",
		}),
		new NodePolyfillPlugin(),
	],
	output: {
		filename: "js/[name].js",
		path: path.resolve(__dirname, "assets"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", { targets: "defaults" }]],
					},
				},
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
		],
	},
};
