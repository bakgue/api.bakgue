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
