const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
  entry 
  1. String  单入口
  2. 数组
     只有在热更新中，让Js来生效
  3. object
    有几个入库文件，就生成几个bundle文件
    {
      index:'',
      add: '',
    }
    
     
 */

module.exports = {
  entry: ['./src/index-entry.js', './src/index-detail.html'],
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build-entry'),
  },
  module: {
    rules: [
      //css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      //less
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      //css图片
      {
        test: /\.(png|svg|jpg|git)$/,
        loader: 'file-loader',
        options: {
          //图片小于8kb，就会处理成base64
          limit: 8 * 1024,
          //避免与下面html中的img冲突
          esModule: false,
          outputPath: 'imgs',
        },

      },
      //html 图片
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      //fonts
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index-detail.html',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build-entry',
    hot: true,
  },
  mode: 'development',
};
