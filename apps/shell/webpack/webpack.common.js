const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

entry:"./src/main.tsx",

output:{
 filename:"main.js",
 path:path.resolve(__dirname,"../dist")
},

module:{
 rules:[
   {
    test:/\.(js|jsx|ts|tsx)$/,
    exclude:/node_modules/,
    use:"babel-loader"
   }
 ]
},

plugins:[
 new HtmlWebpackPlugin({
  template:"./src/index.html"
 })
]

};