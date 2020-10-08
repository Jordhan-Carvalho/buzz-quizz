const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfig = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/template.html" })],
};

const productionConfig = {
  mode: "production",
  output: {
    filename: "bundle.[contentHash].js",
    path: path.resolve(__dirname, "docs"),
  },
  plugins: [
    /**
     clean all files from docs, except assets
     */
    ...commonConfig.plugins,
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!assets/**"],
    }),
  ],
};

const developmentConfig = {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "docs"),
    port: 8000,
  },
};

module.exports = (env) => {
  console.log(env);
  switch (env) {
    case "development":
      return { ...commonConfig, ...developmentConfig };
    case "production":
      return { ...commonConfig, ...productionConfig };
    default:
      throw new Error("No matching configuration was found!");
  }
};
