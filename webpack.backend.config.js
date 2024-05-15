const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  entry: {
    server: './backend/server.ts',
  },

  mode: 'development',
  target: 'node',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, 'backend'),
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    symlinks: false,
  },

  externals: [nodeExternals()],

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: './backend/index.html', to: './public/index.html' }],
    }),
    new NodemonPlugin({
      // what to watch
      watch: path.resolve('./dist'),

      // Files to ignore.
      ignore: ['*.js.map'],

      // Extensions to watch.
      ext: 'js,njk,json',

      // Unlike the cli option, delay here is in milliseconds (also note that it's a string).
      // Here's 1 second delay:
      delay: '1000',

      // Detailed log.
      verbose: true,

      // Environment variables to pass to the script to be restarted
      env: {
        NODE_ENV: 'development',
      },
    }),
  ],
};
