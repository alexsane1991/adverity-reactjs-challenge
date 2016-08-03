module.exports = {
  entry: ["./main.js", "./App.js"],
  output: {
    path: './',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
