const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

// 效率优化
const TerserPlugin = require("terser-webpack-plugin");

const BundleAnalyZerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        //使用缓存
        cache: true,
        //使用多线程
        parallel: true,
        terserOptions: {
          compress: {
            unused: true,
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
          },
        },
      }),
    ],
  },

  // 在进行require时，不用带文件的后缀
  resolve: {
    extensions: [".wasm", ".mjs", ".js", ".jsx", ".json"],
  },
  // 得到入口文件路径
  entry: path.resolve(__dirname, "src/index.jsx"),

  //配置内容
  module: {
    rules: [
      {
        //配置jsx文件
        test: /\.jsx?/,
        //忽略掉库文件
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              require.resolve("@babel/preset-react"),
              [require.resolve("@babel/preset-env", { module: false })],
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  //插件
  plugins: [
    //js添加到html中的插件
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
    }),
    //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    //代码性能分析插件
    new BundleAnalyZerPlugin(),
  ],

  //配置预览server
  devServer: {
    //预览server可以热更新
    hot: true,
  },
};
