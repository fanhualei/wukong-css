const { resolve } = require('path');
//引用
const HtmlWebpackPlugin = require('html-webpack-plugin');

//引用css单独提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');

const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //创建style标签，添加到html head
          //"style-loader",
          // 替换上面那个。提取成单独的文件
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          //将css文件变成commonjs
          'css-loader',
          // css 兼容性配置
        ],
      },
      {
        test: /\.less$/,
        use: [
          //创建style标签，添加到html head
          //"style-loader",
          // 替换上面那个。提取成单独的文件
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          //将css文件变成commonjs
          'css-loader',
          //将less转成css
          'less-loader',
        ],
      },
      //处理css中的图片文件
      {
        test: /\.jpg|png|gif$/,
        loader: 'url-loader',

        options: {
          //图片小于8kb，就会处理成base64
          limit: 8 * 1024,
          //避免与下面html中的img冲突
          esModule: false,
          outputPath: 'imgs',
        },
      },
      //处理html中的图片文件
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      //打包其他文件
      {
        //排除其他文件
        exclude: /\.html|jpg|png|gif|less|css|js|jsx$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
      //语法检查
      {
        test: /\.j123s$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          //fix: true,
        },
      },
      //js兼容性
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          //'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3,
                    },
                    //指定具体兼容性
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                    },
                  },
                ],
              ],
              //开启babel缓存
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    //功能:默认会创建- -个空的HTML，自动引入打包输出的所有资源(JS/CSS)
    //template 指定要复制的html文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true,
      },
    }),
    //分离css成为单独文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:10].css',
    }),

    new OptimizeCssAssetsPlugin(),

    //告诉webpack哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    //将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  //mode: 'development',
  mode: 'production',
  //实时预览,只在内储存中输出
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    //启动压缩
    compress: true,
    //端口
    port: 3000,
    hot: true,
  },
  devtool: 'source-map',
  externals: {
    //忽略 -- npm包名
    jquery: 'jQuery',
  },
};
