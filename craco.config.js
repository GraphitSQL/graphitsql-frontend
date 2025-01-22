const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add the following lines to handle 'crypto' and 'fs' dependencies
      webpackConfig.resolve.fallback = {
        fs: require.resolve("browserify-fs"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer/"),
        util: require.resolve("util"),
        path: require.resolve("path-browserify"),
        vm: require.resolve("vm-browserify"),
        process: require.resolve("process/browser"),
      };

      // Add the 'module' configuration for handling .wasm files
      webpackConfig.module.rules.push({
        test: /\.wasm$/,
        type: "webassembly/async",
      });

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        })
      );

      return webpackConfig;
    },
    experiments: {
      asyncWebAssembly: true,
    },
  },
};
