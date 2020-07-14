var path = require("path");
var webpack = require("webpack");

module.exports = env => {
  return {
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      publicPath: "/dist/",
      filename: "build.js"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"]
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            loaders: {}
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]"
          }
        }
      ]
    },
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      },
      extensions: ["*", ".js", ".vue", ".json"]
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: env === "development" ? "#eval-source-map" : "#source-map",
    plugins:
      env === "development"
        ? [].concat([
            new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: '"development"'
              }
            })
          ])
        : [].concat([
            new webpack.DefinePlugin({
              "process.env": {
                NODE_ENV: '"production"'
              }
            }),
            new webpack.optimize.UglifyJsPlugin({
              sourceMap: true,
              compress: {
                warnings: false
              }
            }),
            new webpack.LoaderOptionsPlugin({
              minimize: true
            })
          ])
  };
};

// if (process.env.NODE_ENV !== "development") {
//   module.exports.devtool = "#source-map";
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   // module.exports.plugins =
// }
