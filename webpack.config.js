const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    App: ['./src/index.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'docs/'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  plugins: [],
  target: 'web',
};
