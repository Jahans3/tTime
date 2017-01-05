module.exports = {
  context: __dirname + "/",
  entry: {
    app: "./app/main.js"
  },
  output: {
    path: __dirname + "/server/app",
    filename: "[name]-bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]', 'resolve-url', 'sass?sourceMap']
      }
    ]
  },
  devtool: 'source-map'
};