module.exports = {
  context: __dirname + "/",
  entry: {
    app: "./app/main.js"
  },
  output: {
    path: __dirname + "/www/js",
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
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  devtool: 'source-map'
};