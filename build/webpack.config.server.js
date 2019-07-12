/**
 * @description 服务端 webpack 配置文件
 */
const path = require("path");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.config.base");
let isDev = process.env.NODE_ENV === "development";
const serverWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  target: "node", //指定node运行环境
  // 服务端打包入口
  entry: {
    app: path.join(__dirname, "../client/server-entry.js")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/",
    filename: "server-entry.js",
    libraryTarget: "commonjs2" //打包成commonjs2规范
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
});

if (isDev) {
  serverWebpackConfig.mode = "development";
}

module.exports = serverWebpackConfig;
