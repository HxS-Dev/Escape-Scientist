const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSPWebpackPlugin = require("csp-webpack-plugin");
const { spawn } = require("child_process");

// Config directories
const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = [SRC_DIR];

module.exports = {
  entry: SRC_DIR + "/index.js",
  output: {
    path: OUTPUT_DIR,
    publicPath: "/",
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: "babel-loader" }],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: "file-loader?name=fonts/[name].[ext]" }],
        include: defaultInclude,
      },
      {
        test: /\.(mp4)$/,
        use: [{ loader: "file-loader?name=video/[name].[ext]" }],
      },
    ],
  },
  target: "electron-renderer",
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new CSPWebpackPlugin({
      "object-src": "'none'",
      "base-uri": "'self'",
      "script-src": [
        "'unsafe-inline'",
        "'self'",
        "'unsafe-eval'",
        "http://ajax.googleapis.com",
      ],
      "worker-src": ["'self'", "blob:"],
      "media-src": "'none'",
    }),
  ],
  devtool: "cheap-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: SRC_DIR,
    hot: true,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    setup() {
      spawn("electron", ["."], {
        shell: true,
        env: process.env,
        stdio: "inherit",
      })
        .on("close", (code) => process.exit(0))
        .on("error", (spawnError) => console.error(spawnError));
    },
    historyApiFallback: true,
  },
  externals: {
    serialport: "commonjs2 serialport",
  },
};
