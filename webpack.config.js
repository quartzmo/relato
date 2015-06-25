var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack/hot/only-dev-server',
      "./js/Relato.jsx"
    ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};