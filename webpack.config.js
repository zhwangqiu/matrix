const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  mode:"development",
  devtool:'inline-source-map',
  watch:true,
  devServer:{
    hot:true,
    port:3000,
    historyApiFallback:true
  },
  entry:{
    index:'./src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template:'./public/index.html'}),
    new webpack.HotModuleReplacementPlugin()
  ],
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'bundle.js'
  },
  module:{
    rules:[
      {
        test:/\.(js)$/,
        exclude:/node_modules/,
        use:'babel-loader'
      },
      {
        test:/\.css$/,
        exclude:/node_modules/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
};

if (env === 'development') {
  config.mode = 'development';
  config.devtool = 'source-map';
}

module.exports = config;