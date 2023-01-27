const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const merge = require("webpack-merge");
require("@babel/polyfill");

module.exports = (env, opts) => {
  const config = {
    // 개발용, 제품용 중복되는 옵션들..
    resolve: {
      extensions: [".vue", ".js"],
      alias: {
        '~': path.join(__dirname),
        'scss': path.join(__dirname, './scss')
      }
    },
    entry: {
      app: ["@babel/polyfill", path.join(__dirname, "main.js")],
    },
    output: {
      filename: "[name].bundle.js",
      path: path.join(__dirname, "../docs"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            "vue-style-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
      new VueLoaderPlugin(),
      new CopyPlugin([
        {
          from: "assets/",
          to: "",
        },
      ]),
    ],
  };
  if (opts.mode === "development") {
    return merge(config, {
      // 개발용 옵션 추가
      devtool: "eval", // 빌드시간이 적게 들고 디버깅 가능, 최적화가 덜 되어있고 용량이 큼
      devServer: {
        open: false,
      },
    });
  } else {
    return merge(config, {
      //제품용 옵션 추가
      devtool: "cheap-module-source-map", // 최적화 되어있고 용량이 작음, 디버깅불가능하고 빌드시간 오래걸림
      plugins: [new CleanWebpackPlugin()], // dist 내 파일 갱신
    });
  }
};
