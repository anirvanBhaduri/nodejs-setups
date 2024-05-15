const path = require('path');
const ignoreWatchPlugin = require('watch-ignore-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/server.ts',

  mode: 'development',
  target: 'node',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  externals: [nodeExternals()],

  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/index.html', to: './public/index.html' }],
    }),
    ignoreWatchPlugin(path.resolve(__dirname, 'dist')),
  ],
};
