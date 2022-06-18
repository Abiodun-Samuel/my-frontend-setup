const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pages = ["index"];

module.exports = {
  mode: "development",
  entry: pages.reduce((config, page) => {
    //  config[page] = `./src/index.js`;
    config[page] = `./src/components/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "[name][contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/components/${page}.html`,
          filename: `${page}.html`,
          chunks: [page],
        })
    )
  ),
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3007,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  stats: {
    children: true,
    errorDetails: true,
  },
};
