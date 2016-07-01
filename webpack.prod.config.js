module.exports = {
  entry: './index.js',
  output: {
    filename: 'xhr.bundle.js',
    path: './dist/'
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
