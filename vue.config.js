const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
  },
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "The Vuse: Admin Template";
      return args;
    });
  },
};
