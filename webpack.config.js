module.exports = {
  entry: './renderer/js/index.js',
  output: {
    filename: './renderer/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  }
};
