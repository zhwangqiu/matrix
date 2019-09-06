const path=require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode:"production",
  // watch:true,
 entry:{
    index:'./src/index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({template:'./public/index.html'}),
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

module.exports = config;