const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pages = ["index", "sam"];

module.exports = {
  mode: "development",
  entry: pages.reduce((config, page) => {
    config[page] = `./src/components/${page}.js`;
    return config;
  }, {}),
  output: {
    // filename: "[name][contenthash].js",
    filename: "[name].js",
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
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
