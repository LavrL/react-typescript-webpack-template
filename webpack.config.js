const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const WebpackMd5Hash = require("webpack-md5-hash");

conf = {
  entry: { main: "./src/index.tsx" },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].js",
    pathinfo: false
  },
  // devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    overlay: true //Shows a full-screen overlay in the browser when there are compiler errors or warnings
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(s?)css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(["build/*.*"], {}), //remove build folder(s) before building
    new MiniCssExtractPlugin({ 
      filename: "style.[contenthash].css" //extracts CSS into separate files
    }),
    new HtmlWebpackPlugin({ //generate HTML file from HTML template
      inject: false,
      hash: true,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash() //replace a standard webpack chunkhash with md5
  ]
};

module.exports = (env, options) => {
  let production = options.mode === "production";
  conf.devtool = production ? false : "eval-sourcemap";

  if (production)
    conf.plugins = [
      ...conf.plugins,
      new CopyWebpackPlugin([{ from: "./src/assets", to: "./assets" }])
    ];
  return conf;
};
