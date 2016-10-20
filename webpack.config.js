module.exports = {
  entry: './renderer/index.js',
  output: {
    filename: 'bundle.js'
  },
  target: 'node',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    console: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
