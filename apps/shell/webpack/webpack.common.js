const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry:"./src/app/main.tsx",

  output:{
    filename:"main.js",
    path:path.resolve(__dirname,"../dist")
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    plugins: [new TsconfigPathsPlugin()],
  },

  module:{
    rules:[
      {
        test:/\.(js|jsx|ts|tsx)$/,
        exclude:/node_modules/,
        use:"babel-loader"
      },
      {
        test: /\.module\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: {
                namedExport: false,
                exportLocalsConvention: "asIs",
              },
            },
          },
        ],
      },
    // Global CSS
    {
      test: /\.css$/,
      exclude: /\.module\.css$/,
      use: [
        "style-loader",
        "css-loader",
      ],
    },
    ]
  },

  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.html"
    }),
  ]
};