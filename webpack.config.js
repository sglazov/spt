const path = require('path');
const config = require('./gulpfile.js/config.js');

module.exports = {
  watch: config.env.production ? false : true,
  mode: config.env.production ? 'production' : 'development',

  entry: {
    app: path.resolve(__dirname, "app/src/scripts/app.js"),
  },
  output: {
    filename: "app.bundle.js",
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        include: [path.resolve(__dirname, "./src/scripts/")],
        loader: "eslint-loader",
      },
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "./src/scripts/")],
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      Libs       : path.resolve(__dirname, 'app/src/scripts/libs/'),
      Modules    : path.resolve(__dirname, 'app/src/scripts/modules/'),
      Utils      : path.resolve(__dirname, 'app/src/scripts/utils/'),
      Components : path.resolve(__dirname, 'app/src/components/'),
    },
  },
};

