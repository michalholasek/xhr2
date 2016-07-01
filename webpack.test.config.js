module.exports = {
  entry: './test/index.js',
  output: {
    filename: 'test.bundle.js',
    path: './dist/server/public/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
