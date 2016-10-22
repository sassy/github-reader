module.exports = {
  entry: './renderer/js/index.ts',
  output: {
    filename: './renderer/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', 'web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'ts-loader' }
    ]
  }
};
