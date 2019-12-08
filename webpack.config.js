module.exports = {
  entry: './app1/src/app/index.js',
  output: {
    path: `${__dirname}/app1/src/public`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}