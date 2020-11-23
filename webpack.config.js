const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    })
  ],
  mode:"none",
  entry:"./src/index.js",
  output:{
    path:path.resolve(__dirname,'public'),
    filename:"bundle.js"
  },
  devServer:{
    contentBase:path.join(__dirname,'public'),
    port:8000,
    hot:true,
    open:true
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "@babel/preset-env",
            ]
          }
        }
      },
    ]
  }
}